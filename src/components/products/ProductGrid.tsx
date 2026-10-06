import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid, List, Layers, X, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { productsData } from '../../data/products';
import { ProductFilter } from './ProductFilter';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductGridProps {
  onConfigureRfq: (product?: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onConfigureRfq }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [selectedPressure, setSelectedPressure] = useState('All Pressure Classes');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Filtered Products Memo
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesModel = p.modelNumber.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesModel && !matchesDesc) return false;
      }

      // Category
      if (selectedCategory !== 'All Categories' && p.category !== selectedCategory) {
        return false;
      }

      // Material
      if (selectedMaterial !== 'All Materials' && !p.specs.materials.includes(selectedMaterial as any)) {
        return false;
      }

      // Pressure
      if (selectedPressure !== 'All Pressure Classes' && !p.specs.pressureRatings.includes(selectedPressure as any)) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'All Brands' && p.brand !== selectedBrand) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedMaterial, selectedPressure, selectedBrand]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedMaterial('All Materials');
    setSelectedPressure('All Pressure Classes');
    setSelectedBrand('All Brands');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Catalogue Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-flame-600/10 text-flame-400 font-mono text-xs font-semibold mb-2 border border-flame-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>ENTERPRISE VALVE PORTFOLIO</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Industrial Valves Catalogue
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Browse API, ANSI, DIN, and BS standard industrial valve assemblies with multi-parametric filtering.
          </p>
        </div>

        {/* Global RFQ Trigger Banner */}
        <button
          onClick={() => onConfigureRfq()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-flame-600 to-flame-700 hover:from-flame-500 hover:to-flame-600 text-white font-bold text-xs shadow-lg shadow-flame-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Configure Custom Valve RFQ</span>
        </button>
      </div>

      {/* Search & Active Pills Bar */}
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ball, gate, globe, butterfly valves..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-950 border border-slate-700/80 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-flame-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Active Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-slate-400">
            Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> Products
          </span>
          {selectedCategory !== 'All Categories' && (
            <span className="px-2.5 py-1 rounded bg-flame-600/20 text-flame-400 border border-flame-500/30 font-mono text-[11px]">
              {selectedCategory}
            </span>
          )}
          {selectedMaterial !== 'All Materials' && (
            <span className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono text-[11px]">
              {selectedMaterial}
            </span>
          )}
        </div>

      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Filter Column */}
        <div className="lg:col-span-3">
          <ProductFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedPressure={selectedPressure}
            setSelectedPressure={setSelectedPressure}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Cards Grid Column */}
        <div className="lg:col-span-9 space-y-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setSelectedProductForModal(p)}
                  onConfigureRfq={(p) => onConfigureRfq(p)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-navy-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <Layers className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
              <h3 className="font-heading font-bold text-xl text-white">
                No Valves Match Your Filter Criteria
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try loosening your material, pressure rating, or category filters, or contact our engineering desk directly for custom forgings.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded bg-flame-600 text-white text-xs font-semibold hover:bg-flame-500 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onConfigureRfq={(p) => onConfigureRfq(p)}
      />

    </section>
  );
};
