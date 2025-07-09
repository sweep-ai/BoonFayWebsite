
import { Target, Heart, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative animate-fade-in">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional fitness consultation"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Meet Boon Fay
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                After 15 years of helping men over 40 transform their bodies and lives, I've learned one crucial truth: 
                <strong className="text-blue-600"> sustainable weight loss isn't about perfection—it's about progress that fits your real life.</strong>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I specialize in creating personalized fitness and nutrition strategies that work around your career, 
                family commitments, and social life. No extreme diets, no marathon gym sessions—just proven methods 
                that deliver lasting results.
              </p>
            </div>

            {/* Key Principles */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">My Approach</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Lifestyle-First Strategy</h4>
                    <p className="text-gray-600">Your plan works around your life, not the other way around.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Science-Based Methods</h4>
                    <p className="text-gray-600">Proven techniques backed by research, not trendy gimmicks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sustainable Progress</h4>
                    <p className="text-gray-600">Results that last years, not just weeks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Credentials & Experience</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• NASM Certified Personal Trainer</li>
                <li>• Precision Nutrition Level 1 Coach</li>
                <li>• 15+ years coaching men 40-65</li>
                <li>• 500+ successful transformations</li>
                <li>• Former corporate executive (I understand your lifestyle)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
