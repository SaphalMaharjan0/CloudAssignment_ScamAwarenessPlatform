import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldAlert, ChevronRight, Calendar, MapPin } from 'lucide-react';

const mockScams = [
  { id: 1, title: 'Fake GCash Customer Service', category: 'Phishing', location: 'Metro Manila', date: 'Oct 24, 2023', description: 'Caller claims to be from GCash asking for OTP to verify account.', status: 'Verified' },
  { id: 2, title: 'Shopee Job Hiring Scam', category: 'Job Scam', location: 'Cebu City', date: 'Oct 20, 2023', description: 'Promising high pay for clicking on product links on Shopee.', status: 'Under Review' },
  { id: 3, title: 'BDO Account Compromise SMS', category: 'Smishing', location: 'Nationwide', date: 'Oct 18, 2023', description: 'Text message with a malicious link claiming your BDO account is locked.', status: 'Verified' },
];

export default function ScamDatabasePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredScams = mockScams.filter(scam => 
    scam.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    scam.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const basePath = window.location.pathname.startsWith('/app') ? '/app/database' : '/database';

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Scam Database</h1>
            <p className="text-slate-500 mt-2 text-lg">Browse and search through user-reported and verified scams in the Philippines.</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-colors flex items-center gap-2">
            <ShieldAlert size={20} />
            Report a Scam
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by keyword, bank, or scam type..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-medium">
            <Filter size={20} />
            Filters
          </button>
        </div>

        {/* Database Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map(scam => (
            <Link to={`${basePath}/${scam.id}`} key={scam.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  {scam.category}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${scam.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {scam.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">{scam.title}</h3>
              <p className="text-slate-600 mb-6 flex-grow line-clamp-3">{scam.description}</p>
              
              <div className="pt-4 border-t border-slate-100 space-y-2 mt-auto">
                <div className="flex items-center text-sm text-slate-500 gap-2">
                  <Calendar size={14} />
                  <span>{scam.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{scam.location}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-red-600 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredScams.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">No scams found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
}
