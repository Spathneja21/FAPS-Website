import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import HeroSection from '../sections/HeroSection';
import TeamSection from '../sections/TeamSection';
import EventsSection from '../sections/EventsSection';
import GallerySection from '../sections/GallerySection';
import ContactSection from '../sections/ContactSection';
import LoadingScreen from '../ui/LoadingScreen';
import VerticalDock from '../reactbits/VerticalDock';
import TargetCursor from '../reactbits/TargetCursor';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Wait a bit for the loading screen/initial render
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [hash]);

  return (
    <div style={{ background: '#131313', minHeight: '100vh' }}>
      <LoadingScreen />
      <TargetCursor />
      <VerticalDock />
      <Navbar />
      <main>
        <HeroSection />
        <EventsSection />
        <TeamSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
