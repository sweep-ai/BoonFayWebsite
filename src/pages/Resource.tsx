import { useEffect } from 'react';
import { trackEvent } from '@/lib/track';
import { useCalendlyBookingTracked } from '@/hooks/useCalendlyBookingTracked';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GoalSlug = '6pack' | 'muscle' | 'physique';

const RESOURCE_ORDER: GoalSlug[] = ['6pack', 'muscle', 'physique'];

const PLAYBOOK_PATHS: Record<GoalSlug, string> = {
  '6pack': '/post-grad-eating-guide.html',
  muscle: '/post-grad-training-guide-v5.html',
  physique: '/post-grad-balance-guide.html',
};

const PAGE_HEADER = {
  badge: 'Your Custom Protocol',
  title: 'Your Post-Grad Protocols',
  subtitle:
    'Three playbooks for abs, muscle, and balance, each with a walkthrough video and a downloadable guide. Pick the track that matches your goal.',
} as const;

const RESOURCE_CONTENT: Record<
  GoalSlug,
  {
    headline: string;
    subheadline: string;
    videoTitle: string;
    loomUrl: string;
    loomPadding: string;
    playbookLabel: string;
    /** Short copy under the video (condensed from hero, bullets, and follow-up sections). */
    belowVideo: string;
  }
> = {
  '6pack': {
    headline: 'The Post-Grad 6-Pack Protocol',
    subheadline: 'Get visible abs while working a 9-5 and actually having a life',
    videoTitle: 'Watch: How Post-Grads Are Getting Visible Abs Without Restriction',
    loomUrl: 'https://www.loom.com/embed/e17933f9347241d6b5e635b30af0752b',
    loomPadding: '53.1%',
    playbookLabel: 'Download Eating Playbook',
    belowVideo:
      "For post-grads who want a lean midsection without meal-prep Sundays or skipping happy hour: restaurants, takeout, and social eating still work when you're in the right deficit.\n\nCovers Protein First, a staples list, eating-out rules, calorie targets with a week of tracking, and an 80/20 consistency mindset. Start with one week on protein, then stack the rest, or book a call below for a plan mapped to you.",
  },
  muscle: {
    headline: 'The Post-Grad Muscle Protocol',
    subheadline: 'Pack on 10lbs of lean muscle while balancing your 9-5 and your social life',
    videoTitle: 'Watch: The Fastest Way to Build Muscle After College',
    loomUrl: 'https://www.loom.com/embed/63fd69d48e1948fc85ac57c7c0245c41',
    loomPadding: '56.25%',
    playbookLabel: 'Download Training Playbook',
    belowVideo:
      'Structured training and nutrition for real gains without living in the gym: upper/lower and full-body programs, progressive overload, protein and calorie targets, and a train-before-work rhythm so your job does not steal your sessions.\n\nThree to four 45 to 55 minute sessions, minimal equipment. Run a block for 12+ weeks and add load each session, or book a call below for programming matched to your gym and schedule.',
  },
  physique: {
    headline: 'The Post-Grad Physique Protocol',
    subheadline: 'Build the body you want without giving up the lifestyle you worked for',
    videoTitle: 'Watch: How to Build Your Best Physique After College',
    loomUrl: 'https://www.loom.com/embed/5064bffc92184f0090ce8dd7a705d544',
    loomPadding: '53.1%',
    playbookLabel: 'Download Balance Playbook',
    belowVideo:
      "Flexible training and real-world nutrition for a physique you're proud of, whether you're traveling, at happy hour, or juggling a demanding week. Anchor three training days and organize everything else around them.\n\nIncludes a weekly blueprint, time blocks, social-pressure rules, and daily/weekly checklists. Set your anchors and non-negotiables, or book a call below for a personalized protocol.",
  },
};

/** Shared Calendly intro (same as former 6-pack resource page). */
const BOOKING_SECTION = {
  headline: 'Want a custom plan built around your schedule?',
  copy: "Book a free 30-minute strategy call. We'll map out your nutrition, training, and timeline so you know exactly what to do from day one.",
} as const;

function ResourceProtocolBlock({ slug }: { slug: GoalSlug }) {
  const content = RESOURCE_CONTENT[slug];
  const playbookUrl = PLAYBOOK_PATHS[slug];
  const videoId = `video-${slug}`;
  const descriptionParagraphs = content.belowVideo.split('\n\n').filter(Boolean);

  return (
    <article
      id={videoId}
      className="border-t border-white/10 pt-12 md:pt-14 mt-12 md:mt-14 scroll-mt-8 first:border-t-0 first:pt-0 first:mt-0"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
        {content.headline}
      </h2>
      <p className="text-base text-white/55 mb-8 max-w-2xl">
        {content.subheadline}
      </p>

      <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
        {content.videoTitle}
      </h3>
      <div className="relative rounded-2xl overflow-hidden border border-blue-500/20" style={{ paddingBottom: content.loomPadding }}>
        <iframe
          src={content.loomUrl}
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          title={content.videoTitle}
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

      <div className="mt-6 md:mt-8 space-y-4 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
        {descriptionParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}

export default function Resource() {
  useCalendlyBookingTracked('resource_page');

  useEffect(() => {
    void trackEvent('resource_page_hub', {
      resource_slugs: RESOURCE_ORDER.join(','),
    });
  }, []);

  return (
    <div className="min-h-screen relative z-[1]">
      <div className="container mx-auto px-4 max-w-3xl py-12 md:py-20">
        <header className="text-center mb-14 md:mb-16">
          <span className="inline-block text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10">
            {PAGE_HEADER.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {PAGE_HEADER.title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {PAGE_HEADER.subtitle}
          </p>
        </header>

        {RESOURCE_ORDER.map((slug) => (
          <ResourceProtocolBlock key={slug} slug={slug} />
        ))}

        <div id="book-call" className="mb-10 md:mb-14 scroll-mt-8 pt-12 md:pt-14 mt-12 md:mt-14 border-t border-white/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {BOOKING_SECTION.headline}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
              {BOOKING_SECTION.copy}
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
