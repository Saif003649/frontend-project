import React, { useState } from 'react';
import { Search, X, Layers, FileText, ChevronRight } from 'lucide-react';
import { productsData } from '../../data/products';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onConfigureRfq: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onConfigureRfq
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = productsData.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.modelNumber.toLowerCase().includes(q) ||
      p.specs.standards.some((s) => s.toLowerCase().includes(q)) ||
      p.specs.materials.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-navy-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar */}
        <div className="p-4 bg-navy-950 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-flame-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type valve name, material (e.g. SS316, WCB), pressure (600#), standard (API 6D)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {searchResults.length > 0 ? (
            searchResults.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(p);
                }}
                className="p-3 rounded-xl bg-navy-950 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-flame-400">
                    {p.modelNumber.split('-')[1]}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-white group-hover:text-flame-400 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400">
                      {p.category} | {p.specs.sizeRange} | {p.specs.standards[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                      onConfigureRfq(p);
                    }}
                    className="px-2.5 py-1 rounded bg-flame-600 text-white font-mono text-[10px] font-bold hover:bg-flame-500"
                  >
                    RFQ
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching valves found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-navy-950 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
          <span>Esc to exit</span>
          <span>{searchResults.length} matching products</span>
        </div>

      </div>
    </div>
  );
};
