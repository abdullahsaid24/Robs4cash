import React from 'react';
import { MapPin, Phone, CarFront } from 'lucide-react';

const Footer: React.FC = () => {
  const serviceAreas = [
    "Edmonton", "St. Albert", "Sherwood Park", "Leduc",
    "Spruce Grove", "Stony Plain", "Fort Saskatchewan",
    "Beaumont", "Nisku", "Devon"
  ];

  return (
    <footer id="areas" className="bg-black text-gray-500 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Robs Cash 4 Cars Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl tracking-wide text-white">ROBS CASH 4 CARS</span>
            </div>
            <p className="text-sm mb-6 leading-relaxed">
              Edmonton's premier scrap car buying service. We leverage technology to offer the best rates and fastest pickup times in Alberta.
            </p>
            <div className="flex items-center gap-2 text-white font-bold hover:text-brand-green transition-colors cursor-pointer">
              <Phone size={16} className="text-brand-green" />
              <a href="tel:780-222-4106">780-222-4106</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display tracking-widest text-sm">NAVIGATE</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#how-it-works" className="hover:text-brand-green transition-colors">Process</a></li>
              <li><a href="#quote" className="hover:text-brand-green transition-colors">Get Offer</a></li>
              <li><a href="#gallery" className="hover:text-brand-green transition-colors">Inventory</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Service Areas (SEO Fix) */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold mb-6 font-display tracking-widest text-sm">SERVICE ZONES</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-2 text-sm hover:text-white transition-colors cursor-default">
                  <MapPin size={12} className="text-brand-green" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Robs Cash 4 Cars. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;