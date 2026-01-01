import React from 'react';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 gap-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">SUCCESS STORIES</h2>
            <p className="text-gray-400">Turn Your Unwanted Car Into Cash Today!</p>
          </div>
          <div className="w-full mt-8 overflow-hidden rounded-2xl animate-pulse-subtle">
            <img
              src="/conditions-image.png"
              alt="Vehicles we buy - Won't start, electrical issues, damaged, bad engine, old & rusty"
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;