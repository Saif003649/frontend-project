import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, X, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { productsData } from '../../data/products';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedProducts?: string[];
  timestamp: string;
}

interface AiTechnicalAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigureRfq: (productName?: string) => void;
}

export const AiTechnicalAssistant: React.FC<AiTechnicalAssistantProps> = ({
  isOpen,
  onClose,
  onConfigureRfq
}) => {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Greetings! I am the Venus Enterprises AI Engineering Advisor. How can I assist you with valve selection, fluid compatibility, API standards, or pressure class calculations today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulate AI response logic
    setTimeout(() => {
      let aiText = '';
      let suggested: string[] = [];

      const queryLower = userText.toLowerCase();

      if (queryLower.includes('steam') || queryLower.includes('boiler')) {
        aiText = 'For high-temperature steam lines (>200°C), we recommend our API 600 Cast Carbon Steel Gate Valve (VE-GV-600-WCB) with Stellite facing, or a Throttling Globe Valve. For condensate control, Spirax pressure reducing valves are ideal.';
        suggested = ['API 600 Cast Steel Heavy-Duty Gate Valve', 'Cast Stainless Steel Globe Valve (Throttling)'];
      } else if (queryLower.includes('chemical') || queryLower.includes('acid') || queryLower.includes('corrosive')) {
        aiText = 'For severe chemical service (e.g. acids or solvents), we recommend CF8M (Stainless 316), Duplex 2205, or Hastelloy C276 metallurgy with PTFE/PEEK seating. Our Inverted Lubricated Plug Valve or Stainless Globe Valve ensures zero stem leakage.';
        suggested = ['Cast Stainless Steel Globe Valve (Throttling)', 'Inverted Pressure Balanced Lubricated Plug Valve'];
      } else if (queryLower.includes('difference') || queryLower.includes('ball vs gate')) {
        aiText = 'Ball Valves feature a 90° quick quarter-turn operation suited for rapid bubble-tight shutoff. Gate Valves feature a multi-turn rising stem designed for straight-through minimal pressure drop in main transit lines.';
      } else if (queryLower.includes('water') || queryLower.includes('hvac') || queryLower.includes('slurry')) {
        aiText = 'For municipal water treatment and HVAC chilled water, our Triple Offset High-Performance Butterfly Valve or Dual Plate Check Valve provides maximum flow with zero water hammer.';
        suggested = ['Triple Offset High-Performance Butterfly Valve', 'Dual Plate Wafer Non-Return Check Valve'];
      } else {
        aiText = `Based on your request, Venus Enterprises recommends evaluating our 3-Piece Trunnion Ball Valves or API 600 Gate Valves rated up to Class 1500 (API 6D certified).`;
        suggested = ['3-Piece Forged Trunnion Mounted Ball Valve', 'API 600 Cast Steel Heavy-Duty Gate Valve'];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        suggestedProducts: suggested,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-[600px] bg-navy-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-white">
                Venus AI Technical Advisor
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Trained on API 6D, ASME B16.34 & NACE Standards
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

        {/* Preset Prompt Pills */}
        <div className="bg-navy-850 px-6 py-2.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 shrink-0">Quick Ask:</span>
          {[
            'Valve for high pressure steam?',
            'Valve material for chemical lines?',
            'Ball Valve vs Gate Valve?',
            'Butterfly valve for water plant?'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInputQuery(prompt)}
              className="px-2.5 py-1 rounded-full bg-navy-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-md rounded-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-flame-600 text-white font-medium rounded-tr-none'
                    : 'bg-navy-950 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <p>{msg.text}</p>

                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Recommended Venus Assemblies:
                    </span>
                    {msg.suggestedProducts.map((pName, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-navy-900 border border-slate-800"
                      >
                        <span className="font-semibold text-white text-[11px]">{pName}</span>
                        <button
                          onClick={() => {
                            onClose();
                            onConfigureRfq(pName);
                          }}
                          className="px-2 py-1 rounded bg-flame-600 text-white text-[10px] font-bold flex items-center gap-1 hover:bg-flame-500 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Configure RFQ</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <span className="block text-[9px] font-mono text-slate-400 text-right">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded bg-flame-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  U
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-navy-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            placeholder="Type an engineering query or application details..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-navy-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
