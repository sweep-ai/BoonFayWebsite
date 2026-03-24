interface Testimonial {
  name: string;
  result: string;
  quote: string;
  meta: string;
  image:
    | { kind: 'collage'; src: string; alt: string }
    | { kind: 'pair'; beforeSrc: string; afterSrc: string; beforeAlt: string; afterAlt: string };
}

const TestimonialCarousel = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'James',
      meta: '24',
      result: 'Gained 10 lbs of muscle lifting before work with a 9-5',
      quote:
        'The Post-Grad Protocol was exactly what I needed after graduation. Every workout fit around my 9-5 and the gym I had access to. Four months in, I’m up 10 pounds of muscle and feel my strongest ever.',
      image: { kind: 'collage', src: '/UnknownTestimonial.jpeg', alt: 'James before and after' },
    },
    {
      name: 'Gerardo',
      meta: '22',
      result: 'Lost 40 lbs in his first year post-grad without giving up a single weekend',
      quote:
        "I've tried getting in shape since graduation but work and life always got in the way. Boon's Post-Grad Protocol finally made it doable. I dropped 40 pounds in 4 months without giving up my weekends.",
      image: { kind: 'collage', src: '/Gerardo.jpeg', alt: 'Gerardo before and after' },
    },
    {
      name: 'Robert',
      meta: '',
      result: 'Down 30lbs in 3 months without any major lifestyle changes',
      quote: 'Thanks for helping me with this weight loss journey, Boon. It\'s good to be 30 lbs lighter.',
      image: {
        kind: 'pair',
        beforeSrc: '/RobertBefore.jpeg',
        afterSrc: '/RobertAfter.jpeg',
        beforeAlt: 'Robert before transformation',
        afterAlt: 'Robert after transformation',
      },
    },
  ];

  const track = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="pt-0 md:pt-0 pb-10 md:pb-14">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Real Results from Real Men
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real post-grads who built the body they wanted while balancing work, life, and weekends.
          </p>
        </div>

        <div className="testimonial-marquee rounded-2xl bg-black/40 border border-white/10 relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10" />

          <div className="p-4 sm:p-6">
            <div className="testimonial-marquee-track gap-4 sm:gap-6">
            {track.map((t, idx) => (
              <article
                key={`${t.name}-${idx}`}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] max-w-[360px] rounded-2xl bg-zinc-900/70 border border-white/10 overflow-hidden shadow-xl"
              >
                <div className="relative">
                  {t.image.kind === 'collage' ? (
                    <img
                      src={t.image.src}
                      alt={t.image.alt}
                      className="w-full h-40 sm:h-44 md:h-48 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid grid-cols-2">
                      <img
                        src={t.image.beforeSrc}
                        alt={t.image.beforeAlt}
                        className="w-full h-40 sm:h-44 md:h-48 object-cover"
                        loading="lazy"
                      />
                      <img
                        src={t.image.afterSrc}
                        alt={t.image.afterAlt}
                        className="w-full h-40 sm:h-44 md:h-48 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 text-[10px] font-semibold tracking-wide px-2 py-1 rounded-md bg-zinc-950/70 text-white border border-white/10">
                    BEFORE
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-semibold tracking-wide px-2 py-1 rounded-md bg-zinc-950/70 text-white border border-white/10">
                    AFTER
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  {t.quote ? (
                    <div className="relative rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm sm:text-[15px] text-white/90 italic leading-relaxed">“{t.quote}”</p>
                    </div>
                  ) : null}
                  {(t.name || t.meta || t.result) && (
                    <div className={t.quote ? 'mt-4 pt-3 border-t border-white/10' : ''}>
                      {t.name ? <p className="text-sm font-semibold text-white">{t.name}</p> : null}
                      {t.meta ? <p className="text-xs text-white/60">{t.meta}</p> : null}
                      {t.result ? <p className="mt-2 text-xs sm:text-sm text-white/75">{t.result}</p> : null}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
