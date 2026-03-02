import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import StrategyCallModal from './StrategyCallModal';

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
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');

  const progress = quizStep === 1 ? 25 : quizStep === 2 ? 50 : quizStep === 3 ? 75 : 100;

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
      <section id="quiz" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-red-500 text-5xl md:text-4xl font-extrabold text-primary mb-2">FREE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Customized College Fitness Playbook
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your personalized college-based playbook and video breakdown delivered instantly. Just the exact system helping college kids drop 20lbs in 1 semester.
            </p>
          </div>

          <div className="relative w-full">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
            <div
              className="relative rounded-xl shadow-2xl z-10 overflow-hidden p-6 sm:p-8 min-h-[420px] backdrop-blur-md"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
                backgroundSize: '20px 20px',
                backgroundColor: 'rgb(24 24 27)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-950/40 pointer-events-none rounded-xl" />

              <div className="relative z-10 overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${(quizStep - 1) * 100}%)` }}
                >
                  {/* Slide 1 */}
                  <div className="w-full flex-shrink-0">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Question 1 of 4</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-300 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">{progress}%</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">How can I help you?</h3>
                    <p className="text-sm text-zinc-400 mb-6">Let's start by understanding your main goal</p>

                    <ul className="space-y-3 mb-6">
                      {Q1_OPTIONS.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => {
                              setQ1(opt);
                              setTimeout(() => setQuizStep(2), 250);
                            }}
                            className={cn(
                              'w-full text-center px-4 py-3.5 rounded-xl border transition-all text-sm font-medium',
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
                        onClick={() => setShowStrategyModal(true)}
                        className="text-red-400 hover:text-red-300 underline underline-offset-2"
                      >
                        strategy call here
                      </button>
                    </p>
                  </div>

                  {/* Slide 2 */}
                  <div className="w-full flex-shrink-0">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Question 2 of 4</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-300 rounded-full" style={{ width: '50%' }} />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">50%</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      What's stopping you from hitting your goal?
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6">Pick the one that feels most true right now</p>

                    <ul className="space-y-3 mb-6">
                      {Q2_OPTIONS.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => {
                              setQ2(opt);
                              setTimeout(() => setQuizStep(3), 250);
                            }}
                            className={cn(
                              'w-full text-center px-4 py-3.5 rounded-xl border transition-all text-sm font-medium',
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

                    <div className="flex gap-3">
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
                  <div className="w-full flex-shrink-0">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Question 3 of 4</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-300 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">75%</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      What's your experience with fitness?
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6">This helps personalize your playbook</p>

                    <ul className="space-y-3 mb-6">
                      {Q3_OPTIONS.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => {
                              setQ3(opt);
                              setTimeout(() => setQuizStep(4), 250);
                            }}
                            className={cn(
                              'w-full text-center px-4 py-3.5 rounded-xl border transition-all text-sm font-medium',
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

                    <div className="flex gap-3">
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
                  <div className="w-full flex-shrink-0">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="text-sm text-zinc-400">Almost there!</span>
                      <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-300 rounded-full" style={{ width: '100%' }} />
                      </div>
                      <span className="text-sm text-zinc-400 w-10 text-right">100%</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      Get your personalized playbook
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6">
                      Enter your details below and we&apos;ll send your custom training video instantly.
                    </p>

                    <form onSubmit={handleLeadSubmit} className="space-y-4 mb-6">
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
                        <p className="text-sm text-red-400">{formError}</p>
                      )}
                      <Button type="submit" className="w-full" size="lg">
                        Send me my playbook
                      </Button>
                    </form>

                    <div className="flex gap-3">
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

      <StrategyCallModal isOpen={showStrategyModal} onClose={() => setShowStrategyModal(false)} />
    </>
  );
}

