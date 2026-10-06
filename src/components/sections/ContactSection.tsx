import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Globe } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-flame-600/10 text-flame-400 font-mono text-xs font-semibold border border-flame-500/20">
          <Globe className="w-3.5 h-3.5" />
          <span>GLOBAL EXPORT & SALES DESK</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Contact Venus Enterprises
        </h2>
        <p className="text-sm text-slate-400">
          Our technical sales desk is available 24/7 for urgent valve inquiries, custom forgings, and RFQs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Details & Map Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">Global Headquarters</h3>
            
            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-flame-500 shrink-0 mt-0.5" />
                <span>{companyInfo.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Phone: {companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {companyInfo.contact.whatsapp}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Email: {companyInfo.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Preview Simulation */}
          <div className="bg-navy-900 border border-slate-800 rounded-2xl overflow-hidden h-64 relative group">
            <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-2 relative">
              <div className="w-12 h-12 rounded-full bg-flame-600/20 text-flame-500 border border-flame-500/40 flex items-center justify-center animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-white text-sm">
                Venus Industrial Headquarters & Manufacturing Complex
              </h4>
              <p className="text-xs font-mono text-slate-400">
                19.0760° N, 72.8777° E • Mumbai / Gujarat Export Corridor
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-flame-600 text-white text-xs font-semibold border border-slate-700 transition-colors inline-block mt-2"
              >
                Open Google Maps Location
              </a>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-white">Direct Technical Sales Enquiry</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Business Email:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Phone / WhatsApp Number:</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Enquiry / Specification Details:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your valve requirements (e.g., 3-piece ball valve 6 inch Class 600 SS316)..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs shadow-lg shadow-flame-600/30 flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Direct Sales Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="font-heading font-extrabold text-2xl text-white">Inquiry Transmitted!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you {name}. A Venus sales engineer will review your inquiry and reply within 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded bg-navy-800 text-slate-300 text-xs font-semibold"
              >
                Send Another Inquiry
              </button>
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
