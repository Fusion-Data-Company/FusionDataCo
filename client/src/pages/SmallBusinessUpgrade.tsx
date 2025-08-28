import { useState } from "react";
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import { 
  Shield, Clock, DollarSign, TrendingUp, Users, Target,
  AlertTriangle, Zap, CheckCircle, ArrowRight, Star, Award,
  BarChart3, Globe, Lock, Lightbulb, Heart, Phone, Mail
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackEvent } from "@/components/AnalyticsTracker";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function SmallBusinessUpgrade() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    revenue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      trackEvent({
        category: 'lead_generation',
        action: 'submit',
        label: 'small_business_upgrade_form'
      });
      
      // Submit to backend
      await apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          company: formData.businessName,
          message: `Small Business Upgrade Request - Revenue: ${formData.revenue}`,
          formType: "small_business",
          source: "SmallBusinessUpgrade"
        })
      });
      
      toast({
        title: "Request submitted successfully!",
        description: "We'll be in touch within 24 hours to show you your personalized CRM demo.",
      });
      
      // Clear form
      setFormData({
        businessName: '',
        name: '',
        email: '',
        phone: '',
        revenue: ''
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Small Business Upgrade - Enterprise Solutions Made Affordable</title>
        <meta name="description" content="Transform your small business with enterprise-grade marketing automation, CRM, and growth systems. No Fortune 500 budget required." />
        <meta name="keywords" content="small business automation, marketing CRM, lead generation, business growth systems" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        {/* Hero Section - Keep existing styling */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-['Orbitron'] font-bold mb-6"
              >
                <span className="text-foreground">Enterprise-Grade</span>{" "}
                <span className="text-primary">Marketing Platform</span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              >
                A comprehensive solution that combines advanced CRM, analytics, and AI-powered workflows to transform your business operations and accelerate growth.
              </motion.p>
            </div>
          </div>
        </section>

        {/* 1. INTRO/POSITIONING SECTION - AMBIENT BLUE */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))' }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
              style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}
            >
              <div className="bg-card/80 backdrop-blur-sm border border-blue-500/20 rounded-xl p-12">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground">
                  Enterprise Solutions Built for Small Business Reality
                </h2>
                <h3 className="text-xl md:text-2xl text-blue-400 mb-8 font-semibold">
                  You shouldn't need a Fortune 500 budget to compete like one
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  While big corporations have teams of specialists, you're wearing every hat in your business. 
                  That's exactly why we created this platform - to give you their advantages without their overhead.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. PAIN POINTS SECTION - AMBIENT RED */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))' }}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground"
                  style={{ textShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}>
                The Problems Keeping You Stuck
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Website Paralysis",
                  description: "You KNOW you need a professional website, but every 'expert' gives you different advice and the costs keep climbing"
                },
                {
                  icon: <DollarSign className="w-8 h-8" />,
                  title: "Social Media Money Pit",
                  description: "You're throwing money at Facebook and Google ads with no clue if they're actually working"
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Time Vampire Tasks",
                  description: "You're manually doing stuff that should be automated - following up with leads, sending emails, tracking customers"
                },
                {
                  icon: <AlertTriangle className="w-8 h-8" />,
                  title: "Amateur Hour Appearance",
                  description: "Your online presence looks like a hobby compared to competitors who seem to have unlimited budgets"
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Lead Leakage",
                  description: "Potential customers slip through the cracks because you don't have systems to catch and nurture them"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Flying Blind",
                  description: "You're making marketing decisions based on gut feelings instead of real data"
                }
              ].map((pain, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/80 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300"
                  style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}
                >
                  <div className="text-red-400 mb-4">{pain.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{pain.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pain.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. INFORMATION/EDUCATION SECTION - AMBIENT YELLOW */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(234, 179, 8, 0.05))' }}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground"
                  style={{ textShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}>
                Here's What Most Small Businesses Don't Know
              </h2>
              <div className="bg-card/80 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 max-w-4xl mx-auto mb-12"
                   style={{ boxShadow: '0 0 40px rgba(234, 179, 8, 0.2)' }}>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">The Enterprise Secret:</h3>
                <p className="text-lg text-foreground leading-relaxed">
                  Big companies don't succeed because they have bigger budgets - they succeed because they have better SYSTEMS.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "The 80/20 Reality",
                  description: "80% of your revenue comes from 20% of your activities - but most small businesses can't identify which 20%"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "The Follow-Up Failure",
                  description: "Studies show 80% of sales happen after the 5th contact, but 90% of small businesses give up after 2 attempts"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "The Data Advantage",
                  description: "Enterprise companies make decisions based on data, not hunches - and now you can too"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "The Automation Edge",
                  description: "While you're manually doing tasks, your competitors with automation are scaling faster and working less"
                }
              ].map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/80 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6"
                  style={{ boxShadow: '0 0 30px rgba(234, 179, 8, 0.3)' }}
                >
                  <div className="text-yellow-400 mb-4">{insight.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{insight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{insight.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 max-w-3xl mx-auto"
                   style={{ boxShadow: '0 0 40px rgba(234, 179, 8, 0.2)' }}>
                <p className="text-lg text-foreground font-semibold">
                  The good news? You don't need their budget to get their results. You just need their systems.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. SOLUTIONS SECTION - AMBIENT GREEN */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))' }}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground"
                  style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}>
                How We Level The Playing Field
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Professional Website That Converts",
                  description: "Not just pretty - built to turn visitors into customers with proven conversion psychology"
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Smart Social Media Advertising",
                  description: "AI-optimized campaigns that only spend money on people likely to buy from you"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Marketing Automation That Never Sleeps",
                  description: "Follow-up sequences that nurture leads automatically, even at 3 AM"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Lead Generation Funnels That Work",
                  description: "Proven systems that capture leads and guide them to purchase decisions"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Enterprise-Level CRM",
                  description: "Track every interaction, never lose a lead, and know exactly which marketing actually makes money"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Real-Time Analytics Dashboard",
                  description: "See which campaigns work, which don't, and where to invest your next dollar"
                }
              ].map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all duration-300"
                  style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}
                >
                  <div className="text-green-400 mb-4">{solution.icon}</div>
                  <div className="flex items-start mb-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-foreground">{solution.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 max-w-3xl mx-auto"
                   style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.2)' }}>
                <p className="text-lg text-foreground font-semibold">
                  Transform from scattered tactics to systematic growth - just like the big players do.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. WHAT WE ACTUALLY PROVIDE - DETAILED EXPLANATIONS */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.05))' }}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground"
                  style={{ textShadow: '0 0 20px rgba(20, 184, 166, 0.3)' }}>
                Here's Exactly What You Get (In Plain English)
              </h2>
              <div className="bg-card/80 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8 max-w-4xl mx-auto mb-12"
                   style={{ boxShadow: '0 0 40px rgba(20, 184, 166, 0.2)' }}>
                <p className="text-lg text-teal-400 mb-4 font-semibold">
                  "FIRST WE MAKE IT WORK, THEN WE MAKE IT PRETTY"
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  We focus on what actually grows your business - not flashy features that look good in demos but don't make you money.
                </p>
              </div>
            </motion.div>

            {/* Conversational AI Explanation */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8"
                   style={{ boxShadow: '0 0 40px rgba(20, 184, 166, 0.2)' }}>
                <div className="flex items-center mb-6">
                  <Phone className="w-10 h-10 text-teal-400 mr-4" />
                  <h3 className="text-2xl font-bold text-foreground">AI Phone & SMS Agents That Never Sleep</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-teal-400 mb-4">What This Actually Means:</h4>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        Someone calls your business at 3 AM? Our AI answers professionally and takes their info
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        Text message comes in while you're with a customer? AI responds in under 5 seconds
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        AI asks the right questions to qualify leads (so you only talk to serious buyers)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        Automatically schedules appointments in your calendar
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-teal-400 mb-4">Real Example:</h4>
                    <div className="bg-background/30 rounded-lg p-4 border border-teal-500/10">
                      <p className="text-sm text-muted-foreground mb-2">Saturday 11:47 PM - Incoming call:</p>
                      <p className="text-foreground font-semibold mb-2">AI: "Hi! Thanks for calling ABC Plumbing. I'm the after-hours assistant. How can I help you?"</p>
                      <p className="text-muted-foreground mb-2">Caller: "My water heater is leaking everywhere!"</p>
                      <p className="text-foreground font-semibold mb-2">AI: "That sounds urgent! Let me get your info and have Mike call you first thing Monday morning. What's the best number to reach you?"</p>
                      <p className="text-sm text-teal-400 mt-4">Result: Lead captured, info in your CRM, you call them Monday = $2,800 water heater replacement job</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Multi-Model AI Explanation */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8"
                   style={{ boxShadow: '0 0 40px rgba(20, 184, 166, 0.2)' }}>
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-10 h-10 text-teal-400 mr-4" />
                  <h3 className="text-2xl font-bold text-foreground">Smart AI That Picks The Right Tool For Each Job</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-teal-400 mb-4">Think of it like a smart toolbox:</h4>
                    <p className="text-foreground mb-4">
                      Just like a good mechanic doesn't use a hammer for every problem, our AI uses different "brain models" for different tasks.
                    </p>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span><strong>Quick questions?</strong> Uses the fast AI model (instant responses)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span><strong>Complex problems?</strong> Uses the smart AI model (thorough analysis)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span><strong>Creative content?</strong> Uses the creative AI model (engaging copy)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-teal-400 mb-4">Why This Matters To You:</h4>
                    <div className="space-y-4">
                      <div className="bg-background/30 rounded-lg p-4 border border-teal-500/10">
                        <p className="text-foreground font-semibold mb-2">Instead of paying for:</p>
                        <p className="text-muted-foreground text-sm">• ChatGPT subscription: $20/month</p>
                        <p className="text-muted-foreground text-sm">• Claude subscription: $20/month</p>
                        <p className="text-muted-foreground text-sm">• Specialized AI tools: $50-200/month</p>
                        <p className="text-muted-foreground text-sm">• Manual switching between tools</p>
                      </div>
                      <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/20">
                        <p className="text-teal-400 font-semibold mb-2">You get everything in one system that automatically picks the best AI for each task</p>
                        <p className="text-foreground text-sm">Saves money + saves time + better results</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lead Qualification Process */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8"
                   style={{ boxShadow: '0 0 40px rgba(20, 184, 166, 0.2)' }}>
                <div className="flex items-center mb-6">
                  <Target className="w-10 h-10 text-teal-400 mr-4" />
                  <h3 className="text-2xl font-bold text-foreground">Automatic Lead Qualification (So You Stop Wasting Time)</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h4 className="text-xl font-semibold text-teal-400 mb-4">Here's What Happens Automatically:</h4>
                    
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                        <div>
                          <h5 className="font-semibold text-foreground mb-2">AI Asks Smart Questions</h5>
                          <p className="text-muted-foreground">Instead of "How can I help you?", our AI asks specific questions based on your business type to understand what they really need.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                        <div>
                          <h5 className="font-semibold text-foreground mb-2">Scores Each Lead</h5>
                          <p className="text-muted-foreground">Based on their answers, budget, timeline, and urgency, each lead gets a score from 1-10. You see the 9s and 10s first.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                        <div>
                          <h5 className="font-semibold text-foreground mb-2">Sends You Only the Good Ones</h5>
                          <p className="text-muted-foreground">Low-quality leads get helpful automated responses. High-quality leads get your immediate attention with all the details you need.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-teal-400 mb-4">Real Impact:</h4>
                    <div className="space-y-4">
                      <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                        <p className="text-red-400 font-semibold mb-2">Before:</p>
                        <p className="text-sm text-muted-foreground">• 50 leads per week</p>
                        <p className="text-sm text-muted-foreground">• You call all 50</p>
                        <p className="text-sm text-muted-foreground">• 45 are tire-kickers</p>
                        <p className="text-sm text-muted-foreground">• 5 actually buy</p>
                        <p className="text-sm text-muted-foreground">• 20+ hours wasted</p>
                      </div>
                      <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/20">
                        <p className="text-teal-400 font-semibold mb-2">After:</p>
                        <p className="text-sm text-foreground">• 50 leads per week</p>
                        <p className="text-sm text-foreground">• AI screens them all</p>
                        <p className="text-sm text-foreground">• You call only the 8-10 rated ones</p>
                        <p className="text-sm text-foreground">• 7-8 actually buy</p>
                        <p className="text-sm text-foreground">• 3 hours total time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Simple ROI Calculator */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8"
                   style={{ boxShadow: '0 0 40px rgba(20, 184, 166, 0.2)' }}>
                <div className="flex items-center mb-6">
                  <DollarSign className="w-10 h-10 text-teal-400 mr-4" />
                  <h3 className="text-2xl font-bold text-foreground">The Real Numbers (Why This Actually Saves You Money)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-red-400 mb-4">What You're Probably Spending Now:</h4>
                    <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-foreground">Missed calls (10 per month @ $500 each)</span>
                          <span className="text-red-400 font-semibold">$5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Time spent on low-quality leads (20 hrs @ $50/hr)</span>
                          <span className="text-red-400 font-semibold">$1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Scattered marketing tools & subscriptions</span>
                          <span className="text-red-400 font-semibold">$800</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Lost follow-up opportunities (5 @ $800 each)</span>
                          <span className="text-red-400 font-semibold">$4,000</span>
                        </div>
                        <hr className="border-red-500/30" />
                        <div className="flex justify-between font-bold text-lg">
                          <span className="text-foreground">Monthly Lost Revenue:</span>
                          <span className="text-red-400">$10,800</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-teal-400 mb-4">What You Get With Our System:</h4>
                    <div className="bg-teal-500/10 rounded-lg p-6 border border-teal-500/20">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-foreground">AI answers every call (capture 100%)</span>
                          <span className="text-teal-400 font-semibold">+$5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Pre-qualified leads only (save 17 hrs)</span>
                          <span className="text-teal-400 font-semibold">+$850</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">All tools in one platform</span>
                          <span className="text-teal-400 font-semibold">+$600</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Automatic follow-up sequences</span>
                          <span className="text-teal-400 font-semibold">+$4,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">System cost</span>
                          <span className="text-red-300 font-semibold">-$1,799</span>
                        </div>
                        <hr className="border-teal-500/30" />
                        <div className="flex justify-between font-bold text-lg">
                          <span className="text-foreground">Net Monthly Gain:</span>
                          <span className="text-teal-400">+$8,651</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      That's $103,812 extra per year. The system pays for itself in the first month.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What Happens After You Sign Up */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-card/80 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8"
                   style={{ boxShadow: '0 0 40px rgba(20, 184, 166, 0.2)' }}>
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-10 h-10 text-teal-400 mr-4" />
                  <h3 className="text-2xl font-bold text-foreground">What Happens After You Say "Yes"</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mx-auto mb-4">1</div>
                    <h4 className="font-semibold text-foreground mb-2">Day 1-3</h4>
                    <p className="text-sm text-muted-foreground">We set up your AI agents, import your contacts, and configure everything for your specific business</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mx-auto mb-4">2</div>
                    <h4 className="font-semibold text-foreground mb-2">Day 4-7</h4>
                    <p className="text-sm text-muted-foreground">We train you on the system (it's simpler than you think) and test everything together</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mx-auto mb-4">3</div>
                    <h4 className="font-semibold text-foreground mb-2">Week 2</h4>
                    <p className="text-sm text-muted-foreground">System goes live. You start seeing captured leads and automated responses immediately</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mx-auto mb-4">4</div>
                    <h4 className="font-semibold text-foreground mb-2">Month 1+</h4>
                    <p className="text-sm text-muted-foreground">We optimize based on your results and add advanced features as you grow</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Remember: "FIRST WE MAKE IT WORK, THEN WE MAKE IT PRETTY"
                  </p>
                  <p className="text-muted-foreground">
                    We focus on getting you results immediately, not fancy dashboards that don't make you money.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. CRM INTRODUCTION BRIDGE */}
        <section className="py-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(139, 92, 246, 0.05))' }}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xl text-foreground font-semibold">
                Ready to stop losing money to missed opportunities? Let's get your competitive advantage set up...
              </p>
            </motion.div>
          </div>
        </section>

        {/* 6. REGISTRATION/CTA SECTION - AMBIENT PURPLE */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))' }}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground"
                  style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}>
                Get Your Competitive Advantage Now
              </h2>
              
              <div className="bg-card/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 max-w-4xl mx-auto mb-12"
                   style={{ boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)' }}>
                <p className="text-lg text-foreground mb-8">
                  Every enterprise company has the same secret weapon - they never let opportunities slip away. 
                  Our CRM gives you that same power:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Automatically captures every lead from every source",
                    "Follows up at exactly the right time, every time",
                    "Shows you which marketing efforts actually make money",
                    "Turns one-time buyers into repeat customers",
                    "Gives you the data to make million-dollar decisions"
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start bg-purple-500/10 rounded-lg p-4"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card/90 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
                   style={{ boxShadow: '0 0 50px rgba(139, 92, 246, 0.4)' }}>
                <h3 className="text-2xl font-['Orbitron'] font-bold text-center mb-2 text-foreground">
                  See Your CRM Demo Now - Free Setup Included
                </h3>
                <p className="text-center text-muted-foreground mb-8">
                  Get instant access to your personalized demo
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="w-full px-4 py-3 bg-background/50 border border-purple-500/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Your Business Name"
                        style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.1)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-background/50 border border-purple-500/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Your Full Name"
                        style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.1)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-background/50 border border-purple-500/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="your@email.com"
                        style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.1)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-background/50 border border-purple-500/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="(555) 123-4567"
                        style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.1)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current Monthly Revenue Range
                    </label>
                    <select
                      value={formData.revenue}
                      onChange={(e) => handleInputChange('revenue', e.target.value)}
                      className="w-full px-4 py-3 bg-background/50 border border-purple-500/30 rounded-lg text-foreground focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.1)' }}
                    >
                      <option value="">Select Revenue Range</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-plus">$100,000+</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
                    style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Show Me My CRM Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-green-400 mr-1" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 text-green-400 mr-1" />
                      <span>Your data is secure</span>
                    </div>
                  </div>
                  
                  <a 
                    href="/contact" 
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                  >
                    Or Schedule Your Strategy Call
                    <Phone className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Risk Reversal */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center bg-card/80 backdrop-blur-sm border border-purple-500/20 rounded-lg px-6 py-3"
                   style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}>
                <Award className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-foreground font-semibold">
                  30-day money-back guarantee - see results or get every penny back
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}