import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Award, FileText, CheckCircle2, Building, Send, Download } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';
import { brandsData } from '../../data/brands';

export const DealerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'tiers' | 'portal'>('register');
  const [submitted, setSubmitted] = useState(false);

  // Application State
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taxId, setTaxId] = useState('');
  const [country, setCountry] = useState('');
  const [turnover, setTurnover] = useState('$1M - $5M USD');

  const handleSubmitDealer = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600/10 text-blue-400 font-mono text-xs font-semibold mb-2 border border-blue-500/20">
            <UserCheck className="w-3.5 h-3.5" />
            <span>GLOBAL DISTRIBUTOR & DEALER NETWORK</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Authorized Dealer & Stockist Portal
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Join the Venus Enterprises global distribution network. Access wholesale pricing tiers, marketing collaterals, priority factory dispatches, and OEM support.
          </p>
        </div>

        {/* Tab Switching */}
        <div className="flex bg-navy-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'register' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Apply for Dealership
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'tiers' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Discount Tiers
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'portal' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dealer Login Portal
          </button>
        </div>
      </div>

      {/* TAB 1: Apply Form */}
      {activeTab === 'register' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmitDealer} className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-white">
                  Authorized Stockist Application Form
                </h3>
                <p className="text-xs text-slate-400">
                  Please provide your corporate registration details for evaluation by the Venus Global Business Desk.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Registered Business Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gulf Flow Controls LLC"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Corporate Tax / VAT ID:</label>
                    <input
                      type="text"
                      required
                      placeholder="VAT-98421-DXB"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Primary Contact Officer:</label>
                    <input
                      type="text"
                      required
                      placeholder="Managing Director / Procurement Manager"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Business Email:</label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@gufflow.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Country / Region:</label>
                    <input
                      type="text"
                      required
                      placeholder="UAE, Saudi Arabia, Singapore, USA..."
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Annual Procurement Volume:</label>
                    <select
                      value={turnover}
                      onChange={(e) => setTurnover(e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="$250K - $1M USD">$250K - $1M USD</option>
                      <option value="$1M - $5M USD">$1M - $5M USD</option>
                      <option value="$5M+ USD">$5M+ USD (Master Distributor)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs shadow-lg shadow-flame-600/30 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Dealer Application</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  Dealer Application Submitted!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you <strong>{companyName || 'Partner'}</strong>. Your application reference code is <strong className="text-flame-400 font-mono">DLR-2026-{Math.floor(100 + Math.random() * 900)}</strong>. Our regional sales director will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded bg-navy-800 text-slate-300 text-xs font-semibold"
                >
                  Submit Another Form
                </button>
              </div>
            )}
          </div>

          {/* Benefits Side Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Authorized Dealer Benefits
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-navy-950 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Exclusive Wholesale Discounts:</strong>
                    Up to 35% margin off list price with guaranteed stock lock.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-navy-950 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Priority Dispatch & Expedited Air Freight:</strong>
                    Dedicated inventory buffers reserved at our export facility.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-navy-950 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Co-Branded Marketing & Technical Support:</strong>
                    CAD models, 3D renders, and joint bidding on major EPC tenders.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Discount Tiers */}
      {activeTab === 'tiers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="font-mono text-xs text-slate-400 uppercase">Tier 1</div>
            <h3 className="font-heading font-extrabold text-2xl text-white">Authorized Dealer</h3>
            <div className="font-mono text-3xl font-black text-flame-500">15% Off List</div>
            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">✓ Standard MOQ 10 Valves</li>
              <li className="flex items-center gap-2">✓ Access to Standard Datasheets</li>
              <li className="flex items-center gap-2">✓ Standard 3-Day Dispatch</li>
            </ul>
          </div>

          <div className="bg-navy-900 border-2 border-flame-500 rounded-2xl p-6 space-y-4 relative overflow-hidden shadow-2xl">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-flame-600 text-white font-mono text-[10px] uppercase font-bold">
              Most Popular
            </div>
            <div className="font-mono text-xs text-flame-400 uppercase">Tier 2</div>
            <h3 className="font-heading font-extrabold text-2xl text-white">Gold Distributor</h3>
            <div className="font-mono text-3xl font-black text-amber-400">25% Off List</div>
            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">✓ MOQ 50 Valves / Season</li>
              <li className="flex items-center gap-2">✓ Co-Branded PDF Datasheets</li>
              <li className="flex items-center gap-2">✓ Priority 24-Hour Dispatch</li>
              <li className="flex items-center gap-2">✓ Dedicated Key Account Manager</li>
            </ul>
          </div>

          <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="font-mono text-xs text-slate-400 uppercase">Tier 3</div>
            <h3 className="font-heading font-extrabold text-2xl text-white">Platinum Master</h3>
            <div className="font-mono text-3xl font-black text-emerald-400">35% Off List</div>
            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <li className="flex items-center gap-2">✓ Territory Exclusivity Agreement</li>
              <li className="flex items-center gap-2">✓ Custom Tagging & Laser Marking</li>
              <li className="flex items-center gap-2">✓ Air-Freight Stock Buffer</li>
              <li className="flex items-center gap-2">✓ Credit Terms (Net 60 Days)</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: Dealer Portal Login */}
      {activeTab === 'portal' && (
        <div className="max-w-md mx-auto bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-xl text-white text-center">
            Dealer Access Gateway
          </h3>
          <p className="text-xs text-slate-400 text-center">
            Enter your Authorized Dealer Code to access confidential wholesale price lists.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-mono text-slate-400">Dealer Code / Email:</label>
              <input
                type="text"
                placeholder="DLR-VE-8849"
                defaultValue="DLR-VE-GULF-8849"
                className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400">Security PIN:</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
            <button
              onClick={() => alert('Authenticated! Welcome back, Gulf Flow Controls LLC (Gold Tier - 25% Active).')}
              className="w-full py-2.5 rounded-lg bg-flame-600 text-white font-bold text-xs hover:bg-flame-500 transition-colors"
            >
              Sign In to Dealer Portal
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
