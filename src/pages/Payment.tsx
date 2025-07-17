import React, { useEffect, useRef } from 'react';

const PRIMARY_BUTTON = `<stripe-buy-button
  buy-button-id="buy_btn_1Rm0FILclJQMsgqqtdWHC6SQ"
  publishable-key="pk_live_51RRPtDLclJQMsgqqRolWd5oPa3kalgMuvAbGQwfLyTES0FisfNHndL35AKxZKNIUbV98SS2F54l3JxpjSpy0Z0Lz009Qe0v8sD"
></stripe-buy-button>`;
const SECONDARY_BUTTON = `<stripe-buy-button
  buy-button-id="buy_btn_1Rm0GoLclJQMsgqqU5z2bUce"
  publishable-key="pk_live_51RRPtDLclJQMsgqqRolWd5oPa3kalgMuvAbGQwfLyTES0FisfNHndL35AKxZKNIUbV98SS2F54l3JxpjSpy0Z0Lz009Qe0v8sD"
></stripe-buy-button>`;

const Payment = () => {
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    // Only add the Stripe script if it hasn't been added yet
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (primaryRef.current) {
      primaryRef.current.innerHTML = PRIMARY_BUTTON;
    }
    if (secondaryRef.current) {
      secondaryRef.current.innerHTML = SECONDARY_BUTTON;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="relative w-full max-w-xl mx-auto">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md" />
        <div className="relative bg-card/80 backdrop-blur-md rounded-2xl shadow-2xl z-10 p-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">Join the 16-Week Transformation Program</h1>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl">
            Secure your spot in Boon Fay's 16-Week Transformation Program. Get personalized coaching, custom workouts, and 24/7 accountability. Start your journey to a stronger, leaner, more confident you!
          </p>

          {/* Primary Stripe Buy Button */}
          <div className="w-full mb-8">
            <div className="mb-3">
              <h2 className="text-xl font-semibold text-foreground text-center mb-1">Full 16-Week Program</h2>
              <p className="text-base text-muted-foreground text-center mb-2">One-time payment for the complete transformation experience.</p>
            </div>
            <div ref={primaryRef} />
          </div>

          {/* Divider */}
          <div className="flex items-center w-full my-6">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-4 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-muted" />
          </div>

          {/* Secondary Stripe Buy Button */}
          <div className="w-full">
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-foreground text-center mb-1">Monthly Payment Option</h2>
              <p className="text-base text-muted-foreground text-center mb-2">Prefer to pay as you go? Choose the monthly plan below.</p>
            </div>
            <div ref={secondaryRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
