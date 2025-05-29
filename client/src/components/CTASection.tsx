import { Link } from "wouter";
import { ArrowRight, Zap, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CTASection() {
  const benefits = [
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      text: "Guaranteed 99.99% uptime SLA"
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      text: "Enterprise-grade security & compliance"
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Dedicated customer success team"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="titanium-panel p-0 rounded-2xl overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center mr-4">
                  <Zap className="text-accent w-5 h-5" />
                </div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Enterprise-Grade Solution
                </p>
              </div>

              <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span>Transform Your Enterprise</span>{" "}
                <span className="text-primary text-shadow-titanium">Marketing Strategy</span>
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
                Join Fortune 500 companies that leverage our enterprise platform to streamline operations, enhance customer engagement, and drive measurable business outcomes.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {benefit.icon}
                    </div>
                    <span className="text-muted-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Link href="/pricing">
                  <span className={cn(
                    "px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium shadow-md",
                    "hover:shadow-lg transition-all duration-200 text-center cursor-pointer inline-flex items-center justify-center",
                    "relative overflow-hidden group"
                  )}>
                    <span className="relative z-10 flex items-center">
                      Get Enterprise Access
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                </Link>
                
                <Link href="/#enterprise-demo">
                  <span className={cn(
                    "px-8 py-4 bg-transparent border border-border text-foreground rounded-md font-medium", 
                    "hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300",
                    "text-center cursor-pointer inline-flex items-center justify-center"
                  )}>
                    Schedule Executive Demo
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Right content with form */}
            <div className="bg-card/80 backdrop-blur-md p-8 md:p-12 lg:p-16 border-l border-border/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-6 text-foreground">
                  Talk to Our Enterprise Team
                </h3>
                
                <p className="text-muted-foreground mb-8">
                  Get a personalized consultation and discover how our enterprise solutions can address your organization's unique challenges.
                </p>
                
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        placeholder="John Smith" 
                        className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-1">Company</label>
                      <input 
                        type="text" 
                        id="company"
                        placeholder="Enterprise, Inc." 
                        className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Work Email</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="john@enterprise.com" 
                      className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      placeholder="+1 (555) 000-0000" 
                      className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-muted-foreground mb-1">Area of Interest</label>
                    <select 
                      id="interest"
                      className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      defaultValue=""
                    >
                      <option value="" disabled>Select your primary interest</option>
                      <option value="crm">Enterprise CRM</option>
                      <option value="automation">Marketing Automation</option>
                      <option value="analytics">Data Analytics & BI</option>
                      <option value="ai">AI & Predictive Intelligence</option>
                      <option value="compliance">Security & Compliance</option>
                    </select>
                  </div>
                  
                  <button 
                    type="button"
                    className="w-full py-4 bg-accent text-accent-foreground rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    Request Enterprise Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enterprise logos */}
        <div className="mt-16 max-w-5xl mx-auto">
          <p className="text-sm text-muted-foreground text-center mb-8">TRUSTED BY LEADING ENTERPRISES WORLDWIDE</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            <div className="h-8 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center">
              <div className="bg-card/50 rounded px-3 py-1 border border-border/30">
                <span className="text-xs font-semibold text-muted-foreground">ENTERPRISE CLIENT</span>
              </div>
            </div>
            <div className="h-8 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center">
              <div className="bg-card/50 rounded px-3 py-1 border border-border/30">
                <span className="text-xs font-semibold text-muted-foreground">FORTUNE 500</span>
              </div>
            </div>
            <div className="h-8 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center">
              <div className="bg-card/50 rounded px-3 py-1 border border-border/30">
                <span className="text-xs font-semibold text-muted-foreground">GLOBAL CORP</span>
              </div>
            </div>
            <div className="h-8 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center">
              <div className="bg-card/50 rounded px-3 py-1 border border-border/30">
                <span className="text-xs font-semibold text-muted-foreground">TECH GIANT</span>
              </div>
            </div>
            <div className="h-8 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center">
              <div className="bg-card/50 rounded px-3 py-1 border border-border/30">
                <span className="text-xs font-semibold text-muted-foreground">INDUSTRY LEADER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
