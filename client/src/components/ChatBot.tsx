import { useState, useRef, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { X, Send, Bot, User } from "lucide-react";

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
      text: "Hi there! I'm Fusion's AI assistant. How can I help you with your marketing automation needs today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    const userMessage = { sender: "user", text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the API for the bot's response
      const response = await apiRequest("POST", "/api/chat", { message: userMessage.text });
      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      // If API fails, add a fallback response
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Can you try again in a moment?" 
      }]);
      console.error("Chatbot API error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl w-80 overflow-hidden border border-[#00ffff] shadow-lg">
          {/* Chat Header */}
          <div className="bg-[#1a1a1f] p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-3">
                <Bot className="text-[#00ffff]" size={16} />
              </div>
              <div>
                <h4 className="font-semibold">Fusion Assistant</h4>
                <p className="text-xs text-gray-400">AI Support Agent</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-gray-400 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'mb-4'}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot className="text-[#00ffff]" size={12} />
                  </div>
                )}
                
                <div className={`${
                  message.sender === "bot" 
                    ? "bg-[#1a1a1f] rounded-lg rounded-tl-none" 
                    : "bg-[#14ffc8]/20 rounded-lg rounded-tr-none"
                } p-3 max-w-[80%]`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-2 flex-shrink-0">
                    <User className="text-gray-400" size={12} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot className="text-[#00ffff]" size={12} />
                </div>
                <div className="bg-[#1a1a1f] rounded-lg rounded-tl-none p-3">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-grow bg-[#1a1a1f] border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-[#00ffff] text-[#0b0b0d] rounded-r-md px-4 py-2 hover:shadow-[0_0_5px_#00ffff] transition-all duration-300"
                disabled={isLoading}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={toggleChat} 
          className="bg-[#00ffff] text-[#0b0b0d] rounded-full w-14 h-14 flex items-center justify-center hover:shadow-[0_0_5px_#00ffff,0_0_10px_#00ffff] animate-[pulse-glow_3s_infinite]"
          aria-label="Open chat"
        >
          <Bot size={24} />
        </button>
      )}
    </div>
  );
}
