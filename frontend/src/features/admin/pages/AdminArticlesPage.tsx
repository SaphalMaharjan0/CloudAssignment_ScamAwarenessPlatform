import React, { useState } from 'react';
import { Search, Plus, BookOpen, FileCheck, Eye, Edit2, CheckCircle2, Trash2 } from 'lucide-react';

const mockArticles = [
  { id: 1, title: 'How to Recognize Phishing Emails in 2024', category: 'Phishing', author: 'Admin Marcos', date: 'Dec 20, 2024', views: '8,412 views', readTime: '5 min read', status: 'Published', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80' },
  { id: 2, title: 'Investment Scams: Red Flags to Watch For', category: 'Investment', author: 'Grace Villanueva', date: 'Dec 18, 2024', views: '5,230 views', readTime: '7 min read', status: 'Published', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80' },
  { id: 3, title: 'Protecting Your GCash and Maya Accounts', category: 'Banking', author: 'Ana Reyes', date: 'Dec 15, 2024', views: '3,891 views', readTime: '4 min read', status: 'Draft', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80' },
  { id: 4, title: 'Social Media Romance Scams: A Growing Threat', category: 'Social Media', author: 'Admin Marcos', date: 'Dec 12, 2024', views: '6,104 views', readTime: '6 min read', status: 'Published', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80' },
  { id: 5, title: 'Job Scams Targeting Fresh Graduates', category: 'Fake Job', author: 'Grace Villanueva', date: 'Dec 10, 2024', views: '4,320 views', readTime: '5 min read', status: 'Published', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80' },
  { id: 6, title: 'How to Report Scams Effectively to Authorities', category: 'Guide', author: 'Ana Reyes', date: 'Dec 8, 2024', views: '7,890 views', readTime: '8 min read', status: 'Draft', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80' },
];

export default function AdminArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto space-y-6 pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Articles</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage awareness content published to the platform</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} /> New Article
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">48</h2>
            <p className="text-sm font-medium text-slate-500">Total Articles</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <FileCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">41</h2>
            <p className="text-sm font-medium text-slate-500">Published</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <Eye size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">284K</h2>
            <p className="text-sm font-medium text-slate-500">Total Views</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-3 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search articles..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {mockArticles.map((article) => (
          <div key={article.id} className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-slate-50 transition-colors group">
            
            <img src={article.image} alt={article.title} className="w-24 h-16 object-cover rounded-lg shrink-0 border border-slate-200" />
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  article.status === 'Published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {article.status}
                </span>
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">{article.category}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{article.title}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>{article.date}</span>
                <span>By {article.author}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {article.views}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Edit">
                <Edit2 size={16} />
              </button>
              <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100" title="Publish/Unpublish">
                <CheckCircle2 size={16} />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
