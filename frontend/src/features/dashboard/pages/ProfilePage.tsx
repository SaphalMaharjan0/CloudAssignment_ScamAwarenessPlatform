import React, { useState } from 'react';
import { Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 pb-24" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold relative shrink-0">
          MS
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border border-slate-100 shadow-sm">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1">
              <CheckCircle2 size={12} strokeWidth={3} />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900">Maria Santos</h2>
          <p className="text-sm text-slate-500 mt-0.5">Verified Reporter · Member since Jan 2023</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
              Trusted Contributor
            </span>
            <span className="text-xs font-medium text-slate-400">
              12 reports · 8 verified
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        <h3 className="font-bold text-slate-900 text-lg">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">First Name</label>
            <input 
              type="text" 
              defaultValue="Maria"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Last Name</label>
            <input 
              type="text" 
              defaultValue="Santos"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="email" 
              defaultValue="maria.santos@gmail.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">Phone Number</label>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="tel" 
              defaultValue="+63 917 234 5678"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        <h3 className="font-bold text-slate-900 text-lg">Change Password</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Current Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">New Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Confirm New Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h3 className="font-bold text-slate-900 text-lg mb-6">Notification Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Email Notifications</h4>
              <p className="text-xs text-slate-400 mt-1">Receive scam alerts and report updates via email</p>
            </div>
            <button 
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-11 h-6 rounded-full transition-colors relative ${emailNotifications ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">SMS Alerts</h4>
              <p className="text-xs text-slate-400 mt-1">Get critical alerts via text message</p>
            </div>
            <button 
              onClick={() => setSmsAlerts(!smsAlerts)}
              className={`w-11 h-6 rounded-full transition-colors relative ${smsAlerts ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${smsAlerts ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Dark Mode</h4>
              <p className="text-xs text-slate-400 mt-1">Switch to a darker interface</p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm">
          Save Changes
        </button>
      </div>

    </div>
  );
}
