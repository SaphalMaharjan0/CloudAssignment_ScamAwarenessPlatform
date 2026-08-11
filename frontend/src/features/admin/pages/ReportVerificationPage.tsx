import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, XCircle, MessageSquare, Clock, User, Download } from 'lucide-react';

export default function ReportVerificationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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
            <p className="text-slate-500 mt-1 text-sm">RPT-2024-{id || '0902'} · Submitted 32 min ago</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Details Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold flex items-center gap-1">
                <Clock size={12} /> Pending
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold">
                Investment Scam
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Crypto Investment 'Double Your Money' Scheme</h2>
            
            <p className="text-slate-700 leading-relaxed text-sm mb-8">
              A Telegram group promises 300% returns on USDT deposits within 24 hours. Multiple victims have reported losing significant funds. Reporter provided screenshots of the Telegram group chat where promoters promised guaranteed returns. Multiple other users confirmed receiving the same messages. The group has since been deleted.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Reported</h4>
                <p className="font-semibold text-slate-900 text-sm">Dec 12, 2024</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</h4>
                <p className="font-semibold text-slate-900 text-sm">Online</p>
              </div>
            </div>
          </div>

          {/* Evidence Images */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Evidence Images (3)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Evidence 1" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Evidence 2" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Evidence 3" className="w-full h-32 object-cover rounded-xl border border-slate-200" />
            </div>
          </div>

          {/* Reporter Information */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
              <User size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Ana Reyes</h3>
              <p className="text-sm text-slate-500 mt-1">6 previous reports · 5 verified</p>
              <div className="flex items-center gap-1.5 mt-2 text-green-600">
                <CheckCircle2 size={14} />
                <span className="text-xs font-bold">83% accuracy rate</span>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-6">
          
          {/* Verification Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 text-sm">Verification Panel</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#059669] hover:bg-[#047857] text-white rounded-xl font-bold transition-colors shadow-sm text-sm">
                <CheckCircle2 size={18} /> Approve Report
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold transition-colors text-sm">
                <XCircle size={18} /> Reject Report
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold transition-colors shadow-sm text-sm">
                <MessageSquare size={18} /> Request More Info
              </button>
            </div>
          </div>

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

          {/* Verification History */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 text-sm">Verification History</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 -ml-2 md:ml-0 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:text-right">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Report submitted</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">by Ana Reyes (user)</span>
                    <span className="text-[10px] font-medium text-slate-400 mt-1">32 min ago</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 -ml-2 md:ml-0 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-even:text-right">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Assigned to reviewer</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">by System</span>
                    <span className="text-[10px] font-medium text-slate-400 mt-1">31 min ago</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 -ml-2 md:ml-0 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:text-right">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Evidence downloaded</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">by Admin Marcos</span>
                    <span className="text-[10px] font-medium text-slate-400 mt-1">15 min ago</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
