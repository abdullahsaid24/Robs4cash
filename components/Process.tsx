import React from 'react';
import { Phone, Truck, Wallet, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              THE <span className="text-gradient">PROCESS.</span>
            </h2>
            <p className="text-gray-400 max-w-md text-lg">Three simple steps to turn your unwanted vehicle into cash today.</p>
          </div>
          <div className="glass-card px-6 py-3 rounded-2xl flex items-center gap-3 border-brand-green/20">
            <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_#a3e635]"></div>
            <span className="text-white font-bold text-sm tracking-widest uppercase">Avg. Pickup: 4 Hours</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Step 1: Large Feature */}
          <div className="md:col-span-7 bento-item group overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl group-hover:bg-brand-green/10 transition-colors"></div>
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                <Phone size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">01. GET AN INSTANT OFFER</h3>
                <p className="text-gray-400 leading-relaxed text-lg max-w-md">
                  Call or use our smart quote tool. Our AI-driven valuation ensures you get the <span className="text-white font-semibold">absolute maximum</span> market value immediately.
                </p>
              </div>
              <ul className="space-y-3">
                {['No hidden fees', 'Guaranteed pricing', '24/7 Support'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 2: Tall/Medium Feature */}
          <div className="md:col-span-5 bento-item group bg-brand-green/[0.02] border-brand-green/10">
            <div className="space-y-6 flex flex-col h-full justify-between">
              <div className="w-16 h-16 rounded-2xl bg-brand-green text-brand-dark flex items-center justify-center shadow-lg shadow-brand-green/20">
                <Truck size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">02. FREE TOWING</h3>
                <p className="text-gray-400 leading-relaxed">
                  We schedule a pickup at your convenience. Home, work, or roadside—our professional fleet handles everything.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center gap-3 text-brand-green font-bold text-xs uppercase tracking-[0.2em]">
                <MapPin size={14} />
                Serving All Edmonton Areas
              </div>
            </div>
          </div>

          {/* Step 3: Wide Bottom Feature */}
          <div className="md:col-span-12 bento-item group flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                <Wallet size={32} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-bold text-white">03. INSTANT PAYMENT</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  No waiting for checks or transfers. Our driver verifies the vehicle condition and hands you the <span className="text-white font-semibold italic">full agreed amount</span> in cash on the spot.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 glass-card p-6 rounded-2xl border-brand-green/10 flex flex-col items-center justify-center text-center gap-4 bg-brand-green/5 animate-glow-pulse">
              <Sparkles size={40} className="text-brand-green" />
              <div className="text-white font-display font-bold text-2xl uppercase tracking-tighter leading-none">
                The Fastest <br /> Way To Sell
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;