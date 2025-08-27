import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Building2, 
  Calculator,
  Globe,
  RefreshCw,
  Download,
  CheckCircle,
  Eye
} from "lucide-react";
import { trackEvent } from './AnalyticsTracker';

interface MarketData {
  zipCode: string;
  medianPrice: string;
  priceGrowth: string;
  population: string;
  households: string;
  medianIncome: string;
  ageRange: string;
  competition: string;
}

const sampleMarketData: Record<string, MarketData> = {
  "90210": {
    zipCode: "90210 - Beverly Hills, CA",
    medianPrice: "$3,245,000",
    priceGrowth: "+8.2%",
    population: "34,109",
    households: "13,841",
    medianIncome: "$195,783",
    ageRange: "35-54 (42%)",
    competition: "High (247 agents)"
  },
  "33139": {
    zipCode: "33139 - Miami Beach, FL", 
    medianPrice: "$1,850,000",
    priceGrowth: "+12.4%",
    population: "87,779",
    households: "47,094",
    medianIncome: "$91,026",
    ageRange: "25-44 (38%)",
    competition: "Very High (312 agents)"
  },
  "78746": {
    zipCode: "78746 - Austin, TX",
    medianPrice: "$895,000",
    priceGrowth: "+15.7%",
    population: "22,794",
    households: "8,456",
    medianIncome: "$142,367",
    ageRange: "35-54 (45%)",
    competition: "Medium (89 agents)"
  },
  "98102": {
    zipCode: "98102 - Seattle, WA",
    medianPrice: "$1,125,000", 
    priceGrowth: "+6.8%",
    population: "41,188",
    households: "19,204",
    medianIncome: "$108,794",
    ageRange: "25-44 (52%)",
    competition: "High (156 agents)"
  },
  "30309": {
    zipCode: "30309 - Atlanta, GA",
    medianPrice: "$675,000",
    priceGrowth: "+9.3%",
    population: "15,931",
    households: "7,248",
    medianIncome: "$87,493",
    ageRange: "25-44 (58%)",
    competition: "Medium (72 agents)"
  }
};

export default function DemographicsPlatform() {
  const [selectedZip, setSelectedZip] = useState<string>('90210');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [dataSource, setDataSource] = useState<string>('mls-plus-census');

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysisCount(prev => prev + 1);
    
    // Track the demographics analysis event
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'demographics_platform_analyzed',
      value: analysisCount + 1
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const currentData = sampleMarketData[selectedZip];

  return (
    <Card className="backdrop-blur-md bg-[#121218]/90 border border-[#333340] overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#14ffc8]/10 to-transparent border-b border-[#333340]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="mr-2 h-6 w-6 text-[#14ffc8]" />
            <div>
              <CardTitle className="text-xl font-bold text-white">White-Label Demographics Intelligence Platform</CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                Real estate market analysis with advanced scraping, interactive mapping, and competitive intelligence
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-[#14ffc8]/20 text-[#14ffc8] border-[#14ffc8]/30" variant="outline">
            Live Demo
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Market Analysis Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Market Intelligence Dashboard</h3>
              <div className="flex items-center gap-3">
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger className="w-48 bg-[#0a0a0d] border-[#333340] text-white text-sm">
                    <SelectValue placeholder="Data Sources" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                    <SelectItem value="mls-plus-census">MLS + Census Data</SelectItem>
                    <SelectItem value="zillow-realtor">Zillow + Realtor.com</SelectItem>
                    <SelectItem value="firecrawl-census">Firecrawl + Census</SelectItem>
                    <SelectItem value="crawl4ai-mls">Crawl4AI + MLS</SelectItem>
                    <SelectItem value="comprehensive">All Sources Combined</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Analyze Market
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={selectedZip} onValueChange={setSelectedZip}>
                <SelectTrigger className="bg-[#0a0a0d] border-[#333340] text-white">
                  <SelectValue placeholder="Select Market Area" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                  {Object.entries(sampleMarketData).map(([zip, data]) => (
                    <SelectItem key={zip} value={zip}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#14ffc8]" />
                        <span>{data.zipCode}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-[#0a0a0d] border-[#333340] text-white hover:bg-[#14ffc8]/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-[#0a0a0d] border-[#333340] text-white hover:bg-[#14ffc8]/10"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Interactive Map
                </Button>
              </div>
            </div>

            {/* Data Sources Info */}
            <div className="bg-gradient-to-r from-[#14ffc8]/5 to-transparent p-4 rounded-lg border border-[#14ffc8]/20">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#14ffc8]" />
                Advanced Data Scraping & Intelligence
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <div className="text-[#14ffc8] font-medium">Firecrawl</div>
                  <div className="text-gray-400 text-xs">Web Scraping Engine</div>
                </div>
                <div className="text-center">
                  <div className="text-[#14ffc8] font-medium">Crawl4AI</div>
                  <div className="text-gray-400 text-xs">Intelligent Data Extraction</div>
                </div>
                <div className="text-center">
                  <div className="text-[#14ffc8] font-medium">MLS Integration</div>
                  <div className="text-gray-400 text-xs">Live Market Data</div>
                </div>
                <div className="text-center">
                  <div className="text-[#14ffc8] font-medium">Census API</div>
                  <div className="text-gray-400 text-xs">Demographics Layer</div>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Real-time market analysis combining MLS data, census demographics, and competitive intelligence
              </p>
            </div>
          </div>

          {/* Market Analysis Results */}
          {currentData && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-[#0a0a0d] rounded-lg border border-[#333340]">
                <div className="text-2xl">🏠</div>
                <div>
                  <h4 className="text-white font-medium">{currentData.zipCode}</h4>
                  <p className="text-gray-400 text-sm">
                    Comprehensive market analysis with competitive intelligence and demographic insights
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20" variant="outline">
                    ✨ Live Data
                  </Badge>
                </div>
              </div>

              {/* Market Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-[#14ffc8]/10 to-transparent p-6 rounded-lg border border-[#14ffc8]/30">
                  <DollarSign className="h-8 w-8 text-[#14ffc8] mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{currentData.medianPrice}</div>
                  <div className="text-sm text-gray-400 mb-2">Median Home Price</div>
                  <div className="text-sm font-medium text-green-400">{currentData.priceGrowth} YoY</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 rounded-lg border border-blue-500/30">
                  <Users className="h-8 w-8 text-blue-400 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{currentData.population}</div>
                  <div className="text-sm text-gray-400 mb-2">Population</div>
                  <div className="text-sm font-medium text-blue-400">{currentData.households} households</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 rounded-lg border border-purple-500/30">
                  <TrendingUp className="h-8 w-8 text-purple-400 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{currentData.medianIncome}</div>
                  <div className="text-sm text-gray-400 mb-2">Median Income</div>
                  <div className="text-sm font-medium text-purple-400">Primary: {currentData.ageRange}</div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-6 rounded-lg border border-orange-500/30">
                  <Building2 className="h-8 w-8 text-orange-400 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{currentData.competition.split('(')[0]}</div>
                  <div className="text-sm text-gray-400 mb-2">Competition Level</div>
                  <div className="text-sm font-medium text-orange-400">{currentData.competition.split('(')[1]?.replace(')', '')}</div>
                </div>
              </div>

              {/* Competitive Analysis */}
              <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#14ffc8]" />
                  Competitive Intelligence Report
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <h5 className="text-[#14ffc8] font-medium text-sm">Market Opportunity</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Price Appreciation</span>
                        <span className="text-green-400 font-medium">{currentData.priceGrowth}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Buyer Demand</span>
                        <span className="text-yellow-400 font-medium">High</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Inventory Level</span>
                        <span className="text-red-400 font-medium">Low</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[#14ffc8] font-medium text-sm">Demographics Insights</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Primary Age Group</span>
                        <span className="text-blue-400 font-medium">{currentData.ageRange.split('(')[0]}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Income Bracket</span>
                        <span className="text-purple-400 font-medium">Upper Middle</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Education Level</span>
                        <span className="text-green-400 font-medium">College+</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[#14ffc8] font-medium text-sm">Strategic Recommendations</h5>
                    <div className="space-y-2">
                      <div className="text-xs text-white flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span>Focus on luxury staging</span>
                      </div>
                      <div className="text-xs text-white flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span>Target tech professionals</span>
                      </div>
                      <div className="text-xs text-white flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span>Premium pricing strategy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* White-Label Branding Info */}
              <div className="bg-gradient-to-r from-[#14ffc8]/5 to-transparent p-6 rounded-lg border border-[#14ffc8]/20">
                <h4 className="text-white font-semibold mb-3">🎯 Your Brand, Your Platform</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-300 mb-2">✅ Complete branding customization with your company logo, colors, and domain</p>
                    <p className="text-gray-300 mb-2">✅ Advanced scraping with Firecrawl and Crawl4AI for real-time data</p>
                    <p className="text-gray-300">✅ Interactive mapping with demographic overlays and competitive analysis</p>
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">✅ White-label client reports with your professional branding</p>
                    <p className="text-gray-300 mb-2">✅ MLS integration for live market data and listing intelligence</p>
                    <p className="text-gray-300">✅ Revenue sharing program with ongoing client relationships</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}