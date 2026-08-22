import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, XCircle, MessageSquare, Clock, User, Download, Trash2 } from 'lucide-react';
import { scamReportApi } from '../../../api/scamReportApi';
import { adminApi } from '../../../api/adminApi';
import { ScamReport } from '../../../types/scamReport.types';

export default function ReportVerificationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<ScamReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    try {
      if (id) {
        const fullId = `RPT-${id}`;
        const data = await scamReportApi.getReportById(fullId);
        setReport(data);
      }
    } catch (error) {
      console.error("Failed to load report", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  const handleApprove = async () => {
    if (report && report.id) {
      try {
        await adminApi.updateReportStatus(report.id, 'Verified');
        fetchReport();
      } catch (error) {
        console.error("Failed to approve report", error);
      }
    }
  };

  const handleReject = async () => {
    if (report && report.id) {
      const reason = window.prompt("Please provide a reason for rejecting this report (this will be shown to the user):");
      if (reason === null) return;
      try {
        await adminApi.updateReportStatus(report.id, 'Rejected', reason);
        fetchReport();
      } catch (error) {
        console.error("Failed to reject report", error);
      }
    }
  };

  const handleDelete = async () => {
    if (report && report.id) {
      const reason = window.prompt("Please provide a reason for deleting this report (this will be shown to the user):");
      if (reason === null) return;
      try {
        await adminApi.updateReportStatus(report.id, 'Deleted', reason);
        navigate('/admin/reports');
      } catch (error) {
        console.error("Failed to delete report", error);
      }
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading report details...</div>;
  if (!report) return <div className="p-8 text-center text-slate-500">Report not found.</div>;

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 pb-24" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <button 
          onClick={() => navigate('/admin/reports')}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Report Verification</h1>
            <p className="text-slate-500 mt-1 text-sm">{report.id} · Submitted {new Date(report.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Details Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2.5 py-1 text-xs font-bold flex items-center gap-1 rounded-full ${
                report.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                report.status === 'Verified' ? 'bg-green-50 text-green-700 border border-green-200' :
                'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {report.status === 'Pending' && <Clock size={12} />}
                {report.status === 'Verified' && <CheckCircle2 size={12} />}
                {report.status === 'Rejected' && <XCircle size={12} />}
                {report.status}
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold">
                {typeof report.category === 'object' ? report.category?.name : (report.category as unknown as string)}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{report.title}</h2>
            
            <p className="text-slate-700 leading-relaxed text-sm mb-8">
              {report.description}
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Reported</h4>
                <p className="font-semibold text-slate-900 text-sm">{new Date(report.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</h4>
                <p className="font-semibold text-slate-900 text-sm">{report.platformUsed || 'Online'}</p>
              </div>
            </div>
          </div>

          {/* Evidence Images */}
          {report.documentUrls && report.documentUrls.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Evidence Images ({report.documentUrls.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {report.documentUrls.map((url, i) => (
                  <img key={i} src={url} alt={`Evidence ${i+1}`} className="w-full h-32 object-cover rounded-xl border border-slate-200" />
                ))}
              </div>
            </div>
          )}

          {/* Reporter Information */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0 uppercase text-xl font-bold">
              {report.reporter?.name?.[0] || '?'}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{report.reporter?.name || 'User'}</h3>
              <p className="text-sm text-slate-500 mt-1">{report.reporter?.email}</p>
            </div>
          </div>

        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-6">
          
          {/* Verification Panel */}
          {report.status === 'Pending' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6 text-sm">Verification Panel</h3>
              <div className="space-y-3">
                <button onClick={handleApprove} className="w-full flex items-center justify-center gap-2 py-3 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold transition-colors shadow-sm text-sm">
                  <CheckCircle2 size={18} /> Approve Report
                </button>
                <button onClick={handleReject} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold transition-colors text-sm">
                  <XCircle size={18} /> Reject Report
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold transition-colors shadow-sm text-sm">
                  <MessageSquare size={18} /> Request More Info
                </button>

              </div>
            </div>
          )}

          {/* Verification Notes */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Verification Notes</h3>
            <textarea 
              className="w-full p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none h-32 mb-4"
              placeholder="Add internal notes about this verification..."
            ></textarea>
            <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
              Save Notes
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-200 shadow-sm mt-6">
            <h3 className="font-bold text-red-900 mb-2 text-sm">Danger Zone</h3>
            <p className="text-red-700 text-xs mb-4">Permanently delete this report and all its associated evidence from the database.</p>
            <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-sm text-sm">
              <Trash2 size={18} /> Delete Report
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
