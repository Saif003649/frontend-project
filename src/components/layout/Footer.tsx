import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  Award,
  ExternalLink
} from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenRfqModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenRfqModal }) => {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailSub('');
    }
  };

  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-flame-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-flame-600 flex items-center justify-center font-heading font-black text-xl text-white shadow-lg shadow-flame-600/30">
                VE
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white tracking-tight">
                  VENUS ENTERPRISES
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Flow Control Engineering Solutions
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pr-4">
              Venus Enterprises is an enterprise-grade manufacturer, exporter, and supplier of high-performance industrial valves, flanges, piping fittings, and process automation components, serving Oil & Gas, Power, Chemical, Pharma, and Water industries worldwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {companyInfo.certifications.slice(0, 4).map((cert, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-850 text-slate-300 border border-slate-700 text-xs font-mono"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {cert.name}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'products', label: 'Product Catalogue' },
                { id: 'industries', label: 'Industries Served' },
                { id: 'brands', label: 'Authorized Brands' },
                { id: 'library', label: 'Technical Library & Datasheets' },
                { id: 'dealer', label: 'Dealer Registration' },
                { id: 'customer', label: 'Customer Portal & MTR' },
                { id: 'admin', label: 'Admin Portal' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className="hover:text-flame-500 transition-colors inline-flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Valve Categories */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Valve Products
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                '3-Piece Trunnion Ball Valves',
                'API 600 Wedge Gate Valves',
                'Throttling Globe Valves',
                'Triple Offset Butterfly Valves',
                'Dual Plate Check Valves',
                'Slurry Knife Gate Valves',
                'Modulating Control Valves',
                'Safety Relief Valves',
              ].map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Global Desk & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Global Desk & Updates
            </h4>
            
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-flame-500 shrink-0 mt-0.5" />
                <span>{companyInfo.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{companyInfo.contact.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-slate-400 mb-2">Subscribe to Engineering Bulletins:</p>
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Engineering email..."
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full bg-navy-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-flame-500"
                />
                <button
                  type="submit"
                  className="bg-flame-600 text-white px-3 py-1.5 rounded hover:bg-flame-500 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed to Venus Technical Bulletins!
                </p>
              )}
            </div>

            <button
              onClick={onOpenRfqModal}
              className="w-full py-2.5 px-4 rounded bg-slate-800 hover:bg-flame-600 text-white text-xs font-semibold border border-slate-700 transition-all text-center block"
            >
              Generate RFQ PDF Now
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Venus Enterprises. All Rights Reserved. Enterprise Flow Control Solutions.</p>
          <div className="flex items-center gap-6 text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Sale</span>
            <span className="hover:text-slate-300 cursor-pointer">Mill Test Certificate Verification</span>
            <span className="hover:text-slate-300 cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
