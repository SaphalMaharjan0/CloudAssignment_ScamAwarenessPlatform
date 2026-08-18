import React, { useState } from 'react';
import { Mail, Lock, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { authApi } from '../../../api/authApi';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Form states
  const [editName, setEditName] = useState(user?.name || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : (user?.email || 'User')));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Derive display names
  const userName = user?.name || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : (user?.email || 'User'));
  const userInitials = user?.name 
    ? user.name.substring(0, 2).toUpperCase()
    : (user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'U');

  const handleSave = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedUser = await authApi.updateProfile({
        name: editName,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined
      });
      
      updateUser(updatedUser);
      setSuccessMessage("Profile updated successfully!");
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      console.error("Failed to update profile", error);
      setErrorMessage(error?.response?.data || error.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 pb-24" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-6 right-6 z-50 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all animate-fade-in">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-semibold text-sm">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="ml-2 text-green-600 hover:text-green-800">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Error Toast */}
      {errorMessage && (
        <div className="fixed top-6 right-6 z-50 bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all animate-fade-in">
          <X size={20} className="text-red-500 bg-red-100 rounded-full p-0.5" />
          <span className="font-semibold text-sm">{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="ml-2 text-red-600 hover:text-red-800">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your account settings</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold relative shrink-0 uppercase">
          {userInitials}
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border border-slate-100 shadow-sm">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1">
              <CheckCircle2 size={12} strokeWidth={3} />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-900">{userName}</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Verified Reporter'}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
              Active Account
            </span>
            <span className="text-xs font-medium text-slate-400">
              {user?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        <h3 className="font-bold text-slate-900 text-lg">Personal Information</h3>
        
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">Full Name</label>
          <input 
            type="text" 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="email" 
              defaultValue={user?.email || ''}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
              disabled
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
        <button 
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm disabled:bg-blue-400"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  );
}
