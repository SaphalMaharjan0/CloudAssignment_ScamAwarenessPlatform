import React, { useEffect, useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle2, XCircle, ShieldAlert, ChevronRight, ChevronLeft, Clock, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scamReportApi } from '../../../api/scamReportApi';
import { adminApi } from '../../../api/adminApi';
import { ScamReport } from '../../../types/scamReport.types';

export default function AdminReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await scamReportApi.getReports();
      // Sort to show pending first, then by date desc
      data.sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      setReports(data);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await adminApi.updateReportStatus(id, 'Verified');
      fetchReports();
    } catch (error) {
      console.error("Failed to approve report", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminApi.updateReportStatus(id, 'Rejected');
      fetchReports();
    } catch (error) {
      console.error("Failed to reject report", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) return;
    try {
      await scamReportApi.deleteReport(id);
      fetchReports();
    } catch (error) {
      console.error("Failed to delete report", error);
    }
  };

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (r.id || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Reports</h1>
          <p className="text-slate-500 mt-1 text-sm">{reports.length} total reports in the system</p>
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
              {isLoading ? (
                <tr><td colSpan={8} className="p-8 text-center text-slate-500">Loading reports...</td></tr>
              ) : filteredReports.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-slate-500">No reports found</td></tr>
              ) : filteredReports.map((report) => (
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
                      <ShieldAlert size={12} /> {typeof report.category === 'object' ? report.category?.name : (report.category as unknown as string)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold uppercase">
                        {report.reporter?.name?.[0] || '?'}
                      </div>
                      <span className="text-sm text-slate-700 font-medium whitespace-nowrap">{report.reporter?.name || 'User'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{new Date(report.createdAt || Date.now()).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      report.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                      report.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {report.priority || 'Medium'}
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
                      <Link to={`/admin/verify/${(report.id || '').replace('RPT-', '')}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </Link>
                      {report.status === 'Pending' && (
                        <>
                          <button onClick={() => report.id && handleApprove(report.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                            <CheckCircle2 size={16} />
                          </button>
                          <button onClick={() => report.id && handleReject(report.id)} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Reject">
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      <button onClick={() => report.id && handleDelete(report.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
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
          <div>Showing {filteredReports.length} reports</div>
        </div>
      </div>
    </div>
  );
}
