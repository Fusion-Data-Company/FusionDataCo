import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Fusion Data Co</title>
        <meta name="description" content="The page you're looking for couldn't be found. Return to the Fusion Data Co homepage." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-xl mx-auto">
              <div className="w-20 h-20 mx-auto bg-[#ff0aff]/20 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="text-[#ff0aff]" size={40} />
              </div>
              
              <h1 className="font-['Orbitron'] text-4xl font-bold mb-6 text-white">
                <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">404</span> Page Not Found
              </h1>
              
              <p className="text-gray-400 mb-8">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track.
              </p>
              
              <Link href="/">
                <span className="px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] transition-all duration-300 inline-flex items-center cursor-pointer">
                  <Home size={18} className="mr-2" /> 
                  Return to Home
                </span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <elevenlabs-convai agent-id="agent_6701k3kk65vsetbtrmhe3ek7sgdt"></elevenlabs-convai>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </div>
    </>
  );
}
