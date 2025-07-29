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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      />

      {/* Main Card with Glow Effect */}
      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md pointer-events-none" />
        <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4 leading-tight">
            30 Days, 30 Lessons & 30 Ways to Take Control of Your Fitness
          </h1>
          
          <p className="text-base text-muted-foreground text-center mb-6 leading-relaxed">
            Every day for the next 30 days, I'll send you one short, value-packed email, straight to your inbox. Just drop your email, and you're in.
          </p>

          {isSubmitted ? (
            <div className="flex flex-col items-center gap-2 text-green-300 font-bold bg-green-900/30 p-4 rounded-lg border border-green-700">
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
                className="text-base py-3 border-2 border-green-700 focus:border-green-400 focus:ring-green-400 bg-background text-foreground"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base py-3 border-2 border-green-700 focus:border-green-400 focus:ring-green-400 bg-background text-foreground"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold text-lg py-3 border-2 border-transparent hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
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