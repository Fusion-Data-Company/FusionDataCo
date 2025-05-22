import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section 
      className="relative overflow-hidden bg-[#0b0b0d] py-16 md:py-24" 
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max')",
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      <div className="absolute inset-0 bg-[#0b0b0d]/85 bg-blend-overlay"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-white">Next-Gen</span>{" "}
            <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Marketing Automation</span>{" "}
            <span className="text-white">For Small Business</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            An <span className="text-[#ff0aff] font-semibold [text-shadow:0_0_5px_#ff0aff]">all-in-one platform</span> that combines CRM, website building, and <span className="text-[#00ffff] font-semibold [text-shadow:0_0_5px_#00ffff]">AI-powered workflows</span> to help you generate leads and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link href="/pricing">
              <a className={cn(
                "px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium",
                "hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8]",
                "animate-[pulse-glow_3s_infinite]",
                "text-center",
              )}>
                Start Free 14-Day Trial
              </a>
            </Link>
            <Link href="/#demo">
              <a className={cn(
                "px-6 py-3 bg-transparent border border-[#8f00ff] text-white",
                "rounded-md font-medium",
                "hover:bg-[#8f00ff] hover:text-[#0b0b0d]",
                "transition-all duration-300",
                "text-center",
              )}>
                Schedule Demo
              </a>
            </Link>
          </div>
          <p className="text-sm text-gray-400">No credit card required. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
}
