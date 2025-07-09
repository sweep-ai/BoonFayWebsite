
import { useState } from 'react';
import { Calendar, Mail, Star, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StrategyCallModal from './StrategyCallModal';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailSignup, setEmailSignup] = useState(false);

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmailSignup(true);
    setTimeout(() => setEmailSignup(false), 3000);
    setEmail('');
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Social Proof Badges */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Certified Personal Trainer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>500+ Men Transformed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 Client Rating</span>
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Lose Weight Without 
                  <span className="text-blue-600 block">Giving Up the Foods</span>
                  <span className="text-green-600">You Love</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 font-medium">
                  For Men 40+
                </p>

                <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                  No restrictive diets. No 2-hour workouts. Just a personalized, science-based approach that fits your real life and delivers lasting results.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="space-y-4">
                <Button 
                  onClick={() => setShowModal(true)}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Free 1-on-1 Strategy Call
                </Button>
                
                <p className="text-sm text-gray-500">
                  30-minute call • No sales pitch • Completely free
                </p>
              </div>

              {/* Secondary CTA - Newsletter */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4 font-medium">
                  Not ready to book? Get daily fitness tips that work for real men 40+
                </p>
                
                {emailSignup ? (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <Mail className="w-5 h-5" />
                    <span>Thanks! Check your email for your first tip.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSignup} className="flex gap-3 max-w-md">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Get Daily Tips
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Boon Fay - Fitness coach helping men over 40 achieve sustainable weight loss"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">90%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StrategyCallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Hero;
