import React from 'react';
import { Button } from '@/components/ui/button';

const Payment = () => {
  const subscriptionLink = 'https://buy.stripe.com/bJeaEYa8A8HgfPI4Ln0oM06';
  const trialLink = 'https://buy.stripe.com/28EeVebcEe1A470cdP0oM07';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-6 sm:py-8 md:py-12">
      <div className="relative w-full max-w-4xl mx-auto">
        {/* <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" /> */}
        <div className="relative bg-card/80 backdrop-blur-md rounded-2xl shadow-2xl z-10 p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-3 sm:mb-4">Choose Your Fitness Journey</h1>
          <p className="text-base sm:text-lg text-muted-foreground text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2">
            Get personalized coaching, custom workouts, and 24/7 accountability. Start your transformation today!
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Subscription Plan */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
              <div className="relative bg-card/80 backdrop-blur-md rounded-xl shadow-xl z-10 p-4 sm:p-6 md:p-8 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Full Fitness & Coaching</h2>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-3xl sm:text-4xl font-bold text-foreground">$250</span>
                      <span className="text-muted-foreground text-sm sm:text-base">/month</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Ongoing subscription with full access</p>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">What's Included:</h3>
                    <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Fully customized workouts</strong> - Tailored to your fitness level and goals</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Macro-based meal planning</strong> - Personalized nutrition plans</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>24/7 accountability coaching</strong> - Weekly check-ins and unlimited support</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Instructional workout videos</strong> - Learn proper form and technique</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Progress tracking tools</strong> - Monitor your transformation journey</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Cancel anytime</strong> - No long-term commitment required</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Button 
                  className="w-full text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 mt-auto"
                  size="lg"
                  onClick={() => window.open(subscriptionLink, '_blank')}
                >
                  <span className="hidden sm:inline">Get Started - </span>$250<span className="hidden sm:inline">/month</span>
                </Button>
              </div>
            </div>

            {/* Trial Plan */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
              <div className="relative bg-card/80 backdrop-blur-md rounded-xl shadow-xl z-10 p-4 sm:p-6 md:p-8 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="inline-block px-2 sm:px-3 py-1 bg-green-500/20 text-green-600 text-xs font-semibold rounded-full mb-2 sm:mb-3">
                      BEST FOR TRYING
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">2-Week Trial</h2>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-3xl sm:text-4xl font-bold text-foreground">$50</span>
                      <span className="text-muted-foreground text-sm sm:text-base md:text-lg"> one-time</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Try it risk-free, then decide to upgrade</p>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">What's Included:</h3>
                    <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>2 weeks of personalized workouts</strong> - Get a taste of the program</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Nutrition guidance</strong> - Meal planning basics</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Coaching support</strong> - Weekly check-ins during trial</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Workout videos</strong> - Learn proper form and technique</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Progress tracking</strong> - See your results</span>
                      </li>
                      <li className="flex items-start gap-2 sm:gap-3">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span><strong>Upgrade anytime</strong> - Seamless transition to full program</span>
                      </li>
                    </ul>
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-white/30 rounded-lg border border-white/40">
                      <p className="text-xs text-gray-800 text-center leading-relaxed">
                        <strong>Note:</strong> One-time payment. You can upgrade to the full subscription after your trial.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 mt-auto"
                  size="lg"
                  variant="outline"
                  onClick={() => window.open(trialLink, '_blank')}
                >
                  <span className="hidden sm:inline">Start 2-Week Trial - </span>$50
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
