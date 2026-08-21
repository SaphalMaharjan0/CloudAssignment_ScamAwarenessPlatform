import React, { useEffect, useState } from 'react';
import { ShieldAlert, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { notificationApi } from '../../../api/notificationApi';
import { Notification } from '../../../types/notification.types';
import { useAuth } from '../../../context/AuthContext';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationApi.getNotifications();
        // Filter for this user
        setNotifications(data.filter(n => n.user?.email === user?.email || !n.user));
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1 text-sm">{unreadCount} unread</p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Mark All Read
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
          You have no notifications yet.
        </div>
      ) : (
        /* Notifications List */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-5 flex gap-4 transition-colors hover:bg-slate-50 cursor-pointer ${!notif.isRead ? 'bg-slate-50/50' : ''}`}>
              
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
                {(notif.type === 'info' || !notif.type) && (
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
                    {!notif.isRead && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <span className="text-[11px] font-medium text-slate-400 mt-2 block">
                  {notif.createdAt ? new Date(notif.createdAt).toLocaleDateString() : 'Unknown date'}
                </span>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
