import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CarFront, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
            ? 'py-3 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'py-6 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <a href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-green blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src="/logo.png"
                  alt="Robs Cash 4 Cars Logo"
                  className="relative h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-white tracking-tighter leading-none">
                  ROBS<span className="text-brand-green">CASH4CARS</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-[0.3em] font-medium uppercase">
                  Edmonton's Premium Buyer
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center bg-white/5 backdrop-blur-md rounded-full px-2 p-1 border border-white/5">
              <a href="#how-it-works" className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all">Process</a>
              <a href="#gallery" className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all">Recent Buys</a>
              <a href="#areas" className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all">Locations</a>
            </div>

            {/* Call Action */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:780-222-4106"
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-brand-green text-brand-dark font-display font-bold text-lg tracking-wide rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Phone size={18} className="fill-brand-dark" />
                  780-222-4106
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-10">
          <div className="space-y-6 flex-1">
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-3xl font-display font-bold text-white group">
              <span>PROCESS</span>
              <Zap className="opacity-0 group-hover:opacity-100 text-brand-green transition-opacity" />
            </a>
            <div className="h-px bg-white/10 w-full"></div>
            <a href="#gallery" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-3xl font-display font-bold text-white group">
              <span>GALLERY</span>
              <Zap className="opacity-0 group-hover:opacity-100 text-brand-green transition-opacity" />
            </a>
            <div className="h-px bg-white/10 w-full"></div>
            <a href="#areas" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-3xl font-display font-bold text-white group">
              <span>AREAS</span>
              <Zap className="opacity-0 group-hover:opacity-100 text-brand-green transition-opacity" />
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-gray-500 text-sm text-center uppercase tracking-widest">Ready to sell?</p>
            <a href="tel:780-222-4106" className="flex items-center justify-center gap-3 w-full bg-brand-green text-brand-dark font-bold text-xl py-4 rounded-xl shadow-lg shadow-brand-green/20">
              <Phone size={24} className="fill-brand-dark" />
              CALL 780-222-4106
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;