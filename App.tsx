import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SiteContentProvider } from './contexts/SiteContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import AdminBar from './components/admin/AdminBar';
import {
  AdminLogin,
  AdminLayout,
  AdminDashboard,
  AdminContent,
  AdminLeads,
  AdminGallery,
} from './components/admin';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Process />
        <Gallery />
      </main>
      <Footer />
      <StickyCTA />
      <AdminBar />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <div className="font-sans antialiased text-gray-100 bg-brand-dark selection:bg-brand-green selection:text-brand-dark">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="gallery" element={<AdminGallery />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  );
}

export default App;