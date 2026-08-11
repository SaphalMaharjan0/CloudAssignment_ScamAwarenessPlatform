import React from 'react';
import { Users, FileText, Clock, CheckCircle2, ChevronRight, ShieldAlert, FileSearch, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const reportData = [
  { name: 'Jan', reports: 140 },
  { name: 'Feb', reports: 180 },
  { name: 'Mar', reports: 200 },
  { name: 'Apr', reports: 170 },
  { name: 'May', reports: 260 },
  { name: 'Jun', reports: 310 },
  { name: 'Jul', reports: 290 },
  { name: 'Aug', reports: 330 },
  { name: 'Sep', reports: 295 },
  { name: 'Oct', reports: 390 },
  { name: 'Nov', reports: 375 },
  { name: 'Dec', reports: 440 },
];

const userGrowthData = [
  { name: 'Jul', users: 1200 },
  { name: 'Aug', users: 1600 },
  { name: 'Sep', users: 2000 },
  { name: 'Oct', users: 2400 },
  { name: 'Nov', users: 2900 },
  { name: 'Dec', users: 3541 },
];

const latestReports = [
  { id: 'RPT-2024-0904', title: 'Fake SSS Website Collecting Credentials', category: 'Fake Website', author: 'Carlos Tan', time: 'Just now' },
  { id: 'RPT-2024-0903', title: 'GCash QR Code Swap Scam', category: 'Banking Scam', author: 'Elena Bautista', time: '10 min ago' },
  { id: 'RPT-2024-0902', title: 'Telegram Ponzi Investment Scheme', category: 'Investment Scam', author: 'Roberto Cruz', time: '32 min ago' },
  { id: 'RPT-2024-0901', title: 'Fake PLDT Customer Service', category: 'Phishing', author: 'Ana Reyes', time: '1 hr ago' },
  { id: 'RPT-2024-0900', title: 'Instagram Influencer Giveaway Scam', category: 'Social Media Scam', author: 'Juan Santos', time: '2 hr ago' },
];

export default function AdminOverviewPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1 text-sm">Platform overview and verification queue</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
            <Users size={18} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">3,541</h2>
          <p className="text-sm font-medium text-slate-700 mt-1">Total Users</p>
          <p className="text-xs text-slate-400 mt-1">+127 this month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-4 border border-slate-200">
            <FileText size={18} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">12,834</h2>
          <p className="text-sm font-medium text-slate-700 mt-1">Total Reports</p>
          <p className="text-xs text-slate-400 mt-1">+84 today</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm shadow-amber-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100/50 to-transparent rounded-bl-full" />
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100 relative z-10">
            <Clock size={18} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 relative z-10">247</h2>
          <p className="text-sm font-medium text-slate-700 mt-1 relative z-10">Pending Verification</p>
          <p className="text-xs text-amber-600 font-medium mt-1 relative z-10">Requires action</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 border border-green-100">
            <CheckCircle2 size={18} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">9,102</h2>
          <p className="text-sm font-medium text-slate-700 mt-1">Verified Reports</p>
          <p className="text-xs text-slate-400 mt-1">71% approval rate</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Per Month */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Reports Per Month</h3>
              <p className="text-xs text-slate-500 mt-1">2024 full year</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="reports" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-slate-900">User Growth</h3>
              <p className="text-xs text-slate-500 mt-1">Registered users last 6 months</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Latest Reports Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Latest Reports — Pending Review</h3>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
            View Queue <ChevronRight size={16} />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {latestReports.map((report) => (
            <div key={report.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{report.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100 flex items-center gap-1">
                    <ShieldAlert size={12} /> {report.category}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900">{report.title}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  By {report.author} · {report.time}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-semibold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> Approve
                </button>
                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-semibold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                  <Trash2 size={16} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
