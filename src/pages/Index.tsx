import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === '#book-call') {
      requestAnimationFrame(() => {
        document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [hash]);

  return (
    <div className="min-h-screen relative z-[1]">
      <Hero />
      <TestimonialCarousel />

      {/* Payment section */}
      <section id="pricing" className="px-4 py-16 md:py-20 scroll-mt-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to start?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Choose the plan that works best for you. Same program, same results, flexible payment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pay in Full */}
            <div className="relative rounded-2xl border border-blue-500/30 bg-white/[0.04] backdrop-blur-md p-6 sm:p-8 flex flex-col">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/15 border border-blue-500/30 px-3 py-1 rounded-full">
                Best value
              </span>
              <h3 className="text-xl font-bold text-white mt-3 mb-1">Pay in Full</h3>
              <p className="text-sm text-white/50 mb-6">4 months of coaching</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$997</span>
                <span className="text-white/50 ml-2">one-time</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Full 4-month Post-Grad Protocol
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Custom training and nutrition plan
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Weekly check-ins and adjustments
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Direct access to your coach
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Save $3 compared to monthly
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/00w9AU6WoaPo9rk2Df0oM08"
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                Get started for $997
              </a>
            </div>

            {/* Monthly */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 sm:p-8 flex flex-col">
              <h3 className="text-xl font-bold text-white mt-3 mb-1">Monthly</h3>
              <p className="text-sm text-white/50 mb-6">4 monthly payments</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$250</span>
                <span className="text-white/50 ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Full 4-month Post-Grad Protocol
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Custom training and nutrition plan
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Weekly check-ins and adjustments
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Direct access to your coach
                </li>
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Flexible monthly commitment
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/7sYaEY1C44r0gTM0v70oM0d"
                className="block w-full text-center bg-white/10 hover:bg-white/15 text-white font-semibold py-4 rounded-xl border border-white/20 transition-colors"
              >
                Get started for $250/mo
              </a>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-12 text-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 sm:p-8">
            <p className="text-2xl mb-1">🛡️</p>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              100% Money Back Guarantee
            </h3>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed mb-6">
              If you fully participate in the program, complete your weekly check&#8209;ins, and follow the personalized plan I create for you, but still feel you&apos;re not making meaningful progress after the first 30 days, I&apos;ll refund your investment.
            </p>
            <a
              href="https://buy.stripe.com/00w9AU6WoaPo9rk2Df0oM08"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors"
            >
              Join the Post-Grad System Today &rarr;
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
