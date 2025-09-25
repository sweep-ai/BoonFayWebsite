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
            30 Days, 30 Lessons & 30 Ways to Take Control of Your Fitness
          </h1>
          
          <p className="text-base text-muted-foreground text-center mb-6 leading-relaxed">
            Every day for the next 30 days, I'll send you one short, value-packed email, straight to your inbox. Just drop your email, and you're in.
          </p>

          {isSubmitted ? (
            <div className="flex flex-col items-center gap-2 text-gray-700 font-bold bg-gray-100/30 p-4 rounded-lg border border-gray-300">
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
                className="text-base py-3 border-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500 bg-background text-foreground"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base py-3 border-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500 bg-background text-foreground"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 text-gray-900 font-bold text-lg py-3 border-2 border-transparent hover:border-gray-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 glow-white"
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