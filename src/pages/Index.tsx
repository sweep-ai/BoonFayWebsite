import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import QuizFunnel from '@/components/QuizFunnel';
import About from '@/components/About';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#book-call') {
      document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <div className="min-h-screen relative z-[1]">
      <Hero />
      <TestimonialCarousel />
      <QuizFunnel />
      <About />
      <section id="book-call" className="px-4 py-10 sm:py-14 md:py-16 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            Book a free call
          </h2>
          <p className="text-muted-foreground text-center mb-6 max-w-xl mx-auto">
            Pick a time that works for you. We&apos;ll discuss your goals and create a custom plan.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-card/80">
            <iframe
              src="https://calendly.com/fayboon3/30min"
              width="100%"
              height="630"
              frameBorder="0"
              title="Schedule a call with Boon"
              className="w-full border-0 min-h-[500px] sm:min-h-[630px]"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
