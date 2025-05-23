import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, Calculator, LineChart, Check, TrendingUp, CreditCard, Calendar, BarChart3 } from "lucide-react";
import { trackEvent } from './AnalyticsTracker';

interface ROICalculatorProps {
  className?: string;
}

export default function ROICalculator({ className }: ROICalculatorProps) {
  // Initial values
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(1000);
  const [conversionRate, setConversionRate] = useState<number>(1.5);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(100);
  const [monthlyAdsSpend, setMonthlyAdsSpend] = useState<number>(500);
  const [advancedMode, setAdvancedMode] = useState<boolean>(false);
  const [timeSaved, setTimeSaved] = useState<number>(10);
  const [leadQualityImprovement, setLeadQualityImprovement] = useState<number>(20);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Calculate basic ROI
  const newConversionRate = conversionRate * 1.5; // Assume 50% increase
  const currentMonthlyLeads = Math.round(monthlyVisitors * (conversionRate / 100));
  const currentMonthlySales = Math.round(currentMonthlyLeads * (averageOrderValue));
  const currentROI = monthlyAdsSpend > 0 ? (currentMonthlySales / monthlyAdsSpend).toFixed(2) : "N/A";
  
  const newMonthlyLeads = Math.round(monthlyVisitors * (newConversionRate / 100));
  const additionalLeads = newMonthlyLeads - currentMonthlyLeads;
  const newMonthlySales = Math.round(newMonthlyLeads * (averageOrderValue * 1.1)); // Assume 10% increase in AOV
  const newROI = monthlyAdsSpend > 0 ? (newMonthlySales / monthlyAdsSpend).toFixed(2) : "N/A";
  
  // Calculate advanced metrics
  const monthlySavings = advancedMode ? Math.round((timeSaved * 4 * 25)) : 0; // Assuming $25/hour value of time, 4 weeks
  const improvedLeadValue = advancedMode ? Math.round(averageOrderValue * (1 + leadQualityImprovement / 100) * newMonthlyLeads) - newMonthlySales : 0;
  
  // Total ROI
  const totalMonthlyBenefit = (newMonthlySales - currentMonthlySales) + monthlySavings + improvedLeadValue;
  const monthlyInvestment = 199; // Monthly subscription
  const totalROI = (totalMonthlyBenefit / monthlyInvestment).toFixed(2);
  const annualROI = (totalMonthlyBenefit * 12 / (monthlyInvestment * 12)).toFixed(2);
  
  // Handle calculator submission
  const calculateROI = () => {
    setShowResults(true);
    
    // Track event
    trackEvent({
      category: 'lead_generation',
      action: 'click',
      label: 'roi_calculator_submission'
    });
  };
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <Card className={`backdrop-blur-md bg-[#121218]/80 border border-[#333340] overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-[#14ffc8]/10 to-transparent border-b border-[#333340] pb-4">
        <div className="flex items-center">
          <Calculator className="mr-2 h-6 w-6 text-[#14ffc8]" />
          <CardTitle className="text-xl font-bold text-white">My ROI Calculator</CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          See how much value our platform can generate for your business
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {!showResults ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="monthlyVisitors" className="text-white">Monthly Website Visitors</Label>
                  <span className="text-[#14ffc8] font-medium">{monthlyVisitors.toLocaleString()}</span>
                </div>
                <Slider 
                  id="monthlyVisitors"
                  min={100} 
                  max={10000} 
                  step={100} 
                  value={[monthlyVisitors]} 
                  onValueChange={(value) => setMonthlyVisitors(value[0])}
                  className="my-1"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>100</span>
                  <span>10,000</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="conversionRate" className="text-white">Current Conversion Rate (%)</Label>
                  <span className="text-[#14ffc8] font-medium">{conversionRate.toFixed(1)}%</span>
                </div>
                <Slider 
                  id="conversionRate"
                  min={0.1} 
                  max={5} 
                  step={0.1} 
                  value={[conversionRate]} 
                  onValueChange={(value) => setConversionRate(value[0])}
                  className="my-1"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0.1%</span>
                  <span>5%</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="averageOrderValue" className="text-white">Average Order Value</Label>
                  <span className="text-[#14ffc8] font-medium">{formatCurrency(averageOrderValue)}</span>
                </div>
                <Slider 
                  id="averageOrderValue"
                  min={10} 
                  max={1000} 
                  step={10} 
                  value={[averageOrderValue]} 
                  onValueChange={(value) => setAverageOrderValue(value[0])}
                  className="my-1"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$10</span>
                  <span>$1,000</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="monthlyAdsSpend" className="text-white">Monthly Ad Spend</Label>
                  <span className="text-[#14ffc8] font-medium">{formatCurrency(monthlyAdsSpend)}</span>
                </div>
                <Slider 
                  id="monthlyAdsSpend"
                  min={0} 
                  max={5000} 
                  step={100} 
                  value={[monthlyAdsSpend]} 
                  onValueChange={(value) => setMonthlyAdsSpend(value[0])}
                  className="my-1"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span>$5,000</span>
                </div>
              </div>
            </div>
            
            <div 
              className="p-3 border border-[#333340] rounded-md bg-[#0a0a0d]/50 cursor-pointer hover:bg-[#0a0a0d]/80"
              onClick={() => setAdvancedMode(!advancedMode)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-[#14ffc8]" />
                  <span className="text-sm font-medium text-white">Advanced Calculations</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${advancedMode ? 'rotate-180' : ''}`} />
              </div>
              
              {advancedMode && (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="timeSaved" className="text-white">Hours Saved per Week</Label>
                      <span className="text-[#14ffc8] font-medium">{timeSaved} hrs</span>
                    </div>
                    <Slider 
                      id="timeSaved"
                      min={1} 
                      max={40} 
                      step={1} 
                      value={[timeSaved]} 
                      onValueChange={(value) => setTimeSaved(value[0])}
                      className="my-1"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1 hr</span>
                      <span>40 hrs</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="leadQuality" className="text-white">Lead Quality Improvement (%)</Label>
                      <span className="text-[#14ffc8] font-medium">{leadQualityImprovement}%</span>
                    </div>
                    <Slider 
                      id="leadQuality"
                      min={0} 
                      max={50} 
                      step={5} 
                      value={[leadQualityImprovement]} 
                      onValueChange={(value) => setLeadQualityImprovement(value[0])}
                      className="my-1"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={calculateROI}
              className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-medium py-3"
            >
              Calculate My ROI
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#141420] rounded-lg p-4 border border-[#333340]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Current Performance</h3>
                <div className="bg-gray-700/30 rounded-full px-3 py-1 text-xs text-gray-400">Baseline</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Monthly Leads</div>
                  <div className="text-xl font-bold text-white">{currentMonthlyLeads}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Monthly Revenue</div>
                  <div className="text-xl font-bold text-white">{formatCurrency(currentMonthlySales)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Conversion Rate</div>
                  <div className="text-xl font-bold text-white">{conversionRate.toFixed(1)}%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Marketing ROI</div>
                  <div className="text-xl font-bold text-white">{currentROI}x</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#14ffc8]/20 to-transparent rounded-lg p-4 border border-[#14ffc8]/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">With Fusion Data Co</h3>
                <div className="bg-[#14ffc8]/20 rounded-full px-3 py-1 text-xs text-[#14ffc8]">Projected</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Monthly Leads</div>
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-white">{newMonthlyLeads}</div>
                    <div className="ml-2 bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {Math.round((newMonthlyLeads - currentMonthlyLeads) / currentMonthlyLeads * 100)}%
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Monthly Revenue</div>
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-white">{formatCurrency(newMonthlySales)}</div>
                    <div className="ml-2 bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {Math.round((newMonthlySales - currentMonthlySales) / currentMonthlySales * 100)}%
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Conversion Rate</div>
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-white">{newConversionRate.toFixed(1)}%</div>
                    <div className="ml-2 bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      50%
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Marketing ROI</div>
                  <div className="flex items-center">
                    <div className="text-xl font-bold text-white">{newROI}x</div>
                    <div className="ml-2 bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {Math.round(((Number(newROI) - Number(currentROI)) / Number(currentROI)) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
              
              {advancedMode && (
                <div className="mt-4 pt-4 border-t border-[#333340]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Time Savings Value</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(monthlySavings)}/mo</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Improved Lead Value</div>
                      <div className="text-xl font-bold text-white">{formatCurrency(improvedLeadValue)}/mo</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-[#0a0a0d] rounded-lg p-4 border border-[#333340]">
              <h3 className="text-lg font-semibold text-white mb-3">Your Total ROI</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="bg-[#141420] rounded-md p-3">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2 text-[#14ffc8]" />
                    <div className="text-sm text-gray-400">Monthly</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{totalROI}x</div>
                  <div className="mt-1 text-sm text-gray-400">Return on investment</div>
                </div>
                
                <div className="bg-[#141420] rounded-md p-3">
                  <div className="flex items-center mb-1">
                    <LineChart className="h-4 w-4 mr-2 text-[#ff0aff]" />
                    <div className="text-sm text-gray-400">Annual</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{annualROI}x</div>
                  <div className="mt-1 text-sm text-gray-400">Return on investment</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#14ffc8]/20 to-transparent rounded-md p-3 mb-4">
                <div className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-[#14ffc8] mr-2" />
                  <div className="text-white font-medium">Projected Monthly Benefit</div>
                </div>
                <div className="text-3xl font-bold text-[#14ffc8]">{formatCurrency(totalMonthlyBenefit)}</div>
                <div className="mt-1 text-sm text-gray-400">Additional revenue & savings per month</div>
              </div>
              
              <div className="flex items-center bg-[#141420] rounded-md p-3 mb-4">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Monthly Investment</div>
                  <div className="text-lg font-bold text-white">{formatCurrency(monthlyInvestment)}</div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-medium">
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#333340] text-white hover:bg-[#141420]"
                  onClick={() => setShowResults(false)}
                >
                  Recalculate
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}