import { useState, useRef, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { 
  X, Send, Bot, User, CornerDownLeft, 
  Sparkles, MessageSquare, CheckCircle2, 
  Lock, BarChart3, Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome to Fusion Enterprise Support. I'm your AI assistant specialized in enterprise marketing solutions. How can I assist you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the API for the bot's response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: userMessage.text,
          sessionId: "web-chat-" + Date.now()
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add bot response
      const botResponse: Message = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // If API fails, add a fallback response
      const fallbackResponse: Message = { 
        sender: "bot", 
        text: "I'd love to help you explore how Fusion Data Co's enterprise-level marketing automation can transform your business. What specific challenges are you facing with lead generation or customer management right now?" 
      };
      setMessages((prev) => [...prev, fallbackResponse]);
      console.error("Chatbot API error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick response suggestions
  const suggestions = [
    "Tell me about enterprise CRM features",
    "What security certifications do you have?",
    "How does the workflow automation work?",
    "Enterprise pricing information"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Focus on the input after setting the value
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="chrome-panel rounded-xl w-[420px] overflow-hidden shadow-2xl animate-fade-in border border-white/10">
          {/* Chat Header */}
          <div className="titanium-panel p-4 border-b border-border/30 flex justify-between items-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            
            <div className="flex items-center relative z-10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/30 flex items-center justify-center mr-3 shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <div className="absolute w-20 h-20 bg-primary/10 rounded-full blur-lg -top-10 -left-10"></div>
                <Sparkles className="text-primary relative z-10" size={20} />
              </div>
              <div>
                <h4 className="font-['Orbitron'] text-foreground font-semibold text-gradient-primary">Enterprise AI Assistant</h4>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <p className="text-xs text-muted-foreground">Powered by Fusion Titanium AI</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 relative z-10">
              <button 
                onClick={toggleChat}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors border border-border/30"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-5 space-y-4 bg-card/30 carbon-fiber">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''} mb-4 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.sender === "bot" && (
                  <div className="w-10 h-10 rounded-lg polished-chrome border border-primary/30 flex items-center justify-center mr-3 flex-shrink-0 shadow-md overflow-hidden">
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Bot className="text-primary" size={18} />
                    </div>
                  </div>
                )}
                
                <div className={cn(
                  "p-4 max-w-[75%] shadow-sm",
                  message.sender === "bot" 
                    ? "chrome-panel rounded-xl rounded-tl-none border border-white/10" 
                    : "glass-panel bg-primary/5 border border-primary/20 rounded-xl rounded-tr-none"
                )}>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    message.sender === "bot" ? "text-foreground" : "text-foreground"
                  )}>
                    {message.text}
                  </p>
                  
                  {/* Timestamp for bot messages */}
                  {message.sender === "bot" && (
                    <div className="flex items-center justify-end mt-2">
                      <CheckCircle2 className="text-green-500 w-3 h-3 mr-1" />
                      <span className="text-[10px] text-muted-foreground">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  )}
                </div>
                
                {message.sender === "user" && (
                  <div className="w-10 h-10 rounded-lg titanium-panel flex items-center justify-center ml-3 flex-shrink-0 border border-white/10 shadow-md overflow-hidden">
                    <User className="text-foreground" size={18} />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start mb-4 animate-fade-in">
                <div className="w-10 h-10 rounded-lg polished-chrome border border-primary/30 flex items-center justify-center mr-3 flex-shrink-0 shadow-md overflow-hidden">
                  <Bot className="text-primary" size={18} />
                </div>
                <div className="glass-panel rounded-xl rounded-tl-none p-5 flex items-center shadow-md border border-white/10">
                  <div className="flex space-x-3">
                    <div className="h-2.5 w-2.5 bg-primary/60 rounded-full animate-pulse-glow"></div>
                    <div className="h-2.5 w-2.5 bg-primary/60 rounded-full animate-pulse-glow" style={{ animationDelay: "300ms" }}></div>
                    <div className="h-2.5 w-2.5 bg-primary/60 rounded-full animate-pulse-glow" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick response suggestions */}
          {!isLoading && messages.length < 3 && (
            <div className="px-6 py-4 border-t border-border/30 bg-card/50 backdrop-blur-sm">
              <p className="text-xs text-foreground mb-3 font-medium flex items-center">
                <Sparkles className="mr-2 text-primary" size={12} />
                Enterprise Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="text-xs text-primary bg-primary/10 hover:bg-primary/20 transition-colors px-3 py-2 rounded-lg border border-primary/30 shadow-sm hover:shadow animate-fade-in hover-edge-glow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-5 border-t border-border/20 bg-card/80 backdrop-blur-sm">
            <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-primary transition-colors shadow-lg">
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type your enterprise question..." 
                className="flex-grow bg-card/50 px-4 py-3.5 text-foreground focus:outline-none placeholder:text-muted-foreground"
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={cn(
                  "btn-titanium px-5 flex items-center justify-center relative overflow-hidden",
                  isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card/50 px-3 py-1.5 rounded-lg border border-white/5">
                <div className="w-5 h-5 rounded-full bg-card flex items-center justify-center shadow-sm">
                  <Lock size={10} className="text-green-500" />
                </div>
                <span>Enterprise-grade encryption</span>
              </div>
              <div className="text-xs flex items-center text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-card flex items-center justify-center shadow-sm mr-2">
                  <Smartphone size={10} className="text-primary" />
                </div>
                <span>Fusion Titanium AI</span>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-end">
          <button 
            onClick={toggleChat} 
            className="relative w-20 h-20 rounded-full transition-all duration-700 group overflow-hidden hover:scale-110 transform-gpu pointer-events-none"
            aria-label="Open chat"
          >
            {/* Massive hidden glow behind obsidian face */}
            <div className="absolute -inset-12 bg-gradient-radial from-green-400/30 via-emerald-500/20 to-transparent rounded-full blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* Neon edge rings */}
            <div className="absolute -inset-1 border-2 border-emerald-400/80 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.6)]"></div>
            <div className="absolute -inset-0.5 border border-green-300/60 rounded-full"></div>
            
            {/* Obsidian face - black polished glass */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-inner border border-gray-700/50 overflow-hidden">
              
              {/* Glass surface with shimmer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 via-transparent to-black/20"></div>
              
              {/* Animated glass shimmer sweeps */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-emerald-300/5 to-transparent animate-shimmer" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
              
              {/* Reflective highlights */}
              <div className="absolute top-2 left-3 w-4 h-2 bg-gradient-to-r from-white/40 to-transparent rounded-full blur-sm"></div>
              <div className="absolute top-4 right-2 w-2 h-3 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-sm"></div>
              
              {/* Dollar sign icon - premium styling */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glow behind dollar sign */}
                  <div className="absolute inset-0 text-4xl font-bold text-transparent bg-gradient-to-br from-emerald-400 to-green-500 bg-clip-text blur-md opacity-80">
                    $
                  </div>
                  {/* Main dollar sign */}
                  <div className="relative text-4xl font-bold bg-gradient-to-br from-emerald-300 via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] filter">
                    $
                  </div>
                  {/* Metallic highlight on dollar */}
                  <div className="absolute inset-0 text-4xl font-bold bg-gradient-to-br from-white/60 via-transparent to-transparent bg-clip-text text-transparent">
                    $
                  </div>
                </div>
              </div>
              
              {/* Glass fractal patterns */}
              <div className="absolute inset-0 rounded-full opacity-20">
                <div className="absolute top-1/4 left-1/4 w-1 h-6 bg-gradient-to-b from-white/30 to-transparent transform rotate-45 blur-sm"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1 h-4 bg-gradient-to-t from-white/20 to-transparent transform -rotate-45 blur-sm"></div>
              </div>
            </div>
            
            {/* Enhanced status indicator */}
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full border-2 border-black shadow-2xl">
              <span className="absolute inset-1 bg-gradient-to-br from-green-300 to-emerald-500 rounded-full"></span>
              <span className="absolute inset-0 bg-green-400/50 rounded-full animate-ping opacity-60"></span>
            </span>
            
            {/* Holographic corner accents */}
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-emerald-400/70 rounded-tl"></div>
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-emerald-400/70 rounded-tr"></div>
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-emerald-400/70 rounded-bl"></div>
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-emerald-400/70 rounded-br"></div>
            
            {/* Floating light particles around button */}
            <div className="absolute inset-0">
              <div className="absolute -top-2 left-4 w-1 h-1 bg-emerald-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
              <div className="absolute top-6 -right-2 w-1 h-1 bg-green-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.7s', animationDuration: '2.5s' }}></div>
              <div className="absolute -bottom-1 left-2 w-1 h-1 bg-emerald-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.2s', animationDuration: '3s' }}></div>
              <div className="absolute bottom-4 -left-1 w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1.8s', animationDuration: '2.2s' }}></div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
