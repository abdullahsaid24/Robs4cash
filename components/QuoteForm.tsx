import React, { useState } from 'react';
import { QuoteFormData } from '../types';
import { Check, ChevronRight, ChevronLeft, Car, AlertCircle, User, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const QuoteForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('Please fill in your contact details');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            year: formData.year,
            make: formData.make,
            model: formData.model,
            condition: formData.condition,
            missing_parts: formData.missingParts,
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
          }
        ]);

      if (error) throw error;

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please call us directly at 780-222-4106.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div id="quote" className="w-full max-w-lg backdrop-blur-2xl bg-[#1a1d24]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-brand-dark" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
          <p className="text-gray-400 mb-6">We'll call you shortly with your quote for your {formData.year} {formData.make} {formData.model}.</p>
          <p className="text-brand-green font-bold text-lg">Expect a call within 30 minutes!</p>
        </div>
      </div>
    );
  }

  return (
    <div id="quote" className="w-full max-w-lg backdrop-blur-2xl bg-[#1a1d24]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2a2d34] to-[#1a1d24] p-8 border-b border-white/5">
        <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Zap className="text-brand-green" size={28} fill="currentColor" />
          GET INSTANT OFFER
        </h3>
        <p className="text-gray-400 font-medium text-sm mt-2">Guaranteed highest payout in Edmonton.</p>
      </div>

      <div className="p-8">
        {/* Progress */}
        <div className="flex justify-between mb-10 px-2 relative">
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-[#2a2d34] -z-10 -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-1/2 left-0 h-1.5 bg-brand-green -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= i ? 'bg-brand-green scale-125' : 'bg-[#3a3d44]'}`}>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Vehicle */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Year</label>
                  <input
                    type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2010"
                    className="w-full bg-[#0f1115] border border-white/10 text-white rounded-lg p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Make</label>
                  <input
                    type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Ford"
                    className="w-full bg-[#0f1115] border border-white/10 text-white rounded-lg p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Model</label>
                <input
                  type="text" name="model" value={formData.model} onChange={handleChange} placeholder="F-150"
                  className="w-full bg-[#0f1115] border border-white/10 text-white rounded-lg p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Condition */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Condition</label>
                <select
                  name="condition" value={formData.condition} onChange={handleChange}
                  className="w-full bg-[#0f1115] border border-white/10 text-white rounded-lg p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                >
                  <option value="" disabled>Select Condition</option>
                  <option value="Drives">🚗 Drives Well</option>
                  <option value="Needs Work">🔧 Needs Work</option>
                  <option value="No Start">🛑 Won't Start</option>
                  <option value="Wrecked">💥 Wrecked</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Missing Parts?</label>
                <select
                  name="missingParts" value={formData.missingParts} onChange={handleChange}
                  className="w-full bg-[#0f1115] border border-white/10 text-white rounded-lg p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                >
                  <option value="No">No, Complete Car</option>
                  <option value="Yes">Yes, Missing Parts</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                  className="w-full bg-[#0f1115] border border-white/10 text-white rounded-lg p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="780-000-0000"
                  className="w-full bg-[#0f1115] border border-white/10 text-white rounded-lg p-4 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                />
              </div>
            </div>
          )}


          {/* Footer / Buttons */}
          <div className="flex gap-4 mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 rounded-lg border border-white/20 text-gray-300 font-bold hover:bg-white/5 transition-colors"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-white text-brand-dark font-display font-bold py-4 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-xl text-lg"
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-brand-green text-brand-dark font-display font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    GET MY OFFER <Zap size={20} fill="currentColor" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;