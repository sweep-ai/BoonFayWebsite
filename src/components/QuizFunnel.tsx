import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const Q1_OPTIONS = [
  'Get a visible 6 pack without a restrictive diet',
  'Gain up to 10lbs of muscle this semester',
  'Get your dream physique while enjoying your college life',
];

const Q1_TO_SLUG: Record<string, string> = {
  [Q1_OPTIONS[0]]: '6pack',
  [Q1_OPTIONS[1]]: 'muscle',
  [Q1_OPTIONS[2]]: 'physique',
};

const Q2_OPTIONS = [
  "I don't have enough time",
  "I go to the gym occasionally but never stay consistent",
  "I don't know how to get in shape",
];

const Q3_OPTIONS = [
  'Just getting started',
  "I've tried a few things but never stuck with it",
  'I work out regularly but want better results',
];

export default function QuizFunnel() {
  const [quizStep, setQuizStep] = useState(1);
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [slideHeight, setSlideHeight] = useState<number | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  const progress = quizStep === 1 ? 25 : quizStep === 2 ? 50 : quizStep === 3 ? 75 : 100;

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

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setFormError('Please fill in all fields');
      return;
    }
    const slug = q1 ? Q1_TO_SLUG[q1] : 'physique';
    window.location.href = `/resource/${slug}`;
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
                      What's stopping you from hitting your goal?
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6 text-center">Pick the one that feels most true right now</p>

                    <ul className="w-full max-w-xl space-y-3 mb-6 mx-auto">
                      {Q2_OPTIONS.map((opt) => (
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
                      What's your experience with fitness?
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6 text-center">This helps personalize your playbook</p>

                    <ul className="w-full max-w-xl space-y-3 mb-6 mx-auto">
                      {Q3_OPTIONS.map((opt) => (
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
                          placeholder="you@university.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-white/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quiz-phone" className="text-zinc-300 text-sm">
                          Phone
                        </Label>
                        <Input
                          id="quiz-phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder:text-zinc-500 focus-visible:ring-white/40"
                        />
                      </div>
                      {formError && (
                        <p className="text-sm text-blue-400">{formError}</p>
                      )}
                      <Button type="submit" className="w-full" size="lg">
                        Send me my playbook
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

