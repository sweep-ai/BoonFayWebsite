
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Results = () => {
  const testimonials = [
    {
      name: "John Patterson",
      age: 52,
      result: "Lost 25lbs and still eats out weekly",
      quote: "Boon showed me how to make smart choices without giving up my favorite restaurants. I'm in the best shape of my adult life.",
      beforeAfter: "25lbs lighter, 4 inches off waist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Mike Rodriguez",
      age: 47,
      result: "Built muscle while traveling for work",
      quote: "The hotel gym workouts were a game-changer. I actually got stronger during my busiest quarter.",
      beforeAfter: "15lbs muscle gain, energy through the roof",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David Chen",
      age: 44,
      result: "Down 30lbs without counting calories",
      quote: "I thought I'd have to track every bite forever. Boon taught me habits that work automatically.",
      beforeAfter: "30lbs down, off blood pressure medication",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Results from Real Men
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These aren't 20-year-old fitness models. These are busy professionals, 
            fathers, and real men who transformed their bodies without turning their lives upside down.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name} 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">Age {testimonial.age}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h4 className="font-semibold text-lg text-blue-600 mb-3">
                  {testimonial.result}
                </h4>
              </div>

              <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-700">
                  Results: {testimonial.beforeAfter}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-12 animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Join Them?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Your transformation story could be next. Let's discuss your goals.
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-200"
          >
            Book Your Free Strategy Call
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Results;
