import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NewsletterFooter from '@/components/NewsletterFooter';

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
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <Mail className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">Free Daily Fitness Tips</h1>
        <p className="text-lg text-muted-foreground text-center mb-6">
          Get practical, actionable fitness and nutrition advice delivered to your inbox every morning. No spam, no gimmicks—just real strategies that work for busy men and women.
        </p>
        <ul className="mb-6 text-muted-foreground text-base list-disc list-inside text-left w-full max-w-md">
          <li>✓ Simple, science-backed tips you can use right away</li>
          <li>✓ Motivation and accountability to keep you on track</li>
          <li>✓ Exclusive content not shared anywhere else</li>
        </ul>
        {isSubmitted ? (
          <div className="flex flex-col items-center gap-2 text-green-300 font-bold bg-green-900/30 p-4 rounded-lg border border-green-700 w-full max-w-md">
            <Send className="w-6 h-6" />
            <span className="text-lg">Thanks! Check your email for your first tip.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="text-base py-3 border-2 border-green-700 focus:border-green-400 focus:ring-green-400 bg-background text-foreground"
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-base py-3 border-2 border-green-700 focus:border-green-400 focus:ring-green-400 bg-background text-foreground"
            />
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white font-bold text-lg py-3 border-2 border-green-700 hover:border-green-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get My Free Tips
            </Button>
          </form>
        )}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Unsubscribe anytime. No spam, ever.
        </p>
      </div>
      <NewsletterFooter />
    </div>
  );
};

export default EmailSignup; 