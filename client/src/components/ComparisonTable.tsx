import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Star, Zap } from "lucide-react";
import { trackEvent } from './AnalyticsTracker';

interface ComparisonFeature {
  feature: string;
  fusion: boolean | string;
  wix: boolean | string;
  godaddy: boolean | string;
  gohighlevel: boolean | string;
}

const comparisonData: ComparisonFeature[] = [
  {
    feature: "Professional Website Design",
    fusion: "Custom & Professional",
    wix: "Template-based",
    godaddy: "Basic Templates",
    gohighlevel: "Limited Templates"
  },
  {
    feature: "CRM & Lead Management",
    fusion: "Advanced with Automation",
    wix: false,
    godaddy: "Basic Contact Forms",
    gohighlevel: "Good CRM"
  },
  {
    feature: "Marketing Automation",
    fusion: "AI-Powered & Complete",
    wix: "Basic Email",
    godaddy: "Very Limited",
    gohighlevel: "Good Automation"
  },
  {
    feature: "Social Media Management",
    fusion: "Automated Daily Posts",
    wix: false,
    godaddy: false,
    gohighlevel: "Manual Setup"
  },
  {
    feature: "SEO Optimization",
    fusion: "Professional & Ongoing",
    wix: "Basic SEO Tools",
    godaddy: "Limited SEO",
    gohighlevel: "Basic SEO"
  },
  {
    feature: "24/7 Support",
    fusion: "Live Human Support",
    wix: "Help Center Only",
    godaddy: "Limited Hours",
    gohighlevel: "Business Hours"
  },
  {
    feature: "Mobile Optimization",
    fusion: "Perfect Mobile Experience",
    wix: "Responsive Templates",
    godaddy: "Basic Mobile",
    gohighlevel: "Mobile Responsive"
  },
  {
    feature: "Analytics & Reporting",
    fusion: "Advanced ROI Tracking",
    wix: "Basic Analytics",
    godaddy: "Very Basic",
    gohighlevel: "Good Reporting"
  },
  {
    feature: "Monthly Cost",
    fusion: "$299-$1,199/month",
    wix: "$23-$49/month",
    godaddy: "$10-$25/month",
    gohighlevel: "$97-$297/month"
  },
  {
    feature: "Setup Time",
    fusion: "7 days (Done for You)",
    wix: "Weeks (DIY)",
    godaddy: "Weeks (DIY)",
    gohighlevel: "Months (Complex)"
  }
];

interface BeforeAfterToggleProps {
  beforeTitle: string;
  afterTitle: string;
  beforeFeatures: string[];
  afterFeatures: string[];
}

function BeforeAfterToggle({ beforeTitle, afterTitle, beforeFeatures, afterFeatures }: BeforeAfterToggleProps) {
  const [showAfter, setShowAfter] = useState(false);

  const handleToggle = (checked: boolean) => {
    setShowAfter(checked);
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: checked ? 'view_after_fusion' : 'view_before_fusion'
    });
  };

  return (
    <Card className="bg-[#121218]/90 border border-[#333340] overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">Your Business Transformation</CardTitle>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${!showAfter ? 'text-red-400 font-medium' : 'text-gray-400'}`}>
              Before
            </span>
            <Switch
              checked={showAfter}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-[#14ffc8]"
            />
            <span className={`text-sm ${showAfter ? 'text-[#14ffc8] font-medium' : 'text-gray-400'}`}>
              After
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[400px] transition-all duration-500">
          {!showAfter ? (
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
                  <X className="h-5 w-5 mr-2" />
                  {beforeTitle}
                </h3>
                <ul className="space-y-3">
                  {beforeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#14ffc8] mb-4 flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  {afterTitle}
                </h3>
                <ul className="space-y-3">
                  {afterFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ComparisonTable() {
  const [highlightFusion, setHighlightFusion] = useState(true);

  const renderFeatureValue = (value: boolean | string, isHighlighted: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-[#14ffc8]" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      );
    }
    return (
      <span className={`text-sm ${isHighlighted ? 'text-[#14ffc8] font-medium' : 'text-gray-300'}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Comparison Table */}
      <Card className="bg-[#121218]/90 border border-[#333340] overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Star className="h-5 w-5 mr-2 text-[#14ffc8]" />
            Platform Comparison
          </CardTitle>
          <CardDescription>
            See how Fusion Data Co compares to other popular platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#333340]">
                  <th className="text-left py-3 px-4 text-white font-medium">Feature</th>
                  <th className="text-center py-3 px-4">
                    <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-2">
                      <div className="text-[#14ffc8] font-semibold flex items-center justify-center">
                        <Zap className="h-4 w-4 mr-1" />
                        Fusion Data Co
                      </div>
                      <Badge className="bg-[#14ffc8]/20 text-[#14ffc8] border-[#14ffc8]/30 mt-1" variant="outline">
                        Recommended
                      </Badge>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Wix</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">GoDaddy</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">GoHighLevel</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-[#333340]/50 hover:bg-[#0a0a0d]/50">
                    <td className="py-4 px-4 text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {renderFeatureValue(row.fusion, true)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderFeatureValue(row.wix)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderFeatureValue(row.godaddy)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderFeatureValue(row.gohighlevel)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4">
            <p className="text-center text-gray-300">
              <span className="text-[#14ffc8] font-semibold">Bottom Line:</span> Other platforms make you do the work. 
              We do the work for you while delivering enterprise-level results at a fraction of the cost.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Before/After Toggle */}
      <BeforeAfterToggle
        beforeTitle="How Your Marketing Looks Now"
        afterTitle="After Fusion Data Co"
        beforeFeatures={[
          "Outdated website that embarrasses you in front of prospects",
          "Social media pages that haven't been updated in months",
          "Lead follow-up that depends on your memory and sticky notes",
          "No system to track which marketing efforts actually work",
          "Prospects judge your professionalism by your online presence",
          "You spend more time on tech issues than serving customers"
        ]}
        afterFeatures={[
          "Professional website that converts visitors into paying customers",
          "Consistent, engaging social media that builds authority",
          "Automated lead nurturing that follows up instantly",
          "Clear analytics showing exactly what drives revenue",
          "Marketing that positions you as the obvious choice",
          "Technology that works seamlessly while you focus on your business"
        ]}
      />
    </div>
  );
}