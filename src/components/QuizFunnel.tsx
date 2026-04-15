import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/track';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const DEFAULT_GOAL_SLUG = 'physique';

export default function QuizFunnel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToLegal, setAgreedToLegal] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) {
      setFormError('Please fill in all fields');
      return;
    }
    if (!agreedToLegal) {
      setFormError('Please agree to the Privacy Policy and Terms of Service to continue.');
      return;
    }

    setSubmitting(true);
    const payload = JSON.stringify({
      email: trimmedEmail,
      name: trimmedName,
    });

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      });

      const contentType = res.headers.get('content-type') ?? '';
      const data =
        contentType.includes('application/json')
          ? await res.json().catch(() => ({}))
          : {};

      if (!res.ok) {
        const errBody = data as { error?: string; code?: string };
        let msg = 'Could not save your details. Please try again.';
        if (res.status === 500 && errBody.error === 'Server configuration error') {
          msg = 'Service is not configured. Please try again later.';
        } else if (typeof errBody.error === 'string' && errBody.error.length > 0) {
          msg = errBody.error;
        }
        setFormError(msg);
        setSubmitting(false);
        return;
      }

      await trackEvent(
        'quiz_submit',
        {
          quiz_placement: 'protocol_page',
          goal_slug: DEFAULT_GOAL_SLUG,
        },
        { idempotency_key: `quiz_submit_${trimmedEmail.toLowerCase()}` }
      );

      window.location.href = '/resource';
    } catch {
      setFormError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  return (
    <section id="protocol" className="py-16 md:py-20 pt-24 md:pt-28">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-blue-400 bg-clip-text drop-shadow-lg text-glow-white text-5xl md:text-4xl font-extrabold text-primary mb-2">FREE</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Customized Post-Grad Playbook
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your personalized Post-Grad Playbook and video breakdown delivered instantly. Just the exact system helping post-grads drop 20lbs in 90 days.
          </p>
        </div>

        <div className="relative w-full">
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
          <div
            className="relative rounded-xl shadow-2xl z-10 overflow-hidden p-6 sm:p-8 backdrop-blur-md"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
              backgroundSize: '20px 20px',
              backgroundColor: 'rgb(24 24 27)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-950/40 pointer-events-none rounded-xl" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 text-center">
                Get your personalized playbook
              </h3>
              <p className="text-sm text-zinc-400 mb-6 text-center">
                Enter your details below and we&apos;ll send your custom training video instantly.
              </p>

              <form onSubmit={handleLeadSubmit} className="w-full max-w-xl space-y-4 mb-6 mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="quiz-name" className="text-zinc-300 text-sm">
                    Name
                  </Label>
                  <Input
                    id="quiz-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiz-email" className="text-zinc-300 text-sm">
                    Email
                  </Label>
                  <Input
                    id="quiz-email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-white/40"
                  />
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Checkbox
                    id="quiz-legal"
                    checked={agreedToLegal}
                    onCheckedChange={(v) => {
                      setAgreedToLegal(v === true);
                      if (v === true) setFormError('');
                    }}
                    className="mt-0.5 border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label
                    htmlFor="quiz-legal"
                    className="text-sm text-zinc-300 leading-snug cursor-pointer font-normal"
                  >
                    I have read and agree to the{' '}
                    <Link
                      to="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    >
                      Terms of Service
                    </Link>
                    . I understand how my information will be used.
                  </Label>
                </div>

                {formError && (
                  <p className="text-sm text-blue-400">{formError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={!agreedToLegal || submitting}
                >
                  {submitting ? 'Sending...' : 'Send me my playbook'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
