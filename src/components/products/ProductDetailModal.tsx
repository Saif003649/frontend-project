import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Box, 
  RotateCw,
  Layers,
  Settings,
  Flame,
  Building2,
  Share2
} from 'lucide-react';
import { Product } from '../../types';
import { generateProductDatasheetPdf } from '../../utils/pdfHelper';
import { companyInfo } from '../../data/companyInfo';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onConfigureRfq: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onConfigureRfq
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'specs' | 'ptChart' | 'applications'>('specs');
  const [view360, setView360] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleDownloadPdf = () => {
    generateProductDatasheetPdf(product);
  };

  const handleWhatsappShare = () => {
    const msg = encodeURIComponent(
      `Venus Enterprises Technical Inquiry for ${product.name} (Model: ${product.modelNumber}). Size Range: ${product.specs.sizeRange}.`
    );
    window.open(`https://wa.me/${companyInfo.contact.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-navy-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-navy-950">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-flame-600/20 text-flame-400 font-mono text-xs font-bold border border-flame-500/30">
              {product.modelNumber}
            </span>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                {product.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Manufacturer: {product.brand} | Category: {product.category}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Top Section: Interactive Visualizer & Tagline */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Visualizer Frame */}
            <div className="md:col-span-6 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative group flex flex-col items-center justify-center min-h-[280px]">
              
              {view360 ? (
                <div className="w-full h-full p-8 flex flex-col items-center justify-center relative">
                  <div 
                    className="w-48 h-48 rounded-full border-4 border-dashed border-flame-500 flex items-center justify-center transition-transform duration-200 cursor-grab active:cursor-grabbing"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onMouseMove={(e) => {
                      if (e.buttons === 1) {
                        setRotation((prev) => prev + e.movementX * 2);
                      }
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-40 h-40 object-cover rounded-full pointer-events-none"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-4 flex items-center gap-1">
                    <RotateCw className="w-3 h-3 text-flame-500 animate-spin" /> Click & Drag horizontal to rotate 360° CAD model
                  </p>
                </div>
              ) : (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              )}

              {/* 360 Toggle Button */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setView360(!view360)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur border transition-all ${
                    view360
                      ? 'bg-flame-600 text-white border-flame-500'
                      : 'bg-navy-900/80 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>{view360 ? 'Standard View' : '360° CAD View'}</span>
                </button>
              </div>

            </div>

            {/* Overview & Quick Highlights */}
            <div className="md:col-span-6 space-y-4">
              
              <div className="space-y-2">
                <span className="text-xs font-mono text-flame-400 uppercase tracking-widest">
                  Engineering Overview
                </span>
                <h3 className="font-heading font-bold text-xl text-white">
                  {product.tagline}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Compliance Badges */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400">Quality & Standards:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.certifications.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-mono">
                      <ShieldCheck className="w-3 h-3" />
                      {c}
                    </span>
                  ))}
                  {product.specs.standards.map((st, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons inside modal */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onConfigureRfq(product);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs shadow-lg shadow-flame-600/30 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Configure RFQ PDF</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  className="py-2.5 px-4 rounded-xl bg-navy-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-flame-500" />
                  <span>Datasheet</span>
                </button>

                <button
                  onClick={handleWhatsappShare}
                  className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors"
                  title="WhatsApp Technical Desk"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Specification Tabs */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            
            <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 transition-colors border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-flame-500 text-flame-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Dimensional & Material Specs
              </button>
              <button
                onClick={() => setActiveTab('ptChart')}
                className={`pb-2.5 transition-colors border-b-2 ${
                  activeTab === 'ptChart'
                    ? 'border-flame-500 text-flame-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Pressure-Temperature Limits
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`pb-2.5 transition-colors border-b-2 ${
                  activeTab === 'applications'
                    ? 'border-flame-500 text-flame-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Target Industry Applications
              </button>
            </div>

            {/* Tab 1: Detailed Specifications Table */}
            {activeTab === 'specs' && (
              <div className="bg-navy-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <tbody className="divide-y divide-slate-800">
                    <tr className="bg-navy-900/50">
                      <td className="p-3 text-slate-400 font-semibold w-1/3">Size Range</td>
                      <td className="p-3 text-white">{product.specs.sizeRange}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-semibold">Pressure Ratings</td>
                      <td className="p-3 text-flame-400 font-bold">{product.specs.pressureRatings.join(', ')}</td>
                    </tr>
                    <tr className="bg-navy-900/50">
                      <td className="p-3 text-slate-400 font-semibold">Temperature Limits</td>
                      <td className="p-3 text-white">{product.specs.temperatureRange}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-semibold">Body & Bonnet Materials</td>
                      <td className="p-3 text-slate-200">{product.specs.materials.join(' | ')}</td>
                    </tr>
                    <tr className="bg-navy-900/50">
                      <td className="p-3 text-slate-400 font-semibold">End Connections</td>
                      <td className="p-3 text-slate-200">{product.specs.endConnections.join(' | ')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-semibold">Seat & Trim Material</td>
                      <td className="p-3 text-slate-200">{product.specs.seatMaterial}</td>
                    </tr>
                    <tr className="bg-navy-900/50">
                      <td className="p-3 text-slate-400 font-semibold">Operation & Actuation</td>
                      <td className="p-3 text-slate-200">{product.specs.operationTypes.join(', ')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: Pressure-Temperature Chart */}
            {activeTab === 'ptChart' && (
              <div className="bg-navy-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
                <h4 className="text-slate-200 font-bold flex items-center gap-2">
                  <Flame className="w-4 h-4 text-flame-500" />
                  ASME B16.34 Working Pressure vs Temperature Matrix (Bar / PSI)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-navy-900 text-slate-300 border-b border-slate-800">
                        <th className="p-2.5 text-left">Temp (°C)</th>
                        <th className="p-2.5">Class 150</th>
                        <th className="p-2.5">Class 300</th>
                        <th className="p-2.5">Class 600</th>
                        <th className="p-2.5">Class 900</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-300">
                      <tr>
                        <td className="p-2.5 text-left font-bold text-white">-29°C to +38°C</td>
                        <td className="p-2.5 text-emerald-400">19.6 Bar</td>
                        <td className="p-2.5 text-emerald-400">51.1 Bar</td>
                        <td className="p-2.5 text-emerald-400">102.1 Bar</td>
                        <td className="p-2.5 text-emerald-400">153.2 Bar</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-left font-bold text-white">+100°C</td>
                        <td className="p-2.5">17.7 Bar</td>
                        <td className="p-2.5">46.6 Bar</td>
                        <td className="p-2.5">93.2 Bar</td>
                        <td className="p-2.5">139.8 Bar</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-left font-bold text-white">+200°C</td>
                        <td className="p-2.5">13.8 Bar</td>
                        <td className="p-2.5">43.8 Bar</td>
                        <td className="p-2.5">87.6 Bar</td>
                        <td className="p-2.5">131.4 Bar</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-left font-bold text-white">+400°C</td>
                        <td className="p-2.5 text-flame-400">6.5 Bar</td>
                        <td className="p-2.5 text-flame-400">34.7 Bar</td>
                        <td className="p-2.5 text-flame-400">69.4 Bar</td>
                        <td className="p-2.5 text-flame-400">104.1 Bar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-400">
                  * Pressure ratings compliant with ASME B16.34 Group 1.1 WCB Carbon Steel & Group 2.2 SS316. Hydrostatic Shell Test performed at 1.5x nominal rating.
                </p>
              </div>
            )}

            {/* Tab 3: Applications */}
            {activeTab === 'applications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-flame-600/15 border border-flame-500/30 flex items-center justify-center text-flame-500">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white">{app}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-navy-950 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Venus Enterprises ISO 9001:2015 Approved Catalogue</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white font-sans font-medium transition-colors"
          >
            Close Modal
          </button>
        </div>

      </div>
    </div>
  );
};
