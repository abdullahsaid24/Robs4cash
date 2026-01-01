import React from 'react';
import { MapPin, Phone, CarFront } from 'lucide-react';

const Footer: React.FC = () => {
  const serviceAreas = [
    "Edmonton", "St. Albert", "Sherwood Park", "Leduc",
    "Spruce Grove", "Stony Plain", "Fort Saskatchewan",
    "Beaumont", "Nisku", "Devon"
  ];

  return (
    <footer id="areas" className="bg-[#050505] text-gray-500 py-24 border-t border-white/[0.03] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-green/2 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl w-fit">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-tighter text-white">
                  ROBS<span className="text-brand-green">CASH4CARS</span>
                </span>
                <span className="text-[10px] text-gray-600 tracking-[0.3em] font-black uppercase">Established Edmonton Buyer</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Alberta's most trusted vehicle acquisition service. Transparent pricing, legal paperwork handling, and instant cash payouts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black mb-8 font-display tracking-[0.3em] text-[10px] uppercase">Navigation</h3>
            <ul className="space-y-4 text-xs font-bold tracking-widest uppercase">
              <li><a href="#how-it-works" className="hover:text-brand-green transition-all duration-300 flex items-center gap-2 group"><div className="w-1 h-1 bg-brand-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div> Market Process</a></li>
              <li><a href="#quote" className="hover:text-brand-green transition-all duration-300 flex items-center gap-2 group"><div className="w-1 h-1 bg-brand-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div> Get Payout</a></li>
              <li><a href="#gallery" className="hover:text-brand-green transition-all duration-300 flex items-center gap-2 group"><div className="w-1 h-1 bg-brand-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div> Recent Buys</a></li>
              <li><a href="tel:780-222-4106" className="text-brand-green hover:scale-105 transition-transform inline-block">780-222-4106</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-black mb-8 font-display tracking-[0.3em] text-[10px] uppercase">Service Zones</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 text-xs font-medium hover:text-white transition-colors cursor-default group">
                  <div className="w-1.5 h-px bg-brand-green/30 group-hover:w-3 transition-all"></div>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-600">
          <p>© {new Date().getFullYear()} Robs Cash 4 Cars • Edmonton AB</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400">Design: Elite</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;