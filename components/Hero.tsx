import React from 'react';
import QuoteForm from './QuoteForm';
import { Star, Shield, Zap, Clock } from 'lucide-react';
import { useSiteContentContext } from '../contexts/SiteContentContext';
import EditableText from './admin/EditableText';

const Hero: React.FC = () => {
  const { content } = useSiteContentContext();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero.image_url}
          alt="Tow Truck Service"
          className="w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1011]/80 via-[#0f1011]/60 to-[#0f1011]/90 md:bg-gradient-to-r md:from-[#0f1011]/95 md:via-[#0f1011]/85 md:to-[#0f1011]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* Content Side (Left) - Always First on Mobile */}
          <div className="space-y-4 md:space-y-6 max-w-2xl pt-4 md:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Star size={12} className="md:w-3.5 md:h-3.5" fill="currentColor" />
              <EditableText
                section="hero"
                field="badge"
                value={content.hero.badge}
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-[1.1]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              <EditableText
                section="hero"
                field="title"
                value={content.hero.title}
              /> <br className="hidden md:block" />
              <span className="text-brand-green block md:inline mt-1 md:mt-0">
                <EditableText
                  section="hero"
                  field="titleHighlight"
                  value={content.hero.titleHighlight}
                />
              </span>
            </h1>

            {/* Restored Subtitle on Mobile */}
            <div className="text-base md:text-lg text-gray-300 leading-relaxed font-medium max-w-lg" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
              <EditableText
                section="hero"
                field="subtitle"
                value={content.hero.subtitle}
                multiline
              />
            </div>

            {/* Mobile: Professional Benefit Pills */}
            <div className="flex flex-wrap gap-3 pt-2 md:hidden">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                <Clock size={14} className="text-brand-green" />
                <span className="text-white text-[11px] font-bold uppercase">Fast Pickup</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                <Shield size={14} className="text-brand-green" />
                <span className="text-white text-[11px] font-bold uppercase">Licensed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                <Zap size={14} className="text-brand-green" />
                <span className="text-white text-[11px] font-bold uppercase">Instant Pay</span>
              </div>
            </div>

            {/* Desktop: Full benefit cards */}
            <div className="hidden md:flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-white font-bold">Fast Pickup</div>
                  <div className="text-xs text-gray-400">Often within 4 hours</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="text-white font-bold">Licensed</div>
                  <div className="text-xs text-gray-400">Fully insured service</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="text-white font-bold">Instant Pay</div>
                  <div className="text-xs text-gray-400">Cash or e-Transfer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (Right) - Below Content on Mobile */}
          <div className="flex flex-col md:block justify-center lg:justify-end w-full mt-4 md:mt-0">
            {/* Visual Connector for Mobile */}
            <div className="md:hidden w-full text-center text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-4 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              Start Your Quote
            </div>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;