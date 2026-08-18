import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { articleApi } from '../../../api/articleApi';
import { Article } from '../../../types/article.types';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articleApi.getArticles();
        // Only show published articles, or all if none
        setArticles(data.filter(a => a.status === 'Published' || data.length > 0));
      } catch (error) {
        console.error("Failed to load articles", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const regularArticles = articles.length > 1 ? articles.slice(1) : [];

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

        {isLoading ? (
          <div className="text-center py-12 text-slate-500">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                  <img 
                    src={featuredArticle.coverImageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
                    alt="Featured Article" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full">Featured</span>
                    <span className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> {featuredArticle.readTimeMinutes || 5} min read</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">{featuredArticle.title}</h2>
                  <p className="text-slate-600 text-lg mb-8 line-clamp-3">{featuredArticle.content}</p>
                  <div className="flex items-center text-red-600 font-semibold gap-2 mt-auto">
                    Read Full Report <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            )}

            {/* Article Grid */}
            {regularArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map(article => (
                  <div key={article.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={article.coverImageUrl || "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {article.category?.name || 'Guide'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-slate-400 gap-1 mb-3">
                        <Clock size={14} /> {article.readTimeMinutes || 5} min read
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{article.title}</h3>
                      <p className="text-slate-600 mb-6 flex-grow line-clamp-3">{article.content}</p>
                      <div className="flex items-center text-red-600 font-semibold gap-2 text-sm mt-auto">
                        Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
