import React, { useEffect, useState } from 'react';

export default function ElevenLabsWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if ElevenLabs widget script is loaded
    const checkForWidget = () => {
      if (window.customElements && window.customElements.get('elevenlabs-convai')) {
        setIsLoaded(true);
      } else {
        // Try again after a short delay
        setTimeout(checkForWidget, 1000);
      }
    };
    
    checkForWidget();
  }, []);

  return (
    <div className="elevenlabs-widget-container">
      <elevenlabs-convai agent-id="agent_6701k3kk65vsetbtrmhe3ek7sgdt"></elevenlabs-convai>
      {!isLoaded && (
        <div className="bg-[#ffa500]/10 border border-[#ffa500]/20 rounded-lg p-6 text-center">
          <div className="animate-pulse">
            <div className="text-[#ffa500] mb-2">🤖 Loading AI Agent...</div>
            <div className="text-gray-400 text-sm">Initializing conversational AI interface</div>
          </div>
        </div>
      )}
    </div>
  );
}