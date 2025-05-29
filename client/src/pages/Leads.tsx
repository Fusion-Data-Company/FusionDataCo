import { useState } from "react";
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import { 
  Target, Phone, Mail, Users, TrendingUp, Zap,
  AlertTriangle, CheckCircle, ArrowRight, Star, Award,
  BarChart3, Globe, Lock, Lightbulb, Heart, Database,
  MessageSquare, Headphones, Bot, Search, Filter, Eye
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackEvent } from "@/components/AnalyticsTracker";

export default function Leads() {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    leadType: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent({
      category: 'lead_generation',
      action: 'submit',
      label: 'lead_generation_form'
    });
    
    console.log('Lead generation form submitted:', formData);
    alert('Thank you! We\'ll contact you within 24 hours to discuss your lead generation strategy.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Elite Lead Generation Services - Fusion Data Co</title>
        <meta name="description" content="Advanced lead generation services with verified email lists, phone lists, AI voice calls, and ringless voicemail drops. Turn prospects into customers." />
        <meta name="keywords" content="lead generation, email lists, phone lists, AI voice calls, ringless voicemail, B2B leads, sales prospects" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-['Orbitron'] font-bold mb-6"
              >
                <span className="text-foreground">Elite Lead</span>{" "}
                <span className="text-primary">Generation</span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              >
                Transform prospects into customers with precision-targeted lead generation. 
                Advanced technology meets proven strategies for maximum conversion.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-gradient-to-b from-red-950/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground">
                  Lead Generation <span className="text-red-400">Challenges</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Most businesses struggle with these critical lead generation problems
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <AlertTriangle className="text-red-400" size={40} />,
                    title: "Low-Quality Leads",
                    description: "Wasting time and money on unverified contacts that never convert"
                  },
                  {
                    icon: <Target className="text-red-400" size={40} />,
                    title: "Poor Targeting",
                    description: "Reaching the wrong audience with generic messaging that gets ignored"
                  },
                  {
                    icon: <TrendingUp className="text-red-400" size={40} />,
                    title: "Inconsistent Results",
                    description: "Unpredictable lead flow making it impossible to scale your business"
                  },
                  {
                    icon: <Phone className="text-red-400" size={40} />,
                    title: "Manual Outreach",
                    description: "Spending countless hours on manual calling and emailing with poor results"
                  },
                  {
                    icon: <BarChart3 className="text-red-400" size={40} />,
                    title: "No Analytics",
                    description: "Flying blind without data to optimize your lead generation campaigns"
                  },
                  {
                    icon: <Users className="text-red-400" size={40} />,
                    title: "Limited Scale",
                    description: "Unable to reach enough prospects to grow your business effectively"
                  }
                ].map((pain, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300"
                  >
                    <div className="mb-4">{pain.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{pain.title}</h3>
                    <p className="text-muted-foreground">{pain.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-gradient-to-b from-background to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground">
                  Our <span className="text-primary">Lead Generation</span> Methods
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive lead generation solutions using cutting-edge technology and proven strategies
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    icon: <Mail className="text-blue-400" size={40} />,
                    title: "Verified Email Lists",
                    description: "Rigorously verified email databases with high deliverability rates",
                    details: "Multiple verification sources ensure accuracy and engagement"
                  },
                  {
                    icon: <Phone className="text-green-400" size={40} />,
                    title: "Validated Phone Lists", 
                    description: "Accurate phone numbers collected through advanced skip-tracing",
                    details: "Direct communication channels for immediate engagement"
                  },
                  {
                    icon: <MessageSquare className="text-purple-400" size={40} />,
                    title: "Ringless Voicemail Drops",
                    description: "Non-intrusive voicemail delivery with professional content creation",
                    details: "High response rates without disrupting prospects"
                  },
                  {
                    icon: <Bot className="text-cyan-400" size={40} />,
                    title: "AI Voice Calls",
                    description: "Personalized AI-driven conversations at scale using advanced voice synthesis",
                    details: "Natural human-like interactions for effective lead qualification"
                  },
                  {
                    icon: <Headphones className="text-orange-400" size={40} />,
                    title: "Live Caller Services",
                    description: "Professional human callers with extensive training and real-time monitoring",
                    details: "Human touch for nuanced engagement and high-level qualification"
                  },
                  {
                    icon: <Globe className="text-red-400" size={40} />,
                    title: "Real Estate Acquisition Leads",
                    description: "Premium validated leads for high-value real estate transactions",
                    details: "Motivated sellers and qualified buyers through extensive research"
                  }
                ].map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300"
                  >
                    <div className="mb-4">{method.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{method.title}</h3>
                    <p className="text-muted-foreground mb-3">{method.description}</p>
                    <p className="text-sm text-blue-400">{method.details}</p>
                  </motion.div>
                ))}
              </div>

              {/* Advanced Techniques */}
              <div className="bg-gradient-to-br from-blue-950/30 to-purple-950/20 border border-blue-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Advanced Lead Generation Techniques</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Search className="text-blue-400" size={30} />,
                      title: "Niche Market Targeting",
                      description: "Specialized targeting in unique markets using advanced web scraping and proprietary data sources"
                    },
                    {
                      icon: <Filter className="text-green-400" size={30} />,
                      title: "Skip-Tracing",
                      description: "Database cross-referencing and social media analysis to locate and validate contact information"
                    },
                    {
                      icon: <Eye className="text-purple-400" size={30} />,
                      title: "Analytics & Reporting",
                      description: "Detailed data-driven insights with engagement rates, conversion tracking, and ROI assessment"
                    }
                  ].map((technique, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-4 flex justify-center">{technique.icon}</div>
                      <h4 className="text-lg font-bold mb-2 text-foreground">{technique.title}</h4>
                      <p className="text-sm text-muted-foreground">{technique.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-gradient-to-b from-green-950/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground">
                  Why Choose <span className="text-green-400">Fusion Data Co</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Elite technology-driven approach delivering unmatched results for SMEs
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <CheckCircle className="text-green-400" size={40} />,
                    title: "Precision Targeting",
                    description: "Advanced algorithms identify your ideal prospects with laser accuracy"
                  },
                  {
                    icon: <Zap className="text-yellow-400" size={40} />,
                    title: "Scalable Technology",
                    description: "AI-powered systems that grow with your business needs"
                  },
                  {
                    icon: <Award className="text-purple-400" size={40} />,
                    title: "Proven Results",
                    description: "Track record of delivering measurable ROI for our clients"
                  },
                  {
                    icon: <Lock className="text-blue-400" size={40} />,
                    title: "Data Security",
                    description: "Enterprise-grade security protecting your business information"
                  },
                  {
                    icon: <Heart className="text-red-400" size={40} />,
                    title: "Dedicated Support",
                    description: "Expert team providing ongoing optimization and strategic guidance"
                  },
                  {
                    icon: <Lightbulb className="text-cyan-400" size={40} />,
                    title: "Innovation",
                    description: "Cutting-edge techniques keeping you ahead of the competition"
                  }
                ].map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300"
                  >
                    <div className="mb-4">{solution.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Pricing */}
        <section className="py-16 bg-gradient-to-b from-background to-slate-950/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground">
                  Lead Generation <span className="text-primary">Pricing</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Competitive rates for high-quality, verified leads that convert
                </p>
              </motion.div>

              <div className="overflow-x-auto">
                <table className="w-full bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-foreground font-bold">Lead Type</th>
                      <th className="px-6 py-4 text-left text-foreground font-bold">Pricing</th>
                      <th className="px-6 py-4 text-left text-foreground font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {[
                      {
                        type: "Email Lists",
                        pricing: "From $150 per 1,000 leads",
                        description: "Verified B2B/B2C email contacts"
                      },
                      {
                        type: "Phone Lists", 
                        pricing: "From $200 per 1,000 leads",
                        description: "Validated phone contacts, business or consumer"
                      },
                      {
                        type: "Combined Lists",
                        pricing: "From $250 per 1,000 leads", 
                        description: "Fully verified contacts with emails and phone numbers"
                      },
                      {
                        type: "Ringless Voicemail Drops",
                        pricing: "$159 per 1,000 drops",
                        description: "Fully managed campaigns including content creation, deployment, and analytics"
                      },
                      {
                        type: "AI Voice Calls",
                        pricing: "From $0.25 per call",
                        description: "AI-driven personalized outbound calling campaigns"
                      },
                      {
                        type: "Live Caller Services",
                        pricing: "From $25/hour per agent",
                        description: "Managed outbound calling services, with domestic and offshore options available"
                      },
                      {
                        type: "Real Estate Acquisition Leads",
                        pricing: "From $50 per lead",
                        description: "Premium, validated leads for high-value transactions"
                      }
                    ].map((item, index) => (
                      <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 text-foreground font-medium">{item.type}</td>
                        <td className="px-6 py-4 text-primary font-bold">{item.pricing}</td>
                        <td className="px-6 py-4 text-muted-foreground">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section className="py-16 bg-gradient-to-b from-primary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6 text-foreground">
                  Ready to Generate <span className="text-primary">Quality Leads</span>?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Get started with our expert lead generation services. Let's discuss your specific needs and create a custom strategy.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-slate-700/50 rounded-xl p-8"
              >
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-2">
                        Business Name
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                        placeholder="Your business name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="leadType" className="block text-sm font-medium text-foreground mb-2">
                      Lead Type Needed
                    </label>
                    <select
                      id="leadType"
                      value={formData.leadType}
                      onChange={(e) => handleInputChange('leadType', e.target.value)}
                      className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                      required
                    >
                      <option value="">Select lead type</option>
                      <option value="email">Email Lists</option>
                      <option value="phone">Phone Lists</option>
                      <option value="combined">Combined Lists</option>
                      <option value="voicemail">Ringless Voicemail Drops</option>
                      <option value="ai-calls">AI Voice Calls</option>
                      <option value="live-calls">Live Caller Services</option>
                      <option value="real-estate">Real Estate Acquisition Leads</option>
                      <option value="custom">Custom Solution</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    Get My Custom Lead Generation Strategy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                      Free consultation
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                      Custom strategy
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                      24-hour response
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}