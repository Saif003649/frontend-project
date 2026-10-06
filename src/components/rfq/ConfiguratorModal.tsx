import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  Building2, 
  Globe, 
  User, 
  Mail, 
  Phone,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, ValveCategory, MaterialType, PressureRating, EndConnection, RfqSubmission } from '../../types';
import { productsData } from '../../data/products';
import { generateRfqPdf } from '../../utils/pdfHelper';

interface ConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product;
}

export const ConfiguratorModal: React.FC<ConfiguratorModalProps> = ({
  isOpen,
  onClose,
  initialProduct
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [productName, setProductName] = useState(initialProduct?.name || '3-Piece Forged Trunnion Mounted Ball Valve');
  const [category, setCategory] = useState<ValveCategory>(initialProduct?.category || 'Ball Valves');
  const [size, setSize] = useState('4" (DN100)');
  const [pressureClass, setPressureClass] = useState<PressureRating>('Class 600');
  const [material, setMaterial] = useState<MaterialType>('CF8M / SS316');
  const [endConnection, setEndConnection] = useState<EndConnection>('Flanged RF (Raised Face)');
  const [operation, setOperation] = useState('Pneumatic Actuator');
  const [quantity, setQuantity] = useState(10);
  const [fluidMedium, setFluidMedium] = useState('High Pressure Natural Gas / Condensate');
  const [operatingTemp, setOperatingTemp] = useState('-20°C to +150°C');
  const [specialNotes, setSpecialNotes] = useState('Include EN 10204 3.1 Mill Test Reports and API 607 Fire Safe Certificate.');

  // Client Details
  const [companyName, setCompanyName] = useState('PetroTech Global Engineering Ltd.');
  const [contactPerson, setContactPerson] = useState('Robert Sterling');
  const [email, setEmail] = useState('r.sterling@petrotech-global.com');
  const [phone, setPhone] = useState('+44 20 7946 0912');
  const [country, setCountry] = useState('United Kingdom / UAE');
  const [industry, setIndustry] = useState('Oil & Gas Pipeline');

  const [submittedRfq, setSubmittedRfq] = useState<RfqSubmission | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setProductName(initialProduct.name);
      setCategory(initialProduct.category);
    }
  }, [initialProduct]);

  const handleNextStep = () => {
    if (step < 4) setStep((prev) => (prev + 1) as any);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as any);
  };

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();

    const rfqNumber = `VE-RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const rfqData: RfqSubmission = {
      id: `rfq-${Date.now()}`,
      rfqNumber,
      date: new Date().toISOString().split('T')[0],
      companyName,
      contactPerson,
      email,
      phone,
      country,
      industry,
      items: [
        {
          productName,
          category,
          size,
          pressureClass,
          material,
          endConnection,
          operation,
          quantity,
          fluidMedium,
          operatingTemp,
          specialNotes
        }
      ],
      status: 'Pending Review'
    };

    setSubmittedRfq(rfqData);
    setStep(4);

    // Trigger visual confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }

    // Auto trigger PDF download
    generateRfqPdf(rfqData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-navy-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-flame-600 flex items-center justify-center font-heading font-black text-white text-sm shadow">
              VE
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Venus Enterprises RFQ Configurator
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Instant B2B PDF Quotation Generator
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

        {/* Progress Step Bar */}
        {step < 4 && (
          <div className="bg-navy-850 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-flame-400 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-flame-600 text-white' : 'bg-slate-800'}`}>1</span>
              <span>Valve Type</span>
            </div>
            <div className="w-8 h-px bg-slate-700"></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-flame-400 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-flame-600 text-white' : 'bg-slate-800'}`}>2</span>
              <span>Technical Specs</span>
            </div>
            <div className="w-8 h-px bg-slate-700"></div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-flame-400 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-flame-600 text-white' : 'bg-slate-800'}`}>3</span>
              <span>Client Details</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 space-y-6">
          
          {/* STEP 1: Select Valve Category & Product Name */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">
                  Step 1: Select Valve Assembly & Category
                </h3>
                <p className="text-xs text-slate-400">
                  Select an industrial valve product baseline or custom type.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Select Target Valve Product:
                </label>
                <select
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    const found = productsData.find((p) => p.name === e.target.value);
                    if (found) setCategory(found.category);
                  }}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-flame-500 font-medium"
                >
                  {productsData.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                  <option value="Custom Engineered Special Valve Assembly">
                    [Custom Engineered Special Valve Assembly]
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Operating Fluid Medium:</label>
                  <input
                    type="text"
                    value={fluidMedium}
                    onChange={(e) => setFluidMedium(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Operating Temp Range:</label>
                  <input
                    type="text"
                    value={operatingTemp}
                    onChange={(e) => setOperatingTemp(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Configure Technical Specifications */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">
                  Step 2: Technical Parameters & Pressure Ratings
                </h3>
                <p className="text-xs text-slate-400">
                  Configure nominal bore size, pressure class, body metallurgy, and end connections.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Nominal Size (Bore):</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    {['1/2" (DN15)', '1" (DN25)', '2" (DN50)', '3" (DN80)', '4" (DN100)', '6" (DN150)', '8" (DN200)', '12" (DN300)', '18" (DN450)', '24" (DN600)'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Pressure */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Pressure Rating:</label>
                  <select
                    value={pressureClass}
                    onChange={(e) => setPressureClass(e.target.value as any)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-semibold text-flame-400"
                  >
                    {['Class 150', 'Class 300', 'Class 600', 'Class 900', 'Class 1500', 'PN10 / PN16', 'PN40 / PN64'].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Material */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Body Metallurgy:</label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value as any)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    {[
                      'WCB / Cast Carbon Steel',
                      'CF8 / SS304',
                      'CF8M / SS316',
                      'Forged Steel A105',
                      'Duplex Stainless Steel (2205)',
                      'Monel 400',
                      'Hastelloy C276'
                    ].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* End Connection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">End Connection:</label>
                  <select
                    value={endConnection}
                    onChange={(e) => setEndConnection(e.target.value as any)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    {[
                      'Flanged RF (Raised Face)',
                      'Flanged RTJ (Ring Type Joint)',
                      'Screwed NPT / BSP',
                      'Socket Weld (SW)',
                      'Butt Weld (BW)',
                      'Wafer Type'
                    ].map((ec) => (
                      <option key={ec} value={ec}>{ec}</option>
                    ))}
                  </select>
                </div>

                {/* Operation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Operator / Actuation:</label>
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    {['Manual Handwheel', 'Worm Gear Box', 'Pneumatic Actuator', 'Electric Actuator'].map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Required Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-bold text-emerald-400"
                  />
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Special Testing / QA Notes:</label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Client Details */}
          {step === 3 && (
            <form onSubmit={handleSubmitRfq} className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">
                  Step 3: Business Contact & Export Information
                </h3>
                <p className="text-xs text-slate-400">
                  Provide your organization details to receive instant RFQ PDF compilation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Company Name:</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Contact Person Name:</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Business Email:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Phone / WhatsApp:</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Country / Destination Port:</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Industry Sector:</label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-flame-600 to-flame-700 hover:from-flame-500 hover:to-flame-600 text-white font-bold text-sm shadow-xl shadow-flame-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Official RFQ PDF & Submit</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success View */}
          {step === 4 && submittedRfq && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  Quotation PDF Generated Successfully!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your reference code is <strong className="text-flame-400 font-mono">{submittedRfq.rfqNumber}</strong>. The RFQ document has been compiled and downloaded to your computer.
                </p>
              </div>

              <div className="p-4 bg-navy-950 border border-slate-800 rounded-xl max-w-md mx-auto text-left font-mono text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>RFQ Reference:</span>
                  <span className="text-white font-bold">{submittedRfq.rfqNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target Product:</span>
                  <span className="text-slate-200">{productName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Quantity:</span>
                  <span className="text-emerald-400 font-bold">{quantity} Units</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => generateRfqPdf(submittedRfq)}
                  className="px-5 py-2.5 rounded-xl bg-flame-600 text-white font-semibold text-xs flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Re-Download RFQ PDF</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Controls for Steps 1-3 */}
        {step < 4 && (
          <div className="px-6 py-4 bg-navy-950 border-t border-slate-800 flex items-center justify-between">
            <button
              disabled={step === 1}
              onClick={handlePrevStep}
              className={`px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 ${
                step === 1 ? 'opacity-40 text-slate-600 cursor-not-allowed' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {step < 3 && (
              <button
                onClick={handleNextStep}
                className="px-5 py-2 rounded bg-flame-600 hover:bg-flame-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <span>Continue Step {step + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
