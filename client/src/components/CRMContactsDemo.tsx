import { useState } from "react";
import { 
  Phone, Mail, Building, Tags, MoreHorizontal, Search, Plus, Filter, 
  SortDesc, Loader2, AlertCircle, Users, Star, Mail as MailIcon, 
  PhoneCall, Calendar, FileEdit, Eye, Trash2, UserPlus, ArrowUpDown, 
  CheckCircle2, Table, SquareStack
} from "lucide-react";
import { useCrmContacts } from "@/hooks/use-crm-contacts";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CrmContact } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

export default function CRMContactsDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
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
          source: "Website",
          notes: "Interested in our full enterprise suite, scheduled for follow-up demo next week",
          lastContactDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        },
        {
          name: "Michael Reynolds",
          company: "Quantum Marketing",
          email: "michael@quantummarketing.com",
          phone: "(555) 987-6543",
          position: "CEO",
          tags: ["Agency", "Growth Plan"],
          status: "Proposal",
          source: "Referral",
          notes: "Sent proposal on enterprise plan with custom integrations. Very positive about our automation features",
          lastContactDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // Yesterday
        },
        {
          name: "Elena Ramirez",
          company: "Pinnacle Realty",
          email: "elena@pinnaclereal.com",
          phone: "(555) 765-4321",
          position: "Agent",
          tags: ["Real Estate", "New"],
          status: "New",
          source: "Social Media",
          notes: "Looking for a solution to automate client follow-ups and property notifications",
          lastContactDate: new Date() // Today
        },
        {
          name: "David Chen",
          company: "Elevate Healthcare",
          email: "dchen@elevatehc.com",
          phone: "(555) 432-1098",
          position: "IT Director",
          tags: ["Healthcare", "Enterprise"],
          status: "In Progress",
          source: "Trade Show",
          notes: "Concerned about HIPAA compliance and data security. Need to provide additional documentation",
          lastContactDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        },
        {
          name: "Rebecca Wilson",
          company: "Spectrum Builders",
          email: "rebecca@spectrumbuilders.com",
          phone: "(555) 876-5432",
          position: "Operations Manager",
          tags: ["Construction", "Small Business"],
          status: "Negotiation",
          source: "Email Campaign",
          notes: "Looking for pricing flexibility and custom onboarding for their team of 15",
          lastContactDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
        },
        {
          name: "James Martinez",
          company: "Horizon Financial",
          email: "james.m@horizonfin.com",
          phone: "(555) 234-5678",
          position: "Financial Advisor",
          tags: ["Financial", "Premium"],
          status: "Won",
          source: "Conference",
          notes: "Signed 2-year contract for our premium plan. Reference customer for financial vertical.",
          lastContactDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        }
      ];
      
      // Create each contact through the API
      for (const contact of sampleContacts) {
        await apiRequest("/api/crm/contacts", "POST", contact);
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
  
  // Sort contacts based on sort field and direction
  const sortedContacts = [...contacts].sort((a, b) => {
    const aVal = a[sortField as keyof CrmContact];
    const bVal = b[sortField as keyof CrmContact];
    
    // Handle null or undefined values
    if (!aVal && !bVal) return 0;
    if (!aVal) return sortDirection === "asc" ? -1 : 1;
    if (!bVal) return sortDirection === "asc" ? 1 : -1;
    
    // Convert to lowercase for string comparison
    const aCompare = typeof aVal === 'string' ? aVal.toLowerCase() : aVal;
    const bCompare = typeof bVal === 'string' ? bVal.toLowerCase() : bVal;
    
    // Compare based on sort direction
    if (aCompare < bCompare) return sortDirection === "asc" ? -1 : 1;
    if (aCompare > bCompare) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  
  // Filter contacts based on search term
  const filteredContacts = sortedContacts.filter((contact: CrmContact) => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  
  // Toggle sort field and direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Toggle selection of a contact
  const toggleSelectContact = (id: number) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };
  
  // Toggle selection of all contacts
  const toggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };
  
  const getStatusColor = (status: string | null) => {
    if (!status) return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    
    switch(status) {
      case "New": return "bg-primary/10 text-primary border border-primary/20";
      case "In Progress": return "bg-secondary/10 text-secondary border border-secondary/20";
      case "Qualified": return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      case "Proposal": return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case "Negotiation": return "bg-orange-500/10 text-orange-500 border border-orange-500/20";
      case "Won": return "bg-green-500/10 text-green-500 border border-green-500/20";
      case "Lost": return "bg-red-500/10 text-red-500 border border-red-500/20";
      default: return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };
  
  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
    const tags = {
      "Enterprise": "bg-primary/10 text-primary border border-primary/20",
      "SaaS": "bg-secondary/10 text-secondary border border-secondary/20",
      "Hot Lead": "bg-red-500/10 text-red-500 border border-red-500/20",
      "Agency": "bg-purple-500/10 text-purple-500 border border-purple-500/20",
      "Growth Plan": "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
      "Real Estate": "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      "New": "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      "Healthcare": "bg-teal-500/10 text-teal-500 border border-teal-500/20",
      "Small Business": "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20",
      "Construction": "bg-orange-500/10 text-orange-500 border border-orange-500/20",
      "Financial": "bg-green-500/10 text-green-500 border border-green-500/20",
      "Premium": "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    };
    
    return tags[tag as keyof typeof tags] || "bg-gray-500/10 text-gray-400 border border-gray-500/20";
  };
  
  return (
    <div className="titanium-panel rounded-xl overflow-hidden shadow-xl">
      {/* Toolbar */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between items-center bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {selectedContacts.length > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedContacts.length} selected</span>
              <button className="p-2 text-muted-foreground hover:text-destructive rounded-md hover:bg-destructive/10 transition-colors">
                <Trash2 size={16} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
                <Mail size={16} />
              </button>
              <button 
                className="p-2 text-muted-foreground hover:text-accent rounded-md hover:bg-accent/10 transition-colors"
                onClick={() => setSelectedContacts([])}
              >
                <CheckCircle2 size={16} />
              </button>
            </div>
          ) : (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search contacts..."
                className="w-full py-2 pl-10 pr-4 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <div className="flex rounded-md overflow-hidden border border-border">
            <button 
              className={`p-2 ${viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-muted-foreground hover:bg-muted/70'} transition-colors flex items-center`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <Table size={16} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'cards' ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-muted-foreground hover:bg-muted/70'} transition-colors flex items-center`}
              onClick={() => setViewMode('cards')}
              title="Card view"
            >
              <SquareStack size={16} />
            </button>
          </div>
          
          <button className="px-3 py-2 bg-muted/30 border border-border rounded-md text-foreground hover:bg-muted/70 transition-colors flex items-center gap-1 hover-edge-glow">
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          
          <button 
            className="px-3 py-2 bg-primary text-primary-foreground rounded-md font-medium shadow-md flex items-center gap-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            onClick={() => createSampleData()}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <UserPlus size={16} />
            <span className="hidden sm:inline">Add Contact</span>
          </button>
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-32 bg-card/30 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-foreground text-lg">Loading contacts...</p>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {isError && (
        <div className="flex items-center justify-center py-32 bg-card/30 backdrop-blur-sm">
          <div className="glass-panel p-8 rounded-xl max-w-md">
            <div className="flex flex-col items-center">
              <AlertCircle className="w-12 h-12 text-destructive mb-4" />
              <p className="text-foreground text-lg font-semibold mb-2">Failed to load contacts</p>
              <p className="text-muted-foreground text-center mb-6">{error?.toString() || "An unknown error occurred"}</p>
              <button 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/crm/contacts'] })}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {!isLoading && !isError && filteredContacts.length === 0 && (
        <div className="flex items-center justify-center py-32 bg-card/30 backdrop-blur-sm">
          <div className="glass-panel p-8 rounded-xl max-w-md">
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <p className="text-foreground text-lg font-semibold mb-2">No contacts found</p>
              <p className="text-muted-foreground text-center mb-6">
                {searchTerm ? "Try a different search term" : "Create some contacts to get started"}
              </p>
              {!searchTerm && (
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => createSampleData()}
                >
                  Create Sample Data
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Table View */}
      {!isLoading && !isError && filteredContacts.length > 0 && viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 backdrop-blur-sm">
                <th className="pl-4 pr-2 py-3 text-left">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-border text-primary focus:ring-primary/30 bg-muted/30 h-4 w-4 cursor-pointer"
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    onClick={() => toggleSort('name')}
                  >
                    Name
                    {sortField === 'name' && (
                      <ArrowUpDown size={14} className={`${sortDirection === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    onClick={() => toggleSort('company')}
                  >
                    Company
                    {sortField === 'company' && (
                      <ArrowUpDown size={14} className={`${sortDirection === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    onClick={() => toggleSort('status')}
                  >
                    Status
                    {sortField === 'status' && (
                      <ArrowUpDown size={14} className={`${sortDirection === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    onClick={() => toggleSort('lastContactDate')}
                  >
                    Last Contact
                    {sortField === 'lastContactDate' && (
                      <ArrowUpDown size={14} className={`${sortDirection === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredContacts.map((contact: CrmContact) => (
                <tr key={contact.id} className="hover:bg-muted/20 transition-colors hover-edge-glow group">
                  <td className="pl-4 pr-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-border text-primary focus:ring-primary/30 bg-muted/30 h-4 w-4 cursor-pointer"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleSelectContact(contact.id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{contact.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Building className="mr-2 text-secondary/70" size={14} />
                      {contact.company || "N/A"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <Mail className="mr-2 text-primary/70" size={14} />
                        {contact.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 text-accent/70" size={14} />
                        {contact.phone || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags && contact.tags.map((tag: string, idx: number) => (
                        <span key={idx} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                          <Tags className="mr-1" size={10} />
                          {tag}
                        </span>
                      ))}
                      {(!contact.tags || contact.tags.length === 0) && (
                        <span className="text-xs text-muted-foreground">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                      {contact.status || "None"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(contact.lastContactDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="View details">
                        <Eye size={15} />
                      </button>
                      <button className="p-1 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors" title="Edit contact">
                        <FileEdit size={15} />
                      </button>
                      <button className="p-1 rounded-full text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors" title="More options">
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {!isLoading && !isError && filteredContacts.length > 0 && viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-card/30 backdrop-blur-sm">
          {filteredContacts.map((contact: CrmContact) => (
            <div key={contact.id} className="enterprise-card group">
              <div className="glow-wrapper"></div>
              <div className="enterprise-card-content">
              <div className="flex items-center justify-between p-4 border-b border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{contact.name}</h3>
                    <p className="text-xs text-muted-foreground">{contact.position || 'No position'}</p>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status || "None"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center text-sm">
                    <Building className="mr-2 text-secondary/70" size={14} />
                    <span className="text-muted-foreground">{contact.company || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 text-primary/70" size={14} />
                    <span className="text-muted-foreground">{contact.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 text-accent/70" size={14} />
                    <span className="text-muted-foreground">{contact.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 text-muted-foreground" size={14} />
                    <span className="text-muted-foreground">Last contact: {formatDate(contact.lastContactDate)}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {contact.tags && contact.tags.map((tag: string, idx: number) => (
                    <span key={idx} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                      <Tags className="mr-1" size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-border/30 p-2 flex items-center justify-end bg-muted/10 opacity-70 group-hover:opacity-100 transition-opacity">
                <button className="p-1 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="View details">
                  <Eye size={15} />
                </button>
                <button className="p-1 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors" title="Edit contact">
                  <FileEdit size={15} />
                </button>
                <button className="p-1 rounded-full text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors" title="More options">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && !isError && filteredContacts.length > 0 && (
        <div className="px-4 py-3 border-t border-border bg-muted/30 backdrop-blur-sm flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1</span> to <span className="font-medium text-foreground">{filteredContacts.length}</span> of <span className="font-medium text-foreground">{filteredContacts.length}</span> contacts
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-muted/30 border border-border rounded-md text-foreground hover:bg-muted/70 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-muted/30 border border-border rounded-md text-foreground hover:bg-muted/70 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}