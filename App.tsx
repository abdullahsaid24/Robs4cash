import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';

function App() {
  return (
    <div className="font-sans antialiased text-gray-100 bg-brand-dark selection:bg-brand-green selection:text-brand-dark">
      <Header />
      <main>
        <Hero />
        <Process />
        <Gallery />
        <Testimonials />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;