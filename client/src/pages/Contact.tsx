import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Phone, Mail } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
const matPhoto = "/mat-photo.jpg";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(5, { message: "Please enter a message with at least 5 characters." }),
  source: z.string().default("ContactPage"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      source: "ContactPage",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Track form submission event
      trackEvent({
        category: 'lead_generation',
        action: 'submit',
        label: 'contact_form',
      });
      
      // Submit to backend
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      setSubmitted(true);
      toast({
        title: "Form submitted successfully",
        description: "We'll be in touch with you shortly.",
      });
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Get in touch with the Fusion Data Co team. We're here to answer your questions about our marketing automation and CRM solutions."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-card">
            <div className="container mx-auto">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-primary">Get in Touch</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Have questions about our platform? Need a custom demo? Our team is here to help.
                </p>
              </div>
            </div>
          </section>
          
          {/* Contact Form Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Meet Our <span className="text-primary">Team</span>
                  </h2>
                  
                  {/* Team Profiles */}
                  <div className="space-y-8 mb-8">
                    {/* Robert Yeager - CEO */}
                    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-background/50 rounded-lg border border-border/30">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                        RY
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">Robert Yeager</h3>
                        <p className="text-sm text-muted-foreground font-medium mb-3">CEO & Founder</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          Robert has spent his entire life with a keyboard in his lap, working across multiple fields of lead generation and consistently producing results. He's generated leads that have turned over $100+ million in real estate acquisitions across multiple companies and niches, from military mortgage refinancing to enterprise-level applications. As an expert in cutting-edge tools, large language models, workflow automations, and platforms like N8N, Gumloop, ComfyUI, and Cursor, Robert stays at the forefront of technology to bring enterprise-level tools and functions to small business owners.
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href="mailto:rob@fusiondataco.com" className="text-primary hover:underline">rob@fusiondataco.com</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-primary" />
                            <a href="tel:+16157882808" className="text-primary hover:underline">+1 (615) 788-2808</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mat Mercado - Operations */}
                    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-background/50 rounded-lg border border-border/30">
                      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={matPhoto} 
                          alt="Mat Mercado" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">Mat Mercado</h3>
                        <p className="text-sm text-muted-foreground font-medium mb-3">Operations Administrator & Logistical Coordinator</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          Based in Manila, Philippines, Mat is the cornerstone of Fusion Data Co's daily operations and an expert in logistics who has been instrumental since the company's inception. Having worked with the team even before Fusion Data Co was founded, Mat brings unparalleled operational expertise that allows our CEO to focus on strategic initiatives. His influence extends throughout our entire operation, making him an invaluable asset who ensures seamless coordination of all moving parts. Mat's dedication and expertise in logistics make him not just an administrator, but a strategic partner who drives our success from behind the scenes.
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href="mailto:mat@fusiondataco.com" className="text-primary hover:underline">mat@fusiondataco.com</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Manila, Philippines</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mb-6">
                    Contact <span className="text-primary">Information</span>
                  </h2>
                  <p className="text-lg mb-8 text-muted-foreground">
                    We're dedicated to providing exceptional support and guidance. Reach out to us to learn 
                    how Fusion Data Co can transform your marketing efforts.
                  </p>
                  
                  <div className="space-y-8 mt-12">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Location</h3>
                        <p className="text-muted-foreground">Available by appointment</p>
                        <p className="text-muted-foreground">Remote consultations nationwide</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="text-muted-foreground">+1 (615) 788-2808</p>
                        <p className="text-muted-foreground">Monday-Friday, 9am-6pm CST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-muted-foreground">rob@fusiondataco.com</p>
                        <p className="text-muted-foreground">Direct response within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      <a href="https://www.facebook.com/profile.php?id=61569531779877" target="_blank" rel="noopener noreferrer" className="bg-card hover:bg-muted text-primary p-3 rounded-full transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-card hover:bg-muted text-primary p-3 rounded-full transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-card hover:bg-muted text-primary p-3 rounded-full transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-card hover:bg-muted text-primary p-3 rounded-full transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Card className="bg-background border border-border/50">
                    <CardContent className="p-6 md:p-8">
                      {submitted ? (
                        <div className="text-center py-8">
                          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <Check className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                          <p className="text-muted-foreground mb-6">
                            Your message has been submitted successfully. We'll get back to you
                            within 1-2 business days.
                          </p>
                          <Button 
                            className="btn-titanium" 
                            onClick={() => setSubmitted(false)}
                          >
                            Send Another Message
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold mb-6">
                            Send Us a Message
                          </h3>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <input type="hidden" name="source" value="ContactPage" />
                              
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Smith" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                      <Input placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone Number (Optional)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="(555) 123-4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company (Optional)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your Company Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="How can we help you?" 
                                        className="min-h-[120px]"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <Button 
                                type="submit" 
                                className="w-full btn-titanium" 
                                size="lg"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Submitting..." : "Send Message"}
                              </Button>
                              
                              <p className="text-xs text-center text-muted-foreground pt-2">
                                By submitting, you agree to our Privacy Policy and Terms of Service.
                                We'll never share your information.
                              </p>
                            </form>
                          </Form>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">What industries do you serve?</h3>
                  <p className="text-muted-foreground">
                    We specialize in marketing solutions for small businesses, real estate, medical practices, 
                    and trades businesses. However, our platform can be adapted to virtually any industry.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Do you offer personalized demos?</h3>
                  <p className="text-muted-foreground">
                    Yes! We offer customized demos for all potential clients. Use the contact form above to 
                    request a demo, and one of our specialists will reach out to schedule a time.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">What support options are available?</h3>
                  <p className="text-muted-foreground">
                    All plans include email support. Our Growth and Elite plans include priority support 
                    with phone and chat options. We also offer onboarding assistance for all new clients.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Can I cancel my subscription?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can cancel your subscription at any time. Monthly plans can be canceled with 
                    no penalty. Annual plans are non-refundable but will continue until the end of your billing period.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">How long does implementation take?</h3>
                  <p className="text-muted-foreground">
                    Most clients are up and running within 1-2 weeks. Our team will guide you through 
                    the setup process, including data migration, integration setup, and initial campaign creation.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Do you offer training?</h3>
                  <p className="text-muted-foreground">
                    Yes, we provide comprehensive training for all users. This includes live onboarding sessions, 
                    access to on-demand video tutorials, and regular webinars covering advanced features.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}