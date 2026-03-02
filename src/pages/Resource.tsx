import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

type GoalSlug = '6pack' | 'muscle' | 'physique';

const RESOURCE_CONTENT: Record<
  GoalSlug,
  {
    headline: string;
    subheadline: string;
    heroCopy: string;
    bullets: string[];
    ctaCopy: string;
    videoTitle: string;
  }
> = {
  '6pack': {
    headline: 'Your 6-Pack Playbook',
    subheadline: 'Get visible abs without starving yourself or living in the gym',
    heroCopy:
      "You want to look shredded. Pool parties, spring break, that shirtless pic. But you're juggling classes, a social life, and maybe a part-time job. The good news: you don't need 2-hour workouts or a restrictive diet. This playbook shows you exactly how to reveal your abs while still enjoying campus life. No meal prep marathons, no cutting out your favorite foods.",
    bullets: [
      'Time-efficient ab training that fits between classes',
      'Nutrition strategies that work with dining hall and late-night options',
      'How to stay lean without sacrificing weekends or social life',
      'The exact system college students use to get visible abs in one semester',
    ],
    ctaCopy: 'Ready for 1-on-1 coaching? Get your custom plan.',
    videoTitle: '6-Pack Training Video: Abs Without the Restriction',
  },
  muscle: {
    headline: 'Your Muscle-Building Playbook',
    subheadline: 'Add 10lbs of lean muscle this semester—campus rec approved',
    heroCopy:
      "You want to fill out your frame, look stronger, and feel confident. But between lectures, labs, and a packed schedule, you need a plan that actually fits. This playbook is built for the campus rec—no fancy equipment, no 2-hour sessions. Just the most efficient muscle-building system designed for students who want real gains without sacrificing their lifestyle.",
    bullets: [
      'Compound-focused workouts under 45 minutes using campus gym equipment',
      'Smart nutrition for muscle gain without a crazy bulk',
      'Recovery strategies that work with your sleep schedule',
      'The semester-by-semester approach to adding 10lbs of lean muscle',
    ],
    ctaCopy: 'Want a custom muscle-building plan? Let\'s get you there.',
    videoTitle: 'Muscle-Building Video: 10lbs in One Semester',
  },
  physique: {
    headline: 'Your Dream Physique Playbook',
    subheadline: 'Transform your body while still enjoying every part of college',
    heroCopy:
      "You want the full package—lean, strong, confident—without giving up what makes college great. No more choosing between gains and going out, between the gym and your social life. This playbook is built for students who want it all: a physique they're proud of and a lifestyle they actually enjoy. Sustainable, flexible, and designed around your real schedule.",
    bullets: [
      'Balanced training that builds muscle and keeps you lean',
      'Flexible nutrition that works with dining halls, parties, and late nights',
      'Time management tips so fitness fits without taking over',
      'The lifestyle-first approach to your best physique in college',
    ],
    ctaCopy: 'Ready for a plan built around your life? Start here.',
    videoTitle: 'Dream Physique Video: Look Good, Live Better',
  },
};

export default function Resource() {
  const { goal } = useParams<{ goal: string }>();
  const navigate = useNavigate();
  const slug = (goal ?? 'physique') as GoalSlug;
  const content = RESOURCE_CONTENT[slug] ?? RESOURCE_CONTENT.physique;

  const goToOffers = () => navigate({ pathname: '/', hash: 'offers' });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-3xl py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">
            Your Custom Playbook
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.subheadline}
          </p>
        </div>

        {/* Hero copy */}
        <div className="relative rounded-xl bg-card/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 mb-10">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            {content.heroCopy}
          </p>
        </div>

        {/* Video placeholder */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            {content.videoTitle}
          </h2>
          <div className="relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 aspect-video flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </div>
              <p className="text-sm font-medium">Video training coming soon</p>
              <p className="text-xs max-w-xs text-center">
                Your personalized training video will be delivered here based on your quiz answers.
              </p>
            </div>
          </div>
        </div>

        {/* Bullets */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            What’s inside your playbook
          </h2>
          <ul className="space-y-4">
            {content.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span className="text-base md:text-lg text-muted-foreground">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Calendly inline embed */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 text-center">
            Book a free call
          </h2>
          <p className="text-muted-foreground text-center mb-6 max-w-xl mx-auto">
            Pick a time that works for you. We&apos;ll discuss your goals and create a custom plan.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-card/80">
            <iframe
              src="https://calendly.com/fayboon3/30min"
              width="100%"
              height="630"
              frameBorder="0"
              title="Schedule a call with Boon"
              className="min-h-[630px]"
            />
          </div>
        </div>
         {/* CTA */}
         <div className="text-center mb-14 md:mb-16">
          <p className="text-foreground mb-4">{content.ctaCopy}</p>
          <Button size="lg" className="w-full sm:w-auto" onClick={goToOffers}>
            View coaching options
          </Button>
        </div>
      </div>
    </div>
  );
}
