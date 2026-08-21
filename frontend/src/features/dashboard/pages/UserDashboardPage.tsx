import React, { useEffect, useState } from 'react';
import { ShieldAlert, FileText, CheckCircle2, Clock, Users, ChevronRight, Eye } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { scamReportApi } from '../../../api/scamReportApi';
import { ScamReport } from '../../../types/scamReport.types';
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
  Cell
} from 'recharts';

const monthlyData = [
  { name: 'Jan', reports: 140 },
  { name: 'Feb', reports: 180 },
  { name: 'Mar', reports: 200 },
  { name: 'Apr', reports: 175 },
  { name: 'May', reports: 260 },
  { name: 'Jun', reports: 310 },
  { name: 'Jul', reports: 285 },
  { name: 'Aug', reports: 320 },
  { name: 'Sep', reports: 295 },
  { name: 'Oct', reports: 390 },
  { name: 'Nov', reports: 375 },
  { name: 'Dec', reports: 440 },
];

const categoryData = [
  { name: 'Phishing', value: 28, color: '#3b82f6' },
  { name: 'Investment', value: 22, color: '#22c55e' },
  { name: 'Fake Job', value: 18, color: '#eab308' },
  { name: 'Social Media', value: 15, color: '#ef4444' },
  { name: 'SMS Scam', value: 10, color: '#a855f7' },
  { name: 'Other', value: 7, color: '#06b6d4' },
];

const recentReports = [
  { id: 'RPT-2024-0891', title: 'BDO Phishing Email', category: 'Phishing', date: 'Dec 18, 2024', status: 'Verified' },
  { id: 'RPT-2024-0875', title: 'Fake GCash Support', category: 'SMS Scam', date: 'Dec 12, 2024', status: 'Pending' },
  { id: 'RPT-2024-0862', title: 'Investment Group TG', category: 'Investment Scam', date: 'Dec 8, 2024', status: 'Verified' },
  { id: 'RPT-2024-0841', title: 'Cloned Shopee Website', category: 'Fake Website', date: 'Dec 1, 2024', status: 'Rejected' },
];

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const allReports = await scamReportApi.getReports();
        setReports(allReports);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const dynamicCategoryData = React.useMemo(() => {
    if (!reports || reports.length === 0) return [];
    const counts = reports.reduce((acc, report) => {
      const catName = typeof report.category === 'object' ? report.category?.name : (report.category as unknown as string);
      const name = catName || 'Other';
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, count], index) => ({
        name,
        value: Math.round((count / reports.length) * 100),
        color: ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#a855f7', '#06b6d4'][index % 6]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [reports]);

  const dynamicMonthlyData = React.useMemo(() => {
    if (!reports) return [];
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCounts = months.map(name => ({ name, reports: 0 }));
    
    reports.forEach(report => {
      if (report.createdAt) {
        const date = new Date(report.createdAt);
        const monthIndex = date.getMonth(); // 0-11
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlyCounts[monthIndex].reports += 1;
        }
      }
    });
    
    return monthlyCounts;
  }, [reports]);

  const totalReports = reports.length;
  const verifiedReports = reports.filter(r => r.status === 'Verified').length;
  const pendingReports = reports.filter(r => r.status === 'Pending').length;
  const recentLiveReports = reports.slice(0, 4);

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Good morning, {user?.firstName || 'User'}. Here's what's happening.</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <ShieldAlert className="text-red-500 mt-0.5 md:mt-0 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-red-800">New Scam Alert: BDO Phishing Campaign</h3>
            <p className="text-sm text-red-600">Fraudulent emails claiming to be from BDO are circulating. Do not click any links.</p>
          </div>
        </div>
        <button className="text-sm font-semibold text-red-700 hover:text-red-800 whitespace-nowrap">
          View Details
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <FileText size={20} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{totalReports}</h3>
          <p className="text-sm font-medium text-slate-500">Total Reports</p>
          <p className="text-xs text-slate-400 mt-2">+2 this month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{verifiedReports}</h3>
          <p className="text-sm font-medium text-slate-500">Verified Reports</p>
          <p className="text-xs text-slate-400 mt-2">67% verified</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Clock size={20} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{pendingReports}</h3>
          <p className="text-sm font-medium text-slate-500">Pending Review</p>
          <p className="text-xs text-slate-400 mt-2">~48hr review time</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <Users size={20} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">
            {((verifiedReports * 142) + (totalReports * 15)).toLocaleString()}
          </h3>
          <p className="text-sm font-medium text-slate-500">Community Impact</p>
          <p className="text-xs text-slate-400 mt-2">estimated users warned</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Reports Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Monthly Reports</h3>
              <p className="text-sm text-slate-500">Last 12 months nationwide</p>
            </div>
            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">2024</span>
          </div>
          <div className="flex-1 w-full relative min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%" className="absolute inset-0">
              <BarChart data={dynamicMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="reports" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scam Categories Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <div className="mb-2">
            <h3 className="font-bold text-slate-900 text-lg">Scam Categories</h3>
            <p className="text-sm text-slate-500">Distribution of report types</p>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-6 min-h-[300px]">
            <div className="w-full sm:w-1/2 h-full min-h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%" className="absolute inset-0">
                <PieChart>
                  <Pie
                    data={dynamicCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {dynamicCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full sm:w-1/2">
              <div className="space-y-4">
                {dynamicCategoryData.length === 0 ? (
                  <div className="text-sm text-slate-500">No data available</div>
                ) : (
                  dynamicCategoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: category.color }} />
                        <span className="text-slate-700 truncate max-w-[120px]" title={category.name}>{category.name}</span>
                      </div>
                      <span className="font-semibold text-slate-900">{category.value}%</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">My Recent Reports</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <tbody>
              {recentLiveReports.map((report) => (
                <tr key={report.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono text-slate-400">{report.id}</span>
                      <span className="font-semibold text-slate-900">{report.title}</span>
                    </div>
                  </td>
                  <td className="p-4 md:px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {report.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="p-4 md:px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Unknown date'}
                  </td>
                  <td className="p-4 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      report.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 
                      report.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {report.status === 'Verified' && <CheckCircle2 size={12} />}
                      {report.status === 'Pending' && <Clock size={12} />}
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4 md:px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1.5 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
