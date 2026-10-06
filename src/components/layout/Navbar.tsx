import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  FileText, 
  Bot, 
  Building2, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight, 
  Download, 
  UserCheck, 
  LayoutDashboard,
  Compass
} from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRfqModal: () => void;
  onOpenSearchModal: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRfqModal,
  onOpenSearchModal,
  onOpenAiAssistant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'products', label: 'Product Catalogue', icon: Layers },
    { id: 'industries', label: 'Industries Served', icon: Building2 },
    { id: 'brands', label: 'Authorized Brands', icon: Compass },
    { id: 'library', label: 'Technical Library', icon: Download },
    { id: 'dealer', label: 'Dealer Network', icon: UserCheck },
    { id: 'customer', label: 'MTR & Order Track', icon: ShieldCheck },
    { id: 'admin', label: 'Admin Dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-flame-600 to-navy-950 p-0.5 shadow-lg group-hover:shadow-flame-600/30 transition-all">
              <div className="w-full h-full bg-navy-900 rounded-[7px] flex items-center justify-center border border-flame-500/30">
                <span className="font-heading font-black text-xl tracking-tighter text-white">VE</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-flame-500 transition-colors">
                  VENUS
                </span>
                <span className="font-heading font-light text-xl tracking-tight text-slate-300">
                  ENTERPRISES
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Flow Control Engineering
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-flame-600 text-white shadow-md shadow-flame-600/20'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearchModal}
              className="p-2 rounded-md bg-navy-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
              title="Search Valves & Specs"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-gradient-to-r from-blue-600/20 to-navy-800 text-blue-400 hover:text-blue-300 border border-blue-500/30 text-xs font-semibold hover:border-blue-400 transition-all"
            >
              <Bot className="w-4 h-4 animate-bounce" />
              <span>AI Advisor</span>
            </button>

            {/* RFQ Trigger CTA */}
            <button
              onClick={onOpenRfqModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-gradient-to-r from-flame-600 to-flame-700 text-white font-semibold text-xs shadow-lg shadow-flame-600/30 hover:from-flame-500 hover:to-flame-600 transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Configure RFQ</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenAiAssistant}
              className="p-2 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30"
            >
              <Bot className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-navy-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex gap-2 mb-4">
            <button
              onClick={onOpenSearchModal}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-navy-800 text-slate-300 rounded border border-slate-700 text-xs font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Search Catalogue</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfqModal();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-flame-600 text-white rounded text-xs font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>RFQ Generator</span>
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded text-sm font-medium ${
                activeTab === 'home' ? 'bg-flame-600 text-white' : 'text-slate-300 hover:bg-navy-800'
              }`}
            >
              Home Page
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded text-sm font-medium flex items-center justify-between ${
                  activeTab === link.id ? 'bg-flame-600 text-white' : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
