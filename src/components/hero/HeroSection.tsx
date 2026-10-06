import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Building, 
  Search,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';
import { Hero3DValve } from './Hero3DValve';
import { companyInfo } from '../../data/companyInfo';
import { generateProductDatasheetPdf } from '../../utils/pdfHelper';
import { productsData } from '../../data/products';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onOpenRfqModal: () => void;
  onOpenSearchModal: () => void;
  onOpenAiAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onOpenRfqModal,
  onOpenSearchModal,
  onOpenAiAssistant
}) => {
  const [quickQuery, setQuickQuery] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      onOpenSearchModal();
    }
  };

  const handleDownloadMasterCatalogue = () => {
    // Generate sample master datasheet PDF
    if (productsData.length > 0) {
      generateProductDatasheetPdf(productsData[0]);
    }
  };

  return (
    <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-28 overflow-hidden bg-blueprint">
      
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-flame-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Headline Left / 3D Viewer Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Engineering Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-slate-700/80 text-xs font-semibold shadow-md">
              <span className="w-2 h-2 rounded-full bg-flame-500 animate-ping"></span>
              <span className="text-slate-300">API 6D, API 600 & ISO 9001:2015 Approved</span>
              <span className="text-slate-600">|</span>
              <span className="text-flame-400 font-mono">EST. 1998</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl xl:text-6xl text-white tracking-tight leading-[1.1]">
                Engineering Precision.{' '}
                <span className="bg-gradient-to-r from-flame-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
                  Flowing Excellence.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                {companyInfo.subTagline}. Custom engineered flow control solutions for severe pressure, extreme temperature, and corrosive pipeline applications.
              </p>
            </div>

            {/* Quick Intelligent Search Bar */}
            <form onSubmit={handleQuickSearch} className="relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by valve type (e.g. Trunnion Ball 600#, SS316 Butterfly, Gate API 600)..."
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  className="w-full bg-navy-900/90 border border-slate-700/80 rounded-xl pl-12 pr-28 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-flame-500 shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 rounded-lg bg-flame-600 text-white text-xs font-semibold hover:bg-flame-500 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenRfqModal}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-flame-600 to-flame-700 text-white font-bold text-sm shadow-xl shadow-flame-600/30 hover:from-flame-500 hover:to-flame-600 transition-all hover:scale-105 active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Instant RFQ PDF</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadMasterCatalogue}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all hover:border-slate-500"
              >
                <Download className="w-4 h-4 text-flame-500" />
                <span>Master Catalogue PDF</span>
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 font-medium text-xs transition-all"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>AI Technical Selector</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">Hydro Tested API 598</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">EN 10204 3.1 MTR Certs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">24-Hr Export Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Canvas Interactive Valve Viewer */}
          <div className="lg:col-span-5">
            <Hero3DValve />
          </div>

        </div>

        {/* Bottom Statistics Counter Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-flame-600/15 border border-flame-500/30 flex items-center justify-center text-flame-500">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-white">26+</div>
              <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">Years Manufacturing</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-white">150,000+</div>
              <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">Valves Installed</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-white">48+</div>
              <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">Export Markets</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-600/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-black text-2xl text-white">99.8%</div>
              <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">QA Approval Score</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
