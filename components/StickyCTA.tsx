import React from 'react';
import { Phone, DollarSign } from 'lucide-react';
import { useSiteContentContext } from '../contexts/SiteContentContext';

const StickyCTA: React.FC = () => {
  const { content } = useSiteContentContext();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur border-t border-white/10 p-4 md:hidden flex gap-4">
      <a
        href={`tel:${content.footer.phone}`}
        className="flex-1 flex items-center justify-center gap-2 bg-white text-brand-dark font-bold py-3.5 rounded-xl active:scale-95 transition-transform"
      >
        <Phone size={20} />
        Call Now
      </a>
      <a
        href="#quote"
        className="flex-1 flex items-center justify-center gap-2 bg-brand-green text-brand-dark font-bold py-3.5 rounded-xl active:scale-95 transition-transform shadow-[0_0_15px_rgba(163,230,53,0.3)]"
      >
        <DollarSign size={20} />
        Get Offer
      </a>
    </div>
  );
};

export default StickyCTA;