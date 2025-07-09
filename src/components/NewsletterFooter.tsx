
import { useState } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterFooter = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 shadow-lg z-40 animate-slide-in-bottom">
      <div className="container mx-auto max-w-4xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">Daily Fitness Tips for Men 40+</p>
            <p className="text-sm opacity-90">Get practical advice delivered to your inbox</p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="flex items-center gap-2 text-green-200">
            <Send className="w-5 h-5" />
            <span className="font-medium">Thanks! Check your email.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 min-w-[300px]">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            />
            <Button type="submit" variant="secondary" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        )}

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NewsletterFooter;
