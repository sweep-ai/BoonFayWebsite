const About = () => {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-fade-in order-first lg:order-last">
            <div className="absolute -inset-1 rounded-xl md:rounded-2xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md pointer-events-none glow-white" />
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl z-10 bg-gray-800/30">
              <img
                src="/profile2.jpeg"
                alt="Professional fitness consultation"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in order-last lg:order-first" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Meet Boon!</h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
              My name is Boon Fay. I&apos;m a certified personal trainer and former Division I college baseball player who knows firsthand what school can do to your body.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
              I lost over 40 pounds during my last year of college. That experience became the foundation of everything I coach. Because I know what it&apos;s like to navigate a new career, a new lifestyle, and still show up for yourself physically.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
              My coaching is designed specifically around the post-grad lifestyle. No meal prep that requires hours you don&apos;t have. No overcomplicated meal plans. No 2-hour gym sessions. Just straight-forward, proven strategies designed for post-grad men who are serious about finally building the body they&apos;ve been putting off.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
              The next chapter starts now. Let&apos;s make it your best one.
            </p>
            <div className="relative mt-4">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
              <div className="relative bg-card/80 backdrop-blur-md p-4 md:p-6 rounded-lg md:rounded-xl shadow-xl">
                <h4 className="font-semibold text-primary mb-2 md:mb-3 text-sm md:text-base">Credentials & Experience</h4>
                <ul className="space-y-1 md:space-y-2 text-muted-foreground text-sm md:text-base">
                  <li>• NASM Certified Personal Trainer</li>
                  <li>• Former Division 1 athlete</li>
                  <li>• Extensive experience working with overweight men and women</li>
                  <li>• Fitness and fat loss for young men post graduation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
