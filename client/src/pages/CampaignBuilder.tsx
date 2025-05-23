import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRightCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ImageIcon,
  Calendar,
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { apiRequest } from "@/lib/queryClient";
import { AVAILABLE_MODELS } from "@/lib/openRouter";

interface CampaignFormData {
  goal: string;
  businessType: string;
  platforms: string[];
  tone: string;
  additionalContext: string;
  model: string;
  scheduledDates: Record<string, string>;
}

interface GeneratedCaption {
  platform: string;
  content: string;
}

export default function CampaignBuilder() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    goal: "",
    businessType: "",
    platforms: [],
    tone: "Professional",
    additionalContext: "",
    model: "anthropic/claude-3-opus:beta",
    scheduledDates: {}
  });
  const [generatedCaptions, setGeneratedCaptions] = useState<Record<string, string>>({});

  const goals = [
    { value: "Promote", label: "Promote Products or Services" },
    { value: "Announce", label: "Announce News or Events" },
    { value: "Celebrate", label: "Celebrate Milestones" },
    { value: "Educate", label: "Educate Your Audience" },
    { value: "Sell", label: "Drive Sales or Conversions" }
  ];

  const businessTypes = [
    { value: "Real Estate", label: "Real Estate" },
    { value: "Medical", label: "Medical" },
    { value: "Home Services", label: "Home Services" },
    { value: "Retail", label: "Retail" },
    { value: "Coaching", label: "Business Coaching" },
    { value: "Restaurant", label: "Restaurant" },
    { value: "Technology", label: "Technology" },
    { value: "Legal", label: "Legal Services" },
    { value: "Fitness", label: "Fitness & Wellness" },
    { value: "Financial", label: "Financial Services" },
    { value: "Nonprofit", label: "Nonprofit" },
    { value: "Other", label: "Other" }
  ];

  const platforms = [
    { value: "Facebook", label: "Facebook", icon: <Facebook className="w-5 h-5 text-[#1877f2]" /> },
    { value: "Instagram", label: "Instagram", icon: <Instagram className="w-5 h-5 text-[#c13584]" /> },
    { value: "Twitter", label: "X (Twitter)", icon: <Twitter className="w-5 h-5 text-[#1da1f2]" /> },
    { value: "LinkedIn", label: "LinkedIn", icon: <Linkedin className="w-5 h-5 text-[#0077b5]" /> }
  ];

  const tones = [
    { value: "Professional", label: "Professional" },
    { value: "Friendly", label: "Friendly" },
    { value: "Funny", label: "Funny" },
    { value: "Minimalist", label: "Minimalist" },
    { value: "Aggressive", label: "Aggressive" }
  ];

  const nextStep = () => {
    if (step === 1 && !formData.goal) {
      toast({
        title: "Please select a goal",
        description: "Choose a campaign goal to continue",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && !formData.businessType) {
      toast({
        title: "Please select a business type",
        description: "Choose your business type to continue",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 3 && formData.platforms.length === 0) {
      toast({
        title: "Please select at least one platform",
        description: "Choose at least one social media platform to continue",
        variant: "destructive"
      });
      return;
    }
    
    // If moving from step 4 to 5, generate captions
    if (step === 4) {
      generateCaptions();
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePlatformToggle = (platform: string) => {
    if (formData.platforms.includes(platform)) {
      setFormData({
        ...formData,
        platforms: formData.platforms.filter(p => p !== platform)
      });
    } else {
      setFormData({
        ...formData,
        platforms: [...formData.platforms, platform]
      });
    }
  };

  const generateCaptions = async () => {
    try {
      setLoading(true);
      
      const response = await apiRequest("/api/marketing/generate-captions", {
        method: "POST",
        body: JSON.stringify({
          goal: formData.goal,
          businessType: formData.businessType,
          platforms: formData.platforms,
          tone: formData.tone,
          additionalContext: formData.additionalContext,
          model: formData.model
        }),
      });
      
      const data = await response.json();
      setGeneratedCaptions(data.captions);
      
      // Initialize scheduled dates for each platform
      const dates: Record<string, string> = {};
      formData.platforms.forEach(platform => {
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dates[platform] = tomorrow.toISOString().split('T')[0];
      });
      
      setFormData({
        ...formData,
        scheduledDates: dates
      });
      
      toast({
        title: "Captions generated!",
        description: "AI has created content for your campaign",
      });
    } catch (error) {
      console.error("Error generating captions:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your captions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    try {
      setLoading(true);
      
      // Create campaign data payload
      const campaignData = {
        title: `${formData.goal} Campaign for ${formData.businessType}`,
        goal: formData.goal,
        businessType: formData.businessType,
        status: "Scheduled",
        posts: formData.platforms.map(platform => ({
          platform,
          content: generatedCaptions[platform],
          scheduledDate: new Date(formData.scheduledDates[platform]).toISOString(),
          tone: formData.tone,
          status: "Scheduled"
        }))
      };
      
      // Submit to API
      await apiRequest("/api/marketing/campaigns", {
        method: "POST",
        body: JSON.stringify(campaignData),
      });
      
      toast({
        title: "Campaign scheduled!",
        description: "Your social media posts have been scheduled successfully.",
      });
      
      // Redirect to campaigns dashboard
      window.location.href = "/crm/campaigns";
    } catch (error) {
      console.error("Error scheduling campaign:", error);
      toast({
        title: "Scheduling failed",
        description: "There was an error scheduling your campaign. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCaption = (platform: string, content: string) => {
    setGeneratedCaptions({
      ...generatedCaptions,
      [platform]: content
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">What's the goal of your campaign?</h2>
            <div className="grid gap-4">
              {goals.map((goal) => (
                <div
                  key={goal.value}
                  className={`p-4 rounded-lg border ${
                    formData.goal === goal.value
                      ? "border-[#14ffc8] bg-[#14ffc8]/10"
                      : "border-gray-700 hover:border-gray-500"
                  } cursor-pointer transition-all duration-200`}
                  onClick={() => setFormData({ ...formData, goal: goal.value })}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center 
                      ${formData.goal === goal.value ? "bg-[#14ffc8]" : "bg-gray-800"}`}>
                      {formData.goal === goal.value && <CheckCircle2 className="h-5 w-5 text-black" />}
                    </div>
                    <span className="text-lg font-medium">{goal.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Select your business type</h2>
            <Select
              value={formData.businessType}
              onValueChange={(value) => setFormData({ ...formData, businessType: value })}
            >
              <SelectTrigger className="w-full bg-[#121218] border-gray-700 h-14">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent className="bg-[#121218] border-gray-700">
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {formData.businessType === "Other" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Specify your business type
                </label>
                <Input 
                  className="bg-[#121218] border-gray-700"
                  placeholder="Enter your business type"
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                />
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Choose your platforms</h2>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.value}
                  className={`p-4 rounded-lg border ${
                    formData.platforms.includes(platform.value)
                      ? "border-[#14ffc8] bg-[#14ffc8]/10"
                      : "border-gray-700 hover:border-gray-500"
                  } cursor-pointer transition-all duration-200`}
                  onClick={() => handlePlatformToggle(platform.value)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center 
                      ${formData.platforms.includes(platform.value) ? "bg-[#14ffc8]" : "bg-gray-800"}`}>
                      {formData.platforms.includes(platform.value) && <CheckCircle2 className="h-5 w-5 text-black" />}
                    </div>
                    <div className="flex items-center gap-2">
                      {platform.icon}
                      <span className="text-lg font-medium">{platform.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Customize your campaign</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Choose Tone
                </label>
                <RadioGroup 
                  value={formData.tone} 
                  onValueChange={(value) => setFormData({ ...formData, tone: value })}
                  className="grid grid-cols-5 gap-2"
                >
                  {tones.map((tone) => (
                    <div key={tone.value}>
                      <RadioGroupItem
                        value={tone.value}
                        id={`tone-${tone.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`tone-${tone.value}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-[#121218] p-4 hover:border-gray-500 peer-data-[state=checked]:border-[#14ffc8] peer-data-[state=checked]:bg-[#14ffc8]/10 cursor-pointer"
                      >
                        <span className="text-sm font-medium">{tone.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Additional Context (Optional)
                </label>
                <Textarea
                  placeholder="Add any specific information about your campaign, products, or services that will help generate better content..."
                  value={formData.additionalContext}
                  onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                  className="min-h-[120px] bg-[#121218] border-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Select AI Model
                </label>
                <Select
                  value={formData.model}
                  onValueChange={(value) => setFormData({ ...formData, model: value })}
                >
                  <SelectTrigger className="w-full bg-[#121218] border-gray-700">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121218] border-gray-700">
                    {AVAILABLE_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name} ({model.provider})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Different models have different strengths. Opus is most powerful but slower.
                </p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={generateCaptions}
                  className="w-full py-6 bg-[#ff0aff] hover:bg-[#ff0aff]/90 text-black font-semibold rounded-md text-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,10,255,0.3)] hover:shadow-[0_0_20px_rgba(255,10,255,0.5)] transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>Generating Captions...</>
                  ) : (
                    <>
                      Generate Captions
                      <ArrowRightCircle className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Review & Schedule Your Campaign</h2>
            
            <Tabs defaultValue={formData.platforms[0]} className="w-full">
              <TabsList className="w-full bg-[#121218]">
                {formData.platforms.map((platform) => (
                  <TabsTrigger 
                    key={platform} 
                    value={platform}
                    className="flex-1 data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black"
                  >
                    {platform}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {formData.platforms.map((platform) => (
                <TabsContent key={platform} value={platform} className="mt-6">
                  <Card className="bg-[#121218]/90 border border-gray-700">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-5 gap-6">
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Caption
                          </label>
                          <Textarea
                            value={generatedCaptions[platform] || ""}
                            onChange={(e) => updateCaption(platform, e.target.value)}
                            className="min-h-[200px] bg-[#0a0a0d] border-gray-700"
                          />
                          
                          <div className="mt-4 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => generateCaptions()}
                              className="text-xs flex items-center gap-1"
                            >
                              Regenerate
                            </Button>
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-2">
                                Schedule Date
                              </label>
                              <Input
                                type="date"
                                value={formData.scheduledDates[platform] || ""}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  scheduledDates: {
                                    ...formData.scheduledDates,
                                    [platform]: e.target.value
                                  }
                                })}
                                className="bg-[#0a0a0d] border-gray-700"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-2">
                                Preview
                              </label>
                              <div className="border border-gray-700 rounded-md p-4 bg-[#0a0a0d] overflow-hidden">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                                  <div>
                                    <p className="text-sm font-medium">Your Business</p>
                                    <p className="text-xs text-gray-500">@yourbusiness</p>
                                  </div>
                                </div>
                                <p className="text-sm mb-3 whitespace-pre-wrap">
                                  {generatedCaptions[platform] || "Your caption will appear here"}
                                </p>
                                <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center mb-3">
                                  <ImageIcon className="h-8 w-8 text-gray-600" />
                                </div>
                                <div className="flex justify-between text-gray-500 text-xs">
                                  <span>❤️ 0</span>
                                  <span>🔄 0</span>
                                  <span>💬 0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={handleSchedule}
                className="py-6 px-8 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>Scheduling Posts...</>
                ) : (
                  <>
                    Schedule Posts
                    <Calendar className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const stepTitles = [
    "Campaign Goal",
    "Business Type",
    "Platforms",
    "Customization",
    "Schedule"
  ];

  return (
    <>
      <Helmet>
        <title>AI Social Campaign Builder | Fusion Data Co</title>
        <meta name="description" content="Create, customize, and schedule AI-generated social media campaigns for your business with our powerful campaign builder tool." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12">
                <h1 className="font-['Orbitron'] text-4xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#14ffc8] to-[#ff0aff]">
                  AI Social Campaign Builder
                </h1>
                <p className="text-xl text-gray-400 text-center">
                  Create engaging social media content tailored to your brand and goals
                </p>
              </div>
              
              {/* Progress Steps */}
              <div className="relative mb-12">
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1 bg-gray-700"></div>
                <div 
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 bg-gradient-to-r from-[#14ffc8] to-[#ff0aff] transition-all duration-300"
                  style={{ width: `${(step / stepTitles.length) * 100}%` }}
                ></div>
                <div className="relative flex justify-between">
                  {stepTitles.map((title, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                          ${index + 1 < step 
                            ? "bg-[#14ffc8] text-black" 
                            : index + 1 === step 
                              ? "bg-[#ff0aff] text-black" 
                              : "bg-gray-700 text-gray-400"}`}
                      >
                        {index + 1 < step ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-xs mt-2 ${index + 1 <= step ? "text-white" : "text-gray-500"}`}>
                        {title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Step Content */}
              <div className="bg-[#0c0c14] border border-gray-800 rounded-lg p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                {renderStepContent()}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button 
                    onClick={prevStep} 
                    variant="outline" 
                    className="flex items-center gap-2 border-gray-600"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                )}
                {step < 5 && (
                  <Button 
                    onClick={nextStep} 
                    className={`ml-auto flex items-center gap-2 ${
                      step === 4 
                        ? "bg-[#ff0aff] hover:bg-[#ff0aff]/90" 
                        : "bg-[#14ffc8] hover:bg-[#14ffc8]/90"
                    } text-black`}
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}