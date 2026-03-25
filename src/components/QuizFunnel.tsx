import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const Q1_OPTIONS = [
  'Get a visible 6 pack without a restrictive diet',
  'Gain up to 10lbs of muscle',
  'Get your dream physique while enjoying your post-grad life',
];

const Q1_TO_SLUG: Record<string, string> = {
  [Q1_OPTIONS[0]]: '6pack',
  [Q1_OPTIONS[1]]: 'muscle',
  [Q1_OPTIONS[2]]: 'physique',
};

const Q2_BY_GOAL: Record<string, { question: string; subtitle: string; options: string[] }> = {
  [Q1_OPTIONS[0]]: {
    question: "What's keeping you from seeing your abs?",
    subtitle: 'Be honest — this helps us build the right plan',
    options: [
      "I eat out too much and don't know what to order",
      "My 9-5 leaves me too drained to cook or meal prep",
      "I work out but my diet isn't dialed in",
    ],
  },
  [Q1_OPTIONS[1]]: {
    question: "What's holding you back from building muscle?",
    subtitle: 'Pick the one that hits closest to home',
    options: [
      "I can't stay consistent with a gym routine after work",
      "I don't eat enough protein — I barely cook",
      "I train but I'm not seeing the gains I want",
    ],
  },
  [Q1_OPTIONS[2]]: {
    question: "What's getting in the way of your ideal physique?",
    subtitle: 'No wrong answers — just pick what resonates',
    options: [
      "Work, happy hours, and weekends keep derailing me",
      "I don't have a plan that fits my actual lifestyle",
      "I've tried programs before but nothing sticks post-grad",
    ],
  },
};

const Q3_BY_GOAL: Record<string, { question: string; subtitle: string; options: string[] }> = {
  [Q1_OPTIONS[0]]: {
    question: 'How would you describe your current eating habits?',
    subtitle: 'This helps us customize your nutrition playbook',
    options: [
      "Mostly takeout and dining out — I barely use my kitchen",
      "I try to eat well but fall off every weekend",
      "I eat pretty clean but need help dialing in the details",
    ],
  },
  [Q1_OPTIONS[1]]: {
    question: "What does your gym situation look like right now?",
    subtitle: 'So we can match the plan to your setup',
    options: [
      "I have a gym membership but barely go",
      "I go 2-3x a week but don't follow a real program",
      "I train consistently but want a smarter approach",
    ],
  },
  [Q1_OPTIONS[2]]: {
    question: "How much time can you realistically commit per week?",
    subtitle: "We'll build around your actual schedule",
    options: [
      "I'm slammed — maybe 2-3 hours total",
      "I can do 3-4 sessions if they're short and efficient",
      "Time isn't the issue — I just need the right plan",
    ],
  },
};

const Q2_FALLBACK = Q2_BY_GOAL[Q1_OPTIONS[2]];
const Q3_FALLBACK = Q3_BY_GOAL[Q1_OPTIONS[2]];

export default function QuizFunnel() {
  const [quizStep, setQuizStep] = useState(1);
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToLegal, setAgreedToLegal] = useState(false);
  const [formError, setFormError] = useState('');
  const [slideHeight, setSlideHeight] = useState<number | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  const progress = quizStep === 1 ? 25 : quizStep === 2 ? 50 : quizStep === 3 ? 75 : 100;

  const q2Content = q1 ? (Q2_BY_GOAL[q1] ?? Q2_FALLBACK) : Q2_FALLBACK;
  const q3Content = q1 ? (Q3_BY_GOAL[q1] ?? Q3_FALLBACK) : Q3_FALLBACK;

  useEffect(() => {
    const el = slideRefs.current[quizStep - 1];
    if (!el) return;
    const updateHeight = () => {
      const h = el.getBoundingClientRect().height;
      setSlideHeight(Math.ceil(h));
    };
    let ro: ResizeObserver | null = null;
    const raf = requestAnimationFrame(() => {
      updateHeight();
      ro = new ResizeObserver(updateHeight);
      ro.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [quizStep]);

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
    const slug = q1 ? Q1_TO_SLUG[q1] : 'physique';

    setSubmitting(true);
    const payload = JSON.stringify({
      email: trimmedEmail,
      name: trimmedName,
      goal: slug,
      q1: q1 ?? '',
      q2: q2 ?? '',
      q3: q3 ?? '',
    });

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      });
      await res.json().catch(() => {});
    } catch {
      // Fallback: use sendBeacon so the request survives page navigation
      navigator.sendBeacon('/api/subscribe', new Blob([payload], { type: 'application/json' }));
    } finally {
      window.location.href = `/resource/${slug}`;
    }
  };

  return (
    <>
      <section id="quiz" className="py-16 md:py-20">
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

              <div
                className="relative z-10 overflow-hidden transition-[height] duration-300 ease-out"
                style={{ height: slideHeight ?? undefined, minHeight: slideHeight == null ? 280 : undefined }}
              >
                <div
                  className="flex items-start transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${(quizStep - 1) * 100}%)` }}
                >
                  {/* Slide 1 */}
                  <div ref={(el) => { slideRefs.current[0] = el; }} className="w-full flex-shrink-0 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Question 1 of 4</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-300 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">{progress}%</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 text-center">How can I help you?</h3>
                    <p className="text-sm text-zinc-400 mb-6 text-center">Let's start by understanding your main goal</p>

                    <ul className="w-full max-w-xl space-y-3 mb-6 mx-auto">
                      {Q1_OPTIONS.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => {
                              setQ1(opt);
                              setTimeout(() => setQuizStep(2), 250);
                            }}
                            className={cn(
                              'w-full text-center px-5 py-4 sm:px-6 sm:py-4 rounded-xl border transition-all text-base sm:text-lg font-medium',
                              q1 === opt
                                ? 'bg-white/15 border-white/40 text-white'
                                : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                            )}
                          >
                            {opt}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <p className="text-center text-xs text-zinc-500 mt-2">
                      Ready to start now? Book a free{' '}
                      <button
                        type="button"
                        onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                      >
                        strategy call here
                      </button>
                    </p>
                  </div>

                  {/* Slide 2 */}
                  <div ref={(el) => { slideRefs.current[1] = el; }} className="w-full flex-shrink-0 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Question 2 of 4</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-300 rounded-full" style={{ width: '50%' }} />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">50%</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 text-center">
                      {q2Content.question}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6 text-center">{q2Content.subtitle}</p>

                    <ul className="w-full max-w-xl space-y-3 mb-6 mx-auto">
                      {q2Content.options.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => {
                              setQ2(opt);
                              setTimeout(() => setQuizStep(3), 250);
                            }}
                            className={cn(
                              'w-full text-center px-5 py-4 sm:px-6 sm:py-4 rounded-xl border transition-all text-base sm:text-lg font-medium',
                              q2 === opt
                                ? 'bg-white/15 border-white/40 text-white'
                                : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                            )}
                          >
                            {opt}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="w-full max-w-xl flex gap-3 mx-auto">
                      <Button
                        variant="outline"
                        onClick={() => setQuizStep(1)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        Back
                      </Button>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div ref={(el) => { slideRefs.current[2] = el; }} className="w-full flex-shrink-0 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Question 3 of 4</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-300 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">75%</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 text-center">
                      {q3Content.question}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6 text-center">{q3Content.subtitle}</p>

                    <ul className="w-full max-w-xl space-y-3 mb-6 mx-auto">
                      {q3Content.options.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => {
                              setQ3(opt);
                              setTimeout(() => setQuizStep(4), 250);
                            }}
                            className={cn(
                              'w-full text-center px-5 py-4 sm:px-6 sm:py-4 rounded-xl border transition-all text-base sm:text-lg font-medium',
                              q3 === opt
                                ? 'bg-white/15 border-white/40 text-white'
                                : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                            )}
                          >
                            {opt}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="w-full max-w-xl flex gap-3 mx-auto">
                      <Button
                        variant="outline"
                        onClick={() => setQuizStep(2)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        Back
                      </Button>
                    </div>
                  </div>

                  {/* Slide 4 - Lead capture */}
                  <div ref={(el) => { slideRefs.current[3] = el; }} className="w-full flex-shrink-0 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Almost there!</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-300 rounded-full" style={{ width: '100%' }} />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">100%</span>
                    </div>

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
                      <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Send me my playbook'}
                      </Button>
                    </form>

                    <div className="w-full max-w-xl flex gap-3 mx-auto">
                      <Button
                        variant="outline"
                        onClick={() => setQuizStep(3)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

