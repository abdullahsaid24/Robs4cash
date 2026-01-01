import React from 'react';
import { ArrowDown, Star } from 'lucide-react';
import QuoteForm from './QuoteForm';

const Hero: React.FC = () => {

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-brand-dark">
        <img
          src="/uploaded_image_1_1767291802458.png"
          alt="Tow truck lifting car"
          className="w-full h-full object-cover opacity-80 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full">
            <div className="flex text-brand-green">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
            <span className="text-gray-300 text-xs font-bold tracking-wide uppercase">Edmonton's Top Rated Buyer</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] tracking-tight">
            TURN YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-white">SCRAP INTO CASH</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            We pay up to <span className="text-white font-bold">$10,000</span> for any vehicle. Free towing, instant payment, and zero hassle. The modern way to sell your junk car.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_#a3e635]"></div>
                Instant Quote
              </div>
              <div className="w-px h-4 bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_#a3e635]"></div>
                Free Towing
              </div>
              <div className="w-px h-4 bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_#a3e635]"></div>
                Same Day
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <QuoteForm />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-xs text-white uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="text-white" />
      </div>
    </div>
  );
};

export default Hero;