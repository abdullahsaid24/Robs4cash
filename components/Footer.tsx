import React from 'react';
import { MapPin, Phone, CarFront } from 'lucide-react';

const Footer: React.FC = () => {
  const serviceAreas = [
    "Edmonton", "St. Albert", "Sherwood Park", "Leduc",
    "Spruce Grove", "Stony Plain", "Fort Saskatchewan",
    "Beaumont", "Nisku", "Devon"
  ];

  return (
    <footer id="areas" className="bg-[#0a0a0a] text-gray-500 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex flex-col gap-3">
              <div className="bg-white/10 border border-white/20 p-2 rounded-lg w-fit">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">
                  ROBS<span className="text-brand-green">CASH4CARS</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Trusted Edmonton Buyer</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Edmonton's trusted vehicle buying service. Fair pricing, professional service, and instant cash payments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#how-it-works" className="hover:text-brand-green transition-colors">How It Works</a></li>
              <li><a href="#quote" className="hover:text-brand-green transition-colors">Get Quote</a></li>
              <li><a href="#gallery" className="hover:text-brand-green transition-colors">Recent Buys</a></li>
              <li><a href="tel:780-222-4106" className="text-brand-green hover:underline">780-222-4106</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wide">Service Areas</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
              {serviceAreas.map((area) => (
                <div key={area} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Robs Cash 4 Cars. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;