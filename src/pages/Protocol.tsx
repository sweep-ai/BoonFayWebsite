import QuizFunnel from '@/components/QuizFunnel';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';

export default function Protocol() {
  return (
    <div className="min-h-screen relative z-[1]">
      <QuizFunnel />
      <TestimonialCarousel />
      <Footer />
    </div>
  );
}
