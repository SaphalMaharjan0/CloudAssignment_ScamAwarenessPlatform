import { useState } from "react";
import { Shield, Mail, Lock, ChevronLeft, KeyRound, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      setMessage("An OTP has been sent to your email.");
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await authApi.verifyOtp(email, otp);
      setMessage("OTP verified successfully. Please enter your new password.");
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data || "Invalid or expired OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.resetPassword(email, otp, password);
      setMessage("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-row-reverse" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="hidden lg:block lg:w-1/2 relative slide-in-right">
        <Link to="/" className="absolute top-8 right-8 z-10 flex items-center gap-2.5 hover:opacity-90 transition-opacity">
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
            <KeyRound size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">Secure Password Recovery</h2>
          <p className="text-blue-200 leading-relaxed max-w-sm">
            Regain access to your FraudGuard account quickly and securely.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-slate-50 overflow-y-auto slide-in-left">
        <div className="w-full max-w-md my-auto py-12 lg:py-0">
          <Link to="/login" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors w-fit">
            <ChevronLeft size={16} /> Back to Login
          </Link>
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900">FraudGuard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Reset Password</h1>
          <p className="text-slate-500 text-sm mb-8">Follow the steps to recover your account</p>
          
          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm text-center">
                {message}
              </div>
            )}
            
            {step === 1 && (
              <form className="space-y-4" onSubmit={handleSendOtp}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="name@example.com" type="email" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex justify-center items-center"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form className="space-y-4" onSubmit={handleVerifyOtp}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter 6-digit OTP</label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all tracking-widest font-mono" placeholder="123456" maxLength={6} type="text" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex justify-center items-center"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
                <div className="text-center mt-3">
                  <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-600 hover:underline">Wrong email? Go back</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form className="space-y-4" onSubmit={handleResetPassword}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-9 pr-10 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="New Password" type={showPassword ? "text" : "password"} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full pl-9 pr-10 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex justify-center items-center"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
