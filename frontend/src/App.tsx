import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import AppRoutes from './routes/AppRoutes';

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname.startsWith('/app') || location.pathname.startsWith('/admin');

  if (isAuthPage) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900">ScamShield</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/database" className="hover:text-blue-600 transition-colors">Scam Database</Link>
          <Link to="/articles" className="hover:text-blue-600 transition-colors">Articles</Link>
          <a href="/#how" className="hover:text-blue-600 transition-colors">How It Works</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">Log In</Link>
          <Link to="/signup" className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Sign Up</Link>
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
