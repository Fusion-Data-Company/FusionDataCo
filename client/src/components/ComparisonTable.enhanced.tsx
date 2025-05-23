import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

interface ComparisonFeature {
  feature: string;
  fusion: boolean | string;
  wix: boolean | string;
  godaddy: boolean | string;
  gohighlevel: boolean | string;
  category: string;
}

interface BeforeAfterToggleProps {
  beforeTitle: string;
  afterTitle: string;
  beforeFeatures: string[];
  afterFeatures: string[];
}

function BeforeAfterToggle({ beforeTitle, afterTitle, beforeFeatures, afterFeatures }: BeforeAfterToggleProps) {
  const [showBefore, setShowBefore] = useState(true);
  
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-6">
        <div className="bg-[#121218] rounded-lg p-1 border border-[#333340]">
          <Button
            variant={showBefore ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowBefore(true)}
            className={`${showBefore ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-gray-400 hover:text-white'} transition-all duration-300`}
          >
            {beforeTitle}
          </Button>
          <Button
            variant={!showBefore ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowBefore(false)}
            className={`${!showBefore ? 'bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black' : 'text-gray-400 hover:text-white'} transition-all duration-300`}
          >
            {afterTitle}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showBefore ? (
          <>
            <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                  Current Challenges
                </h3>
                <ul className="space-y-3">
                  {beforeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121218]/50 border border-gray-700/30 rounded-lg overflow-hidden relative opacity-50">
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-gray-500 flex items-center">
                  <Check className="h-5 w-5 text-gray-500 mr-2" />
                  With Fusion Data Co
                </h3>
                <p className="text-gray-500 italic">Click "After Fusion" to see the transformation</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="bg-[#121218]/50 border border-gray-700/30 rounded-lg overflow-hidden relative opacity-50">
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-gray-500 flex items-center">
                  <X className="h-5 w-5 text-gray-500 mr-2" />
                  Previous Challenges
                </h3>
                <p className="text-gray-500 italic">Problems you used to have</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <Check className="h-5 w-5 text-[#14ffc8] mr-2" />
                  With Fusion Data Co
                </h3>
                <ul className="space-y-3">
                  {afterFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="h-4 w-4 text-[#14ffc8]" />
                      </div>
                      <p className="text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default function ComparisonTable() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('core-features');

  const comparisonData: ComparisonFeature[] = [
    // Core Features
    {
      feature: "AI Content Generation",
      fusion: "✅ Built-in AI with 8+ business types",
      wix: "❌ Manual content only",
      godaddy: "❌ Basic templates",
      gohighlevel: "⚠️ Limited AI features",
      category: "core-features"
    },
    {
      feature: "CRM Integration",
      fusion: "✅ Advanced CRM with automation",
      wix: "❌ No CRM included",
      godaddy: "❌ Basic contact forms",
      gohighlevel: "✅ CRM included",
      category: "core-features"
    },
    {
      feature: "ROI Calculator",
      fusion: "✅ Interactive ROI calculator",
      wix: "❌ Not available",
      godaddy: "❌ Not available",
      gohighlevel: "❌ Not available",
      category: "core-features"
    },
    {
      feature: "Industry-Specific Funnels",
      fusion: "✅ Real Estate, Medical, Trades",
      wix: "❌ Generic templates only",
      godaddy: "❌ Basic business templates",
      gohighlevel: "⚠️ Some industry templates",
      category: "core-features"
    },
    
    // Marketing Automation
    {
      feature: "Social Media Automation",
      fusion: "✅ 2-week free trial + automation",
      wix: "❌ Manual posting only",
      godaddy: "❌ No social features",
      gohighlevel: "✅ Social media tools",
      category: "marketing"
    },
    {
      feature: "Email Marketing",
      fusion: "✅ Advanced email campaigns",
      wix: "⚠️ Basic email marketing",
      godaddy: "⚠️ Limited email tools",
      gohighlevel: "✅ Email marketing included",
      category: "marketing"
    },
    {
      feature: "Lead Nurturing",
      fusion: "✅ Automated lead nurturing",
      wix: "❌ Manual follow-up only",
      godaddy: "❌ No lead nurturing",
      gohighlevel: "✅ Lead nurturing tools",
      category: "marketing"
    },
    
    // Business Intelligence
    {
      feature: "Analytics Dashboard",
      fusion: "✅ Comprehensive analytics",
      wix: "⚠️ Basic analytics",
      godaddy: "⚠️ Limited reporting",
      gohighlevel: "✅ Advanced analytics",
      category: "analytics"
    },
    {
      feature: "Revenue Tracking",
      fusion: "✅ Detailed revenue insights",
      wix: "❌ No revenue tracking",
      godaddy: "❌ Basic sales tracking",
      gohighlevel: "✅ Revenue reporting",
      category: "analytics"
    },
    
    // Support & Implementation
    {
      feature: "Setup & Training",
      fusion: "✅ Full setup + training included",
      wix: "⚠️ Self-service setup",
      godaddy: "⚠️ Basic support",
      gohighlevel: "⚠️ Training available (extra cost)",
      category: "support"
    },
    {
      feature: "Ongoing Support",
      fusion: "✅ Dedicated support team",
      wix: "⚠️ Community support",
      godaddy: "⚠️ Email support",
      gohighlevel: "✅ Support included",
      category: "support"
    }
  ];

  const categories = [
    { id: 'core-features', name: 'Core Features', icon: '🚀' },
    { id: 'marketing', name: 'Marketing Automation', icon: '📈' },
    { id: 'analytics', name: 'Business Intelligence', icon: '📊' },
    { id: 'support', name: 'Support & Training', icon: '🤝' }
  ];

  const getStatusIcon = (status: boolean | string) => {
    if (typeof status === 'string') {
      if (status.includes('✅')) return <Check className="h-4 w-4 text-[#14ffc8]" />;
      if (status.includes('❌')) return <X className="h-4 w-4 text-red-500" />;
      if (status.includes('⚠️')) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
    return status ? <Check className="h-4 w-4 text-[#14ffc8]" /> : <X className="h-4 w-4 text-red-500" />;
  };

  const getStatusText = (status: boolean | string) => {
    if (typeof status === 'string') {
      return status.replace(/[✅❌⚠️]/g, '').trim();
    }
    return status ? 'Available' : 'Not Available';
  };

  const beforeFeatures = [
    "Spending hours creating content manually with no results",
    "Using 5+ different tools that don't work together",
    "Missing leads because you have no follow-up system",
    "Competing on price instead of value",
    "Wasting money on marketing that doesn't convert"
  ];

  const afterFeatures = [
    "AI generates professional content in seconds for your industry",
    "Everything works together in one unified platform",
    "Automated systems capture and nurture leads 24/7",
    "Professional image allows you to charge premium rates",
    "Smart marketing that actually brings in qualified customers"
  ];

  return (
    <div className="space-y-8">
      {/* Before/After Toggle Section */}
      <BeforeAfterToggle
        beforeTitle="Before Fusion"
        afterTitle="After Fusion"
        beforeFeatures={beforeFeatures}
        afterFeatures={afterFeatures}
      />

      {/* Platform Comparison Section */}
      <div className="bg-[#121218] rounded-lg border border-[#333340] overflow-hidden">
        <div className="p-6 border-b border-[#333340]">
          <h3 className="text-2xl font-bold text-white text-center mb-2">
            Platform Comparison
          </h3>
          <p className="text-gray-400 text-center">
            See how Fusion Data Co compares to other marketing platforms
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-4 bg-[#0a0a0d] border-b border-[#333340]">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={expandedCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              className={`${
                expandedCategory === category.id 
                  ? 'bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black' 
                  : 'text-gray-400 hover:text-white hover:bg-[#333340]'
              } transition-all duration-300`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              {expandedCategory === category.id ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          ))}
        </div>

        {/* Comparison Table */}
        {expandedCategory && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0d]">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-semibold">Feature</th>
                  <th className="px-4 py-3 text-center text-white font-semibold bg-[#14ffc8]/10 border-l border-r border-[#14ffc8]/30">
                    <div className="flex items-center justify-center">
                      <span className="text-[#14ffc8] font-bold">Fusion Data Co</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-gray-400 font-semibold">Wix</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-semibold">GoDaddy</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-semibold">GoHighLevel</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData
                  .filter(item => item.category === expandedCategory)
                  .map((item, index) => (
                    <tr key={index} className="border-t border-[#333340] hover:bg-[#0a0a0d]/50 transition-colors duration-200">
                      <td className="px-4 py-4 text-white font-medium">{item.feature}</td>
                      <td className="px-4 py-4 text-center bg-[#14ffc8]/5 border-l border-r border-[#14ffc8]/20">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(item.fusion)}
                          <span className="text-white text-sm">{getStatusText(item.fusion)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(item.wix)}
                          <span className="text-gray-400 text-sm">{getStatusText(item.wix)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(item.godaddy)}
                          <span className="text-gray-400 text-sm">{getStatusText(item.godaddy)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(item.gohighlevel)}
                          <span className="text-gray-400 text-sm">{getStatusText(item.gohighlevel)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CTA Section */}
        <div className="p-6 bg-[#0a0a0d] border-t border-[#333340] text-center">
          <h4 className="text-xl font-semibold text-white mb-2">
            Ready to Switch to a Platform That Actually Works?
          </h4>
          <p className="text-gray-400 mb-4">
            Join thousands of business owners who've made the smart choice
          </p>
          <Button 
            size="lg" 
            className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold px-8 py-3 shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
          >
            Start Your Free Trial Today
          </Button>
        </div>
      </div>
    </div>
  );
}