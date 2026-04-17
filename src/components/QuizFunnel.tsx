import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/track';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const DEFAULT_GOAL_SLUG = 'physique';

export default function QuizFunnel() {
  const captureRef = useRef<HTMLDivElement | null>(null);
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
        <div className="text-center">
          <p className="text-blue-400 drop-shadow-lg text-glow-white text-5xl md:text-4xl font-extrabold mb-2">
            FREE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Customized Post-Grad Playbook
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your personalized Post-Grad Playbook and video breakdown delivered instantly. Just the exact system helping post-grads drop 20lbs in 90 days.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              size="lg"
              className="w-full max-w-xs px-8"
              onClick={() => captureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Get it now
            </Button>
          </div>
        </div>

        <div className="relative w-full mt-10 md:mt-12">
          <img
            src="/course-mockup.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 md:top-0 -translate-x-1/2 -translate-y-44 md:-translate-y-56 w-[880px] sm:w-[1040px] max-w-none opacity-100 blur-0 saturate-100 -rotate-6 drop-shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
          />

          <div
            ref={captureRef}
            className="relative z-10 w-full max-w-sm mx-auto mt-56 sm:mt-64 md:mt-72"
          >
            <div
              className="relative rounded-2xl shadow-2xl z-10 overflow-hidden p-4 backdrop-blur-md border border-white/15 bg-zinc-950/90"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(59,130,246,0.14) 0%, rgba(0,0,0,0) 55%)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/5" />

              <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">
                Get your free training
              </h3>
              <p className="text-sm text-zinc-300/70 mb-4 text-center">
                Enter your details and we&apos;ll send it instantly.
              </p>

              <form onSubmit={handleLeadSubmit} className="w-full space-y-3 mb-4 mx-auto">
                <Input
                  id="quiz-name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-white/40"
                />
                <Input
                  id="quiz-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-white/40"
                />

                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
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
                    className="text-xs text-zinc-300 leading-snug cursor-pointer font-normal"
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
                  size="default"
                  disabled={!agreedToLegal || submitting}
                >
                  {submitting ? 'Sending...' : 'Send me my playbook'}
                </Button>
              </form>
              </div>
            </div>

            <div className="mt-6 md:mt-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 sm:p-5">
              <ul className="space-y-3 text-sm sm:text-base text-white/75">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-blue-400">✓</span>
                  <span>Free access to the full Post-Grad Fitness Course (eating, training, and social life)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-blue-400">✓</span>
                  <span>Learn the exact system I used to lose 65 lbs and help guys like Anthony drop 11 lbs in 30 days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-blue-400">✓</span>
                  <span>Finally build the body you want while navigating your first years out of school</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative z-20 mt-12 md:mt-16">
            <TestimonialCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
