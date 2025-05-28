import { motion } from "framer-motion";
import { 
  Database, BarChart3, Bot, Workflow, 
  Lock, Globe, Check, Zap 
} from "lucide-react";
import { useDevice } from "@/hooks/use-device";

export default function MobileFeatures() {
  const { isMobile, isTablet } = useDevice();

  // Only render on mobile and tablet
  if (!isMobile && !isTablet) return null;

  const features = [
    {
      icon: <Database size={24} />,
      title: "Enterprise CRM",
      description: "Comprehensive customer management with advanced segmentation and automation.",
      benefits: ["Role-based access", "Custom workflows", "Data governance"],
      color: "primary"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Advanced Analytics",
      description: "Data-driven insights with predictive modeling and executive dashboards.",
      benefits: ["Custom dashboards", "Predictive scoring", "ROI attribution"],
      color: "accent"
    },
    {
      icon: <Bot size={24} />,
      title: "AI Intelligence",
      description: "Cutting-edge AI for personalized engagement and optimization.",
      benefits: ["Natural language processing", "Behavior prediction", "Content optimization"],
      color: "secondary"
    },
    {
      icon: <Workflow size={24} />,
      title: "Workflow Automation",
      description: "Design complex workflows that connect all departments seamlessly.",
      benefits: ["Process automation", "Department coordination", "System integration"],
      color: "accent"
    },
    {
      icon: <Lock size={24} />,
      title: "Enterprise Security",
      description: "Bank-grade security with comprehensive audit logging and compliance.",
      benefits: ["SOC 2 Type II", "End-to-end encryption", "Threat protection"],
      color: "primary"
    },
    {
      icon: <Globe size={24} />,
      title: "Global Infrastructure",
      description: "Distributed architecture with regional compliance and reliability.",
      benefits: ["99.99% uptime SLA", "Global CDN", "Regional data residency"],
      color: "secondary"
    }
  ];

  return (
    <section className="py-16 px-4 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 -left-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>

      <div className="max-w-sm mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center mr-3">
              <Zap className="text-primary w-5 h-5" />
            </div>
            <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold text-foreground">
              Enterprise Features
            </h2>
          </div>
          
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto mb-4"></div>
          
          <p className="text-muted-foreground text-center">
            Fortune 500 capabilities designed for growing businesses.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Card Glow Effect */}
              <div className={`absolute inset-0 rounded-xl blur-xl opacity-20 ${
                feature.color === 'primary' ? 'bg-primary' : 
                feature.color === 'secondary' ? 'bg-secondary' : 
                'bg-accent'
              }`}></div>
              
              {/* Card Content */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-border transition-all duration-300">
                {/* Icon and Title */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${feature.color}/10 border border-${feature.color}/20`}>
                    <div className={`text-${feature.color}`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Orbitron'] text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-${feature.color}/10 flex items-center justify-center mr-3`}>
                        <Check className={`text-${feature.color} w-2.5 h-2.5`} />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Badge */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="font-['Orbitron'] text-lg font-semibold text-foreground mb-3">
              Enterprise Security & Compliance
            </h3>
            
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Fully compliant with GDPR, CCPA, HIPAA, and SOC 2 Type II standards.
            </p>
            
            <div className="grid grid-cols-4 gap-3">
              {['GDPR', 'HIPAA', 'SOC 2', 'CCPA'].map((standard, index) => (
                <motion.div
                  key={standard}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-3 bg-background/50 rounded-lg border border-border/20 flex flex-col items-center justify-center hover:bg-background/70 transition-colors"
                >
                  <div className="w-6 h-6 bg-primary/20 rounded mb-1"></div>
                  <span className="text-xs font-medium text-foreground">{standard}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}