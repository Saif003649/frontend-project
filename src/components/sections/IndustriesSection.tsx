import React from 'react';
import { Flame, FlaskConical, Zap, ShieldCheck, Droplets, Pickaxe, ArrowRight, Building2 } from 'lucide-react';
import { industriesData } from '../../data/industries';

interface IndustriesSectionProps {
  onConfigureRfq: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onConfigureRfq }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flame-600/10 text-flame-400 font-mono text-xs font-semibold border border-flame-500/20">
          <Building2 className="w-3.5 h-3.5" />
          <span>SECTOR-SPECIFIC FLOW SOLUTIONS</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Target Industries & Severe Service Solutions
        </h2>
        <p className="text-sm text-slate-400">
          From extreme cryogenic temperatures to abrasive mining slurries and superheated power boiler steam, Venus Enterprises manufactures certified valve assemblies for global infrastructure.
        </p>
      </div>

      {/* Grid of Industries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industriesData.map((ind) => (
          <div
            key={ind.id}
            className="group bg-navy-900 border border-slate-800 rounded-2xl overflow-hidden glass-panel-hover flex flex-col justify-between"
          >
            <div>
              {/* Image Header */}
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={ind.bgImage}
                  alt={ind.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
                <h3 className="absolute bottom-3 left-4 right-4 font-heading font-bold text-lg text-white">
                  {ind.name}
                </h3>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ind.description}
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Engineering Specs Compliance:
                  </span>
                  <div className="space-y-1">
                    {ind.keyRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-flame-500"></span>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0">
              <button
                onClick={onConfigureRfq}
                className="w-full py-2.5 rounded-xl bg-navy-800 hover:bg-flame-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Request {ind.name.split(' ')[0]} RFQ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
