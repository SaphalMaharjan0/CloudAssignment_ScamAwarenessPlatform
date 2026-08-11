import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, ShieldAlert, AlertTriangle, CheckCircle, Share2, Eye, Flag, Info } from 'lucide-react';

const mockScams = [
  { 
    id: 1, 
    title: 'Fake GCash Customer Service', 
    category: 'Phishing', 
    location: 'Metro Manila', 
    date: 'Oct 24, 2023', 
    description: 'Caller claims to be from GCash asking for OTP to verify account.', 
    status: 'Verified',
    fullDescription: 'Victims report receiving a call from someone claiming to be an official GCash representative. The caller states there is a security issue with the account or a pending unauthorized transaction. To "verify" the account and stop the transaction, the caller asks the victim to provide the One-Time Password (OTP) sent to their phone. Once provided, the scammer takes over the account and drains the funds.',
    preventions: [
      'Never share your OTP or MPIN with anyone, even those claiming to be from GCash.',
      'GCash will never ask for your OTP over a phone call.',
      'Use the official GCash app to report suspicious numbers.'
    ],
    reportedBy: 'Anonymous User',
    views: 1205
  },
  { 
    id: 2, 
    title: 'Shopee Job Hiring Scam', 
    category: 'Job Scam', 
    location: 'Cebu City', 
    date: 'Oct 20, 2023', 
    description: 'Promising high pay for clicking on product links on Shopee.', 
    status: 'Under Review',
    fullDescription: 'Scammers send unsolicited messages via WhatsApp or Telegram offering part-time jobs. The "job" involves clicking on links to "boost" Shopee products. Initially, victims are paid small amounts to build trust. Later, they are asked to "recharge" or pay upfront fees to unlock higher-paying tasks, after which the scammers disappear with the money.',
    preventions: [
      'Ignore unsolicited job offers via messaging apps.',
      'Legitimate companies do not ask you to pay to work.',
      'Verify job openings directly on official company websites.'
    ],
    reportedBy: 'Juan D.',
    views: 890
  },
  { 
    id: 3, 
    title: 'BDO Account Compromise SMS', 
    category: 'Smishing', 
    location: 'Nationwide', 
    date: 'Oct 18, 2023', 
    description: 'Text message with a malicious link claiming your BDO account is locked.', 
    status: 'Verified',
    fullDescription: 'A text message is sent from an unknown number claiming the recipient\'s BDO account has been locked or suspended due to unusual activity. The message includes a link to a fake BDO website. Victims are prompted to enter their login credentials and OTP, which are then stolen by the attackers.',
    preventions: [
      'Do not click on links sent via SMS or email.',
      'Always type the official bank URL directly into your browser.',
      'Banks will not send links in SMS messages regarding account security.'
    ],
    reportedBy: 'Maria C.',
    views: 3450
  },
];

export default function ScamDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scam, setScam] = useState<any>(null);

  const handleBack = () => {
    const basePath = window.location.pathname.startsWith('/app') ? '/app/database' : '/database';
    navigate(basePath);
  };

  useEffect(() => {
    // In a real app, this would be an API call
    const foundScam = mockScams.find(s => s.id === Number(id));
    if (foundScam) {
      setScam(foundScam);
    }
  }, [id]);

  if (!scam) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-slate-50 p-6">
        <AlertTriangle size={48} className="text-slate-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Scam Not Found</h2>
        <p className="text-slate-500 mb-6">The report you are looking for does not exist or has been removed.</p>
        <button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors font-medium">
          Back to Database
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={handleBack} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Database
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <ShieldAlert size={200} />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/30">
                  {scam.category}
                </span>
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border flex items-center gap-1 ${
                  scam.status === 'Verified' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {scam.status === 'Verified' ? <CheckCircle size={14} /> : <Info size={14} />}
                  {scam.status}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{scam.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Reported on {scam.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{scam.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span>{scam.views} Views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-amber-500" size={20} />
                    How this scam works
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {scam.fullDescription}
                  </p>
                </section>

                <section className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ShieldAlert className="text-blue-600" size={20} />
                    How to protect yourself
                  </h2>
                  <ul className="space-y-3">
                    {scam.preventions.map((prevention: string, index: number) => (
                      <li key={index} className="flex gap-3 text-slate-700">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="leading-relaxed">{prevention}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Report Details</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-slate-500 mb-1">Reported By</div>
                      <div className="font-semibold text-slate-900">{scam.reportedBy}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-1">Report ID</div>
                      <div className="font-mono text-slate-900">#SCAM-{scam.id.toString().padStart(4, '0')}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-colors">
                    <Share2 size={18} />
                    Share Alert
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-3 rounded-xl font-medium transition-colors">
                    <Flag size={18} />
                    I experienced this too
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
