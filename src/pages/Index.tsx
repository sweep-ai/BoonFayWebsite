import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import QuizFunnel from '@/components/QuizFunnel';
import About from '@/components/About';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Offers from '@/components/Offers';
import Footer from '@/components/Footer';

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#offers') {
      const el = document.getElementById('offers');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Hero />
      <TestimonialCarousel />
      <QuizFunnel />
      <About />
      <Offers />
      <Footer />
    </div>
  );
};

export default Index;
