import React from 'react';
import { Eye, CheckCircle2, Clock, XCircle, Plus, Search } from 'lucide-react';

const myReports = [
  { id: 'RPT-2024-0891', title: 'BDO Phishing Email', category: 'Phishing', date: 'Dec 18, 2024', views: '1,243', status: 'Verified' },
  { id: 'RPT-2024-0875', title: 'Fake GCash Customer Support', category: 'SMS Scam', date: 'Dec 12, 2024', views: '-', status: 'Pending' },
  { id: 'RPT-2024-0862', title: 'Telegram Investment Group', category: 'Investment Scam', date: 'Dec 8, 2024', views: '432', status: 'Verified' },
  { id: 'RPT-2024-0841', title: 'Cloned Shopee Website', category: 'Fake Website', date: 'Dec 1, 2024', views: '-', status: 'Rejected' },
  { id: 'RPT-2024-0810', title: 'Fake DOLE Job Placement', category: 'Fake Job', date: 'Nov 22, 2024', views: '892', status: 'Verified' },
  { id: 'RPT-2024-0789', title: 'Romance Scammer via Facebook', category: 'Social Media Scam', date: 'Nov 15, 2024', views: '567', status: 'Verified' },
];

export default function MyReportsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Reports</h1>
          <p className="text-slate-500 mt-1">6 reports submitted</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
          <Plus size={18} />
          New Report
        </button>
      </div>

      {/* List Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Reports List */}
        <div className="divide-y divide-slate-100">
          {myReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 font-semibold">{report.id}</span>
                  
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                    report.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 
                    report.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {report.status === 'Verified' && <CheckCircle2 size={10} />}
                    {report.status === 'Pending' && <Clock size={10} />}
                    {report.status === 'Rejected' && <XCircle size={10} />}
                    {report.status}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <Search size={10} /> {report.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg">{report.title}</h3>
                
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {report.date}
                  </span>
                  {report.views !== '-' && (
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {report.views} views
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all">
                  <Eye size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
