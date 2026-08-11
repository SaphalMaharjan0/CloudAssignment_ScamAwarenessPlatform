import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function ReportScamPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Report a Scam</h1>
        <p className="text-slate-500 mt-1">Help protect others by reporting suspicious activities</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative max-w-2xl mx-auto mb-12">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[2px] bg-blue-600 -z-10"></div>
        
        {/* Step 1 (Active) */}
        <div className="flex items-center gap-3 bg-slate-50 px-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <span className="font-semibold text-slate-900 text-sm hidden sm:block">Basic Info</span>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3 bg-slate-50 px-4">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <span className="font-medium text-slate-400 text-sm hidden sm:block">Evidence & Details</span>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-3 bg-slate-50 px-4">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <span className="font-medium text-slate-400 text-sm hidden sm:block">Review & Submit</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        
        <div className="space-y-6">
          {/* Scam Title */}
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

          {/* Scam Category */}
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
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Description */}
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

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button className="px-6 py-2.5 rounded-xl font-medium text-slate-400 border border-slate-200 hover:bg-slate-50 transition-colors">
            Previous
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors">
            Continue <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
