import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileCheck, AlertCircle, Users, DollarSign } from "lucide-react";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Fusion Data Co</title>
        <meta name="description" content="Terms of Service for Fusion Data Co marketing automation platform. Learn about our service agreement and user responsibilities." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <FileCheck className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Terms of <span className="text-accent">Service</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  These terms govern your use of Fusion Data Co's marketing automation platform and services.
                </p>
                <div className="text-sm text-muted-foreground mt-4">
                  Last updated: January 20, 2025
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileCheck className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-semibold m-0">Service Agreement</h2>
                  </div>
                  <div className="space-y-4">
                    <p>
                      By accessing or using Fusion Data Co's services, you agree to be bound by these Terms of Service 
                      and our Privacy Policy. Our platform provides marketing automation, CRM, and AI-powered business solutions.
                    </p>
                    
                    <h3 className="text-lg font-medium">Service Availability</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>99.9% uptime guarantee for enterprise customers</li>
                      <li>Scheduled maintenance windows will be communicated in advance</li>
                      <li>24/7 support for Growth and Scale tier customers</li>
                      <li>Services are provided on a subscription basis</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-semibold m-0">User Responsibilities</h2>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Maintain the confidentiality of your account credentials</li>
                      <li>Notify us immediately of any unauthorized access</li>
                      <li>Use strong passwords and enable two-factor authentication</li>
                      <li>Ensure your team members follow security best practices</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mt-6">Acceptable Use</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Respect TCPA, CTIA, and anti-spam regulations</li>
                      <li>Do not use our services for illegal or harmful activities</li>
                      <li>Maintain accurate and up-to-date contact information</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-semibold m-0">Billing & Payments</h2>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Subscription Plans</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Launch:</strong> $799/month + $2,000 setup fee</li>
                      <li><strong>Growth:</strong> $1,799/month + $6,000 setup fee (Recommended)</li>
                      <li><strong>Scale:</strong> $4,499/month + $15,000 setup fee</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mt-6">Payment Terms</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>All fees are due in advance on a monthly basis</li>
                      <li>Setup fees are charged upon service activation</li>
                      <li>Failed payments may result in service suspension</li>
                      <li>Refunds are handled on a case-by-case basis</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Data & Intellectual Property</h2>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Data</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You retain ownership of all data you upload to our platform</li>
                      <li>We process your data solely to provide our services</li>
                      <li>You can export your data at any time</li>
                      <li>Data deletion is available upon account termination</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mt-6">Our Intellectual Property</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fusion Data Co retains all rights to our platform and technology</li>
                      <li>You receive a limited license to use our services</li>
                      <li>Reverse engineering or copying our technology is prohibited</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Service Level Agreement (SLA)</h2>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Uptime Guarantee</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>99.9% uptime for Growth and Scale tier customers</li>
                      <li>Service credits for qualifying downtime</li>
                      <li>Planned maintenance excluded from uptime calculations</li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mt-6">Support Response Times</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Critical issues:</strong> 1 hour response (Scale tier)</li>
                      <li><strong>High priority:</strong> 4 hours response (Growth/Scale tier)</li>
                      <li><strong>General support:</strong> 24 hours response (all tiers)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <h2 className="text-xl font-semibold m-0">Limitation of Liability</h2>
                  </div>
                  <div className="space-y-4">
                    <p>
                      Our liability is limited to the amount you paid for services in the 12 months 
                      preceding the claim. We are not liable for indirect, consequential, or special damages.
                    </p>
                  </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <p className="mb-4">
                    Questions about these Terms of Service? Contact us:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> rob@fusiondataco.com</p>
                    <p><strong>Phone:</strong> +1 (916) 534-0915</p>
                    <p><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM CT</p>
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