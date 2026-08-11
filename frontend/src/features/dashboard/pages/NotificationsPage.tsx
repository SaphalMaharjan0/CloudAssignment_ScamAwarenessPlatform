import React from 'react';
import { ShieldAlert, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const notifications = [
  { 
    id: 1, 
    type: 'alert', 
    title: 'New Scam Alert in Your Area', 
    description: 'A new phishing scam targeting BDO users has been verified in Metro Manila.', 
    time: '2 hours ago',
    read: false
  },
  { 
    id: 2, 
    type: 'success', 
    title: 'Your Report Was Verified', 
    description: 'Your report #RPT-2024-0891 has been reviewed and verified by our team.', 
    time: '5 hours ago',
    read: false
  },
  { 
    id: 3, 
    type: 'info', 
    title: 'Weekly Scam Digest', 
    description: '12 new scams were reported in your area this week. Stay informed.', 
    time: '1 day ago',
    read: false
  },
  { 
    id: 4, 
    type: 'warning', 
    title: 'Report Needs More Information', 
    description: 'Our team needs additional evidence for your report #RPT-2024-0875.', 
    time: '2 days ago',
    read: true
  },
  { 
    id: 5, 
    type: 'success', 
    title: 'Account Verified', 
    description: 'Your email address has been successfully verified.', 
    time: '3 days ago',
    read: true
  },
  { 
    id: 6, 
    type: 'alert', 
    title: 'Suspicious Activity Detected', 
    description: 'An unfamiliar device attempted to log into your account from Cebu City.', 
    time: '4 days ago',
    read: true
  }
];

export default function NotificationsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1 text-sm">3 unread</p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Mark All Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-5 flex gap-4 transition-colors hover:bg-slate-50 cursor-pointer ${!notif.read ? 'bg-slate-50/50' : ''}`}>
            
            <div className="flex-shrink-0 mt-1">
              {notif.type === 'alert' && (
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                  <ShieldAlert size={14} strokeWidth={2.5} />
                </div>
              )}
              {notif.type === 'success' && (
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100">
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </div>
              )}
              {notif.type === 'info' && (
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                  <Info size={14} strokeWidth={2.5} />
                </div>
              )}
              {notif.type === 'warning' && (
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                  <AlertTriangle size={14} strokeWidth={2.5} />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  {notif.title}
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </h3>
              </div>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                {notif.description}
              </p>
              <span className="text-[11px] font-medium text-slate-400 mt-2 block">
                {notif.time}
              </span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
