import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  // Check if this is an admin user based on email domain or specific email
  const adminEmails = ['rob@fusiondataco.com', 'mat@fusiondataco.com', 'admin@fusiondataco.com'];
  const isAdmin = adminEmails.includes(claims["email"]) || 
                   claims["email"]?.endsWith('@fusiondataco.com');
  
  await storage.upsertUser({
    replitAuthId: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
    role: isAdmin ? "admin" : "user",
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };

  // Configure strategies for all allowed domains
  const domains = process.env.REPLIT_DOMAINS!.split(",");
  console.log('[AUTH] Configuring authentication for domains:', domains);
  
  for (const domain of domains) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`,
      },
      verify,
    );
    passport.use(strategy);
    console.log(`[AUTH] Strategy configured for domain: ${domain}`);
  }

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", (req, res, next) => {
    // Store the redirect URL in session before authentication
    const redirectTo = req.query.redirect || '/crm/dashboard';
    (req.session as any).returnTo = redirectTo as string;
    
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    console.log('[AUTH] Callback received for hostname:', req.hostname);
    console.log('[AUTH] Available domains:', process.env.REPLIT_DOMAINS);
    
    // Check if the hostname is in the allowed domains
    const allowedDomains = process.env.REPLIT_DOMAINS?.split(",") || [];
    if (!allowedDomains.includes(req.hostname)) {
      console.error('[AUTH] Domain not configured:', req.hostname);
      console.error('[AUTH] Allowed domains:', allowedDomains);
      return res.status(500).json({ 
        error: "Domain not configured for authentication",
        hostname: req.hostname,
        configured: allowedDomains
      });
    }
    
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: (req.session as any).returnTo || "/crm/dashboard",
      failureRedirect: "/login",
    }, (err: any, user: any, info: any) => {
      if (err) {
        console.error('[AUTH] Authentication error:', err);
        return res.status(500).json({ error: "Authentication failed", details: err.message });
      }
      if (!user) {
        console.error('[AUTH] No user returned:', info);
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('[AUTH] Login error:', err);
          return res.status(500).json({ error: "Login failed", details: err.message });
        }
        const redirectTo = (req.session as any).returnTo || "/crm/dashboard";
        delete (req.session as any).returnTo;
        return res.redirect(redirectTo);
      });
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
        }).href
      );
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = req.user as any;

  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// Middleware to check if user is admin
export const isAdmin: RequestHandler = async (req, res, next) => {
  // First check if authenticated
  await isAuthenticated(req, res, async () => {
    const user = req.user as any;
    const replitAuthId = user.claims?.sub;
    
    if (!replitAuthId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Get user from database to check role
    const dbUser = await storage.getUserByReplitAuthId(replitAuthId);
    if (!dbUser || dbUser.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden - Admin access required" });
    }
    
    next();
  });
};