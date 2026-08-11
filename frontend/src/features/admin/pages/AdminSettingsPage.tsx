import React, { useState } from 'react';
import { Settings as SettingsIcon, FileText, Bell, Shield, AlertTriangle, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  // State for toggles
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoAssign, setAutoAssign] = useState(true);
  const [requireEvidence, setRequireEvidence] = useState(false);
  const [anonymousReporting, setAnonymousReporting] = useState(true);
  
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  
  const [require2FA, setRequire2FA] = useState(true);
  const [logActions, setLogActions] = useState(true);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 pb-28" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Global platform configuration</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Platform Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <SettingsIcon size={16} />
            </div>
            <h2 className="font-bold text-slate-900 text-sm">Platform Settings</h2>
          </div>
          <div className="divide-y divide-slate-100">
            
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Platform Name</h3>
              </div>
              <input type="text" defaultValue="ScamShield Philippines" className="w-full sm:w-64 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-right" />
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Support Email</h3>
              </div>
              <input type="email" defaultValue="support@scamshield.gov.ph" className="w-full sm:w-64 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-right" />
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Contact Phone</h3>
              </div>
              <input type="text" defaultValue="+63 2 8523 8231" className="w-full sm:w-64 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-right" />
            </div>

            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Maintenance Mode</h3>
                <p className="text-xs text-slate-500 mt-1">Temporarily take the platform offline for maintenance</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${maintenanceMode ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
          </div>
        </div>

        {/* Report Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileText size={16} />
            </div>
            <h2 className="font-bold text-slate-900 text-sm">Report Settings</h2>
          </div>
          <div className="divide-y divide-slate-100">
            
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Auto-assign reports to moderators</h3>
                <p className="text-xs text-slate-500 mt-1">Round-robin assignment when a new report is submitted</p>
              </div>
              <button 
                onClick={() => setAutoAssign(!autoAssign)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${autoAssign ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${autoAssign ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Require evidence uploads</h3>
                <p className="text-xs text-slate-500 mt-1">Users must attach at least one screenshot to submit</p>
              </div>
              <button 
                onClick={() => setRequireEvidence(!requireEvidence)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${requireEvidence ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${requireEvidence ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Max review time (hours)</h3>
              </div>
              <input type="number" defaultValue="48" className="w-full sm:w-32 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-right" />
            </div>

            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Anonymous reporting</h3>
                <p className="text-xs text-slate-500 mt-1">Allow users to submit reports without creating an account</p>
              </div>
              <button 
                onClick={() => setAnonymousReporting(!anonymousReporting)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${anonymousReporting ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${anonymousReporting ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Bell size={16} />
            </div>
            <h2 className="font-bold text-slate-900 text-sm">Notifications</h2>
          </div>
          <div className="divide-y divide-slate-100">
            
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Email new report alerts to admins</h3>
                <p className="text-xs text-slate-500 mt-1">Send an email to all admins when a new report is submitted</p>
              </div>
              <button 
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${emailAlerts ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Weekly digest email</h3>
                <p className="text-xs text-slate-500 mt-1">Send a weekly summary to all registered users</p>
              </div>
              <button 
                onClick={() => setWeeklyDigest(!weeklyDigest)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${weeklyDigest ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${weeklyDigest ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">SMS alerts for high-priority reports</h3>
                <p className="text-xs text-slate-500 mt-1">Send SMS to on-call moderators for High priority reports</p>
              </div>
              <button 
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${smsAlerts ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${smsAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Sender email address</h3>
              </div>
              <input type="email" defaultValue="noreply@scamshield.gov.ph" className="w-full sm:w-64 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-right" />
            </div>

          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Shield size={16} />
            </div>
            <h2 className="font-bold text-slate-900 text-sm">Security</h2>
          </div>
          <div className="divide-y divide-slate-100">
            
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Require 2FA for admin accounts</h3>
                <p className="text-xs text-slate-500 mt-1">All admin and moderator accounts must enable two-factor authentication</p>
              </div>
              <button 
                onClick={() => setRequire2FA(!require2FA)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${require2FA ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${require2FA ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Session timeout (minutes)</h3>
              </div>
              <input type="number" defaultValue="60" className="w-full sm:w-32 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-right" />
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Max login attempts before lockout</h3>
              </div>
              <input type="number" defaultValue="5" className="w-full sm:w-32 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-right" />
            </div>

            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Log all admin actions</h3>
                <p className="text-xs text-slate-500 mt-1">Maintain an audit trail of all admin operations</p>
              </div>
              <button 
                onClick={() => setLogActions(!logActions)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${logActions ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${logActions ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50/50 rounded-2xl border border-red-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-red-100 flex items-center gap-3 bg-red-50">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
            <h2 className="font-bold text-red-700 text-sm">Danger Zone</h2>
          </div>
          <div className="divide-y divide-red-100/50">
            
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Clear Report Cache</h3>
                <p className="text-xs text-slate-500 mt-1">Force-refresh all cached report data. This may temporarily slow the platform.</p>
              </div>
              <button className="px-4 py-2 bg-white border border-amber-200 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-50 transition-colors shrink-0">
                Clear Cache
              </button>
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Export All Data</h3>
                <p className="text-xs text-slate-500 mt-1">Download a full database export in CSV format. This may take several minutes.</p>
              </div>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shrink-0">
                Export
              </button>
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Reset Platform to Defaults</h3>
                <p className="text-xs text-slate-500 mt-1">This will erase all custom settings. This action cannot be undone.</p>
              </div>
              <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors shrink-0">
                Reset
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-slate-200 p-4 px-6 md:px-8 z-40 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="w-full max-w-4xl flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-sm">
          <Save size={18} /> Save All Settings
        </button>
      </div>

    </div>
  );
}
