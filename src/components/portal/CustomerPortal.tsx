import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Truck, FileCheck, Layers, Download } from 'lucide-react';
import { OrderTrackResult } from '../../types';

export const CustomerPortal: React.FC = () => {
  const [query, setQuery] = useState('VE-ORD-8812');
  const [result, setResult] = useState<OrderTrackResult | null>({
    orderNumber: 'VE-ORD-8812',
    heatNumber: 'HT-2026-9941',
    productName: '3-Piece Forged Trunnion Mounted Ball Valve 6" Class 600 SS316',
    quantity: 24,
    customerName: 'Aramco Offshore Pipeline Project',
    dispatchDate: '2026-08-15',
    hydroTestResult: 'PASSED (API 598)',
    mtrCertNumber: 'EN10204-3.1-VE-9941',
    currentLocation: 'Jebel Ali Port / Export Warehouse Mumbai',
    status: 'Ready for Export'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setResult({
        orderNumber: query.toUpperCase(),
        heatNumber: `HT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        productName: 'API 600 Heavy Duty Gate Valve 8" Class 300 WCB',
        quantity: 12,
        customerName: 'Global EPC Refinery Contractors',
        dispatchDate: '2026-08-20',
        hydroTestResult: 'PASSED (API 598)',
        mtrCertNumber: `EN10204-3.1-VE-${Math.floor(1000 + Math.random() * 9000)}`,
        currentLocation: 'Hydrostatic Testing Station #4',
        status: 'Hydrostatic Testing'
      });
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-600/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MATERIAL TEST REPORT (MTR) & ORDER TRACKING</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Customer Quality Portal
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Look up EN 10204 3.1 Mill Test Reports, Heat Number traceability, and live manufacturing status.
        </p>
      </div>

      {/* Lookup Bar */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            required
            placeholder="Enter Order Ref (e.g. VE-ORD-8812) or Heat Number (e.g. HT-2026-9941)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-navy-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-colors shrink-0"
        >
          Track & Verify
        </button>
      </form>

      {/* Result Card */}
      {result && (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-xl text-white">
                  Order Ref: {result.orderNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-700/50 font-mono text-[11px] font-bold">
                  {result.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Heat Number: <strong className="text-white">{result.heatNumber}</strong> | MTR Ref: {result.mtrCertNumber}
              </p>
            </div>

            <button
              onClick={() => alert(`Downloading Mill Test Report Certificate PDF for ${result.mtrCertNumber}...`)}
              className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download EN 10204 3.1 MTR PDF</span>
            </button>
          </div>

          {/* Workflow Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-navy-950 border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold block">1. Casting / Forging</span>
              <span className="text-slate-400 text-[10px]">Spectro Analysis PASSED</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-950 border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold block">2. CNC Machining</span>
              <span className="text-slate-400 text-[10px]">Tolerance ±0.02mm</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-950 border border-emerald-500/30 space-y-1">
              <span className="text-emerald-400 font-bold block">3. Hydro Hydrostatic</span>
              <span className="text-emerald-400 text-[10px] font-bold">API 598 100% PASSED</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-slate-300 font-bold block">4. Export Shipping</span>
              <span className="text-slate-400 text-[10px]">{result.currentLocation}</span>
            </div>
          </div>

          {/* Detailed Info Table */}
          <div className="bg-navy-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block">Product Assembly:</span>
                <span className="text-white font-bold">{result.productName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Order Quantity:</span>
                <span className="text-white font-bold">{result.quantity} Units</span>
              </div>
              <div>
                <span className="text-slate-500 block">Project / Client:</span>
                <span className="text-slate-300">{result.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Dispatch Date:</span>
                <span className="text-slate-300">{result.dispatchDate}</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
