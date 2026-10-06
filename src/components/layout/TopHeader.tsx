import React from 'react';
import { Phone, Mail, Globe, ShieldCheck, MessageCircle } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

export const TopHeader: React.FC = () => {
  return (
    <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Stats & Badges */}
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Global Export Active (48+ Countries)
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="inline-flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-flame-500" />
            ISO 9001:2015 & API 6D Certified
          </span>
        </div>

        {/* Right Contact Details */}
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
          <a
            href={`tel:${companyInfo.contact.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-flame-500" />
            <span>24/7 RFQ Desk: {companyInfo.contact.phone}</span>
          </a>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <a
            href={`https://wa.me/${companyInfo.contact.whatsapp}?text=Hello%20Venus%20Enterprises%2C%20I%20would%20like%20to%20inquire%20about%20industrial%20valves.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Instant</span>
          </a>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <a
            href={`mailto:${companyInfo.contact.email}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{companyInfo.contact.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
