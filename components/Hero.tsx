import React from 'react';
import QuoteForm from './QuoteForm';
import { Star, Shield, Zap, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-image.png"
          alt="Tow Truck Service"
          className="w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1011]/95 via-[#0f1011]/85 to-[#0f1011]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Content Side (Left) */}
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-green/20 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-wider">
              <Star size={14} fill="currentColor" />
              Top Rated in Edmonton
            </div>

            <h1 className="text-3xl lg:text-5xl font-display font-bold text-white leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Get Instant Cash <br />
              <span className="text-brand-green">For Your Vehicle</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
              We pay top dollar for any car, truck, or SUV. Free towing, same-day pickup, and cash on the spot. No hidden fees.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-green">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-white font-bold">Fast Pickup</div>
                  <div className="text-xs text-gray-400">Often within 4 hours</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-green">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="text-white font-bold">Licensed</div>
                  <div className="text-xs text-gray-400">Fully insured service</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-green">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="text-white font-bold">Instant Pay</div>
                  <div className="text-xs text-gray-400">Cash or e-Transfer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (Right) - Prominent Overlay */}
          <div className="flex justify-center lg:justify-end w-full">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;