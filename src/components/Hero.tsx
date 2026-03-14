import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [ctaClicked, setCtaClicked] = useState(false);

  const handleQuizCta = () => {
    setCtaClicked(true);
    const el = document.getElementById('quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.href = '/quiz';
  };

  return (
    <>
      <section className="relative min-h-screen m-0 p-10 md:p-20 pt-10 pb-4 md:pb-6 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-center mb-6 md:mb-10">
          Lose <span className="text-blue-400 bg-clip-text drop-shadow-lg text-glow-white">20+</span> lbs Post-Graduation Without Changing Your Diet
            {/* Drop <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg text-glow-white">30+</span> Pounds With the Best <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg text-glow-white">Transformation</span> Program of Your Life */}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium text-center mb-8 md:mb-12 text-white/90 max-w-2xl md:max-w-3xl lg:max-w-4xl leading-relaxed md:leading-loose">
          The Post-Grad Protocol is designed to help young career focused men drop 20+ lbs after college <span className="text-blue-500 bg-clip-text drop-shadow-lg text-glow-white">or your money back</span>.

          </p>

          {/* Centered Demo Video with card glow */}
          <div className="mb-8 md:mb-12 flex justify-center items-center">
            <div className="relative inline-block max-w-sm md:max-w-md lg:max-w-lg">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md pointer-events-none glow-white" />
              <div className="relative bg-muted rounded-xl overflow-hidden shadow-2xl backdrop-blur-md inline-block">
                <video
                  className="rounded-xl block w-full"
                  style={{ display: 'block', height: 'auto', maxWidth: '100%' }}
                  src="/VSL.mp4"
                  controls
                  playsInline
                  autoPlay
                  muted
                  poster="/placeholder.svg"
                >
                  Sorry, your browser does not support embedded videos.
                </video>
              </div>
            </div>
          </div>

          {/* Money Back Guarantee Section */}
          {/* <div className="mb-8 md:mb-12 flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-white/80 opacity-70 blur-md pointer-events-none glow-white" />
              <div className="relative bg-white backdrop-blur-md rounded-xl shadow-2xl border-2 border-white/50 p-6 md:p-8">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-glow-white">
                    100% Money Back Guarantee
                  </h2>
                  <p className="text-lg md:text-xl text-gray-800 mb-4 leading-relaxed">
                    I believe in this program so much, I'm putting my money where my mouth is. Give me 5 weeks, follow the plan, and if you don't lose 10lbs, I'll refund you every dollar plus $100 for wasting your time.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 text-glow-white">
                    No excuses. No risk.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Quiz CTA (replaces inline quiz in Hero) */}
          <div className="w-full max-w-lg mb-8 md:mb-10 px-1 sm:px-0">
            <div className="relative">
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-blue-500/30 shadow-xl shadow-blue-500/10 z-10 p-5 sm:p-6 md:p-6 text-center">
                <Button
                  size="lg"
                  className="w-full min-w-0 min-h-[48px] sm:min-h-[56px] md:min-h-[60px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-base sm:text-lg md:text-xl font-bold py-4 px-5 sm:py-4 sm:px-6 md:py-5 md:px-8 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F] whitespace-normal text-center break-words border-0 leading-snug flex items-center justify-center box-border"
                  onClick={handleQuizCta}
                >
                  Get The Post-Grad Protocol
                </Button>
                {ctaClicked && (
                  <p className="mt-3 text-xs text-white/60">
                    Scrolling to the quiz…
                  </p>
                )}
                <p className="text-sm sm:text-base text-white/70 mb-0 mt-4">
                  Fill out a 2 minute quiz and get a personalized playbook + video breakdown with everything you need.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;
