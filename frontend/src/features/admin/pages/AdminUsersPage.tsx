import React, { useState } from 'react';
import { Search, Plus, CheckCircle2, UserCircle, Users, AlertTriangle, ShieldCheck, Edit2, Ban, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const mockUsers = [
  { id: '#1001', name: 'Maria Santos', email: 'maria.santos@gmail.com', phone: '+63 917 234 5678', role: 'Reporter', reports: 12, joined: 'Jan 15, 2023', status: 'Active', verified: true, initial: 'MS' },
  { id: '#1002', name: 'Juan dela Cruz', email: 'jdelacruz@yahoo.com', phone: '+63 918 345 6789', role: 'Reporter', reports: 8, joined: 'Mar 3, 2023', status: 'Active', verified: true, initial: 'JC' },
  { id: '#1003', name: 'Ana Reyes', email: 'ana.reyes@gmail.com', phone: '+63 919 456 7890', role: 'Moderator', reports: 34, joined: 'Feb 10, 2023', status: 'Active', verified: true, initial: 'AR' },
  { id: '#1004', name: 'Roberto Cruz', email: 'r.cruz@hotmail.com', phone: '+63 920 567 8901', role: 'Reporter', reports: 2, joined: 'May 22, 2023', status: 'Suspended', verified: false, initial: 'RC' },
  { id: '#1005', name: 'Elena Bautista', email: 'elena.b@gmail.com', phone: '+63 921 678 9012', role: 'Reporter', reports: 19, joined: 'Jun 7, 2023', status: 'Active', verified: true, initial: 'EB' },
  { id: '#1006', name: 'Carlos Mendoza', email: 'c.mendoza@gmail.com', phone: '+63 922 789 0123', role: 'Admin', reports: 0, joined: 'Jan 1, 2023', status: 'Active', verified: true, initial: 'CM' },
  { id: '#1007', name: 'Liza Coronel', email: 'liza.coronel@gmail.com', phone: '+63 923 890 1234', role: 'Reporter', reports: 5, joined: 'Aug 14, 2023', status: 'Active', verified: true, initial: 'LC' },
  { id: '#1008', name: 'Bernard Tan', email: 'btan@gmail.com', phone: '+63 924 901 2345', role: 'Reporter', reports: 1, joined: 'Sep 29, 2023', status: 'Inactive', verified: false, initial: 'BT' },
  { id: '#1009', name: 'Grace Villanueva', email: 'g.villa@gmail.com', phone: '+63 925 012 3456', role: 'Moderator', reports: 27, joined: 'Apr 18, 2023', status: 'Active', verified: true, initial: 'GV' },
  { id: '#1010', name: 'Rico Delos Santos', email: 'rico.ds@gmail.com', phone: '+63 926 123 4567', role: 'Reporter', reports: 3, joined: 'Oct 5, 2023', status: 'Active', verified: true, initial: 'RD' },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage all registered platform users</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">3,541</h2>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <UserCircle size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">3,102</h2>
            <p className="text-sm font-medium text-slate-500">Active</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">87</h2>
            <p className="text-sm font-medium text-slate-500">Suspended</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">14</h2>
            <p className="text-sm font-medium text-slate-500">Moderators</p>
          </div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select className="border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option>All Roles</option>
            <option>Reporter</option>
            <option>Moderator</option>
            <option>Admin</option>
          </select>
          <select className="border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Inactive</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm whitespace-nowrap">
            <Plus size={16} strokeWidth={3} /> Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 pl-6">User</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Role</th>
                <th className="p-4">Reports</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {user.initial}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {user.name}
                          {user.verified && <CheckCircle2 size={14} className="text-green-500" />}
                        </div>
                        <div className="text-xs font-medium text-slate-400 mt-0.5">ID {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-slate-700">{user.email}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{user.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      user.role === 'Moderator' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-bold text-slate-900">{user.reports} <span className="font-medium text-slate-500 text-xs font-normal">submitted</span></div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 whitespace-nowrap">{user.joined}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                      user.status === 'Suspended' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-center gap-1.5">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit User">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Suspend User">
                        <Ban size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
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
          <div>Showing 10 of 10 users</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-medium text-slate-700">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-medium text-slate-700">3</button>
            <span className="px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-medium text-slate-700">15</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
