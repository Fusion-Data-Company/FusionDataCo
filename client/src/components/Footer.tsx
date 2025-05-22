import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0b0b0d] py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/">
              <span className="inline-block mb-4 cursor-pointer">
                <span className="text-[#14ffc8] font-['Orbitron'] text-xl font-bold [text-shadow:0_0_5px_#14ffc8]">
                  FUSION<span className="text-white">DATA</span>
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">CO</span>
                </span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering small businesses with enterprise-grade marketing automation tools, AI, and data-driven strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#14ffc8] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#14ffc8] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#14ffc8] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#14ffc8] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-semibold mb-4 text-white">Solutions</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">CRM</span></Link></li>
              <li><Link href="/"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Website Builder</span></Link></li>
              <li><Link href="/"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Automation</span></Link></li>
              <li><Link href="/"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">AI Agents</span></Link></li>
              <li><Link href="/social-media"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Social Media</span></Link></li>
            </ul>
          </div>
          
          {/* Industries */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-semibold mb-4 text-white">Industries</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/small-business"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Small Business</span></Link></li>
              <li><Link href="/real-estate"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Real Estate</span></Link></li>
              <li><Link href="/medical"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Medical</span></Link></li>
              <li><Link href="/home-services"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Home Services</span></Link></li>
              <li><a href="#" className="hover:text-[#14ffc8] transition-colors">Retail</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#14ffc8] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#14ffc8] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#14ffc8] transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-[#14ffc8] transition-colors">Careers</a></li>
              <li><Link href="/#demo"><span className="hover:text-[#14ffc8] transition-colors cursor-pointer">Contact</span></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {currentYear} Fusion Data Co. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">GDPR</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
