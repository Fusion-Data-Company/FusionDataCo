# Fusion Data Co - Marketing Automation SaaS Platform

## Overview
Fusion Data Co is a cutting-edge marketing automation SaaS platform designed to transform lead generation into a strategic, data-driven conversion ecosystem. It offers AI-powered features for content automation, lead management, and advanced analytics, targeting enterprises seeking to optimize their marketing funnels and achieve significant ROI. The platform emphasizes credibility, transparent pricing, and robust compliance with industry standards.

## User Preferences
- Enterprise-focused copy without hype
- Sandler sales methodology alignment
- Professional, credible tone for CTOs/VPs
- Cross-linking between all service pages
- Consistent UI with existing design system

## System Architecture
The platform is built with a modern technology stack:
-   **Frontend**: React 18 with TypeScript, Vite, TailwindCSS, shadcn/ui. It features a global typography system, 44px minimum touch targets, and a mobile-first design with Apple-level quality mobile optimization including enhanced navigation, content adaptation, and form optimization. Advanced UI/UX enhancements include new button variants with micro-interactions, interactive card components, improved navigation, FUSION-branded loading states, and enhanced form inputs with sophisticated animations.
-   **Backend**: Express.js with TypeScript, utilizing Drizzle ORM.
-   **Database**: PostgreSQL (Neon serverless) for data persistence, including schemas for Users, Leads & Contacts, Campaigns & Automations, Analytics Events, and Sessions.
-   **Authentication**: Google OAuth via Passport.js.
-   **AI Integration**: OpenRouter for multi-model routing and OpenAI API for AI-powered features like blog generation and content automation. The MCP server includes tools for triggering blog and newsletter automation.
-   **Real-time**: WebSockets for live updates.
-   **Analytics**: Custom tracking system with GA-style events.
-   **Key Features**: Conversational AI (Voice + SMS), multi-model AI routing following a "Golf Bag Approach," CRM integration, marketing automation workflows, social media management, email campaigns, lead generation tools, and analytics dashboards, all structured around the Sandler funnel methodology.
-   **Security & Compliance**: Designed for SOC2, GDPR, TCPA/CTIA, and HIPAA compliance with secure OAuth and session management.
-   **Design Principles**: Emphasis on removing fake data and unverified claims, ensuring professional and credible content, and maintaining consistent UI/UX across the platform. Includes branded favicon and Open Graph images for social sharing.

## External Dependencies
-   **Mailjet**: For email notifications and newsletter services.
-   **Google Calendar API**: For booking system integration.
-   **OpenRouter**: For multi-model AI routing.
-   **OpenAI API**: For advanced AI capabilities (e.g., DALL-E 3 for image generation).
-   **Perplexity AI**: Integrated for content generation.
-   **Unsplash**: For high-quality imagery.
-   **Google OAuth**: For user authentication.
-   **Neon (PostgreSQL)**: Serverless PostgreSQL database hosting.
-   **Google Sheets API**: (Pending credentials) for newsletter integration.