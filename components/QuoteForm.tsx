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
    <div id="quote" className="w-full max-w-md bg-brand-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 border-b border-white/5 relative z-10">
        <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Zap className="text-brand-green fill-brand-green" size={20} />
          GET A QUOTE NOW
        </h3>
        <p className="text-gray-400 text-sm mt-1">Guaranteed highest payout in Edmonton and surrounding areas.</p>

        {/* Progress Bar */}
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= i ? 'bg-brand-green' : 'bg-gray-700'}`}></div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 relative z-10 min-h-[300px]">
        {/* Step 1: Vehicle */}
        {step === 1 && (
          <div className="animate-fade-in space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Year</label>
                <input
                  type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2010"
                  className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Make</label>
                <input
                  type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Ford"
                  className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Model</label>
              <input
                type="text" name="model" value={formData.model} onChange={handleChange} placeholder="F-150"
                className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* Step 2: Condition */}
        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Vehicle Condition</label>
              <select
                name="condition" value={formData.condition} onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all appearance-none"
              >
                <option value="">Select status...</option>
                <option value="Drives">🚗 Drives Well</option>
                <option value="Needs Work">🔧 Needs Work</option>
                <option value="No Start">🛑 Won't Start</option>
                <option value="Wrecked">💥 Wrecked / Accident</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Missing Parts?</label>
              <select
                name="missingParts" value={formData.missingParts} onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all appearance-none"
              >
                <option value="No">No, Complete Car</option>
                <option value="Yes">Yes, Missing Parts</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div className="animate-fade-in space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Your Name</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Phone Number</label>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
              />
            </div>
          </div>
        )}
      </form>

      {/* Footer / Buttons */}
      <div className="p-6 pt-0 flex gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 bg-white text-brand-dark font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            Next Step <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 bg-brand-green text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-greenHover transition-all shadow-[0_0_20px_rgba(163,230,53,0.4)] flex items-center justify-center gap-2"
          >
            GET CASH NOW <Zap size={18} fill="currentColor" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;