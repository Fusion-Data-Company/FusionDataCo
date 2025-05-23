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
      const response = await apiRequest("POST", "/api/chat", { message: userMessage.text });
      const data = await response.json();
      
      // Add bot response
      const botResponse: Message = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // If API fails, add a fallback response
      const fallbackResponse: Message = { 
        sender: "bot", 
        text: "I apologize, but I'm experiencing a connectivity issue with our enterprise knowledge base. Please try again in a moment or contact our enterprise support team at support@fusiondataco.com." 
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
        <div className="titanium-panel rounded-xl w-96 overflow-hidden shadow-xl">
          {/* Chat Header */}
          <div className="glass-panel p-4 border-b border-border/30 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-3">
                <Sparkles className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-['Orbitron'] text-foreground font-semibold">Enterprise Assistant</h4>
                <p className="text-xs text-muted-foreground">Powered by Fusion AI</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={toggleChat}
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[350px] overflow-y-auto p-5 space-y-4 bg-card/30">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''} mb-4`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot className="text-primary" size={14} />
                  </div>
                )}
                
                <div className={cn(
                  "p-3.5 max-w-[75%] shadow-sm",
                  message.sender === "bot" 
                    ? "glass-panel rounded-lg rounded-tl-none" 
                    : "bg-primary/10 border border-primary/20 rounded-lg rounded-tr-none"
                )}>
                  <p className={cn(
                    "text-sm",
                    message.sender === "bot" ? "text-muted-foreground" : "text-foreground"
                  )}>
                    {message.text}
                  </p>
                </div>
                
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center ml-2 flex-shrink-0 border border-border">
                    <User className="text-muted-foreground" size={14} />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot className="text-primary" size={14} />
                </div>
                <div className="glass-panel rounded-lg rounded-tl-none p-4 flex items-center shadow-sm">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-primary/40 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                    <div className="h-2 w-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick response suggestions */}
          {!isLoading && messages.length < 3 && (
            <div className="px-5 py-3 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2">Suggested topics:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="text-xs text-primary bg-primary/10 hover:bg-primary/20 transition-colors px-2.5 py-1.5 rounded-full border border-primary/20"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/30 bg-card/50">
            <div className="flex rounded-md overflow-hidden border border-border focus-within:border-primary transition-colors shadow-sm">
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type your question..." 
                className="flex-grow bg-muted/30 px-4 py-3 text-foreground focus:outline-none"
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={cn(
                  "bg-primary text-primary-foreground px-4 flex items-center justify-center transition-all duration-200",
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                ) : (
                  <CornerDownLeft size={18} />
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock size={12} />
                <span>Enterprise-grade security</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Powered by Fusion Enterprise AI
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-3 flex flex-col items-end">
          {/* Feature badges that appear before opening chat */}
          <div className="bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/30 shadow-sm flex items-center gap-2 text-xs text-muted-foreground animate-fade-in transition-opacity duration-500">
            <BarChart3 size={12} className="text-primary" />
            <span>Enterprise Solutions</span>
          </div>
          
          <button 
            onClick={toggleChat} 
            className="bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary transition-all duration-300 relative group"
            aria-label="Open chat"
          >
            <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <MessageSquare size={20} className="relative z-10" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background"></span>
          </button>
        </div>
      )}
    </div>
  );
}
