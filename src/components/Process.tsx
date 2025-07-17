
import { Dumbbell, Utensils, Users } from 'lucide-react';

const pillars = [
  {
    icon: Dumbbell,
    title: 'Workout Programming',
    description: '16 weeks of fully customized workouts structured around instructional videos so you’re never left with any guesswork.'
  },
  {
    icon: Utensils,
    title: 'Macro-Based Meal Planning',
    description: 'Macro-based meal planning based off your existing diet and preferences. Macronutrients broken down within each meal.'
  },
  {
    icon: Users,
    title: '24/7 Accountability Coaching',
    description: 'Around the clock accountability coaching with weekly check-ins to ensure progress.'
  }
];

const Process = () => {
  return (
    <section id="process" className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            The Three Pillars of My 16-Week Transformation Program
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, idx) => (
            <div key={pillar.title} className="relative mt-4">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md" />
              <div className="relative bg-card/80 backdrop-blur-md p-6 flex flex-col items-center text-center rounded-xl shadow-xl z-10">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 shadow-lg shadow-blue-600/30">
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-base">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
