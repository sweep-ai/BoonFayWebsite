import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { trackEvent } from '@/lib/track';
import { useCalendlyBookingTracked } from '@/hooks/useCalendlyBookingTracked';
import { Play, Download, Beef, Dumbbell, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GoalSlug = '6pack' | 'muscle' | 'physique';

const PLAYBOOK_PATHS: Record<GoalSlug, string> = {
  '6pack': '/post-grad-eating-guide.html',
  muscle: '/post-grad-training-guide-v5.html',
  physique: '/post-grad-balance-guide.html',
};

const RESOURCE_CONTENT: Record<
  GoalSlug,
  {
    headline: string;
    subheadline: string;
    heroIcon: React.ComponentType<{ className?: string }>;
    heroCopy: string;
    bullets: string[];
    bulletEmojis: string[];
    videoTitle: string;
    loomUrl: string;
    loomPadding: string;
    playbookLabel: string;
    section2Title: string;
    section2Copy: string;
    section3Title: string;
    section3Copy: string;
    ctaHeadline: string;
    ctaSubcopy: string;
    calendlyHeadline: string;
    calendlyCopy: string;
  }
> = {
  '6pack': {
    headline: 'The Post-Grad 6-Pack Protocol',
    subheadline: 'Get visible abs while working a 9-5 and actually having a life',
    heroIcon: Beef,
    heroCopy:
      "This protocol is built for post-grads who want a lean, defined midsection without meal prepping on Sundays or skipping happy hour. Eat at restaurants, order takeout, and still stay in a deficit that reveals your abs.",
    bullets: [
      'The "Protein First" framework: your bodyweight in pounds = your daily protein target in grams',
      'A 15-item kitchen staples list so your fridge, freezer, and pantry are always stocked for the week',
      'Eating-out rules for happy hours, work dinners, and brunch (protein first, bowl over burrito, grilled over fried)',
      'A calorie target breakdown for fat loss (300 to 500 below maintenance) with one week of honest tracking to calibrate',
      'The 80/20 consistency rule and the "next meal" reset so one bad meal never turns into a bad week',
    ],
    bulletEmojis: ['🥩', '🛒', '🍽️', '📊', '🔄'],
    videoTitle: 'Watch: How Post-Grads Are Getting Visible Abs Without Restriction',
    loomUrl: 'https://www.loom.com/embed/e17933f9347241d6b5e635b30af0752b',
    loomPadding: '53.1%',
    playbookLabel: 'Download Eating Playbook',
    section2Title: 'Real life, real results',
    section2Copy: "The playbook works because it's built around how you actually eat. Restaurants, takeout, happy hour. No meal prep marathons, no cutting out your favorite foods.",
    section3Title: 'Your next step',
    section3Copy: "Download the guide and start with the Protein First framework. Hit your target for one week, then layer in the rest. Want a custom plan? Book a free call and we'll map it out together.",
    ctaHeadline: 'Get a custom plan built for you',
    ctaSubcopy: "30 minutes. No pitch. We'll map out your nutrition, training, and timeline so you know exactly what to do from day one.",
    calendlyHeadline: 'Want a custom plan built around your schedule?',
    calendlyCopy: "Book a free 30-minute strategy call. We'll map out your nutrition, training, and timeline so you know exactly what to do from day one.",
  },
  muscle: {
    headline: 'The Post-Grad Muscle Protocol',
    subheadline: 'Pack on 10lbs of lean muscle while balancing your 9-5 and your social life',
    heroIcon: Dumbbell,
    heroCopy:
      "This protocol is designed for post-grads who want real muscle gain without living in the gym. A structured training plan that fits around your work schedule, plus a nutrition approach that helps you grow without a sloppy bulk.",
    bullets: [
      'Two full programs: a 4-day Upper/Lower split and a 3-day Full Body plan with exact exercises, sets, and reps',
      'Progressive overload rules (add 5 lbs upper, 10 lbs lower each session) so you never plateau',
      'A daily protein target (bodyweight in pounds = grams) plus calorie ranges for lean muscle gain',
      'The "train before 8am" system that protects your sessions from work, plans, and excuses',
      'A deload protocol every 6 to 8 weeks and a "never miss two in a row" rule to stay consistent for life',
    ],
    bulletEmojis: ['📋', '📈', '🥛', '⏰', '♻️'],
    videoTitle: 'Watch: The Fastest Way to Build Muscle After College',
    loomUrl: 'https://www.loom.com/embed/63fd69d48e1948fc85ac57c7c0245c41',
    loomPadding: '56.25%',
    playbookLabel: 'Download Training Playbook',
    section2Title: 'Built for your schedule',
    section2Copy: "3 to 4 sessions per week, 45 to 55 minutes each. Train before work and your sessions are protected from the day. The programs need minimal equipment and fit any gym.",
    section3Title: 'Your next step',
    section3Copy: "Download the guide and run one program for at least 12 weeks. Add weight each session. If you want a plan tailored to your gym and goals, book a free call.",
    ctaHeadline: 'Get a plan tailored to your gym and goals',
    ctaSubcopy: "30 minutes. No pitch. We'll design your training and nutrition protocol around your schedule, your equipment, and your targets.",
    calendlyHeadline: 'Ready to build your custom muscle-building plan?',
    calendlyCopy: "Book a free 30-minute call and we'll design a training and nutrition protocol around your gym, your schedule, and your goals.",
  },
  physique: {
    headline: 'The Post-Grad Physique Protocol',
    subheadline: 'Build the body you want without giving up the lifestyle you worked for',
    heroIcon: Scale,
    heroCopy:
      "This protocol is built for post-grads who want a physique they're proud of and a lifestyle they actually enjoy. Flexible training, real-world nutrition, and a system that works whether you're traveling for work or going out on a Friday night.",
    bullets: [
      'The Anchor System: lock 3 training days per week and fit everything else around them',
      'A full weekly blueprint (Mon to Sun) with time blocks for training, work, meals, and rest',
      'The 24-hour time breakdown showing you have 6 free hours daily and how to redirect 2 hours of phone time',
      'Rules for social pressure: how to handle drinking, group dinners, and late nights without falling off',
      'Daily and weekly checklists covering training, protein, sleep, meal prep, and a Sunday reset routine',
    ],
    bulletEmojis: ['⚓', '📅', '⏱️', '🍷', '✅'],
    videoTitle: 'Watch: How to Build Your Best Physique After College',
    loomUrl: 'https://www.loom.com/embed/5064bffc92184f0090ce8dd7a705d544',
    loomPadding: '53.1%',
    playbookLabel: 'Download Balance Playbook',
    section2Title: 'Fitness that fits',
    section2Copy: "Lock your training days and fit everything else around them. The anchor system keeps you consistent without sacrificing work, travel, or your social life.",
    section3Title: 'Your next step',
    section3Copy: "Download the guide and set your three weekly anchors. Use the checklists for daily and weekly non-negotiables. Ready for a personalized protocol? Book a free call.",
    ctaHeadline: 'Get a plan that actually fits your life',
    ctaSubcopy: "30 minutes. No pitch. We'll build a personalized protocol around your schedule, your goals, and the lifestyle you want to keep.",
    calendlyHeadline: 'Want a plan that actually fits your life?',
    calendlyCopy: "Book a free 30-minute strategy call. We'll build a personalized protocol around your schedule, your goals, and the lifestyle you want to keep.",
  },
};

const RESOURCE_FUNNEL_EVENT: Record<GoalSlug, string> = {
  '6pack': 'resource_page_6pack',
  muscle: 'resource_page_muscle',
  physique: 'resource_page_physique',
};

function normalizeGoalParam(goal: string | undefined): GoalSlug {
  if (goal === '6pack' || goal === 'muscle' || goal === 'physique') return goal;
  return 'physique';
}

export default function Resource() {
  const { goal } = useParams<{ goal: string }>();
  const slug = normalizeGoalParam(goal);
  const content = RESOURCE_CONTENT[slug] ?? RESOURCE_CONTENT.physique;

  const calendlyEmbed =
    slug === '6pack' ? 'resource_6pack' : slug === 'muscle' ? 'resource_muscle' : 'resource_physique';
  useCalendlyBookingTracked(calendlyEmbed);

  useEffect(() => {
    const eventName = RESOURCE_FUNNEL_EVENT[slug];
    void trackEvent(eventName, { resource_version: slug });
  }, [slug]);

  const playbookUrl = PLAYBOOK_PATHS[slug];
  const HeroIcon = content.heroIcon;

  return (
    <div className="min-h-screen relative z-[1]">
      <div className="container mx-auto px-4 max-w-3xl py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10">
            Your Custom Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
            {content.subheadline}
          </p>
          <div className="flex justify-center">
            <HeroIcon className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400" />
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-6 sm:p-8 mb-8">
          <div className="absolute top-0 left-6 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-500/0 rounded-full" />
          <p className="text-base md:text-lg text-white/80 leading-relaxed pl-4">
            {content.heroCopy}
          </p>
        </div>

        <div className="flex justify-center mb-12 md:mb-16">
          <Button
            onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="bg-blue-500 hover:bg-blue-600 text-white border-0"
          >
            <Play className="w-4 h-4 mr-2" fill="currentColor" />
            Watch your training video
          </Button>
        </div>

        {/* What you get */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            What you get inside
          </h2>
          <p className="text-sm text-white/50 mb-6">Everything in your protocol, broken down.</p>
          <div className="grid gap-4">
            {content.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 sm:p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center mt-0.5 text-xl">
                  {content.bulletEmojis[i]}
                </div>
                <span className="text-base md:text-lg text-white/80 leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Video section */}
        <div id="video" className="mb-12 md:mb-16 scroll-mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            {content.videoTitle}
          </h2>
          <div className="relative rounded-2xl overflow-hidden border border-blue-500/20" style={{ paddingBottom: content.loomPadding }}>
            <iframe
              src={content.loomUrl}
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <Button
            asChild
            className="w-full sm:w-auto mt-4 bg-blue-500/15 border border-blue-500/40 text-blue-400 hover:bg-blue-500/25 hover:border-blue-500/60 hover:text-blue-300"
          >
            <a href={playbookUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              {content.playbookLabel}
            </a>
          </Button>

          <div className="mt-12 md:mt-16 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{content.section2Title}</h3>
              <p className="text-base text-white/70 leading-relaxed">{content.section2Copy}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{content.section3Title}</h3>
              <p className="text-base text-white/70 leading-relaxed">{content.section3Copy}</p>
            </div>
          </div>

          {/* Call booking CTA */}
          <div className="mt-12 md:mt-16 p-6 sm:p-8 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {content.ctaHeadline}
            </h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              {content.ctaSubcopy}
            </p>
            <Button
              onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold px-8 py-6"
            >
              Book your free 30-minute call
            </Button>
          </div>
        </div>

        {/* Calendly */}
        <div id="book-call" className="mb-10 md:mb-14 scroll-mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {content.calendlyHeadline}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
              {content.calendlyCopy}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-blue-500/20 bg-white/[0.03]">
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
      </div>
    </div>
  );
}
