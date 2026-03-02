
import { Target, Heart, TrendingUp } from 'lucide-react';
import { Analytics } from "@vercel/analytics/next"

const About = () => {
  return (
    <section id="about" className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-fade-in order-first lg:order-last">
            {/* Gradient border for image */}
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
            My name is Boon Fay. I'm a certified personal trainer and former Division I college baseball player who knows firsthand what college can do to your body.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
            Through endless trial and error, I lost 40 pounds on my own, figured out what actually works, and never looked back. That year taught me more than any certification ever could, because I know exactly what it feels like to be a college student trying to get in shape with a packed schedule, a social life, and academic pressures. And I know how to make it work anyway.
           </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
            My coaching is designed specifically around the college lifestyle. No meal prep that requires a full kitchen. No gym routines that eat up three hours of your day. Just simple, proven strategies that fit into your life and deliver real results.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
            Let's get to work.

            </p>
            <div className="relative mt-4">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
              <div className="relative bg-card/80 backdrop-blur-md p-4 md:p-6 rounded-lg md:rounded-xl shadow-xl">
                <h4 className="font-semibold text-primary mb-2 md:mb-3 text-sm md:text-base">Credentials & Experience</h4>
                <ul className="space-y-1 md:space-y-2 text-muted-foreground text-sm md:text-base">
                  <li>• NASM Certified Personal Trainer</li>
                  <li>• Former Division 1 athlete</li>
                  <li>• Extensive experience working with overweight men and women</li>
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
