
import Hero from '@/components/Hero';
import About from '@/components/About';
import Results from '@/components/Results';
import Process from '@/components/Process';
import NewsletterFooter from '@/components/NewsletterFooter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Results />
      <Process />
      <NewsletterFooter />
      <Footer />
    </div>
  );
};

export default Index;
