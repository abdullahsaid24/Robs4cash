import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CarFront, Zap } from 'lucide-react';
import { useSiteContentContext } from '../contexts/SiteContentContext';
import EditableText from './admin/EditableText';

const Header: React.FC = () => {
  const { content } = useSiteContentContext();
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'py-3 bg-[#0a0a0a] border-b border-white/10 shadow-lg'
          : 'py-4 bg-[#0a0a0a]/98 border-b border-white/5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <a href="/" className="flex items-center gap-3">
              <div className="bg-white/10 border border-white/20 p-2 rounded-lg">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">
                  <EditableText section="header" field="brandName" value={content.header.brandName} />
                  <span className="text-brand-green">
                    <EditableText section="header" field="brandHighlight" value={content.header.brandHighlight} />
                  </span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  <EditableText section="header" field="brandSubtitle" value={content.header.brandSubtitle} />
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Process</a>
              <a href="#gallery" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Recent Buys</a>
              <a href="#areas" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Locations</a>
            </div>

            {/* Call Action */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={`tel:${content.footer.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green text-brand-dark font-bold rounded-lg hover:bg-brand-green/90 transition-colors"
                suppressHydrationWarning
              >
                <Phone size={18} />
                {content.footer.phone}
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
            <a href={`tel:${content.footer.phone}`} className="flex items-center justify-center gap-3 w-full bg-brand-green text-brand-dark font-bold text-xl py-4 rounded-xl shadow-lg shadow-brand-green/20">
              <Phone size={24} className="fill-brand-dark" />
              CALL {content.footer.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;