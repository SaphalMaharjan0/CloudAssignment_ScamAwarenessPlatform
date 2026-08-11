import { useState } from "react";
import { Shield, Mail, Lock, Phone, ChevronLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app/dashboard");
  };

  return (
    <div className="h-screen overflow-hidden flex flex-row-reverse" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="hidden lg:block lg:w-1/2 relative slide-in-right">
        <Link to="/" className="absolute top-8 right-8 z-10 flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shield size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg drop-shadow-md">ScamShield</span>
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Join ScamShield Today</h2>
          <p className="text-blue-200 leading-relaxed max-w-sm">
            Help protect the Filipino community by reporting scams and verifying suspicious activities.
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
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-slate-50 overflow-y-auto slide-in-left">
        <div className="w-full max-w-md my-auto py-12 lg:py-0">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors w-fit">
            <ChevronLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900">ScamShield</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Create Your Account</h1>
          <p className="text-slate-500 text-sm mb-8">Join the community protecting Filipinos from online scams</p>
          
          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name</label>
                  <input className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Maria" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name</label>
                  <input className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Santos" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="maria@example.com" type="email" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="+63 912 345 6789" type="tel" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="At least 8 characters" type="password" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Repeat your password" type="password" />
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={cn(
                    "mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                    agreed ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                  )}
                >
                  {agreed && <Check size={12} className="text-white" />}
                </div>
                <span className="text-sm text-slate-600 leading-relaxed">
                  {"I agree to the "}
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">Terms of Service</span>
                  {" and "}
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>
                </span>
              </label>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Create Account
              </button>
            </form>
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
