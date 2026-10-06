import React from 'react';
import { Building, ShieldCheck, Award, Globe, CheckCircle2, Flame } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flame-600/10 text-flame-400 font-mono text-xs font-semibold border border-flame-500/20">
            <Building className="w-3.5 h-3.5" />
            <span>ESTABLISHED 1998 • GLOBAL FLOW CONTROL</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            About Venus Enterprises
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Venus Enterprises is an enterprise-grade industrial manufacturing and exporting corporation headquartered in India/Mumbai, specializing in high-performance industrial valves, trunnion ball valves, API 600 gate valves, globe valves, butterfly valves, check valves, and piping components.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            With 26+ years of engineering mastery, our manufacturing facilities integrate state-of-the-art 5-axis CNC machining, spectral metallurgical testing, hydrostatic & pneumatic pressure test benches (API 598), and automated cleanroom assembly for severe service applications.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <h4 className="font-heading font-bold text-lg text-white">Quality Guarantee</h4>
              <p className="text-xs text-slate-400">100% Hydrostatic Tested prior to export dispatch.</p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white">Global Compliance</h4>
              <p className="text-xs text-slate-400">API 6D, API 600, ISO 9001:2015, CE-PED & NACE.</p>
            </div>
          </div>
        </div>

        {/* Manufacturing Visual Card */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl glass-panel">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Venus Manufacturing CNC Park"
              className="w-full h-80 object-cover"
            />
            <div className="p-6 space-y-3 bg-navy-900">
              <span className="font-mono text-xs text-flame-400 font-bold uppercase">Manufacturing Park Zone 4</span>
              <h3 className="font-heading font-bold text-xl text-white">Advanced CNC & Test Infrastructure</h3>
              <p className="text-xs text-slate-400">
                Spanning over 85,000 sq. ft. of heavy machining bays, automatic submerged arc welding, and high-pressure nitrogen test pits up to 15,000 PSI.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
