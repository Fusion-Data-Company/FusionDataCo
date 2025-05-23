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
  Line,
  Area
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
    <div className="chrome-panel rounded-xl p-8 shadow-xl overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-5 h-5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M8 17.5V8c0-.828.672-1.5 1.5-1.5h0c.828 0 1.5.672 1.5 1.5v9.5" />
              <path d="M13 17.5V13c0-.828.672-1.5 1.5-1.5h0c.828 0 1.5.672 1.5 1.5v4.5" />
            </svg>
          </div>
          <h3 className="font-['Orbitron'] text-2xl font-semibold text-foreground">
            Enterprise <span className="text-gradient-primary">Analytics Dashboard</span>
          </h3>
        </div>
        
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-8 mx-auto"></div>
      
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div 
              key={index} 
              className="enterprise-card p-5 animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="glow-wrapper"></div>
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5" style={{ backgroundColor: metric.color }}></div>
              <div className="flex items-center mb-3 enterprise-card-content">
                <div className="w-8 h-8 rounded-lg bg-card/80 border border-white/5 flex items-center justify-center mr-3">
                  <div className="w-4 h-4" style={{ color: metric.color }}>
                    {metric.title === "Total Leads" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {metric.title === "Conversion Rate" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 3 21 3 21 8" />
                        <line x1="4" y1="20" x2="21" y2="3" />
                        <polyline points="21 16 21 21 16 21" />
                        <line x1="15" y1="15" x2="21" y2="21" />
                        <line x1="4" y1="4" x2="9" y2="9" />
                      </svg>
                    )}
                    {metric.title === "Avg. Deal Size" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    )}
                    {metric.title === "Sales Cycle" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm font-medium">{metric.title}</p>
              </div>
              <div className="flex items-baseline mt-1">
                <h4 className="text-foreground text-3xl font-semibold" style={{ color: metric.color }}>
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
                <div className={`w-5 h-5 rounded-full ${metric.trend === 'up' ? 'bg-emerald-500/10' : 'bg-rose-500/10'} flex items-center justify-center mr-1`}>
                  <span>{metric.trend === 'up' ? '↑' : '↓'}</span>
                </div>
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
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Leads by Source */}
        <div className="enterprise-card p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="glow-wrapper"></div>
          <div className="enterprise-card-content">
            <div className="flex items-center mb-4 border-b border-border/30 pb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-4 h-4">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
              </div>
              <h4 className="text-foreground text-lg font-semibold">
                Lead Acquisition Channels
              </h4>
            </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsBySourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={1}
                  stroke="var(--card)"
                >
                  {leadsBySourceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="hover-edge-glow"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} leads`, 'Volume']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    color: 'var(--foreground)',
                    padding: '8px 12px',
                    border: '1px solid var(--border)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => (
                    <span style={{ 
                      color: 'var(--foreground)',
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: 'var(--card)',
                      border: '1px solid var(--border)'
                    }}>
                      {value}
                    </span>
                  )}
                  iconSize={8}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Deal Status */}
        <div className="enterprise-card p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="glow-wrapper"></div>
          <div className="enterprise-card-content">
            <div className="flex items-center mb-4 border-b border-border/30 pb-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent w-4 h-4">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-4-4h-2" />
                <path d="M16 3v4" />
                <path d="M20 5h-8" />
              </svg>
            </div>
            <h4 className="text-foreground text-lg font-semibold">
              Pipeline Stage Distribution
            </h4>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={1}
                  stroke="var(--card)"
                >
                  {statusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="hover-edge-glow"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} opportunities`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    color: 'var(--foreground)',
                    padding: '8px 12px',
                    border: '1px solid var(--border)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => (
                    <span style={{ 
                      color: 'var(--foreground)',
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: 'var(--card)',
                      border: '1px solid var(--border)'
                    }}>
                      {value}
                    </span>
                  )}
                  iconSize={8}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Conversion Rate */}
        <div className="enterprise-card p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center mb-4 border-b border-border/30 pb-2">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary w-4 h-4">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <h4 className="text-foreground text-lg font-semibold">
              Lead Conversion Trends (%)
            </h4>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionRateData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={{ stroke: 'var(--border)' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Conversion Rate']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    color: 'var(--foreground)',
                    padding: '8px 12px',
                    border: '1px solid var(--border)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--accent)"
                  fillOpacity={1}
                  fill="url(#colorRate)"
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
                    stroke: 'var(--card)',
                    className: 'animate-pulse-glow'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Deal Value Over Time */}
        <div className="enterprise-card p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center mb-4 border-b border-border/30 pb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-4 h-4">
                <rect width="15" height="10" x="3" y="8" rx="1" />
                <path d="M17 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
                <path d="M10 8V5" />
                <path d="M20 12h-9" />
                <path d="M9 16h1" />
                <path d="M13 16h1" />
              </svg>
            </div>
            <h4 className="text-foreground text-lg font-semibold">
              Monthly Deal Value ($)
            </h4>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dealValueData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={{ stroke: 'var(--border)' }}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Deal Value']}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    color: 'var(--foreground)',
                    padding: '8px 12px',
                    border: '1px solid var(--border)'
                  }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#colorValue)" 
                  radius={[6, 6, 0, 0]} 
                  barSize={26}
                  className="hover-edge-glow"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}