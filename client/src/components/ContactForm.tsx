import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  CheckCircle, 
  Headset, 
  Phone, 
  Calendar, 
  Building2, 
  Users2, 
  Award,
  BarChart2, 
  ClipboardCheck,
  Laptop,
  HelpCircle, 
  ArrowRight,
  ChevronRight, 
  Globe,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Must be a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position/Title is required" }),
  companySize: z.string().min(1, { message: "Please select company size" }),
  industry: z.string().min(1, { message: "Please select an industry" }),
  phone: z.string().optional(),
  message: z.string().optional(),
  marketingConsent: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      position: "",
      companySize: "",
      industry: "",
      phone: "",
      message: "",
      marketingConsent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Enterprise Demo Request Submitted",
        description: "Our enterprise team will contact you within 24 hours to schedule your executive demonstration.",
      });
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error Submitting Request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  const benefits = [
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: "ROI Analysis",
      description: "Custom ROI projections for your specific enterprise environment"
    },
    {
      icon: <ClipboardCheck className="h-5 w-5" />,
      title: "Technical Assessment",
      description: "Integration compatibility with your enterprise tech stack"
    },
    {
      icon: <Users2 className="h-5 w-5" />,
      title: "Executive Presentation",
      description: "Tailored for your C-suite and stakeholders"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Enterprise Trial",
      description: "60-day enterprise-grade pilot with dedicated support"
    }
  ];

  const enterpriseClientsLogos = [
    "ENTERPRISE 1",
    "ENTERPRISE 2", 
    "ENTERPRISE 3",
    "ENTERPRISE 4"
  ];
  
  const securityBadges = [
    { icon: <Shield className="h-5 w-5" />, text: "SOC 2 Type II" },
    { icon: <Globe className="h-5 w-5" />, text: "GDPR Compliant" },
    { icon: <Shield className="h-5 w-5" />, text: "HIPAA Compliant" }
  ];

  return (
    <section id="enterprise-demo" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <span>Experience the</span>{" "}
              <span className="text-primary text-shadow-titanium">Enterprise Advantage</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a personalized demonstration with our enterprise solutions team to discover how Fusion Data Co can transform your organization's marketing capabilities.
            </p>
          </div>
        
          <div className="titanium-panel rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Section */}
              <div className="p-8 md:p-10">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                    <div className="w-20 h-20 rounded-full glass-panel border border-primary/40 flex items-center justify-center mb-6">
                      <CheckCircle className="text-primary" size={40} />
                    </div>
                    <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">Request Received</h3>
                    <p className="text-muted-foreground mb-8 max-w-md">
                      Thank you for your interest in our enterprise solutions. A member of our executive team will contact you within 24 hours to schedule your personalized demonstration.
                    </p>
                    <div className="flex gap-4">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 text-primary" size={16} />
                        <span>Within 24 hours</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Headset className="mr-2 text-primary" size={16} />
                        <span>Executive Support</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center mr-4">
                        <Building2 className="text-primary w-5 h-5" />
                      </div>
                      <h2 className="font-['Orbitron'] text-2xl font-semibold text-foreground">Enterprise Consultation</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name*</label>
                          <input
                            type="text"
                            id="name"
                            placeholder="John Smith"
                            {...register("name")}
                            className={cn(
                              "w-full px-4 py-3 bg-muted/30 border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
                              errors.name ? "border-destructive" : "border-border"
                            )}
                          />
                          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Work Email*</label>
                          <input
                            type="email"
                            id="email"
                            placeholder="john.smith@enterprise.com"
                            {...register("email")}
                            className={cn(
                              "w-full px-4 py-3 bg-muted/30 border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
                              errors.email ? "border-destructive" : "border-border"
                            )}
                          />
                          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-1">Company Name*</label>
                          <input
                            type="text"
                            id="company"
                            placeholder="Enterprise, Inc."
                            {...register("company")}
                            className={cn(
                              "w-full px-4 py-3 bg-muted/30 border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
                              errors.company ? "border-destructive" : "border-border"
                            )}
                          />
                          {errors.company && <p className="text-destructive text-sm mt-1">{errors.company.message}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="position" className="block text-sm font-medium text-muted-foreground mb-1">Position/Title*</label>
                          <input
                            type="text"
                            id="position"
                            placeholder="CMO / Marketing Director"
                            {...register("position")}
                            className={cn(
                              "w-full px-4 py-3 bg-muted/30 border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
                              errors.position ? "border-destructive" : "border-border"
                            )}
                          />
                          {errors.position && <p className="text-destructive text-sm mt-1">{errors.position.message}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="companySize" className="block text-sm font-medium text-muted-foreground mb-1">Company Size*</label>
                          <select
                            id="companySize"
                            {...register("companySize")}
                            className={cn(
                              "w-full px-4 py-3 bg-muted/30 border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
                              errors.companySize ? "border-destructive" : "border-border"
                            )}
                            defaultValue=""
                          >
                            <option value="" disabled>Select company size</option>
                            <option value="50-100">50-100 employees</option>
                            <option value="101-500">101-500 employees</option>
                            <option value="501-1000">501-1,000 employees</option>
                            <option value="1001-5000">1,001-5,000 employees</option>
                            <option value="5001+">5,000+ employees</option>
                          </select>
                          {errors.companySize && <p className="text-destructive text-sm mt-1">{errors.companySize.message}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="industry" className="block text-sm font-medium text-muted-foreground mb-1">Industry*</label>
                          <select
                            id="industry"
                            {...register("industry")}
                            className={cn(
                              "w-full px-4 py-3 bg-muted/30 border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
                              errors.industry ? "border-destructive" : "border-border"
                            )}
                            defaultValue=""
                          >
                            <option value="" disabled>Select your industry</option>
                            <option value="finance">Financial Services</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="technology">Technology</option>
                            <option value="retail">Retail</option>
                            <option value="real-estate">Real Estate</option>
                            <option value="professional">Professional Services</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.industry && <p className="text-destructive text-sm mt-1">{errors.industry.message}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="+1 (555) 000-0000"
                          {...register("phone")}
                          className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                          What are your enterprise marketing challenges?
                        </label>
                        <textarea
                          id="message"
                          {...register("message")}
                          rows={3}
                          placeholder="Please describe your key marketing challenges and goals..."
                          className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                        />
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketingConsent"
                            type="checkbox"
                            {...register("marketingConsent")}
                            className="w-4 h-4 text-primary bg-muted/30 border-border rounded focus:ring-primary"
                          />
                        </div>
                        <label htmlFor="marketingConsent" className="ml-2 text-xs text-muted-foreground">
                          I agree to receive marketing communications from Fusion Data Co. You can unsubscribe at any time.
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending}
                        className={cn(
                          "w-full py-4 bg-primary text-primary-foreground rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200",
                          "flex items-center justify-center relative overflow-hidden group",
                          (isSubmitting || mutation.isPending) && "opacity-70 cursor-not-allowed"
                        )}
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting || mutation.isPending ? "Processing..." : "Request Enterprise Consultation"}
                          {!(isSubmitting || mutation.isPending) && <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />}
                        </span>
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                      </p>
                    </form>
                  </>
                )}
              </div>
              
              {/* Info Section */}
              <div className="bg-card/80 backdrop-blur-md p-8 md:p-10 border-l border-border/30 relative overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 opacity-5">
                  <Laptop className="w-full h-full text-primary" />
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-8">
                      <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 text-foreground">Enterprise Experience</h3>
                      <p className="text-muted-foreground mb-6">
                        Our enterprise team provides a comprehensive consultation tailored to your organization's specific needs and objectives.
                      </p>
                      
                      <div className="space-y-5">
                        {benefits.map((benefit, index) => (
                          <div key={index} className="flex">
                            <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center mr-4">
                              <div className="text-primary">
                                {benefit.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-1">{benefit.title}</h4>
                              <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Trusted by */}
                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Trusted by enterprise organizations</p>
                      <div className="flex flex-wrap gap-4">
                        {enterpriseClientsLogos.map((logo, idx) => (
                          <div key={idx} className="h-8 opacity-60 hover:opacity-100 transition-all duration-300 flex items-center">
                            <div className="bg-card/50 rounded px-3 py-1 border border-border/30">
                              <span className="text-xs font-semibold text-muted-foreground">{logo}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Security badges */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {securityBadges.map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 text-xs text-muted-foreground">
                          <span className="text-primary">{badge.icon}</span>
                          <span>{badge.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact options */}
                  <div className="glass-panel p-5 rounded-xl shadow-sm">
                    <h4 className="font-medium text-foreground mb-4 flex items-center">
                      <HelpCircle className="mr-2 text-primary" size={16} />
                      Need immediate assistance?
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a href="tel:+16157882808" className="flex items-center gap-3 rounded-lg p-3 bg-muted/30 hover:bg-primary/10 transition-colors border border-border group">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="text-primary" size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Direct Line</p>
                          <p className="text-xs text-muted-foreground">+1 (615) 788-2808</p>
                        </div>
                      </a>
                      
                      <a href="mailto:rob@fusiondataco.com" className="flex items-center gap-3 rounded-lg p-3 bg-muted/30 hover:bg-primary/10 transition-colors border border-border group">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Headset className="text-primary" size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Direct Email</p>
                          <p className="text-xs text-muted-foreground">rob@fusiondataco.com</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
