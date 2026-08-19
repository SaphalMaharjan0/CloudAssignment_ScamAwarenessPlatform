import React, { useEffect, useState, useRef } from 'react';
import { Search, Plus, BookOpen, FileCheck, Eye, Edit2, CheckCircle2, Trash2, X, Upload, FileText as FileTextIcon, Image as ImageIcon } from 'lucide-react';
import { articleApi } from '../../../api/articleApi';
import { Article } from '../../../types/article.types';

export default function AdminArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', category: '', coverImageUrl: '', status: 'Published', readTimeMinutes: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const fetchArticles = async () => {
    try {
      const data = await articleApi.getArticles();
      setArticlesList(data);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingArticleId(null);
    setNewArticle({ title: '', content: '', category: '', coverImageUrl: '', status: 'Published', readTimeMinutes: 5 });
    setIsModalOpen(true);
  };

  const openEditModal = (article: Article) => {
    setEditingArticleId(article.id!);
    setNewArticle({
      title: article.title,
      content: article.content,
      category: typeof article.category === 'string' ? article.category : article.category?.name || '',
      coverImageUrl: article.coverImageUrl || (article as any).imageUrl || '',
      status: article.status || 'Published',
      readTimeMinutes: article.readTimeMinutes || 5
    });
    setIsModalOpen(true);
  };

  const handleCreateOrUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const articleData = {
        ...newArticle,
        category: { id: 1, name: newArticle.category } as any, // Adjust based on how your backend expects category
      } as any;

      if (editingArticleId) {
        await articleApi.updateArticle(editingArticleId, articleData);
      } else {
        articleData.slug = newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
        articleData.category = null;
        await articleApi.createArticle(articleData);
      }
      setIsModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error("Failed to save article", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishToggle = async (article: Article) => {
    try {
      const isPublished = article.status === 'Published' || (article as any).published;
      const newStatus = isPublished ? 'Draft' : 'Published';
      await articleApi.updateArticle(article.id!, { status: newStatus });
      fetchArticles();
    } catch (error) {
      console.error("Failed to toggle publish status", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articleApi.deleteArticle(id);
        fetchArticles();
      } catch (error) {
        console.error("Failed to delete article", error);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setNewArticle(prev => ({ ...prev, coverImageUrl: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use filename as title (without extension)
    const title = file.name.replace(/\.[^/.]+$/, "");
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setNewArticle(prev => ({ ...prev, title, content: text }));
    };
    reader.readAsText(file);
  };

  const filteredArticles = articlesList.filter(a => 
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (typeof a.category === 'string' ? a.category : a.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto space-y-6 pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Articles</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage awareness content published to the platform</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
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
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">{articlesList.length}</h2>
            <p className="text-sm font-medium text-slate-500">Total Articles</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <FileCheck size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {articlesList.filter(a => a.status === 'Published' || (a as any).published).length}
            </h2>
            <p className="text-sm font-medium text-slate-500">Published</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <Eye size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {articlesList.reduce((acc, curr) => acc + (curr.viewsCount || (curr as any).views || 0), 0).toLocaleString()}
            </h2>
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
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No articles found</div>
        ) : filteredArticles.map((article) => (
          <div key={article.id} className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-slate-50 transition-colors group">
            
            <img src={article.coverImageUrl || (article as any).imageUrl || "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"} alt={article.title} className="w-24 h-16 object-cover rounded-lg shrink-0 border border-slate-200" />
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  article.status === 'Published' || (article as any).published ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {article.status === 'Published' || (article as any).published ? 'Published' : 'Draft'}
                </span>
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">
                  {typeof article.category === 'string' ? article.category : article.category?.name || 'Uncategorized'}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{article.title}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Unknown'}</span>
                <span>By {article.author?.name || 'Admin'}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {article.viewsCount || (article as any).views || 0} views</span>
                <span>{article.readTimeMinutes || (article as any).readTime || 5} min read</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEditModal(article)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handlePublishToggle(article)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100" title="Publish/Unpublish">
                <CheckCircle2 size={16} />
              </button>
              <button onClick={() => handleDelete(article.id!)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Create New Article</h2>
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  accept=".txt,.md" 
                  className="hidden" 
                  ref={docInputRef} 
                  onChange={handleDocUpload} 
                />
                <button 
                  onClick={() => docInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors"
                  title="Import content from a .txt or .md file"
                >
                  <FileTextIcon size={16} /> Import File
                </button>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 ml-2">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="createArticleForm" onSubmit={handleCreateOrUpdateArticle} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={newArticle.title}
                    onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newArticle.category}
                      onChange={e => setNewArticle({...newArticle, category: e.target.value})}
                      placeholder="e.g. Phishing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                    <select 
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newArticle.status}
                      onChange={e => setNewArticle({...newArticle, status: e.target.value})}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Cover Image URL or Upload</label>
                  <div className="flex gap-2">
                    <input 
                      type="url"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newArticle.coverImageUrl}
                      onChange={e => setNewArticle({...newArticle, coverImageUrl: e.target.value})}
                      placeholder="https://... or upload file"
                    />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={imageInputRef} 
                      onChange={handleImageUpload} 
                    />
                    <button 
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-2 transition-colors shrink-0"
                    >
                      <ImageIcon size={18} /> Upload
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Content</label>
                  <textarea 
                    required
                    rows={8}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    value={newArticle.content}
                    onChange={e => setNewArticle({...newArticle, content: e.target.value})}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="createArticleForm"
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Article'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
