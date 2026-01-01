import React from 'react';
import { Phone, Truck, Wallet, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { useSiteContentContext } from '../contexts/SiteContentContext';
import EditableText from './admin/EditableText';

const Process: React.FC = () => {
  const { content } = useSiteContentContext();

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-50 md:opacity-40">
        <img
          src={content.process.image_url}
          alt="Tow Service Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/70 md:from-[#0a0a0a] md:via-[#0a0a0a]/90 md:to-[#0a0a0a]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            <EditableText section="process" field="title" value={content.process.title} />
          </h2>
          <div className="text-gray-400 max-w-2xl mx-auto text-lg">
            <EditableText section="process" field="subtitle" value={content.process.subtitle} />
          </div>
        </div>

        {/* Standard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Step 1 */}
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-[#151515] transition-colors group">
            <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green/20 transition-colors">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              <EditableText section="process" field="step1Title" value={content.process.step1Title} />
            </h3>
            <div className="text-gray-400 leading-relaxed mb-6">
              <EditableText section="process" field="step1Text" value={content.process.step1Text} multiline />
            </div>
            <ul className="space-y-3">
              {['No hidden fees', 'Guaranteed pricing', 'Quick response'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-[#151515] transition-colors group">
            <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green/20 transition-colors">
              <Truck size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              <EditableText section="process" field="step2Title" value={content.process.step2Title} />
            </h3>
            <div className="text-gray-400 leading-relaxed mb-6">
              <EditableText section="process" field="step2Text" value={content.process.step2Text} multiline />
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/5 px-3 py-1.5 rounded-full border border-brand-green/10">
              <MapPin size={14} />
              Serving All Edmonton
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-[#151515] transition-colors group">
            <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green/20 transition-colors">
              <Wallet size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              <EditableText section="process" field="step3Title" value={content.process.step3Title} />
            </h3>
            <div className="text-gray-400 leading-relaxed mb-6">
              <EditableText section="process" field="step3Text" value={content.process.step3Text} multiline />
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-brand-green font-semibold flex items-center gap-2 text-sm">
                <Sparkles size={16} /> Same-Day Service
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;