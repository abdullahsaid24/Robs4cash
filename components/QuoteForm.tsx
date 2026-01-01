import React, { useState } from 'react';
import { QuoteFormData } from '../types';
import { Check, ChevronRight, ChevronLeft, Car, AlertCircle, User, Zap } from 'lucide-react';

const QuoteForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    year: '',
    make: '',
    model: '',
    condition: '',
    missingParts: 'No',
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.year || !formData.make || !formData.model)) return alert('Please fill in vehicle details');
    if (step === 2 && !formData.condition) return alert('Please select a condition');
    setStep(prev => prev + 1);
  };

  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request sent! We will call you shortly.');
  };

  return (
    <div id="quote" className="w-full max-w-md glass-card-heavy rounded-3xl overflow-hidden relative group">
      {/* Dynamic Glow Effect */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent"></div>

      {/* Header */}
      <div className="p-8 border-b border-white/5 relative z-10">
        <h3 className="text-2xl font-display font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
            <Zap className="text-brand-green" size={20} fill="currentColor" />
          </div>
          GET A FAST QUOTE
        </h3>
        <p className="text-gray-400 text-sm mt-2 font-medium">Free evaluation. Edmonton's top rates guaranteed.</p>

        {/* Progress Bar */}
        <div className="mt-6 flex gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-green shadow-[0_0_10px_#a3e635]' : 'bg-white/5'}`}></div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 relative z-10 min-h-[320px]">
        {/* Step 1: Vehicle */}
        {step === 1 && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">Year</label>
                <input
                  type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2012"
                  className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 focus:border-brand-green focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">Make</label>
                <input
                  type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Honda"
                  className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 focus:border-brand-green focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">Model</label>
              <input
                type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Civic"
                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 focus:border-brand-green focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>
        )}

        {/* Step 2: Condition */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">Condition</label>
              <select
                name="condition" value={formData.condition} onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 focus:border-brand-green focus:bg-white/[0.06] outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-brand-surface">Select Condition...</option>
                <option value="Drives" className="bg-brand-surface">🚗 Drives Well</option>
                <option value="Needs Work" className="bg-brand-surface">🔧 Needs Work</option>
                <option value="No Start" className="bg-brand-surface">🛑 Won't Start</option>
                <option value="Wrecked" className="bg-brand-surface">💥 Wrecked</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">Complete Car?</label>
              <select
                name="missingParts" value={formData.missingParts} onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 focus:border-brand-green focus:bg-white/[0.06] outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="No" className="bg-brand-surface">Yes, 100% Complete</option>
                <option value="Yes" className="bg-brand-surface">No, Parts Missing</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">Full Name</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 focus:border-brand-green focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">Phone Number</label>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="780-000-0000"
                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 focus:border-brand-green focus:bg-white/[0.06] outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>
        )}
      </form>

      {/* Footer / Buttons */}
      <div className="p-8 pt-0 flex gap-4 relative z-10">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="w-14 h-14 rounded-xl glass-card flex items-center justify-center text-white hover:bg-white/10 transition-all border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 btn-primary"
          >
            <span className="flex items-center justify-center gap-2">
              Next Step <ChevronRight size={20} />
            </span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 btn-primary animate-glow-pulse"
          >
            <span className="flex items-center justify-center gap-2">
              FINISH & GET OFFER <Zap size={20} fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;