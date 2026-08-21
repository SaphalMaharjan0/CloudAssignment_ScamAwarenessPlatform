import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Database,
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X,
  Search,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { adminApi } from '../api/adminApi';
import { notificationApi } from '../api/notificationApi';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const stats = await adminApi.getStats();
        setPendingCount(stats.pendingReports || 0);

        const notifs = await notificationApi.getNotifications();
        // Assume admin notifications or just all unread
        setUnreadCount(notifs.filter(n => !n.isRead).length);
      } catch (error) {
        console.error("Failed to load layout stats", error);
      }
    };
    fetchCounts();
    
    // Optional: Set an interval to refresh counts every minute
    const intervalId = setInterval(fetchCounts, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white shadow-sm' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
          <NavLink to="/admin/overview" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-none">FraudGuard</span>
              <span className="text-[10px] font-bold text-blue-600 tracking-wider mt-1">ADMIN</span>
            </div>
          </NavLink>
          <button className="lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          
          <div>
            <h3 className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Management</h3>
            <div className="space-y-1">
              <NavLink to="/admin/overview" className={navLinkClasses}>
                <LayoutDashboard size={18} /> Overview
              </NavLink>
              <NavLink to="/admin/verify" className={navLinkClasses}>
                <FileCheck size={18} /> 
                <span className="flex-1">Verification Queue</span>
                {pendingCount > 0 && (
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>
                )}
              </NavLink>
              <NavLink to="/admin/reports" className={navLinkClasses}>
                <FileText size={18} /> All Reports
              </NavLink>
              <NavLink to="/admin/users" className={navLinkClasses}>
                <Users size={18} /> Users
              </NavLink>
            </div>
          </div>

          <div>
            <h3 className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Content</h3>
            <div className="space-y-1">
              <NavLink to="/admin/articles" className={navLinkClasses}>
                <FileText size={18} /> Articles
              </NavLink>
              <NavLink to="/admin/database" className={navLinkClasses}>
                <Database size={18} /> Scam Database
              </NavLink>
            </div>
          </div>

          <div>
            <h3 className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">System</h3>
            <div className="space-y-1">
              <NavLink to="/admin/notifications" className={navLinkClasses}>
                <Bell size={18} /> 
                <span className="flex-1">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{unreadCount}</span>
                )}
              </NavLink>
              <NavLink to="/admin/settings" className={navLinkClasses}>
                <Settings size={18} /> Settings
              </NavLink>
              <NavLink to="/admin/profile" className={navLinkClasses}>
                <User size={18} /> My Profile
              </NavLink>
            </div>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 mt-auto shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 sticky top-0 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={20} className="text-slate-500" />
            </button>
            
            <div className="hidden md:flex relative w-96">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search users, reports, articles..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/notifications')} className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            <div onClick={() => navigate('/admin/profile')} className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                MS
              </div>
              <span className="text-sm font-semibold text-slate-700 hidden sm:block">Maria Santos</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
