import { useState } from "react";
import { Shield, AlertTriangle, Database, Flag, CheckCircle, ChevronRight, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

// Mock Data
const stats = [
  { value: "48,291", label: "Reports Submitted" },
  { value: "31,847", label: "Scams Verified" },
  { value: "2.4M+", label: "Users Protected" },
  { value: "₱890M", label: "Fraud Prevented" },
];

const scams = [
  {
    id: 1, title: "BDO Online Banking Phishing Email", category: "Phishing",
    status: "Verified", date: "Dec 18, 2024", location: "Nationwide",
    description: "Fraudsters are sending fake BDO bank emails requesting account verification through a malicious link that harvests login credentials.",
    reporter: "Maria Santos", views: 1243, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=240&fit=crop&auto=format",
  },
  {
    id: 2, title: "Fake DOLE Work-From-Home Job Offer", category: "Fake Job",
    status: "Verified", date: "Dec 15, 2024", location: "Metro Manila",
    description: "Scammers impersonating DOLE officials offer fake remote job placements, requiring upfront payment for 'processing fees'.",
    reporter: "Juan dela Cruz", views: 892, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=240&fit=crop&auto=format",
  },
  {
    id: 3, title: "Crypto Investment 'Double Your Money' Scheme", category: "Investment Scam",
    status: "Pending", date: "Dec 12, 2024", location: "Online",
    description: "A Telegram group promises 300% returns on USDT deposits within 24 hours. Multiple victims have reported losing significant funds.",
    reporter: "Ana Reyes", views: 654, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop&auto=format",
  }
];

const articles = [
  {
    id: 1, title: "How to Recognize Phishing Emails in 2024", category: "Phishing",
    summary: "Learn the telltale signs of phishing attempts and how to protect your accounts from credential theft through email-based attacks.",
    date: "Dec 20, 2024", readTime: "5 min", featured: true,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: 2, title: "Investment Scams: Red Flags to Watch For", category: "Investment",
    summary: "Guaranteed returns, pressure to act fast, and vague business models are classic warning signs of investment fraud.",
    date: "Dec 18, 2024", readTime: "7 min", featured: false,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop&auto=format",
  },
  {
    id: 3, title: "Protecting Your GCash and Maya Accounts", category: "Banking",
    summary: "Digital wallet scams are on the rise. These practical steps will help secure your e-wallet from unauthorized access.",
    date: "Dec 15, 2024", readTime: "4 min", featured: false,
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=240&fit=crop&auto=format",
  }
];

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const steps = [
    { n: "01", title: "Report a Scam", desc: "Fill out our simple form with details about the suspicious activity you encountered." },
    { n: "02", title: "Expert Verification", desc: "Our cybersecurity team reviews each report and verifies the information provided." },
    { n: "03", title: "Community Protected", desc: "Verified reports are published to warn and protect others in the community." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium mb-6">
              <AlertTriangle size={12} /> 1,247 scams reported this week
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Stay Safe from<br />
              <span className="text-blue-400">Online Scams</span>
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed">
              Report scams, verify suspicious activities, and protect your community from fraud and cybercrime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/report"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-900/40"
              >
                <Flag size={16} /> Report a Scam
              </Link>
              <Link
                to="/database"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all backdrop-blur"
              >
                <Database size={16} /> Browse Scam Database
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden lg:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=420&fit=crop&auto=format"
                alt="Cybersecurity protection"
                className="w-full rounded-2xl shadow-2xl opacity-80"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Latest Verified</div>
                    <div className="text-sm font-semibold text-slate-900">BDO Phishing Email</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-xs text-slate-500 mb-1">Reports Today</div>
                <div className="text-2xl font-extrabold text-slate-900">+84</div>
                <div className="text-xs text-emerald-600 font-medium">↑ 12% vs yesterday</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
              <div className="text-blue-200 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Our streamlined process makes it easy to report scams and protect your community in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* The dotted line connecting the steps */}
            <div className="hidden md:block absolute top-14 left-[16%] w-[68%] h-px border-dashed border-t-2 border-blue-200 z-0" />
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold mb-5 shadow-lg shadow-blue-200">
                  {n}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Shield size={40} className="text-blue-200 mx-auto mb-5" />
          <h2 className="text-3xl font-extrabold text-white mb-4">Help Us Fight Scams Together</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">Join over 2.4 million Filipinos who report scams and protect their communities every day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-center">
              Create Free Account
            </Link>
            <Link to="/report" className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-center">
              Report Anonymously
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield size={14} className="text-white" />
              </div>
              <span className="font-bold text-white text-sm">FraudGuard</span>
            </div>
            <p className="text-sm leading-relaxed">Protecting Filipinos from online scams and cybercrime since 2020.</p>
          </div>
          {[
            { heading: "Platform", links: ["Report Scam", "Scam Database", "Awareness Articles", "Verify a Scam"] },
            { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"] },
            { heading: "Contact", links: ["cybercrime.gov.ph", "NBI Cybercrime Div.", "PNP Anti-Cybercrime", "BSP Consumer"] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2">
                {links.map((l) => <li key={l}><span className="text-sm hover:text-white cursor-pointer transition-colors">{l}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-slate-800 text-xs text-slate-600">
          © 2024 FraudGuardilippines. An initiative by the Philippine Cybercrime Investigation and Coordinating Center.
        </div>
      </footer>
    </div>
  );
}
