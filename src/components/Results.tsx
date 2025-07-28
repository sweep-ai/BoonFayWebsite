
import { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StrategyCallModal from './StrategyCallModal';
import Process from './Process';

const Results = () => {
  const [showModal, setShowModal] = useState(false);

  const testimonials = [
    {
      name: "John Patterson",
      age: 52,
      result: "Lost 25lbs and still eats out weekly",
      quote: "Boon showed me how to make smart choices without giving up my favorite restaurants. I'm in the best shape of my adult life.",
      beforeAfter: "25lbs lighter, 4 inches off waist",
      image: "/Testimonial1.jpeg"
    },
    {
      name: "Mike Rodriguez",
      age: 47,
      result: "Built muscle while traveling for work",
      quote: "The hotel gym workouts were a game-changer. I actually got stronger during my busiest quarter.",
      beforeAfter: "15lbs muscle gain, energy through the roof",
        image: "/Testimonial2.jpeg"
      },
    {
      name: "David Chen",
      age: 44,
      result: "Down 30lbs without counting calories",
      quote: "I thought I'd have to track every bite forever. Boon taught me habits that work automatically.",
      beforeAfter: "30lbs down, off blood pressure medication",
      image: "/Testimonial3.jpeg"
    }
  ];

  return (
    <>
      <section id="results" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Real Results from Real Men
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              These aren't 20-year-old fitness models. These are busy professionals, 
              fathers, and real men who transformed their bodies without turning their lives upside down.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name} 
                className="relative mt-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md" />
                <div className="relative bg-card/80 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl z-10">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary shadow-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</h3>
                      <p className="text-muted-foreground text-xs md:text-sm">Age {testimonial.age}</p>
                    </div>
                  </div>

                  <div className="mb-3 md:mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold text-base md:text-lg text-primary mb-2 md:mb-3">
                      {testimonial.result}
                    </h4>
                  </div>

                  <blockquote className="text-muted-foreground italic mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="bg-green-900/30 p-3 md:p-4 rounded-lg">
                    <p className="text-xs md:text-sm font-medium text-green-300">
                      Results: {testimonial.beforeAfter}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*Three Pillars Section*/}
          <Process />

          {/* CTA Section */}
          <div className="relative text-center bg-primary text-primary-foreground rounded-xl md:rounded-2xl p-8 md:p-12 animate-fade-in mt-12 overflow-hidden shadow-2xl">
            <div className="absolute -inset-1 rounded-2xl z-0 bg-gradient-to-r from-blue-600 to-green-500 opacity-60 blur-md" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                Ready to Join Them?
              </h3>
              <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
                Your transformation story could be next. Let's discuss your goals.
              </p>
              <Button 
                onClick={() => setShowModal(true)}
                size="lg"
                className="w-full sm:w-auto bg-card text-primary hover:bg-muted px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:scale-105 transition-all duration-200"
              >
                Book Your Free Strategy Call
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <StrategyCallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Results;
