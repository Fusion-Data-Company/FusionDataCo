import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

export default function CRMAnalyticsDashboard() {
  // Sample data for the dashboard
  const leadsBySourceData = [
    { name: 'Website', value: 45, color: '#14ffc8' },
    { name: 'Social', value: 25, color: '#00ffff' },
    { name: 'Email', value: 15, color: '#8f00ff' },
    { name: 'Referral', value: 10, color: '#ff00ff' },
    { name: 'Other', value: 5, color: '#ff0080' },
  ];

  const conversionRateData = [
    { month: 'Jan', rate: 3.4 },
    { month: 'Feb', rate: 3.7 },
    { month: 'Mar', rate: 3.9 },
    { month: 'Apr', rate: 4.2 },
    { month: 'May', rate: 4.5 },
    { month: 'Jun', rate: 4.8 },
    { month: 'Jul', rate: 5.1 },
    { month: 'Aug', rate: 5.3 },
  ];

  const dealValueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
    { name: 'Jul', value: 72000 },
    { name: 'Aug', value: 78000 },
  ];

  const statusData = [
    { name: 'New', value: 25, color: '#0088FE' },
    { name: 'In Progress', value: 35, color: '#8f00ff' },
    { name: 'Qualified', value: 20, color: '#14ffc8' },
    { name: 'Proposal', value: 10, color: '#ff0080' },
    { name: 'Negotiation', value: 5, color: '#ff00ff' },
    { name: 'Won', value: 3, color: '#00ffff' },
    { name: 'Lost', value: 2, color: '#FF0000' },
  ];

  return (
    <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 overflow-hidden">
      <h3 className="font-['Orbitron'] text-2xl font-bold mb-8 text-white text-center">
        Marketing &amp; Sales <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Analytics</span>
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leads by Source */}
        <div className="bg-[#1a1a1f]/80 p-6 rounded-lg border border-gray-800">
          <h4 className="text-white text-lg font-semibold mb-4">Leads by Source</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsBySourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={1}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {leadsBySourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.2)" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} leads`, 'Count']}
                  contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span style={{ color: '#999' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Deal Status */}
        <div className="bg-[#1a1a1f]/80 p-6 rounded-lg border border-gray-800">
          <h4 className="text-white text-lg font-semibold mb-4">Deal Status Distribution</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} deals`, 'Count']}
                  contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span style={{ color: '#999' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Conversion Rate */}
        <div className="bg-[#1a1a1f]/80 p-6 rounded-lg border border-gray-800">
          <h4 className="text-white text-lg font-semibold mb-4">Lead Conversion Rate (%)</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionRateData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Conversion Rate']}
                  contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#14ffc8" 
                  strokeWidth={2} 
                  dot={{ fill: '#14ffc8', strokeWidth: 2, r: 4, strokeDasharray: '' }}
                  activeDot={{ r: 6, fill: '#14ffc8', stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Deal Value Over Time */}
        <div className="bg-[#1a1a1f]/80 p-6 rounded-lg border border-gray-800">
          <h4 className="text-white text-lg font-semibold mb-4">Deal Value Over Time ($)</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dealValueData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Deal Value']}
                  contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#00ffff" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-[#1a1a1f]/80 p-6 rounded-lg border border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 p-4 rounded-lg border border-[#14ffc8]/30">
            <p className="text-gray-400 text-sm">Total Leads</p>
            <h4 className="text-white text-2xl font-bold mt-1">547</h4>
            <p className="text-[#14ffc8] text-xs mt-2">+16% from last month</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#00ffff]/20 to-[#00ffff]/5 p-4 rounded-lg border border-[#00ffff]/30">
            <p className="text-gray-400 text-sm">Conversion Rate</p>
            <h4 className="text-white text-2xl font-bold mt-1">5.3%</h4>
            <p className="text-[#00ffff] text-xs mt-2">+0.2% from last month</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#8f00ff]/20 to-[#8f00ff]/5 p-4 rounded-lg border border-[#8f00ff]/30">
            <p className="text-gray-400 text-sm">Avg. Deal Size</p>
            <h4 className="text-white text-2xl font-bold mt-1">$15,200</h4>
            <p className="text-[#8f00ff] text-xs mt-2">+8% from last month</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#ff00ff]/20 to-[#ff00ff]/5 p-4 rounded-lg border border-[#ff00ff]/30">
            <p className="text-gray-400 text-sm">Sales Cycle</p>
            <h4 className="text-white text-2xl font-bold mt-1">24 Days</h4>
            <p className="text-[#ff00ff] text-xs mt-2">-3 days from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}