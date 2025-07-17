
import { Target, Heart, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-fade-in order-first lg:order-last">
            {/* Gradient border for image */}
            <div className="absolute -inset-2 rounded-2xl z-0 bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md" />
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl z-10">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional fitness consultation"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in order-last lg:order-first" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4 md:mb-6">Meet Boon!</h2>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed mb-4 md:mb-6">
              My name is Boon Fay, I am a NASM certified personal trainer and former Division I college baseball player. After gaining significant weight for athletics, I personally lost over 65 pounds in one year, and completely transformed my body and mindset in the process.
            </p>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed mb-4 md:mb-6">
              With over ten years of fitness experience and a blue belt in Brazilian Jiu-Jitsu, I’ve combined real-world training with proven, sustainable methods to help busy men and women achieve lasting results.
            </p>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed mb-4 md:mb-6">
              My coaching approach is built around real life. That means no extreme diets, no unrealistic gym routines, and no pressure to give up the lifestyle you enjoy. Instead, I design custom fitness and nutrition strategies that work with your schedule, family commitments, and personal goals.
            </p>
            <p className="text-base md:text-lg text-gray-100 leading-relaxed mb-4 md:mb-6">
              If you're ready to lose weight, build strength, and feel confident again, without sacrificing the things that matter most, you're in the right place.
            </p>
            <div className="relative mt-4">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md" />
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
