import React from 'react';
import { Compass, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { brandsData } from '../../data/brands';

interface BrandsSectionProps {
  onConfigureRfq: () => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onConfigureRfq }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 font-mono text-xs font-semibold border border-blue-500/20">
          <Compass className="w-3.5 h-3.5" />
          <span>AUTHORIZED STOCKIST & OEM DISTRIBUTOR</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          World-Class Industrial Valve Partner Brands
        </h2>
        <p className="text-sm text-slate-400">
          Alongside our custom Venus Enterprises valve manufacturing line, we are authorized stocking distributors for leading global flow-control brands.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brandsData.map((brand) => (
          <div
            key={brand.id}
            className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4 glass-panel-hover flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading font-black text-xl text-white tracking-widest bg-navy-950 px-3 py-1.5 rounded border border-slate-800">
                  {brand.logoText}
                </span>
                {brand.authorizedDealer && (
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                    Authorized
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {brand.description}
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Categories:</span>
                <div className="flex flex-wrap gap-1">
                  {brand.categories.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-navy-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <button
                onClick={onConfigureRfq}
                className="w-full py-2 rounded-lg bg-navy-800 hover:bg-flame-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1"
              >
                <span>Request {brand.name} Quote</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
