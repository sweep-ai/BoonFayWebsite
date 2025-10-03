
import { useState } from 'react';
import { Calendar, Mail, Star, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StrategyCallModal from './StrategyCallModal';
import { Analytics } from "@vercel/analytics/next"

const Hero = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailSignup, setEmailSignup] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const webhookData = {
        email: email,
        firstName: firstName,
        type: "New Contact"
      };

      const VITE_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

      console.log('Attempting to send webhook data:', webhookData);
      console.log('Webhook URL:', VITE_WEBHOOK_URL);

      const response = await fetch(VITE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        console.log('Newsletter signup successful:', webhookData);
        setEmailSignup(true);
        setTimeout(() => setEmailSignup(false), 3000);
        setEmail('');
        setFirstName('');
      } else {
        console.error('Newsletter signup failed:', response.status);
        // Still show success to user even if webhook fails
        setEmailSignup(true);
        setTimeout(() => setEmailSignup(false), 3000);
        setEmail('');
        setFirstName('');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      console.log('Webhook URL used:', import.meta.env.VITE_WEBHOOK_URL);
      // Still show success to user even if webhook fails
      setEmailSignup(true);
      setTimeout(() => setEmailSignup(false), 3000);
      setEmail('');
      setFirstName('');
    }
  };

  return (
    <>
      <section className="relative min-h-screen bg-background pt-16 md:pt-20 pb-12 md:pb-16 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-center mb-6 md:mb-10">
            Lose 30+ Pounds With the Best Transformation Program of Your Life
            {/* Drop <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg text-glow-white">30+</span> Pounds With the Best <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg text-glow-white">Transformation</span> Program of Your Life */}
          </h1>
          <p className="text-lg md:text-20 text-muted-foreground font-medium text-center mb-8 md:mb-12 text-white/90 max-w-2xl md:max-w-3xl lg:max-w-4xl leading-relaxed md:leading-loose">
            The 16-week transformation program is designed for busy professionals, fathers, and hardworking men who want real results without overhauling their lifestyle. You’ll get fully customized workouts, macro-based meal planning tailored to your preferences, and 24/7 accountability coaching so you can lose weight, build strength, and feel confident again, all while keeping the life you love.
          </p>

          {/* Centered Demo Video with card glow */}
          <div className="mb-8 md:mb-12 flex justify-center items-center">
            <div className="relative inline-block max-w-sm md:max-w-md lg:max-w-lg">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md pointer-events-none glow-white" />
              <div className="relative bg-muted rounded-xl overflow-hidden shadow-2xl backdrop-blur-md inline-block">
                <video
                  className="rounded-xl block w-full"
                  style={{ display: 'block', height: 'auto', maxWidth: '100%' }}
                  src="/BoonFayVSL.mp4"
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
          <div className="mb-8 md:mb-12 flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-white/80 opacity-70 blur-md pointer-events-none glow-white" />
              <div className="relative bg-white backdrop-blur-md rounded-xl shadow-2xl border-2 border-white/50 p-6 md:p-8">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-glow-white">
                    100% Money Back Guarantee
                  </h2>
                  <p className="text-lg md:text-xl text-gray-800 mb-4 leading-relaxed">
                    I believe in this program so much, I'm putting my money where my mouth is. Give me 16 weeks, follow the plan, and if you don't make progress, I'll refund you every dollar.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 text-glow-white">
                    No excuses. No risk.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main CTA: Start Program in a glowing card */}
          <div className="relative w-full max-w-md mb-6">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
            <div className="relative bg-card/80 backdrop-blur-md rounded-xl shadow-2xl z-10 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Start Your Transformation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">✓</span>
                  <span>Immediate access to your 16-week program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">✓</span>
                  <span>Customized workouts and meal plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">✓</span>
                  <span>24/7 coaching and accountability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">✓</span>
                  <span>Lifetime access to all materials</span>
                </li>
              </ul>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-white to-white/90 hover:from-white/95 hover:to-white/85 text-gray-900 text-lg font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 glow-white"
                onClick={() => window.location.href = '/payment'}
              >
                👉 Start My Journey Now
              </Button>
            </div>
          </div>

          <div className="flex items-center w-full my-6 pb-6">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-4 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-muted" />
          </div>

          {/* Secondary CTA: Booking Consultation in a glowing card */}
          <div className="relative w-full max-w-md mb-8">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
            <div className="relative bg-card/80 backdrop-blur-md rounded-xl shadow-2xl z-10 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Free Fitness Consultation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">✓</span>
                  <span>30-minute personalized consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">✓</span>
                  <span>Goal assessment and current situation review</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">✓</span>
                  <span>Personalized recommendations</span>
                </li>
              </ul>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/60 text-white hover:bg-white/20 text-lg font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => setShowModal(true)}
              >
                Book a FREE Fitness Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <StrategyCallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Hero;
