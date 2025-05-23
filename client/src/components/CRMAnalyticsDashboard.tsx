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
    { name: 'Website', value: 45, color: 'var(--primary)' },
    { name: 'Social', value: 25, color: 'var(--accent)' },
    { name: 'Email', value: 15, color: 'var(--secondary)' },
    { name: 'Referral', value: 10, color: '#47a3ff' },
    { name: 'Other', value: 5, color: '#7e7e8f' },
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
    { month: 'Sep', rate: 5.7 },
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
    { name: 'Sep', value: 85000 },
  ];

  const statusData = [
    { name: 'New', value: 25, color: 'var(--primary)' },
    { name: 'In Progress', value: 35, color: 'var(--secondary)' },
    { name: 'Qualified', value: 20, color: '#47a3ff' },
    { name: 'Proposal', value: 10, color: '#23a6d5' },
    { name: 'Negotiation', value: 5, color: '#7e7e8f' },
    { name: 'Won', value: 3, color: '#3a3e49' },
    { name: 'Lost', value: 2, color: '#e54b4b' },
  ];
  
  // Performance metrics with previous period comparison
  const performanceMetrics = [
    { 
      title: "Total Leads", 
      value: 547, 
      change: 16, 
      trend: "up", 
      period: "month", 
      color: "var(--primary)" 
    },
    { 
      title: "Conversion Rate", 
      value: 5.3, 
      change: 0.2, 
      trend: "up", 
      period: "month", 
      color: "var(--accent)",
      format: "percent"
    },
    { 
      title: "Avg. Deal Size", 
      value: 15200, 
      change: 8, 
      trend: "up", 
      period: "month", 
      color: "var(--secondary)",
      format: "currency"
    },
    { 
      title: "Sales Cycle", 
      value: 24, 
      change: 3, 
      trend: "down", 
      period: "month", 
      color: "#47a3ff",
      format: "days"
    },
  ];

  return (
    <div className="titanium-panel rounded-xl p-8 shadow-xl overflow-hidden">
      <h3 className="font-['Orbitron'] text-2xl font-semibold mb-8 text-foreground text-center">
        Marketing &amp; Sales <span className="text-primary text-shadow-titanium">Analytics</span>
      </h3>
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="glass-panel rounded-lg p-5 relative overflow-hidden hover-edge-glow">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5" style={{ backgroundColor: metric.color }}></div>
            <p className="text-muted-foreground text-sm">{metric.title}</p>
            <div className="flex items-baseline mt-1">
              <h4 className="text-foreground text-2xl font-semibold">
                {metric.format === "currency" && "$"}
                {metric.format === "currency" 
                  ? metric.value.toLocaleString() 
                  : metric.value}
                {metric.format === "percent" && "%"}
              </h4>
              <span className="text-xs ml-1 text-muted-foreground">
                {metric.format === "days" && "days"}
              </span>
            </div>
            <div className={`flex items-center text-xs mt-2 ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              <span className="mr-1">{metric.trend === 'up' ? '↑' : '↓'}</span>
              <span>
                {metric.trend === 'down' && metric.title === 'Sales Cycle' ? '-' : '+'}
                {metric.change}
                {metric.format === "percent" ? "%" : ""}
                {metric.format === "days" ? " days" : "%"}
              </span>
              <span className="ml-1 text-muted-foreground">from last {metric.period}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leads by Source */}
        <div className="glass-panel p-6 rounded-lg">
          <h4 className="text-foreground text-lg font-semibold mb-4 border-b border-border/30 pb-2">
            Leads by Source
          </h4>
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
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.05)" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} leads`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    color: 'var(--foreground)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span style={{ color: 'var(--muted-foreground)' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Deal Status */}
        <div className="glass-panel p-6 rounded-lg">
          <h4 className="text-foreground text-lg font-semibold mb-4 border-b border-border/30 pb-2">
            Deal Status Distribution
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={1}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.05)" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} deals`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    color: 'var(--foreground)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span style={{ color: 'var(--muted-foreground)' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Conversion Rate */}
        <div className="glass-panel p-6 rounded-lg">
          <h4 className="text-foreground text-lg font-semibold mb-4 border-b border-border/30 pb-2">
            Lead Conversion Rate (%)
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionRateData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Conversion Rate']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    color: 'var(--foreground)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="var(--accent)" 
                  strokeWidth={2} 
                  dot={{ 
                    fill: 'var(--card)', 
                    strokeWidth: 2, 
                    r: 4, 
                    stroke: 'var(--accent)' 
                  }}
                  activeDot={{ 
                    r: 6, 
                    fill: 'var(--accent)', 
                    stroke: 'var(--card)'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Deal Value Over Time */}
        <div className="glass-panel p-6 rounded-lg">
          <h4 className="text-foreground text-lg font-semibold mb-4 border-b border-border/30 pb-2">
            Deal Value Over Time ($)
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dealValueData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Deal Value']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    color: 'var(--foreground)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="var(--primary)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                >
                  {dealValueData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`var(--primary)`} 
                      opacity={0.5 + (index * 0.5 / dealValueData.length)} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}