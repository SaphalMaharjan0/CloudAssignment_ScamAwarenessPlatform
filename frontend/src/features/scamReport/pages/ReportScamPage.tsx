import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { scamReportApi } from '../../../api/scamReportApi';

export default function ReportScamPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [platformUsed, setPlatformUsed] = useState('');
  const [scammerDetails, setScammerDetails] = useState('');
  const [financialLoss, setFinancialLoss] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(!!id);

  useEffect(() => {
    if (id) {
      const loadReport = async () => {
        try {
          const reports = await scamReportApi.getReports();
          const report = reports.find(r => r.id === id);
          if (report) {
            setTitle(report.title || '');
            setCategory(report.category?.name || report.category || '');
            setDescription(report.description || '');
            setPlatformUsed(report.platformUsed || '');
            setScammerDetails(report.scammerDetails || '');
            setFinancialLoss(report.financialLoss ? report.financialLoss.toString() : '');
            setDocuments(report.documentUrls || []);
          } else {
            setError('Report not found');
          }
        } catch (err) {
          setError('Failed to load report for editing');
        } finally {
          setIsLoadingData(false);
        }
      };
      loadReport();
    }
  }, [id]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const payload = {
        title,
        description,
        platformUsed: platformUsed || category,
        scammerDetails,
        financialLoss: parseFloat(financialLoss) || 0,
        documentUrls: documents,
        ...(user && user.id ? { reporter: { id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email } } : {})
      };
      
      if (id) {
        await scamReportApi.updateReport(id, payload);
      } else {
        await scamReportApi.createReport(payload);
      }
      
      // Redirect to my-reports after success
      navigate('/app/my-reports');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || 'Unknown error occurred';
      setError(`Failed to submit report: ${errorMessage}`);
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <div className="p-8 text-center text-slate-500">Loading report data...</div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{id ? 'Edit Report' : 'Report a Scam'}</h1>
        <p className="text-slate-500 mt-1">{id ? 'Update your pending scam report details' : 'Help protect others by reporting suspicious activities'}</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative max-w-2xl mx-auto mb-12">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-200 -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-600 -z-10 transition-all duration-300"
          style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
        ></div>
        
        {/* Step 1 */}
        <div className="flex items-center gap-3 bg-slate-50 px-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
            1
          </div>
          <span className={`font-semibold text-sm hidden sm:block ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Basic Info</span>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3 bg-slate-50 px-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
            2
          </div>
          <span className={`font-semibold text-sm hidden sm:block ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Evidence & Details</span>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-3 bg-slate-50 px-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
            3
          </div>
          <span className={`font-semibold text-sm hidden sm:block ${step >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Review & Submit</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Scam Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. BDO Online Banking Phishing Email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Scam Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white text-slate-700"
                  >
                    <option value="" disabled>Select a category...</option>
                    <option value="phishing">Phishing / Spoofing</option>
                    <option value="investment">Investment Scam</option>
                    <option value="job">Fake Job / Task Scam</option>
                    <option value="social_media">Social Media Romance / Extortion</option>
                    <option value="sms">SMS / Smishing (e.g. GCash/Maya)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the scam in detail. Include how you were contacted, what was promised, and any information you can recall..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[160px] resize-y"
                ></textarea>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Platform Used (e.g. Facebook, GCash, Telegram)
                </label>
                <input 
                  type="text"
                  value={platformUsed}
                  onChange={(e) => setPlatformUsed(e.target.value)}
                  placeholder="Where did this happen?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Scammer Details (Emails, Phone Numbers, Links)
                </label>
                <textarea 
                  value={scammerDetails}
                  onChange={(e) => setScammerDetails(e.target.value)}
                  placeholder="Provide any known identifiers of the scammer..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[100px] resize-y"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Financial Loss Amount (Optional)
                </label>
                <input 
                  type="number"
                  min="0"
                  step="0.01"
                  value={financialLoss}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (val < 0) setFinancialLoss('0');
                    else setFinancialLoss(e.target.value);
                  }}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Supporting Documents (Images, PDFs)
                </label>
                <div className="w-full px-4 py-3 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all bg-white relative">
                   <input 
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                             const base64 = event.target?.result as string;
                             setDocuments(prev => [...prev, base64]);
                          };
                          reader.readAsDataURL(file);
                        });
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                   />
                   <div className="flex items-center justify-center gap-2 text-slate-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span className="text-sm font-medium">Click to upload files</span>
                   </div>
                </div>
                {documents.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="relative group aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                        {doc.startsWith('data:image/') ? (
                          <img src={doc} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            <span className="text-[10px] font-semibold mt-1">PDF</span>
                          </div>
                        )}
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setDocuments(prev => prev.filter((_, i) => i !== index));
                          }}
                          className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-2">Review Your Report</h3>
                
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</span>
                  <p className="text-slate-900 font-medium">{title || 'Not provided'}</p>
                </div>
                
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</span>
                  <p className="text-slate-900 font-medium">{category || 'Not provided'}</p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</span>
                  <p className="text-slate-900 text-sm mt-1 bg-white p-3 rounded-lg border border-slate-100">{description || 'Not provided'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform</span>
                    <p className="text-slate-900 font-medium">{platformUsed || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Financial Loss</span>
                    <p className="text-slate-900 font-medium">{financialLoss ? `₱${financialLoss}` : 'None'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Documents</span>
                    <p className="text-slate-900 font-medium">{documents.length > 0 ? `${documents.length} attached` : 'None'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              step === 1 || isSubmitting ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          {step < 3 ? (
            <button 
              onClick={handleNext}
              disabled={!title || !description || !category}
              className={`px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors ${
                !title || !description || !category 
                  ? 'bg-blue-300 text-white cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              {isSubmitting ? (id ? 'Updating...' : 'Submitting...') : (id ? 'Update Report' : 'Submit Report')} <CheckCircle2 size={18} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
