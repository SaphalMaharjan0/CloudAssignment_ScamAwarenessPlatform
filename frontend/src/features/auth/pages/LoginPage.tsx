import { useState } from "react";
import { Shield, Mail, Lock, Globe, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const loggedInUser = await login({ email, password });
      const userRole = (loggedInUser.role || '').toUpperCase();
      if (userRole === 'ADMIN' || userRole === 'ROLE_ADMIN') {
        navigate('/admin/overview');
      } else {
        navigate('/app/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="hidden lg:block lg:w-1/2 relative slide-in-left">
        <Link to="/" className="absolute top-8 left-8 z-10 flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shield size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg drop-shadow-md">FraudGuard</span>
        </Link>
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&h=1080&fit=crop&auto=format"
          alt="Cybersecurity"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-slate-900/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
            <Shield size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">Welcome Back to FraudGuard</h2>
          <p className="text-blue-200 leading-relaxed max-w-sm">
            Your trusted partner in fighting online scams and protecting the Filipino community from cybercrime.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 w-full max-w-sm">
            {[["31,847", "Scams Verified"], ["2.4M+", "Users Protected"]].map(([v, l]) => (
              <div key={l} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-extrabold text-white">{v}</div>
                <div className="text-blue-200 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-slate-50 overflow-y-auto slide-in-right">
        <div className="w-full max-w-md my-auto py-12 lg:py-0">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors w-fit">
            <ChevronLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900">FraudGuard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Sign In</h1>
          <p className="text-slate-500 text-sm mb-8">Enter your credentials to access your account</p>
          
          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="maria@example.com" type="email" required
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="••••••••" type="password" required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="mt-5 relative flex items-center">
              <div className="flex-1 border-t border-border" />
              <span className="px-3 text-xs text-slate-400">or continue with</span>
              <div className="flex-1 border-t border-border" />
            </div>
            <button className="mt-4 w-full border border-border py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
              <Globe size={16} /> Sign in with Google
            </button>
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            {"Don't have an account? "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">Create Account</Link>
          </p>
          <p className="mt-3 text-center text-xs text-slate-400">
            <button onClick={() => navigate('/admin/overview')} className="text-slate-400 hover:text-slate-600 underline">Admin access</button>
          </p>
        </div>
      </div>
    </div>
  );
}
