import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { ValveCategory, MaterialType, PressureRating } from '../../types';

interface ProductFilterProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (mat: string) => void;
  selectedPressure: string;
  setSelectedPressure: (press: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  onReset: () => void;
}

const CATEGORIES: ValveCategory[] = [
  'Ball Valves',
  'Gate Valves',
  'Globe Valves',
  'Butterfly Valves',
  'Check Valves',
  'Knife Gate Valves',
  'Plug Valves',
  'Control Valves',
  'Safety Relief Valves',
  'Strainers',
  'Flanges & Fittings',
  'Actuated Valves'
];

const MATERIALS: MaterialType[] = [
  'WCB / Cast Carbon Steel',
  'CF8 / SS304',
  'CF8M / SS316',
  'Forged Steel A105',
  'Duplex Stainless Steel (2205)',
  'Super Duplex (2507)',
  'Monel 400',
  'Hastelloy C276',
  'Cast Iron / Ductile Iron'
];

const PRESSURES: PressureRating[] = [
  'Class 150',
  'Class 300',
  'Class 600',
  'Class 900',
  'Class 1500',
  'PN10 / PN16',
  'PN40 / PN64'
];

const BRANDS = ['All Brands', 'Venus Enterprises', 'Audco', 'L&T', 'Spirax', 'Leader', 'Kirloskar', 'BDK', 'KSB'];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedMaterial,
  setSelectedMaterial,
  selectedPressure,
  setSelectedPressure,
  selectedBrand,
  setSelectedBrand,
  onReset
}) => {
  return (
    <div className="bg-navy-900 border border-slate-800 rounded-xl p-5 space-y-6 shadow-xl sticky top-24">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
          <Filter className="w-4 h-4 text-flame-500" />
          <span>Parametric Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-flame-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Valve Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('All Categories')}
            className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
              selectedCategory === 'All Categories'
                ? 'bg-flame-600 text-white font-semibold'
                : 'text-slate-300 hover:bg-navy-800'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'All Categories' && <Check className="w-3.5 h-3.5" />}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                selectedCategory === cat
                  ? 'bg-flame-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-navy-800'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Body Material Filter */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Body Material
        </label>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          className="w-full bg-navy-850 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-flame-500"
        >
          <option value="All Materials">All Materials</option>
          {MATERIALS.map((mat) => (
            <option key={mat} value={mat}>
              {mat}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Pressure Rating Filter */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Pressure Class / Rating
        </label>
        <select
          value={selectedPressure}
          onChange={(e) => setSelectedPressure(e.target.value)}
          className="w-full bg-navy-850 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-flame-500"
        >
          <option value="All Pressure Classes">All Pressure Ratings</option>
          {PRESSURES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Brand Filter */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Manufacturer / Brand
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full bg-navy-850 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-flame-500"
        >
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};
