import React from 'react';
import { BookOpen, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

const mockArticles = [
  { id: 1, title: 'How to Spot a Phishing Email in 2024', category: 'Guide', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Learn the subtle signs of modern phishing attempts that slip past spam filters.' },
  { id: 2, title: 'Protecting Your E-Wallets from Unauthorized Access', category: 'Security', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1616077168712-fc6c788db4af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Essential security measures every GCash and Maya user needs to implement today.' },
  { id: 3, title: 'The Anatomy of a "Task" Scam', category: 'Case Study', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'A deep dive into how victims are lured into fake job scams offering quick payouts.' },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-2xl mb-2">
            <BookOpen className="text-red-600" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Awareness Hub</h1>
          <p className="text-slate-500 text-lg md:text-xl">Empower yourself with knowledge. Read our latest guides, case studies, and security tips to stay one step ahead of scammers.</p>
        </div>

        {/* Featured Article */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Cybersecurity" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full">Featured</span>
              <span className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> 10 min read</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">The State of Cyber Scams in the Philippines (2024 Report)</h2>
            <p className="text-slate-600 text-lg mb-8">An in-depth analysis of the most prevalent scams this year, targeting strategies, and what you can do to protect your digital identity.</p>
            <div className="flex items-center text-red-600 font-semibold gap-2 mt-auto">
              Read Full Report <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArticles.map(article => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-slate-400 gap-1 mb-3">
                  <Clock size={14} /> {article.readTime}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{article.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{article.description}</p>
                <div className="flex items-center text-red-600 font-semibold gap-2 text-sm mt-auto">
                  Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
