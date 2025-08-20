import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Fusion Data Co</title>
        <meta name="description" content="Fusion Data Co's privacy policy detailing how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Privacy <span className="text-primary">Policy</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                </p>
                <div className="text-sm text-muted-foreground mt-4">
                  Last updated: January 20, 2025
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold m-0">Information We Collect</h2>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Company information and job title</li>
                      <li>Account credentials and preferences</li>
                      <li>Communication history and support requests</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mt-6">Usage Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Website usage data and analytics</li>
                      <li>Device information and IP addresses</li>
                      <li>Cookies and tracking technologies</li>
                      <li>Feature usage and performance metrics</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold m-0">How We Use Your Information</h2>
                  </div>
                  <div className="space-y-4">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide and improve our marketing automation services</li>
                      <li>Process transactions and manage customer accounts</li>
                      <li>Send important updates, security alerts, and support messages</li>
                      <li>Analyze usage patterns to enhance user experience</li>
                      <li>Comply with legal obligations and protect our rights</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold m-0">Data Protection & Security</h2>
                  </div>
                  <div className="space-y-4">
                    <p>We implement industry-standard security measures to protect your information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>End-to-end encryption for data transmission</li>
                      <li>SOC2 compliant infrastructure and processes</li>
                      <li>Regular security audits and vulnerability assessments</li>
                      <li>Limited access controls and employee training</li>
                      <li>Secure data centers with 24/7 monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Data Sharing & Third Parties</h2>
                  <div className="space-y-4">
                    <p>We do not sell your personal information. We may share data with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Service providers who help us operate our platform</li>
                      <li>Legal authorities when required by law</li>
                      <li>Business partners with your explicit consent</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
                  <div className="space-y-4">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access and review your personal information</li>
                      <li>Request corrections or updates to your data</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt-out of non-essential communications</li>
                      <li>Export your data in a portable format</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                  <p className="mb-4">
                    If you have questions about this Privacy Policy or our data practices:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> rob@fusiondataco.com</p>
                    <p><strong>Phone:</strong> +1 (615) 788-2808</p>
                    <p><strong>Address:</strong> Available by appointment, Remote consultations nationwide</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}