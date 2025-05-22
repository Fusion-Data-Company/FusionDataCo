import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a1f] to-[#0b0b0d] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 md:p-12 border border-gray-800 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Ready to</span>{" "}
              <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Transform Your Marketing?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Join thousands of small businesses that are growing faster with our all-in-one marketing automation platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing">
              <a className="px-8 py-4 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] animate-[pulse-glow_3s_infinite] text-center text-lg">
                Start Your Free Trial
              </a>
            </Link>
            <Link href="/#demo">
              <a className="px-8 py-4 bg-transparent border border-[#8f00ff] text-white rounded-md font-medium hover:bg-[#8f00ff] hover:text-[#0b0b0d] transition-all duration-300 text-center text-lg">
                Schedule a Demo
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
