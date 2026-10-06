import React from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { Product } from '../../types';
import { generateProductDatasheetPdf } from '../../utils/pdfHelper';
import { companyInfo } from '../../data/companyInfo';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (p: Product) => void;
  onConfigureRfq: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onConfigureRfq
}) => {
  const handleWhatsapp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Venus Enterprises, I am interested in your ${product.name} (${product.modelNumber}). Please share pricing and technical specs.`
    );
    window.open(`https://wa.me/${companyInfo.contact.whatsapp}?text=${text}`, '_blank');
  };

  const handleDownloadDatasheet = (e: React.MouseEvent) => {
    e.stopPropagation();
    generateProductDatasheetPdf(product);
  };

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group bg-navy-900 border border-slate-800 rounded-xl overflow-hidden glass-panel-hover flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        {/* Product Image Header */}
        <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-flame-600/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow">
              {product.category}
            </span>
            {product.featured && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-navy-950 font-mono text-[10px] font-bold uppercase shadow">
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded bg-navy-950/80 border border-slate-700 text-slate-300 font-mono text-[10px]">
              {product.brand}
            </span>
          </div>

          {/* Model Number Overlay */}
          <div className="absolute bottom-2 left-3 font-mono text-[11px] text-slate-400">
            Model: <span className="text-white font-semibold">{product.modelNumber}</span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-3">
          
          <h3 className="font-heading font-bold text-lg text-white group-hover:text-flame-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Quick Technical Spec Grid */}
          <div className="bg-navy-950/70 border border-slate-800 rounded-lg p-2.5 space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Sizes:</span>
              <span className="text-white font-medium">{product.specs.sizeRange}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Classes:</span>
              <span className="text-flame-400 font-semibold">{product.specs.pressureRatings.slice(0, 3).join(', ')}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Standard:</span>
              <span className="text-slate-200">{product.specs.standards[0]}</span>
            </div>
          </div>

          {/* Certifications preview */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {product.certifications.slice(0, 3).map((cert, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                <ShieldCheck className="w-2.5 h-2.5" />
                {cert}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Card Action Buttons Footer */}
      <div className="p-4 pt-0 space-y-2 border-t border-slate-800/60 mt-3">
        <div className="grid grid-cols-2 gap-2 pt-3">
          <button
            onClick={() => onSelectProduct(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-navy-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>360° Specs</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfigureRfq(product);
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-flame-600 hover:bg-flame-500 text-white text-xs font-semibold shadow transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RFQ Quote</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <button
            onClick={handleDownloadDatasheet}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Download className="w-3 h-3 text-flame-500" />
            <span>PDF Datasheet</span>
          </button>

          <button
            onClick={handleWhatsapp}
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors font-medium"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp RFQ</span>
          </button>
        </div>
      </div>

    </div>
  );
};
