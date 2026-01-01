import React from 'react';
import { Phone, Truck, Wallet, ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  const steps = [
    {
      icon: Phone,
      title: "Get Instant Quote",
      desc: "Call or use our online form. AI-driven pricing ensures you get the maximum market value immediately."
    },
    {
      icon: Truck,
      title: "We Come To You",
      desc: "Free towing included. We schedule a pickup at your home, work, or mechanic shop at your convenience."
    },
    {
      icon: Wallet,
      title: "Instant Payment",
      desc: "No waiting for checks. Our driver verifies the vehicle condition and hands you cash on the spot."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Connector Line (Desktop) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent -translate-y-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">HOW IT WORKS</h2>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium">
             <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
             Average Pickup Time: 4 Hours
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-brand-dark border border-white/5 p-8 rounded-3xl relative z-10 hover:-translate-y-2 transition-transform duration-300 h-full shadow-2xl">
                
                {/* Number Badge */}
                <div className="absolute -top-6 left-8 bg-brand-surface border border-white/10 text-brand-green font-display font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  0{index + 1}
                </div>

                <div className="mt-6 mb-6">
                    <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:text-brand-dark transition-colors duration-300">
                        <step.icon size={32} className="text-brand-green group-hover:text-brand-dark transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
              
              {/* Mobile Connector */}
              {index < 2 && (
                  <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-700">
                      <ArrowRight className="rotate-90" />
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;