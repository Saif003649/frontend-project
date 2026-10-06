import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  Plus, 
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { productsData } from '../../data/products';
import { Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rfqs' | 'products' | 'dealers'>('rfqs');
  const [rfqList, setRfqList] = useState([
    {
      id: 'rfq-01',
      rfqNumber: 'VE-RFQ-2026-8812',
      companyName: 'PetroTech Global Engineering',
      contact: 'Robert Sterling',
      email: 'r.sterling@petrotech.com',
      date: '2026-08-08',
      itemsCount: 2,
      estValue: '$48,500',
      status: 'Pending Review'
    },
    {
      id: 'rfq-02',
      rfqNumber: 'VE-RFQ-2026-7740',
      companyName: 'Saudi Water Conversion Corp',
      contact: 'Ahmed Al-Mansoor',
      email: 'a.mansoor@swcc.gov.sa',
      date: '2026-08-07',
      itemsCount: 5,
      estValue: '$124,000',
      status: 'Quoted'
    },
    {
      id: 'rfq-03',
      rfqNumber: 'VE-RFQ-2026-6621',
      companyName: 'Reliance Jamnagar Complex',
      contact: 'Vikram Patel',
      email: 'v.patel@reliance.com',
      date: '2026-08-06',
      itemsCount: 12,
      estValue: '$310,000',
      status: 'Approved'
    }
  ]);

  const [products, setProducts] = useState<Product[]>(productsData);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setRfqList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
    );
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-flame-600/10 text-flame-400 font-mono text-xs font-semibold mb-2 border border-flame-500/20">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>EXECUTIVE OPERATIONS PANEL</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Venus Admin & CMS Portal
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Manage global RFQ pipelines, product catalogue CMS, authorized dealer verifications, and export analytics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-navy-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'rfqs' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            RFQ Pipeline ({rfqList.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'products' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Product CMS ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('dealers')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'dealers' ? 'bg-flame-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dealer Approvals
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Total Active RFQs</span>
            <FileText className="w-4 h-4 text-flame-500" />
          </div>
          <div className="font-heading font-extrabold text-3xl text-white">48</div>
          <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% this month
          </p>
        </div>

        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-heading font-extrabold text-3xl text-white">$1.84M</div>
          <p className="text-[11px] text-slate-400 font-mono">Weighted export value</p>
        </div>

        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Live Products in CMS</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="font-heading font-extrabold text-3xl text-white">{products.length}</div>
          <p className="text-[11px] text-slate-400 font-mono">API / ANSI Certified</p>
        </div>

        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Pending Dealer Apps</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-heading font-extrabold text-3xl text-white">6</div>
          <p className="text-[11px] text-amber-400 font-mono">Awaiting verification</p>
        </div>
      </div>

      {/* TAB 1: RFQs Pipeline */}
      {activeTab === 'rfqs' && (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">
              Incoming RFQ Enquiries Desk
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Live updates enabled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-navy-950 text-slate-400 border-b border-slate-800">
                  <th className="p-3">RFQ Code</th>
                  <th className="p-3">Company & Contact</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Est. Value</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {rfqList.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-navy-850 transition-colors">
                    <td className="p-3 font-bold text-flame-400">{rfq.rfqNumber}</td>
                    <td className="p-3">
                      <strong className="text-white block">{rfq.companyName}</strong>
                      <span className="text-slate-500">{rfq.contact} ({rfq.email})</span>
                    </td>
                    <td className="p-3 text-slate-400">{rfq.date}</td>
                    <td className="p-3">{rfq.itemsCount} Valves</td>
                    <td className="p-3 font-bold text-white">{rfq.estValue}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        rfq.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        rfq.status === 'Quoted' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {rfq.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(rfq.id, 'Quoted')}
                        className="px-2.5 py-1 rounded bg-blue-600 text-white font-sans text-[11px] font-semibold hover:bg-blue-500"
                      >
                        Mark Quoted
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Product CMS */}
      {activeTab === 'products' && (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">
              Catalogue Management System (CMS)
            </h3>
            <button
              onClick={() => alert('Add Product Modal triggered. Fill specs to add new valve to catalogue.')}
              className="px-4 py-2 rounded-lg bg-flame-600 hover:bg-flame-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Valve Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-flame-400">{p.modelNumber}</span>
                  <h4 className="font-bold text-xs text-white line-clamp-1">{p.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{p.category}</p>
                </div>
                <button className="px-2.5 py-1 rounded bg-navy-800 hover:bg-slate-700 text-slate-300 text-xs font-mono">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Dealer Approvals */}
      {activeTab === 'dealers' && (
        <div className="bg-navy-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">
            Pending Stockist & Distributor Applications
          </h3>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-slate-400">Ref: DLR-2026-881</span>
                <h4 className="text-white font-bold text-sm">Gulf Flow Controls LLC (Dubai, UAE)</h4>
                <p className="text-slate-400">Annual Volume: $1M - $5M USD | Tax ID: VAT-98421-DXB</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Dealer Approved as Gold Tier (25% Discount)! Notification Email Sent.')}
                  className="px-3 py-1.5 rounded bg-emerald-600 text-white font-sans text-xs font-semibold"
                >
                  Approve (Gold Tier)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
