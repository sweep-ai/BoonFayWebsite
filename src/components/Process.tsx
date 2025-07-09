
import { Calendar, FileText, Target } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Schedule Your Strategy Call",
      description: "We'll discuss your current situation, goals, and biggest challenges in a pressure-free 30-minute conversation.",
      details: [
        "Analyze your lifestyle and constraints",
        "Identify your biggest obstacles",
        "Set realistic, achievable goals"
      ]
    },
    {
      number: "02",
      icon: FileText,
      title: "Get Your Custom Lifestyle Plan",
      description: "Receive a personalized roadmap that fits your schedule, preferences, and real-world commitments.",
      details: [
        "Tailored nutrition guidelines (not restrictions)",
        "Efficient workout plans for your schedule",
        "Habit-building strategies that stick"
      ]
    },
    {
      number: "03",
      icon: Target,
      title: "Hit Your Goals Without Starting Over",
      description: "Follow your plan with ongoing support and adjustments as your life changes and you progress.",
      details: [
        "Weekly check-ins and plan adjustments",
        "24/7 support via messaging",
        "Long-term success strategies"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple 3-Step Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No complicated systems or overwhelming changes. Just a clear path to the results you want.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <step.icon className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                    <div className="text-6xl font-bold text-blue-600 opacity-20">
                      {step.number}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
          <div className="w-px h-32 bg-gradient-to-b from-blue-200 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Process;
