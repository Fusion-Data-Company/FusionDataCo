import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Wand2, Calendar, MessageSquare, Mail, Globe, RefreshCw, Copy, Check, Brain } from "lucide-react";
import { trackEvent } from './AnalyticsTracker';

interface ContentExample {
  socialPost: string;
  emailSubject: string;
  emailContent: string;
  blogTitle: string;
  adCopy: string;
  websiteCopy: string;
}

interface BusinessType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const businessTypes: BusinessType[] = [
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  { id: 'salon', name: 'Hair Salon', icon: '💇', color: 'bg-pink-500/10 text-pink-500 border-pink-500/20' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: 'dental', name: 'Dental Office', icon: '🦷', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
  { id: 'fitness', name: 'Fitness Studio', icon: '💪', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  { id: 'legal', name: 'Law Firm', icon: '⚖️', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  { id: 'realestate', name: 'Real Estate', icon: '🏠', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  { id: 'automotive', name: 'Auto Repair', icon: '🚗', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
];

const contentExamples: Record<string, ContentExample> = {
  restaurant: {
    socialPost: "🍽️ Fresh ingredients, bold flavors, unforgettable experiences. Tonight's special: Pan-seared salmon with lemon herb risotto. Book your table now! #FreshDining #LocalFavorites",
    emailSubject: "Your Table Awaits: This Week's Chef Specials Inside",
    emailContent: "Dear Food Lover,\n\nChef Martinez has crafted something extraordinary for you this week. Our farm-to-table specials feature locally sourced ingredients that capture the essence of the season.\n\nTonight's Featured Dish:\n🐟 Pan-Seared Atlantic Salmon\n🌿 Lemon Herb Risotto\n🥕 Roasted Seasonal Vegetables\n\nReserve your table by calling (555) 123-4567 or book online.",
    blogTitle: "The Art of Farm-to-Table: How We Source Our Ingredients",
    adCopy: "Taste the Difference Fresh Makes. Award-winning chef, locally sourced ingredients, unforgettable dining experience. Book your table today!",
    websiteCopy: "Welcome to [Restaurant Name], where culinary artistry meets warm hospitality. Our award-winning chef creates memorable dining experiences using the finest locally-sourced ingredients."
  },
  salon: {
    socialPost: "✨ New Year, New You! Book your transformation with our expert stylists. Color, cut, and style packages starting at $99. DM us for availability! #HairGoals #NewYearNewLook",
    emailSubject: "Your Perfect Hair Day Awaits - Special Offer Inside",
    emailContent: "Beautiful,\n\nReady for a fresh new look? Our master stylists are here to help you discover your most confident self.\n\nThis Month's Special:\n💇‍♀️ Cut + Color + Style Package\n✨ Includes consultation & aftercare products\n🎁 Save $40 (reg. $139, now $99)\n\nBook your appointment today - spots fill quickly!",
    blogTitle: "Spring Hair Trends: 5 Looks That Will Transform Your Style",
    adCopy: "Discover Your Most Beautiful Self. Expert stylists, premium products, personalized service. Book your consultation today!",
    websiteCopy: "Transform your look with [Salon Name]'s expert stylists. We specialize in cuts, color, and treatments that enhance your natural beauty and fit your lifestyle."
  },
  plumbing: {
    socialPost: "🔧 Emergency plumbing? We're here 24/7! Burst pipes, clogged drains, water heater issues - we fix it all. Licensed, insured, and locally trusted. Call now: (555) PLUMBER",
    emailSubject: "Prevent Costly Water Damage - Spring Plumbing Checklist",
    emailContent: "Hello Homeowner,\n\nSpring is the perfect time to check your plumbing before small issues become expensive problems.\n\nFree Spring Inspection Includes:\n🔍 Water pressure check\n🚰 Leak detection\n🔧 Pipe condition assessment\n💧 Water heater efficiency test\n\nSchedule your free inspection this month and save on any needed repairs.",
    blogTitle: "5 Warning Signs Your Water Heater Needs Professional Attention",
    adCopy: "Fast, Reliable Plumbing Solutions. 24/7 emergency service, licensed professionals, upfront pricing. Call now for immediate help!",
    websiteCopy: "When plumbing problems strike, [Company Name] delivers fast, professional solutions. Our licensed plumbers are available 24/7 for emergencies and scheduled maintenance."
  },
  dental: {
    socialPost: "😁 Your smile is our specialty! New patient special: comprehensive exam, cleaning & X-rays for just $99. Advanced technology, gentle care. Schedule today! #HealthySmiles",
    emailSubject: "It's Time for Your Smile Check-Up - Special Pricing Inside",
    emailContent: "Dear Patient,\n\nYour oral health is the foundation of your overall wellness. Our gentle, modern approach makes dental care comfortable and effective.\n\nNew Patient Special:\n🦷 Comprehensive exam\n✨ Professional cleaning\n📸 Digital X-rays\n🎁 All for just $99 (reg. $289)\n\nOur state-of-the-art facility and caring team make every visit pleasant.",
    blogTitle: "The Connection Between Oral Health and Overall Wellness",
    adCopy: "Gentle Dental Care You Can Trust. Modern technology, comfortable environment, experienced team. New patient special - exam, cleaning & X-rays $99!",
    websiteCopy: "[Practice Name] provides comprehensive dental care in a comfortable, modern environment. Our experienced team uses advanced technology to ensure optimal oral health."
  },
  fitness: {
    socialPost: "💪 Ready to crush your goals? Join our fitness family! Small group training, personalized programs, supportive community. First week FREE! #FitnessGoals #StrongTogether",
    emailSubject: "Your Strongest Self is One Workout Away",
    emailContent: "Future Fit You,\n\nEvery journey begins with a single step. At [Studio Name], we make that step exciting, supportive, and effective.\n\nWhat You Get:\n🏋️‍♀️ Personal fitness assessment\n👥 Small group training sessions\n📱 Custom workout plans\n🎯 Goal tracking & accountability\n\nTry us FREE for one week - no strings attached!",
    blogTitle: "Why Small Group Training Gets Better Results Than Solo Workouts",
    adCopy: "Transform Your Body, Transform Your Life. Small group training, expert coaching, proven results. First week FREE - start today!",
    websiteCopy: "Achieve your fitness goals with [Studio Name]'s personalized approach. Our expert trainers and supportive community help you build strength, confidence, and lasting habits."
  },
  legal: {
    socialPost: "⚖️ Protecting your rights, securing your future. Free consultation for personal injury, family law, and business matters. Experienced attorneys, personalized service. Call today.",
    emailSubject: "Legal Questions? Get Expert Answers - Free Consultation",
    emailContent: "Dear Community Member,\n\nLife's legal challenges don't wait for convenient times. When you need experienced guidance, we're here to help protect your rights and interests.\n\nFree Consultation Available For:\n⚖️ Personal injury claims\n🏠 Real estate transactions\n👨‍👩‍👧‍👦 Family law matters\n🏢 Business legal needs\n\nCall today to discuss your situation with no obligation.",
    blogTitle: "Understanding Your Rights: When Do You Need Legal Representation?",
    adCopy: "Experienced Legal Advocates. Protecting your rights with personalized attention and proven results. Free consultation - call today!",
    websiteCopy: "[Firm Name] provides experienced legal representation with a personal touch. We protect your rights and interests across personal injury, family law, and business matters."
  },
  realestate: {
    socialPost: "🏠 Dream home or perfect investment? I make real estate dreams reality! Local market expert, proven negotiator, white-glove service. Let's find your next property! #RealEstate",
    emailSubject: "Your Dream Home is Waiting - Market Update Inside",
    emailContent: "Dear Future Homeowner,\n\nThe real estate market is full of opportunities for those who know where to look. As your local expert, I'll guide you to the perfect property.\n\nThis Month's Market Highlights:\n🏠 Inventory increasing in family neighborhoods\n💰 Interest rates stabilizing\n📈 Great time for first-time buyers\n🔍 Hidden gems in emerging areas\n\nReady to explore your options?",
    blogTitle: "First-Time Home Buyer's Guide: 7 Steps to Success",
    adCopy: "Your Real Estate Dreams, Our Expertise. Local market knowledge, expert negotiation, personalized service. Let's find your perfect property!",
    websiteCopy: "Whether buying, selling, or investing, [Agent Name] delivers exceptional real estate service. Local expertise, proven results, and personalized attention for every client."
  },
  automotive: {
    socialPost: "🚗 Keep your car running smooth! Expert auto repair, honest pricing, quick turnaround. From oil changes to engine rebuilds - we do it all. ASE certified technicians.",
    emailSubject: "Don't Let Car Problems Ruin Your Day - We're Here to Help",
    emailContent: "Fellow Driver,\n\nYour car keeps you moving - let us keep your car running perfectly. Our ASE-certified technicians provide honest, expert service you can trust.\n\nServices We Provide:\n🔧 Routine maintenance\n🚙 Engine diagnostics & repair\n🛞 Brake & tire service\n❄️ A/C & heating systems\n⚡ Electrical troubleshooting\n\nSchedule your service today and drive with confidence.",
    blogTitle: "5 Warning Signs Your Car Needs Immediate Attention",
    adCopy: "Honest Auto Repair You Can Trust. ASE-certified technicians, upfront pricing, quality parts. Keep your car running perfectly!",
    websiteCopy: "[Shop Name] provides honest, expert automotive service. Our ASE-certified technicians use quality parts and transparent pricing to keep your vehicle running safely."
  }
};

export default function AIContentDemo() {
  const [selectedBusiness, setSelectedBusiness] = useState<string>('restaurant');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [aiContent, setAiContent] = useState<ContentExample | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('anthropic/claude-3-sonnet:beta');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationCount(prev => prev + 1);
    
    // Track the AI content generation event
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'ai_content_demo_generated',
      value: generationCount + 1
    });
    
    try {
      const response = await fetch('/api/ai-content-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessType: businessTypes.find(b => b.id === selectedBusiness)?.name || selectedBusiness,
          model: selectedModel
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      if (data.success && data.content) {
        setAiContent(data.content);
      }
    } catch (error) {
      console.error('Error generating AI content:', error);
      // Keep the example content as fallback
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, itemType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemType);
      setTimeout(() => setCopiedItem(null), 2000);
      
      trackEvent({
        category: 'engagement',
        action: 'click',
        label: 'ai_content_copied',
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const currentContent = aiContent || contentExamples[selectedBusiness];
  const currentBusiness = businessTypes.find(b => b.id === selectedBusiness);

  return (
    <Card className="backdrop-blur-md bg-[#121218]/90 border border-[#333340] overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#8f00ff]/10 to-transparent border-b border-[#333340]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-[#8f00ff]" />
            <div>
              <CardTitle className="text-xl font-bold text-white">APEX2.0 AI Content Architecture</CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                Enterprise-grade psychological content generation using Fortune 500 influence frameworks
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-[#8f00ff]/20 text-[#8f00ff] border-[#8f00ff]/30" variant="outline">
            Live Demo
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Business Type Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Select Your Business Type</h3>
              <div className="flex items-center gap-3">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-48 bg-[#0a0a0d] border-[#333340] text-white text-sm">
                    <SelectValue placeholder="Choose AI Model" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                    <SelectItem value="anthropic/claude-3-sonnet:beta">Claude 3 Sonnet</SelectItem>
                    <SelectItem value="anthropic/claude-3-haiku:beta">Claude 3 Haiku</SelectItem>
                    <SelectItem value="openai/gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="perplexity/llama-3.1-sonar-large-128k-online">Perplexity Sonar</SelectItem>
                    <SelectItem value="meta-llama/llama-3-70b-instruct">Llama 3 70B</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-[#8f00ff] hover:bg-[#8f00ff]/90 text-white flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Generate AI Content
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
              <SelectTrigger className="bg-[#0a0a0d] border-[#333340] text-white">
                <SelectValue placeholder="Choose your business type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                {businessTypes.map((business) => (
                  <SelectItem key={business.id} value={business.id}>
                    <div className="flex items-center gap-2">
                      <span>{business.icon}</span>
                      <span>{business.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* APEX2.0 Framework Info */}
            <div className="bg-gradient-to-r from-[#8f00ff]/5 to-transparent p-4 rounded-lg border border-[#8f00ff]/20">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-[#8f00ff]" />
                APEX2.0 Psychological Framework
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div className="text-center">
                  <div className="text-[#8f00ff] font-medium">A</div>
                  <div className="text-gray-400 text-xs">Attention Architecture</div>
                </div>
                <div className="text-center">
                  <div className="text-[#8f00ff] font-medium">P</div>
                  <div className="text-gray-400 text-xs">Psychological Positioning</div>
                </div>
                <div className="text-center">
                  <div className="text-[#8f00ff] font-medium">E</div>
                  <div className="text-gray-400 text-xs">Emotional Escalation</div>
                </div>
                <div className="text-center">
                  <div className="text-[#8f00ff] font-medium">X</div>
                  <div className="text-gray-400 text-xs">Expectation Subversion</div>
                </div>
                <div className="text-center">
                  <div className="text-[#8f00ff] font-medium">2.0</div>
                  <div className="text-gray-400 text-xs">Adaptive Optimization</div>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Proprietary framework targeting neurochemical engagement: Dopamine → Oxytocin → Adrenaline → Endorphins
              </p>
            </div>
          </div>

          {/* Selected Business Display */}
          {currentBusiness && (
            <div className="flex items-center gap-3 p-4 bg-[#0a0a0d] rounded-lg border border-[#333340]">
              <div className="text-2xl">{currentBusiness.icon}</div>
              <div>
                <h4 className="text-white font-medium">Content for {currentBusiness.name}</h4>
                <p className="text-gray-400 text-sm">
                  {aiContent ? 'APEX2.0 psychological architecture - enterprise-grade content generation' : 'Sample content - generate with APEX2.0 framework for Fortune 500 level influence'}
                </p>
              </div>
              {aiContent && (
                <div className="flex gap-2">
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20" variant="outline">
                    ✨ APEX2.0 Generated
                  </Badge>
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20" variant="outline">
                    Enterprise Grade
                  </Badge>
                </div>
              )}
              <Badge className={currentBusiness.color} variant="outline">
                {currentBusiness.name}
              </Badge>
            </div>
          )}

          {/* Content Tabs */}
          <Tabs defaultValue="social" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#0a0a0d] border border-[#333340]">
              <TabsTrigger value="social" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Social Media
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </TabsTrigger>
              <TabsTrigger value="ads" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Advertising
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="social" className="space-y-4 mt-6">
              <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#8f00ff]" />
                    Social Media Post
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(currentContent.socialPost, 'social')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedItem === 'social' ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className={`p-4 rounded-md border transition-all duration-500 ${
                  isGenerating ? 'animate-pulse bg-[#8f00ff]/5 border-[#8f00ff]/20' : 'bg-[#121218] border-[#333340]'
                }`}>
                  <p className="text-gray-300 whitespace-pre-line">{currentContent.socialPost}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#8f00ff]" />
                      Email Subject Line
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(currentContent.emailSubject, 'emailSubject')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedItem === 'emailSubject' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className={`p-4 rounded-md border transition-all duration-500 ${
                    isGenerating ? 'animate-pulse bg-[#8f00ff]/5 border-[#8f00ff]/20' : 'bg-[#121218] border-[#333340]'
                  }`}>
                    <p className="text-gray-300 font-medium">{currentContent.emailSubject}</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-medium">Email Content</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(currentContent.emailContent, 'emailContent')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedItem === 'emailContent' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className={`p-4 rounded-md border transition-all duration-500 ${
                    isGenerating ? 'animate-pulse bg-[#8f00ff]/5 border-[#8f00ff]/20' : 'bg-[#121218] border-[#333340]'
                  }`}>
                    <p className="text-gray-300 whitespace-pre-line">{currentContent.emailContent}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="website" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#8f00ff]" />
                      Blog Title
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(currentContent.blogTitle, 'blogTitle')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedItem === 'blogTitle' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className={`p-4 rounded-md border transition-all duration-500 ${
                    isGenerating ? 'animate-pulse bg-[#8f00ff]/5 border-[#8f00ff]/20' : 'bg-[#121218] border-[#333340]'
                  }`}>
                    <p className="text-gray-300 font-medium">{currentContent.blogTitle}</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-medium">Website Copy</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(currentContent.websiteCopy, 'websiteCopy')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedItem === 'websiteCopy' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className={`p-4 rounded-md border transition-all duration-500 ${
                    isGenerating ? 'animate-pulse bg-[#8f00ff]/5 border-[#8f00ff]/20' : 'bg-[#121218] border-[#333340]'
                  }`}>
                    <p className="text-gray-300">{currentContent.websiteCopy}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ads" className="space-y-4 mt-6">
              <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8f00ff]" />
                    Advertisement Copy
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(currentContent.adCopy, 'adCopy')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedItem === 'adCopy' ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className={`p-4 rounded-md border transition-all duration-500 ${
                  isGenerating ? 'animate-pulse bg-[#8f00ff]/5 border-[#8f00ff]/20' : 'bg-[#121218] border-[#333340]'
                }`}>
                  <p className="text-gray-300">{currentContent.adCopy}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Generation Stats */}
          <div className="bg-[#0a0a0d] border border-[#333340] rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-400">
                Content generated: <span className="text-[#8f00ff] font-medium">{generationCount} times</span>
              </div>
              <div className="text-gray-400">
                Business type: <span className="text-white font-medium">{currentBusiness?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}