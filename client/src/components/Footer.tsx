import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Shield, Globe, Mail, Phone, MapPin, Award, FileCheck, BadgeCheck } from "lucide-react";

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
                <span>+1 (800) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>enterprise@fusiondataco.com</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <span>100 Enterprise Way, Suite 300<br />San Francisco, CA 94105</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/50">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/50">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/50">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/50">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Enterprise Solutions */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-medium mb-5 text-foreground flex items-center gap-2">
              <Globe size={20} className="text-primary" />
              Enterprise Solutions
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/crm">
                  <span className="hover:text-primary transition-colors cursor-pointer inline-flex items-center">
                    <span className="absolute w-1 h-1 rounded-full bg-primary/70 opacity-0 -left-3 group-hover:opacity-100 transition-opacity"></span>
                    Enterprise CRM
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/analytics">
                  <span className="hover:text-primary transition-colors cursor-pointer">Analytics Platform</span>
                </Link>
              </li>
              <li>
                <Link href="/automation">
                  <span className="hover:text-primary transition-colors cursor-pointer">Workflow Automation</span>
                </Link>
              </li>
              <li>
                <Link href="/ai">
                  <span className="hover:text-primary transition-colors cursor-pointer">AI Intelligence</span>
                </Link>
              </li>
              <li>
                <Link href="/social-media">
                  <span className="hover:text-primary transition-colors cursor-pointer">Enterprise Social Media</span>
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
                <Link href="/enterprise">
                  <span className="hover:text-primary transition-colors cursor-pointer">Enterprise</span>
                </Link>
              </li>
              <li>
                <Link href="/finance">
                  <span className="hover:text-primary transition-colors cursor-pointer">Financial Services</span>
                </Link>
              </li>
              <li>
                <Link href="/healthcare">
                  <span className="hover:text-primary transition-colors cursor-pointer">Healthcare</span>
                </Link>
              </li>
              <li>
                <Link href="/manufacturing">
                  <span className="hover:text-primary transition-colors cursor-pointer">Manufacturing</span>
                </Link>
              </li>
              <li>
                <Link href="/real-estate">
                  <span className="hover:text-primary transition-colors cursor-pointer">Real Estate</span>
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
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Enterprise Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li>
                <Link href="/#demo">
                  <span className="hover:text-primary transition-colors cursor-pointer">Contact Enterprise</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
            <img src="https://via.placeholder.com/90x40?text=ISO27001" alt="ISO 27001 Certified" />
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
            <img src="https://via.placeholder.com/90x40?text=SOC2" alt="SOC 2 Type II Certified" />
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
            <img src="https://via.placeholder.com/90x40?text=GDPR" alt="GDPR Compliant" />
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
            <img src="https://via.placeholder.com/90x40?text=HIPAA" alt="HIPAA Compliant" />
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
            <img src="https://via.placeholder.com/90x40?text=AWS" alt="AWS Partner" />
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
