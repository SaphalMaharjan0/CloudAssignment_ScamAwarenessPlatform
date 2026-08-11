import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle2, XCircle, ShieldAlert, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockReports = [
  { id: 'RPT-2024-0904', title: 'Fake SSS Website Collecting Credentia', category: 'Fake Website', reporter: 'Carlos Tan', initial: 'C', date: 'Dec 22, 2024', priority: 'High', status: 'Pending' },
  { id: 'RPT-2024-0903', title: 'GCash QR Code Swap at Palengke', category: 'Banking Scam', reporter: 'Elena Bautista', initial: 'E', date: 'Dec 22, 2024', priority: 'High', status: 'Pending' },
  { id: 'RPT-2024-0902', title: 'Telegram Ponzi Investment Scheme', category: 'Investment Scam', reporter: 'Roberto Cruz', initial: 'R', date: 'Dec 21, 2024', priority: 'Medium', status: 'Pending' },
  { id: 'RPT-2024-0901', title: 'Fake PLDT Customer Service Hotline', category: 'Phishing', reporter: 'Ana Reyes', initial: 'A', date: 'Dec 21, 2024', priority: 'Medium', status: 'Verified' },
  { id: 'RPT-2024-0900', title: 'Instagram Influencer Giveaway Scam', category: 'Social Media Scam', reporter: 'Juan Santos', initial: 'J', date: 'Dec 20, 2024', priority: 'Low', status: 'Verified' },
  { id: 'RPT-2024-0899', title: 'BDO Online Banking Phishing Email', category: 'Phishing', reporter: 'Maria Santos', initial: 'M', date: 'Dec 20, 2024', priority: 'High', status: 'Verified' },
  { id: 'RPT-2024-0898', title: 'Fake Shopee Seller Advance Payment', category: 'Fake Website', reporter: 'Rico Delos Santos', initial: 'R', date: 'Dec 19, 2024', priority: 'Low', status: 'Rejected' },
  { id: 'RPT-2024-0897', title: 'Overseas Job Placement Scam via Viber', category: 'Fake Job', reporter: 'Liza Coronel', initial: 'L', date: 'Dec 19, 2024', priority: 'High', status: 'Verified' },
  { id: 'RPT-2024-0896', title: 'Lottery Prize SMS Scam', category: 'SMS Scam', reporter: 'Bernard Tan', initial: 'B', date: 'Dec 18, 2024', priority: 'Medium', status: 'Pending' },
  { id: 'RPT-2024-0895', title: 'Fake Government AICS Cash Aid', category: 'Phishing', reporter: 'Grace Villanueva', initial: 'G', date: 'Dec 18, 2024', priority: 'High', status: 'Verified' },
];

export default function AdminReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Reports</h1>
          <p className="text-slate-500 mt-1 text-sm">10 total reports in the system</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or report ID..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Verified</option>
            <option>Rejected</option>
          </select>
          <select className="border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option>All Categories</option>
            <option>Phishing</option>
            <option>Investment Scam</option>
            <option>Fake Job</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-4">Report</th>
                <th className="p-4">Category</th>
                <th className="p-4">Reporter</th>
                <th className="p-4">Date</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-4">
                    <div className="text-[10px] font-bold text-slate-400 tracking-wider mb-0.5">{report.id}</div>
                    <div className="font-semibold text-slate-900 text-sm">{report.title}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap">
                      <ShieldAlert size={12} /> {report.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                        {report.initial}
                      </div>
                      <span className="text-sm text-slate-700 font-medium whitespace-nowrap">{report.reporter}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{report.date}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      report.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                      report.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      report.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      report.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {report.status === 'Pending' && <Clock size={12} />}
                      {report.status === 'Verified' && <CheckCircle2 size={12} />}
                      {report.status === 'Rejected' && <XCircle size={12} />}
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`/admin/verify/${report.id.replace('RPT-2024-', '')}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </Link>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                        <CheckCircle2 size={16} />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <div>Showing 10 of 10 reports</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-medium text-slate-700">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-medium text-slate-700">3</button>
            <span className="px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-medium text-slate-700">8</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
