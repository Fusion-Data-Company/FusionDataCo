import { useState } from "react";
import { Phone, Mail, Building, Tags, MoreHorizontal, Search, Plus, Filter, SortDesc, Loader2, AlertCircle } from "lucide-react";
import { useCrmContacts } from "@/hooks/use-crm-contacts";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CrmContact } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

export default function CRMContactsDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Fetch contacts from our API
  const { data: contacts = [], isLoading, isError, error } = useCrmContacts();
  
  // If we don't have any contacts yet, let's create some sample data
  const createSampleData = async () => {
    try {
      const sampleContacts = [
        {
          name: "Sarah Johnson",
          company: "TechNova Solutions",
          email: "sjohnson@technova.com",
          phone: "(555) 123-4567",
          position: "Marketing Director",
          tags: ["Enterprise", "SaaS", "Hot Lead"],
          status: "Qualified",
          source: "Website"
        },
        {
          name: "Michael Reynolds",
          company: "Quantum Marketing",
          email: "michael@quantummarketing.com",
          phone: "(555) 987-6543",
          position: "CEO",
          tags: ["Agency", "Growth Plan"],
          status: "Proposal",
          source: "Referral"
        },
        {
          name: "Elena Ramirez",
          company: "Pinnacle Realty",
          email: "elena@pinnaclereal.com",
          phone: "(555) 765-4321",
          position: "Agent",
          tags: ["Real Estate", "New"],
          status: "New",
          source: "Social Media"
        },
        {
          name: "David Chen",
          company: "Elevate Healthcare",
          email: "dchen@elevatehc.com",
          phone: "(555) 432-1098",
          position: "IT Director",
          tags: ["Healthcare", "Enterprise"],
          status: "In Progress",
          source: "Trade Show"
        },
        {
          name: "Rebecca Wilson",
          company: "Spectrum Builders",
          email: "rebecca@spectrumbuilders.com",
          phone: "(555) 876-5432",
          position: "Operations Manager",
          tags: ["Construction", "Small Business"],
          status: "Negotiation",
          source: "Email Campaign"
        }
      ];
      
      // Create each contact through the API
      for (const contact of sampleContacts) {
        await apiRequest("/api/crm/contacts", {
          method: "POST",
          body: JSON.stringify(contact),
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      
      toast({
        title: "Sample contacts created",
        description: "The database has been populated with sample contacts."
      });
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['/api/crm/contacts'] });
      
    } catch (error) {
      console.error("Error creating sample data:", error);
      toast({
        title: "Error",
        description: "Failed to create sample contacts. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Format the date to a relative time (e.g., "today", "yesterday", "2 days ago")
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };
  
  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact: CrmContact) => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: string | null) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch(status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-purple-100 text-purple-800";
      case "Qualified": return "bg-green-100 text-green-800";
      case "Proposal": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-orange-100 text-orange-800";
      case "Won": return "bg-emerald-100 text-emerald-800";
      case "Lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl overflow-hidden border border-gray-800">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full py-2 pl-10 pr-4 bg-[#1a1a1f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#14ffc8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-[#1a1a1f] border border-gray-700 rounded-md text-white hover:bg-[#1e1e24] transition-colors flex items-center gap-1">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="px-3 py-2 bg-[#1a1a1f] border border-gray-700 rounded-md text-white hover:bg-[#1e1e24] transition-colors flex items-center gap-1">
            <SortDesc size={16} />
            <span className="hidden sm:inline">Sort</span>
          </button>
          <button className="px-3 py-2 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8] transition-all duration-300 flex items-center gap-1">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Contact</span>
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a1a1f]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tags</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-[#1a1a1f]/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{contact.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  <div className="flex items-center">
                    <Building className="mr-2" size={14} />
                    {contact.company}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <Mail className="mr-2" size={14} />
                      {contact.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2" size={14} />
                      {contact.phone}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#8f00ff]/20 text-[#8f00ff]">
                        <Tags className="mr-1" size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{contact.lastContact}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-4 py-3 border-t border-gray-800 bg-[#1a1a1f]/50 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> contacts
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-[#1a1a1f] border border-gray-700 rounded-md text-white hover:bg-[#1e1e24] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-[#1a1a1f] border border-gray-700 rounded-md text-white hover:bg-[#1e1e24] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}