import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Review } from '../types';

const Testimonials: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Mike S.",
      rating: 5,
      text: "Called Rob at 10am, car was gone by 2pm. Driver was polite and paid exactly what was quoted over the phone. No haggling.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      rating: 5,
      text: "I had an old junker sitting in my driveway for 2 years. They made it so easy to finally get rid of it. Highly recommend!",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Daryll W.",
      rating: 5,
      text: "Best price in Edmonton. I called 3 other places and Rob beat them all by $100.",
      date: "2 weeks ago"
    }
  ];

  return (
    <section className="py-24 bg-brand-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
             <h2 className="text-4xl font-display font-bold text-white mb-2">CLIENT FEEDBACK</h2>
             <div className="flex items-center justify-center gap-2 text-gray-400">
                <span className="font-bold text-white">4.9/5.0</span>
                <span>Average Rating</span>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-brand-dark p-8 rounded-2xl border border-white/5 relative group hover:bg-brand-accent/30 transition-colors">
              <Quote className="absolute top-6 right-6 text-brand-green/10 group-hover:text-brand-green/20 transition-colors" size={40} />
              <div className="flex text-brand-green mb-6">
                 {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10">"{review.text}"</p>
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-white text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;