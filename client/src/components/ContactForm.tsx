import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Headset, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Must be a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
  industry: z.string().min(1, { message: "Please select an industry" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      industry: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted",
        description: "We'll contact you shortly to schedule your demo.",
      });
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error Submitting Form",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  const benefits = [
    "A 30-minute personalized demo of the platform",
    "Custom workflow recommendations for your industry",
    "Q&A with a marketing automation specialist",
    "Extended 30-day free trial offer",
  ];

  return (
    <section id="demo" className="py-16 bg-[#0b0b0d]">
      <div className="container mx-auto px-4">
        <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl overflow-hidden max-w-4xl mx-auto border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Form Section */}
            <div className="p-8">
              <h2 className="font-['Orbitron'] text-2xl font-semibold mb-6">Schedule a Demo</h2>
              
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#14ffc8]/20 mb-4">
                    <CheckCircle className="text-[#14ffc8]" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Thank You!</h3>
                  <p className="text-gray-400 mb-4">
                    Your demo request has been submitted successfully. A member of our team will contact you shortly to schedule your personalized demo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="w-full bg-[#1a1a1f] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8f00ff]"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Business Email</label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full bg-[#1a1a1f] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8f00ff]"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      {...register("company")}
                      className="w-full bg-[#1a1a1f] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8f00ff]"
                    />
                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-400 mb-1">Industry</label>
                    <select
                      id="industry"
                      {...register("industry")}
                      className="w-full bg-[#1a1a1f] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8f00ff]"
                    >
                      <option value="" disabled>Select your industry</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="medical">Medical/Healthcare</option>
                      <option value="home-services">Home Services</option>
                      <option value="retail">Retail</option>
                      <option value="professional">Professional Services</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">What are your main marketing challenges?</label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={3}
                      className="w-full bg-[#1a1a1f] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8f00ff]"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-3 bg-[#8f00ff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#8f00ff,0_0_10px_#8f00ff] transition-all duration-300 text-center disabled:opacity-70"
                  >
                    {mutation.isPending ? "Submitting..." : "Request Demo"}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">By submitting this form, you agree to our Privacy Policy and Terms of Service.</p>
                </form>
              )}
            </div>
            
            {/* Info Section */}
            <div className="bg-[#1a1a1f] p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-['Orbitron'] text-xl font-semibold mb-4">What to expect:</h3>
                <ul className="space-y-4 text-gray-400 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={16} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-[#0b0b0d] p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-3">
                    <Headset className="text-[#00ffff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Need immediate assistance?</h4>
                    <p className="text-sm text-gray-400">Our team is available Monday-Friday, 9am-6pm ET</p>
                  </div>
                </div>
                <a href="tel:+18005551234" className="flex items-center text-[#00ffff] hover:text-[#14ffc8] transition-colors">
                  <Phone className="mr-2" size={16} />
                  <span>1-800-555-1234</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
