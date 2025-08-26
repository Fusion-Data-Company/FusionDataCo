import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  icon: React.ReactNode;
  titleColor: string;
  bgColor: string;
  borderColor: string;
  subtitle?: string;
  content: React.ReactNode;
}

interface SlideshowProps {
  slides: Slide[];
}

export default function Slideshow({ slides }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const current = slides[currentSlide];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Slideshow Container */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl border border-slate-700/50 p-6 backdrop-blur-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-200">The Golf Bag Framework</h3>
          <div className="text-sm text-slate-400">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>

        {/* Main Slide Area */}
        <div className="relative min-h-[500px] mb-6">
          <Card className={`${current.borderColor} ${current.bgColor} h-full transition-all duration-300 ease-in-out`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {current.icon}
                <div>
                  <CardTitle className={`text-2xl ${current.titleColor}`}>
                    {current.title}
                  </CardTitle>
                  {current.subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">{current.subtitle}</p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {current.content}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <Button 
            variant="outline" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button 
            variant="outline" 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="text-center mt-4 text-xs text-slate-500">
          Use arrow keys or click indicators to navigate
        </div>
      </div>
    </div>
  );
}