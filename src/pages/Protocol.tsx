import QuizFunnel from '@/components/QuizFunnel';
import Footer from '@/components/Footer';

export default function Protocol() {
  return (
    <div className="min-h-screen relative z-[1]">
      <div className="flex justify-center pt-6 md:pt-8 px-4">
        <img
          src="/Logo.jpeg"
          alt="BoonFay"
          className="h-12 w-12 md:h-14 md:w-14 object-contain"
        />
      </div>
      <QuizFunnel />
      <Footer />
    </div>
  );
}
