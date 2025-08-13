import { Link } from "wouter";
import { Facebook, Linkedin, Shield, Globe, Mail, Phone, MapPin, Award, FileCheck, BadgeCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card relative pt-16 pb-10 border-t border-border/30 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter signup */}
        <div className="glass-panel mb-16 p-8 rounded-xl max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 opacity-5">
            <Shield className="w-full h-full text-primary" />
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="font-['Orbitron'] text-2xl font-semibold mb-3 text-foreground">
                Stay Updated with Enterprise Insights
              </h3>
              <p className="text-muted-foreground">
                Subscribe to our newsletter for exclusive industry trends, product updates, and enterprise marketing strategies.
              </p>
            </div>
            
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors w-full sm:w-64"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/">
              <span className="inline-block mb-6 cursor-pointer">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/10 rounded-lg blur opacity-30"></div>
                  <div className="relative">
                    <span className="font-['Orbitron'] text-xl font-bold tracking-wider">
                      <span className="text-primary text-shadow-titanium">FUSION</span>
                      <span className="text-foreground">DATA</span>
                      <span className="text-accent text-shadow-accent">CO</span>
                    </span>
                  </div>
                </div>
              </span>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering Fortune 500 companies and enterprise businesses with comprehensive marketing automation, AI-powered intelligence, and data-driven strategies.
            </p>
            
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <span>+1 (615) 788-2808</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>rob@fusiondataco.com</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>Available by appointment<br />Remote consultations nationwide</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61569531779877" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/50">
                <Facebook size={18} />
              </a>
              <a href="https://www.linkedin.com/company/fusion-data-co/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/50">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-medium mb-5 text-foreground flex items-center gap-2">
              <Globe size={20} className="text-primary" />
              Solutions
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/social-media">
                  <span className="hover:text-primary transition-colors cursor-pointer inline-flex items-center">
                    <span className="absolute w-1 h-1 rounded-full bg-primary/70 opacity-0 -left-3 group-hover:opacity-100 transition-opacity"></span>
                    Social Media
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/campaign-builder">
                  <span className="hover:text-primary transition-colors cursor-pointer">Campaign Builder</span>
                </Link>
              </li>
              <li>
                <Link href="/lead-magnet">
                  <span className="hover:text-primary transition-colors cursor-pointer">Lead Magnet</span>
                </Link>
              </li>
              <li>
                <Link href="/automations">
                  <span className="hover:text-primary transition-colors cursor-pointer">Marketing Automations</span>
                </Link>
              </li>
              <li>
                <Link href="/crm">
                  <span className="hover:text-primary transition-colors cursor-pointer">CRM Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Industries */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-medium mb-5 text-foreground flex items-center gap-2">
              <Award size={20} className="text-primary" />
              Industries
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/small-business-owners">
                  <span className="hover:text-primary transition-colors cursor-pointer">Small Business Owners</span>
                </Link>
              </li>
              <li>
                <Link href="/real-estate">
                  <span className="hover:text-primary transition-colors cursor-pointer">Real Estate</span>
                </Link>
              </li>
              <li>
                <Link href="/medical">
                  <span className="hover:text-primary transition-colors cursor-pointer">Medical</span>
                </Link>
              </li>
              <li>
                <Link href="/trades">
                  <span className="hover:text-primary transition-colors cursor-pointer">Trades</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-medium mb-5 text-foreground flex items-center gap-2">
              <BadgeCheck size={20} className="text-primary" />
              Company
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/about">
                  <span className="hover:text-primary transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-primary transition-colors cursor-pointer">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/case-studies">
                  <span className="hover:text-primary transition-colors cursor-pointer">Case Studies</span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="hover:text-primary transition-colors cursor-pointer">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <span className="hover:text-primary transition-colors cursor-pointer">Pricing</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <span className="hover:text-primary transition-colors cursor-pointer">Login</span>
                </Link>
              </li>
              <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center min-w-[90px] h-[40px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Shield size={16} />
              <span>ISO 27001</span>
            </div>
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center min-w-[90px] h-[40px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Shield size={16} />
              <span>SOC 2 Type II</span>
            </div>
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center min-w-[90px] h-[40px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Shield size={16} />
              <span>GDPR</span>
            </div>
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center min-w-[90px] h-[40px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Shield size={16} />
              <span>HIPAA</span>
            </div>
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center min-w-[90px] h-[40px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Globe size={16} />
              <span>AWS Partner</span>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">&copy; {currentYear} Fusion Data Co. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <FileCheck size={14} />
              <span>Privacy Policy</span>
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <FileCheck size={14} />
              <span>Terms of Service</span>
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <FileCheck size={14} />
              <span>Cookie Policy</span>
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Shield size={14} />
              <span>GDPR Compliance</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
