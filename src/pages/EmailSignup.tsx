import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
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
    } catch (error) {
      setIsSubmitted(true);
      setEmail('');
      setFirstName('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Main Card with Glow Effect */}
      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md pointer-events-none glow-white" />
        <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4 leading-tight">
          90 Day Step by Step Formula That Will Revolutionize the Way You Look at Your Fitness Journey
          </h1>
          
          <p className="text-base text-muted-foreground text-center mb-6 leading-relaxed">
          Every day for the next 90 days, I will send you one short email that takes the guesswork out of training, nutrition, and mindset. These are clear steps that stack on each other until fitness finally feels effortless.
          </p>

          {isSubmitted ? (
            <div className="flex flex-col items-center gap-2 text-gray-800 font-bold bg-white/50 p-4 rounded-lg border border-white/40">
              <Send className="w-6 h-6" />
              <span className="text-lg">Thanks! Check your email for your first lesson.</span>
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
                SUBSCRIBE NOW
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSignup; 