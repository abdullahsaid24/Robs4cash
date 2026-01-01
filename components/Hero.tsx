import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Shield, Zap, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-brand-dark">
      {/* Visual Side (Right - Desktop) */}
      <div
        className="absolute inset-x-0 inset-y-0 lg:left-1/2 lg:right-0 z-0 overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <img
          src="/uploaded_image_1_1767291802458.png"
          alt="Premium Towing Service"
          className="w-full h-full object-cover opacity-60 lg:opacity-80 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent lg:bg-gradient-to-r lg:from-brand-dark lg:via-transparent lg:to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Content Side (Left) */}
          <div className="lg:col-span-7 space-y-10 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-brand-green/20 animate-slide-up">
              <span className="flex text-brand-green">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </span>
              <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Edmonton's #1 Rated Buyer</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.85] tracking-tighter">
                SELL YOUR CAR <br />
                <span className="text-gradient">IN 60 MINUTES.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light">
                Professional scrap car removal in Edmonton. We handle everything from towing to paperwork. Get paid <span className="text-white font-semibold">instantly</span> on your driveway.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <a href="#quote" className="btn-primary group">
                <span className="relative z-10 flex items-center gap-2">
                  GET YOUR CASH OFFER
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>

              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl">Up to $10k</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-green">Highest Payouts</span>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl">Free</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-green">Towing Included</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-12 border-t border-white/5 max-w-xl">
              <div className="flex flex-col gap-2">
                <Shield className="text-brand-green" size={20} />
                <span className="text-xs font-bold text-white truncate">Licensed Buyer</span>
              </div>
              <div className="flex flex-col gap-2">
                <Clock className="text-brand-green" size={20} />
                <span className="text-xs font-bold text-white truncate">Same Day Pickup</span>
              </div>
              <div className="flex flex-col gap-2">
                <Zap className="text-brand-green" size={20} />
                <span className="text-xs font-bold text-white truncate">Instant Payment</span>
              </div>
            </div>
          </div>

          {/* This column is intentionally empty on desktop to keep the visual side clear */}
          <div className="hidden lg:block lg:col-span-5 h-[500px]"></div>

        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/10 blur-[150px] -z-10 rounded-full animate-pulse"></div>
    </section>
  );
};

export default Hero;