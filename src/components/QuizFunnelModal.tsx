import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface QuizFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Q1_OPTIONS = [
  'Get a visible 6 pack without a restrictive diet',
  'Gain up to 10lbs of muscle this semester',
  'Get your dream physique while enjoying your college life',
];

const Q2_OPTIONS = [
  "I don't have enough time",
  "I go to the gym occasionally but never stay consistent",
  "I don't know how to get in shape",
];

const Q3_OPTIONS = [
  'Just getting started',
  'I\'ve tried a few things but never stuck with it',
  'I work out regularly but want better results',
];

const QuizFunnelModal = ({ isOpen, onClose }: QuizFunnelModalProps) => {
  const [step, setStep] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleClose = () => {
    setStep(0);
    setQ1(null);
    setQ2(null);
    setQ3(null);
    onClose();
  };

  const handleOption = (question: 1 | 2 | 3, value: string) => {
    if (question === 1) setQ1(value);
    if (question === 2) setQ2(value);
    if (question === 3) setQ3(value);
  };

  const canProceed = () => {
    if (step === 1) return !!q1;
    if (step === 2) return !!q2;
    if (step === 3) return !!q3;
    return true;
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Submit / redirect to playbook delivery or payment
      window.location.href = '/payment';
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
        <div className="relative bg-card/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl z-10">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground pr-8">
              {step === 0 ? 'Your Free Playbook' : `Step ${step} of 3`}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-full transition-colors absolute top-4 right-4"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {step === 0 && (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  How can I help you…
                </h3>
                <ul className="space-y-2 mb-6">
                  {Q1_OPTIONS.map((opt) => (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => setQ1(opt)}
                        className={cn(
                          'w-full text-left px-4 py-3 rounded-lg border-2 transition-all',
                          q1 === opt
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-muted/50 hover:border-primary/50 text-foreground'
                        )}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!canProceed()} className="flex-1">
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What's stopping you from hitting your goal?
                </h3>
                <ul className="space-y-2 mb-6">
                  {Q2_OPTIONS.map((opt) => (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => setQ2(opt)}
                        className={cn(
                          'w-full text-left px-4 py-3 rounded-lg border-2 transition-all',
                          q2 === opt
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-muted/50 hover:border-primary/50 text-foreground'
                        )}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!canProceed()} className="flex-1">
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What's your experience with fitness?
                </h3>
                <ul className="space-y-2 mb-6">
                  {Q3_OPTIONS.map((opt) => (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => setQ3(opt)}
                        className={cn(
                          'w-full text-left px-4 py-3 rounded-lg border-2 transition-all',
                          q3 === opt
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-muted/50 hover:border-primary/50 text-foreground'
                        )}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!canProceed()} className="flex-1">
                    Get My Playbook
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Where should we send your playbook?
                </h3>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4"
                />
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-4"
                />
                <Input
                  type="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mb-4"
                />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!canProceed()} className="flex-1">
                    Get My Playbook
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizFunnelModal;
