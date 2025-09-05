
import { useState } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Analytics } from "@vercel/analytics/next"

const NewsletterFooter = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
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
        setIsSubmitted(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
        setEmail('');
        setFirstName('');
      } else {
        console.error('Newsletter signup failed:', response.status);
        // Still show success to user even if webhook fails
        setIsSubmitted(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
        setEmail('');
        setFirstName('');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      console.log('Webhook URL used:', import.meta.env.VITE_WEBHOOK_URL);
      // Still show success to user even if webhook fails
      setIsSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      setEmail('');
      setFirstName('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-green-900 text-primary-foreground p-3 md:p-4 shadow-lg z-40 animate-slide-in-bottom">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col gap-1 flex-shrink-0">
            <p className="font-bold text-base md:text-lg">Free Daily Fitness Emails for Busy Men and Women</p>
            <p className="text-xs md:text-sm opacity-90">Practical advice delivered to your inbox daily.</p>
          </div>

          {isSubmitted ? (
            <div className="flex items-center gap-2 text-green-300 w-full sm:w-auto">
              <Send className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium text-sm md:text-base">Thanks! Check your email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto min-w-0">
              <div className="flex gap-2 min-w-0">
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="flex-1 min-w-0 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 text-sm md:text-base"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 min-w-0 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 text-sm md:text-base"
                />
              </div>
              <Button type="submit" variant="secondary" size="sm" className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0 absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterFooter;
