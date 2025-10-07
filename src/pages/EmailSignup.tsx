import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const webhookData = {
        email: email,
        firstName: firstName,
        type: "New Contact"
      };
      const VITE_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
      const response = await fetch(VITE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });
      setIsSubmitted(true);
      setEmail('');
      setFirstName('');
      
      // Auto-redirect to calculator after 3 seconds
      setTimeout(() => {
        window.location.href = '/calculator';
      }, 3000);
    } catch (error) {
      setIsSubmitted(true);
      setEmail('');
      setFirstName('');
      
      // Auto-redirect to calculator after 3 seconds even on error
      setTimeout(() => {
        window.location.href = '/calculator';
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Favicon Logo */}
      <div className="mb-8">
        <img 
          src="/Logo.jpeg" 
          alt="Logo" 
          className="w-16 h-16 mx-auto"
        />
      </div>
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          The only macro calculator you'll ever need.
        </h1>
        
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Take the guesswork out of eating. This calculator shows you exactly how much to eat so you can drop fat, build muscle, and finally stay lean without giving up your favorite foods.
        </p>
      </div>

      {/* Calculator Preview */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-sm sm:max-w-md">
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-50 blur-md pointer-events-none glow-white" />
          <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Macro Calculator</h3>
                <p className="text-gray-300 text-xs sm:text-sm">Based on the revised Harris Benedict formula</p>
              </div>
              
              {/* Blurred preview cards */}
              <div className="bg-gray-700 rounded-lg p-2 sm:p-3 text-center mb-4">
                <div className="text-xs sm:text-sm text-gray-400 mb-1">Target Calories</div>
                <div className="text-lg sm:text-2xl font-bold text-white">2615</div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                <div className="bg-gray-700 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">BMR</div>
                  <div className="text-sm sm:text-lg font-bold text-white">1687</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">TDEE</div>
                  <div className="text-sm sm:text-lg font-bold text-white">2615</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                <div className="bg-gray-700 rounded-lg p-1 sm:p-2 text-center">
                  <div className="text-xs text-gray-400">Protein</div>
                  <div className="text-xs sm:text-sm font-bold text-white">150g</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-1 sm:p-2 text-center">
                  <div className="text-xs text-gray-400">Carbs</div>
                  <div className="text-xs sm:text-sm font-bold text-white">385g</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-1 sm:p-2 text-center">
                  <div className="text-xs text-gray-400">Fat</div>
                  <div className="text-xs sm:text-sm font-bold text-white">53g</div>
                </div>
              </div>
            </div>
            
            {/* Blur overlay - only bottom half */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/20 backdrop-blur-sm flex items-end justify-center pb-4">
              <div className="text-white text-center">
                <div className="text-lg sm:text-2xl font-bold mb-2">Preview</div>
                <div className="text-xs sm:text-sm opacity-75">Get full access below</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-base sm:text-lg text-foreground font-medium">Free access to my exact macro calculator</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-base sm:text-lg text-foreground font-medium">Get a step-by-step walkthrough so you know exactly how to use it</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-base sm:text-lg text-foreground font-medium">Finally stop guessing your calories and macros</span>
          </div>
        </div>
      </div>

      {/* Email Signup Card with Glow Effect */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md pointer-events-none glow-white" />
        <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          {/* CTA */}
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">All I want is your email.</h2>
            <p className="text-sm sm:text-base text-muted-foreground">No spam, just access to the calculator.</p>
          </div>

          {isSubmitted ? (
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-gray-800 font-bold bg-white/50 p-4 rounded-lg border border-white/40">
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg text-center">Thanks! Redirecting to macro calculator...</span>
              <span className="text-xs sm:text-sm text-gray-600 text-center">You'll have access in 3 seconds</span>
              <Button
                onClick={() => window.location.href = '/calculator'}
                className="mt-2 w-full sm:w-auto bg-gradient-to-r from-white to-white/90 hover:from-white/95 hover:to-white/85 text-gray-900 font-bold text-base sm:text-lg py-3 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 glow-white"
              >
                Access Calculator Now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="text-base py-3 border-2 border-white/60 focus:border-white/80 focus:ring-white/40 bg-background text-foreground"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base py-3 border-2 border-white/60 focus:border-white/80 focus:ring-white/40 bg-background text-foreground"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-white to-white/90 hover:from-white/95 hover:to-white/85 text-gray-900 font-bold text-lg py-3 border-2 border-transparent hover:border-white/60 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 glow-white"
              >
                GET ACCESS NOW
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSignup; 