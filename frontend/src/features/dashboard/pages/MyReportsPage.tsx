import React, { useEffect, useState } from 'react';
import { Eye, CheckCircle2, Clock, XCircle, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { scamReportApi } from '../../../api/scamReportApi';
import { ScamReport } from '../../../types/scamReport.types';
import { Link } from 'react-router-dom';

export default function MyReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const allReports = await scamReportApi.getReports();
        // For now we filter by reporter email, or show all if reporter not populated
        const myReports = allReports.filter(r => r.reporter?.email === user?.email || !r.reporter);
        setReports(myReports);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, [user]);

  const handleDeleteClick = (id: string) => {
    setReportToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!reportToDelete) return;
    try {
      await scamReportApi.deleteReport(reportToDelete);
      setReports(prev => prev.filter(r => r.id !== reportToDelete));
    } catch (error) {
      console.error("Failed to delete report", error);
      alert("Failed to delete report.");
    } finally {
      setDeleteModalOpen(false);
      setReportToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setReportToDelete(null);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading your reports...</div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Reports</h1>
          <p className="text-slate-500 mt-1">{reports.length} report{reports.length === 1 ? '' : 's'} submitted</p>
        </div>
        <Link to="/app/report" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
          <Plus size={18} />
          New Report
        </Link>
      </div>

      {/* List Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Reports List */}
        {reports.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            You haven't submitted any reports yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 font-semibold">{report.id?.substring(0, 8) || 'NEW'}</span>
                    
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                      report.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 
                      report.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {report.status === 'Verified' && <CheckCircle2 size={10} />}
                      {report.status === 'Pending' && <Clock size={10} />}
                      {report.status === 'Rejected' && <XCircle size={10} />}
                      {report.status === 'Deleted' && <Trash2 size={10} />}
                      {report.status}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      <Search size={10} /> {report.category?.name || 'Uncategorized'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 text-lg">{report.title}</h3>
                  
                  {report.adminFeedback && (report.status === 'Rejected' || report.status === 'Deleted') && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mt-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Admin Feedback</p>
                      <p className="text-sm text-slate-700">{report.adminFeedback}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Unknown date'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {report.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => window.location.href = `/app/report/${report.id}`}
                        className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all"
                        title="Edit Report"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => report.id && handleDeleteClick(report.id)}
                        className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-red-600 hover:border-red-200 hover:shadow-sm transition-all"
                        title="Delete Report"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                  <Link 
                    to={`/app/database/${report.id}`}
                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-600 hover:border-slate-300 hover:shadow-sm transition-all"
                    title="View Report Details"
                  >
                    <Eye size={18} />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Trash2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Delete Report</h3>
              <p className="text-sm text-slate-500">
                Are you sure you want to delete this report? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full pt-2">
                <button 
                  onClick={cancelDelete}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
