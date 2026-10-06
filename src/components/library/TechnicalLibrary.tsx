import React, { useState } from 'react';
import { Download, FileText, ShieldCheck, Search, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { datasheetsData } from '../../data/datasheets';
import { companyInfo } from '../../data/companyInfo';
import { TechnicalDatasheet } from '../../types';
import { generateProductDatasheetPdf } from '../../utils/pdfHelper';
import { productsData } from '../../data/products';

export const TechnicalLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datasheets' | 'flanges' | 'materials' | 'certs'>('datasheets');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDatasheets = datasheetsData.filter((ds) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return ds.title.toLowerCase().includes(q) || ds.category.toLowerCase().includes(q) || ds.standard.toLowerCase().includes(q);
  });

  const handleDownloadFile = (ds: TechnicalDatasheet) => {
    generateProductDatasheetPdf(productsData[0]);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-flame-600/10 text-flame-400 font-mono text-xs font-semibold mb-2 border border-flame-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENGINEERING DOCUMENTATION & DATASHEETS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Technical Library & Download Center
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Download certified PDF engineering datasheets, flange dimension tables, material compatibility matrices, and ISO/API certificates.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-navy-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('datasheets')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'datasheets' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Datasheets PDF
          </button>
          <button
            onClick={() => setActiveTab('flanges')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'flanges' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Flange Dimensions
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'materials' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Material Matrix
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'certs' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Certificates
          </button>
        </div>
      </div>

      {/* TAB 1: Datasheets */}
      {activeTab === 'datasheets' && (
        <div className="space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search datasheets by standard (e.g. API 6D, ASME B16.5)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-flame-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatasheets.map((ds) => (
              <div key={ds.id} className="bg-navy-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-navy-950 border border-slate-800 text-flame-400 font-bold">{ds.category}</span>
                    <span>{ds.fileSize} • {ds.format}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white leading-snug">
                    {ds.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Standard: <strong className="text-slate-200">{ds.standard}</strong>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">{ds.downloadCount} Downloads</span>
                  <button
                    onClick={() => handleDownloadFile(ds)}
                    className="px-4 py-2 rounded-lg bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Flange Dimensions Table */}
      {activeTab === 'flanges' && (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
          <h3 className="font-heading font-bold text-lg text-white">
            ASME B16.5 Flange Dimension Quick Reference (Class 150 & 300)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-950 text-slate-400 border-b border-slate-800">
                  <th className="p-3">NPS (Inches)</th>
                  <th className="p-3">Outer Diam. (OD)</th>
                  <th className="p-3">Bolt Circle (PCD)</th>
                  <th className="p-3">No. Bolts</th>
                  <th className="p-3">Bolt Diam.</th>
                  <th className="p-3">Flange Thick. (Class 150)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">2" (DN50)</td>
                  <td className="p-3">150 mm / 6.00"</td>
                  <td className="p-3">120.7 mm / 4.75"</td>
                  <td className="p-3 font-bold text-flame-400">4</td>
                  <td className="p-3">5/8" UNC</td>
                  <td className="p-3">19.1 mm / 0.75"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">3" (DN80)</td>
                  <td className="p-3">190 mm / 7.50"</td>
                  <td className="p-3">152.4 mm / 6.00"</td>
                  <td className="p-3 font-bold text-flame-400">4</td>
                  <td className="p-3">5/8" UNC</td>
                  <td className="p-3">23.9 mm / 0.94"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">4" (DN100)</td>
                  <td className="p-3">230 mm / 9.00"</td>
                  <td className="p-3">190.5 mm / 7.50"</td>
                  <td className="p-3 font-bold text-flame-400">8</td>
                  <td className="p-3">5/8" UNC</td>
                  <td className="p-3">23.9 mm / 0.94"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">6" (DN150)</td>
                  <td className="p-3">280 mm / 11.00"</td>
                  <td className="p-3">241.3 mm / 9.50"</td>
                  <td className="p-3 font-bold text-flame-400">8</td>
                  <td className="p-3">3/4" UNC</td>
                  <td className="p-3">25.4 mm / 1.00"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Material Matrix */}
      {activeTab === 'materials' && (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
          <h3 className="font-heading font-bold text-lg text-white">
            Valve Body & Seat Chemical Compatibility Matrix
          </h3>
          <p className="text-slate-400 text-xs">
            A = Excellent / Recommended | B = Minor Effect / Compatible | C = Unsuitable / Rapid Corrosion
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-navy-950 text-slate-400 border-b border-slate-800">
                  <th className="p-3 text-left">Fluid Medium</th>
                  <th className="p-3">WCB Steel</th>
                  <th className="p-3">SS304 (CF8)</th>
                  <th className="p-3">SS316 (CF8M)</th>
                  <th className="p-3">Duplex 2205</th>
                  <th className="p-3">Hastelloy C276</th>
                  <th className="p-3">PTFE Seat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 text-left font-bold text-white">Crude Oil & Hydrocarbons</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                </tr>
                <tr>
                  <td className="p-3 text-left font-bold text-white">Superheated Steam (350°C)</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-flame-400 font-bold">C (Temp Limit)</td>
                </tr>
                <tr>
                  <td className="p-3 text-left font-bold text-white">Sulfuric Acid (50%)</td>
                  <td className="p-3 text-flame-400 font-bold">C</td>
                  <td className="p-3 text-amber-400 font-bold">B</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                </tr>
                <tr>
                  <td className="p-3 text-left font-bold text-white">Seawater & Brine</td>
                  <td className="p-3 text-flame-400 font-bold">C</td>
                  <td className="p-3 text-amber-400 font-bold">B</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Certifications */}
      {activeTab === 'certs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyInfo.certifications.map((cert, idx) => (
            <div key={idx} className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">{cert.name}</h3>
              <p className="text-xs text-slate-400 font-mono">Issued by: {cert.agency}</p>
              <span className="inline-block px-2.5 py-1 rounded bg-navy-950 border border-slate-800 text-flame-400 font-mono text-xs">
                Cert Reg: {cert.code}
              </span>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
