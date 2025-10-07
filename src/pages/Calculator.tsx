import { useState } from 'react';
import { Calculator as CalculatorIcon, Target, Zap, ArrowLeft, TrendingDown, Minus, TrendingUp, Home, User, Dumbbell, Activity, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface MacroResults {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  fat: number;
  carbs: number;
  proteinCalories: number;
  fatCalories: number;
  carbCalories: number;
  proteinPercent: number;
  fatPercent: number;
  carbPercent: number;
  explanation: string;
}

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: 'male' as 'male' | 'female',
    age: 30,
    height: 70, // inches
    weight: 150, // pounds
    fitnessGoal: 'maintain' as 'cut' | 'maintain' | 'gain',
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active'
  });
  const [results, setResults] = useState<MacroResults | null>(null);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  };

  const calculateMacros = () => {
    const { gender, age, height, weight, fitnessGoal, activityLevel } = formData;
    
    // Harris-Benedict Equation (using pounds and inches)
    let bmr;
    if (gender === 'male') {
      bmr = 66.5 + (6.23 * weight) + (12.7 * height) - (6.76 * age);
    } else {
      bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
    }

    // Total Daily Energy Expenditure
    const tdee = bmr * activityMultipliers[activityLevel];

    // Adjust calories based on fitness goal
    let baseAdjustment = 0;
    switch (fitnessGoal) {
      case 'cut':
        baseAdjustment = -400; // Default -400, user can adjust
        break;
      case 'gain':
        baseAdjustment = 250; // Default +250, user can adjust
        break;
      default:
        baseAdjustment = 0; // Maintain
    }

    const targetCalories = Math.round(tdee + baseAdjustment);

    // Macro calculations - using standard recommendations
    const protein = Math.round(weight * 1.0); // 1g per lb
    const fat = Math.round(weight * 0.35); // 0.35g per lb
    
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbs = Math.round(carbCalories / 4);

    // Calculate percentages
    const proteinPercent = Math.round((proteinCalories / targetCalories) * 100);
    const fatPercent = Math.round((fatCalories / targetCalories) * 100);
    const carbPercent = Math.round((carbCalories / targetCalories) * 100);

    // Generate explanation
    const activityText = activityLevel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const goalText = fitnessGoal === 'cut' ? 'lose weight' : fitnessGoal === 'gain' ? 'gain muscle' : 'maintain your current weight';
    
    const explanation = `Your BMR is ${Math.round(bmr)} calories/day (at rest). With ${activityText} activity, your TDEE is ${Math.round(tdee)} calories/day. Your target of ${targetCalories} calories will help you ${goalText}.`;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      protein,
      fat,
      carbs,
      proteinCalories,
      fatCalories,
      carbCalories,
      proteinPercent,
      fatPercent,
      carbPercent,
      explanation
    });
    setStep(4);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      calculateMacros();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setResults(null);
    setFormData({
      gender: 'male',
      age: 30,
      height: 70,
      weight: 150,
      fitnessGoal: 'maintain',
      activityLevel: 'moderate'
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
          <CalculatorIcon className="w-10 h-10" />
          Macro Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Based on the revised Harris Benedict formula
        </p>
      </div>

      {/* Main Calculator Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md pointer-events-none glow-white" />
        <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-8">
              {/* Gender Selection */}
              <div>
                <label className="text-lg font-semibold text-foreground mb-4 block">Gender</label>
                <div className="flex gap-4">
                  <Button
                    variant={formData.gender === 'male' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, gender: 'male'})}
                    className={`flex-1 py-6 text-lg font-semibold ${
                      formData.gender === 'male' 
                        ? 'bg-white text-gray-900 border-white hover:bg-gray-100 hover:text-gray-900' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    ♂ Male
                  </Button>
                  <Button
                    variant={formData.gender === 'female' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, gender: 'female'})}
                    className={`flex-1 py-6 text-lg font-semibold ${
                      formData.gender === 'female' 
                        ? 'bg-white text-gray-900 border-white hover:bg-gray-100 hover:text-gray-900' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    ♀ Female
                  </Button>
                </div>
              </div>


              {/* Age Slider */}
              <div>
                <label className="text-lg font-semibold text-foreground mb-4 block">My age</label>
                <div className="space-y-4">
                  <Slider
                    value={[formData.age]}
                    onValueChange={(value) => setFormData({...formData, age: value[0]})}
                    min={16}
                    max={80}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg">
                      {formData.age}
                    </span>
                  </div>
                </div>
              </div>

              {/* Height Slider */}
              <div>
                <label className="text-lg font-semibold text-foreground mb-4 block">Height (inches)</label>
                <div className="space-y-4">
                  <Slider
                    value={[formData.height]}
                    onValueChange={(value) => setFormData({...formData, height: value[0]})}
                    min={48}
                    max={88}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg">
                      {formData.height} in
                    </span>
                  </div>
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <label className="text-lg font-semibold text-foreground mb-4 block">Weight (pounds)</label>
                <div className="space-y-4">
                  <Slider
                    value={[formData.weight]}
                    onValueChange={(value) => setFormData({...formData, weight: value[0]})}
                    min={80}
                    max={350}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg">
                      {formData.weight} lbs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Fitness Goal */}
          {step === 2 && (
            <div className="space-y-8">
              {/* Fitness Goal */}
              <div>
                <label className="text-lg font-semibold text-foreground mb-4 block">Fitness Goal</label>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { value: 'cut', label: 'Cut', desc: 'Lose weight (TDEE - 300 to 500 cal)', icon: TrendingDown },
                    { value: 'maintain', label: 'Maintain', desc: 'Keep current body composition', icon: Minus },
                    { value: 'gain', label: 'Gain', desc: 'Gain muscle (TDEE + 200 to 300 cal)', icon: TrendingUp }
                  ].map((goal) => {
                    const IconComponent = goal.icon;
                    return (
                      <Button
                        key={goal.value}
                        variant={formData.fitnessGoal === goal.value ? 'default' : 'outline'}
                        onClick={() => setFormData({...formData, fitnessGoal: goal.value as any})}
                        className={`w-full py-6 text-left justify-start ${
                          formData.fitnessGoal === goal.value 
                            ? 'bg-white text-gray-900 border-white hover:bg-gray-100 hover:text-gray-900' 
                            : 'border-gray-300 text-white hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <IconComponent className="w-6 h-6 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-lg">{goal.label}</div>
                            <div className="text-sm opacity-75">{goal.desc}</div>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Step 3: Activity Level */}
          {step === 3 && (
            <div className="space-y-8">
              {/* Activity Level */}
              <div>
                <label className="text-lg font-semibold text-foreground mb-4 block">Activity Level</label>
                <div className="space-y-3">
                  {[
                    { value: 'sedentary', label: 'Sedentary (1.2)', desc: 'Little to no exercise', icon: Home },
                    { value: 'light', label: 'Light (1.375)', desc: 'Light exercise 1-3 days/week', icon: User },
                    { value: 'moderate', label: 'Moderate (1.55)', desc: 'Moderate exercise 3-5 days/week', icon: Activity },
                    { value: 'very_active', label: 'Very Active (1.725)', desc: 'Heavy exercise 6-7 days/week', icon: Dumbbell },
                    { value: 'extra_active', label: 'Extra Active (1.9)', desc: 'Very heavy exercise, physical job', icon: Flame }
                  ].map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <Button
                        key={activity.value}
                        variant={formData.activityLevel === activity.value ? 'default' : 'outline'}
                        onClick={() => setFormData({...formData, activityLevel: activity.value as any})}
                        className={`w-full py-8 text-left justify-start ${
                          formData.activityLevel === activity.value 
                            ? 'bg-white text-gray-900 border-white hover:bg-gray-100 hover:text-gray-900' 
                            : 'border-gray-300 text-white hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-4 w-full">
                          <IconComponent className="w-8 h-8 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{activity.label}</div>
                            <div className="text-sm opacity-75">{activity.desc}</div>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && results && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">Your Macro Calculation Results</h2>
                <p className="text-muted-foreground">{results.explanation}</p>
              </div>

              {/* Target Calories - First Priority */}
              <Card className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Target Calories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{results.targetCalories}</div>
                  <div className="text-xs text-muted-foreground">calories/day</div>
                </CardContent>
              </Card>

              {/* Macro Breakdown - Second Priority */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Protein</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{results.protein}g</div>
                    <div className="text-xs text-muted-foreground">{results.proteinCalories} cal ({results.proteinPercent}%)</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Carbs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{results.carbs}g</div>
                    <div className="text-xs text-muted-foreground">{results.carbCalories} cal ({results.carbPercent}%)</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Fat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{results.fat}g</div>
                    <div className="text-xs text-muted-foreground">{results.fatCalories} cal ({results.fatPercent}%)</div>
                  </CardContent>
                </Card>
              </div>

              {/* BMR and TDEE - Bottom Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">BMR (Basal Metabolic Rate)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{results.bmr}</div>
                    <div className="text-xs text-muted-foreground">calories/day at rest</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">TDEE (Total Daily Energy Expenditure)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{results.tdee}</div>
                    <div className="text-xs text-muted-foreground">calories/day with activity</div>
                  </CardContent>
                </Card>
              </div>

              {/* Macro Percentages Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-gray-900" />
                  Macro Split Summary
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{results.proteinPercent}%</div>
                    <div className="text-sm text-gray-700">Protein</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{results.carbPercent}%</div>
                    <div className="text-sm text-gray-700">Carbs</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{results.fatPercent}%</div>
                    <div className="text-sm text-gray-700">Fat</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-gray-900" />
                  How to Use These Numbers
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Track your food intake using apps like MyFitnessPal or Cronometer</li>
                  <li>• Aim to hit your protein target first, then fill remaining calories with carbs and fat</li>
                  <li>• Weigh yourself weekly and adjust calories by 100-200 if needed</li>
                  <li>• These are starting points - listen to your body and adjust as needed</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            {step < 4 && (
              <Button
                onClick={handleNext}
                className="w-full sm:w-auto bg-gradient-to-r from-white to-white/90 hover:from-white/95 hover:to-white/85 text-gray-900 hover:text-gray-900 font-bold text-lg py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 glow-white"
              >
                {step === 3 ? 'Calculate Macros' : 'Next'}
              </Button>
            )}

            {step === 4 && (
              <Button
                onClick={resetCalculator}
                className="w-full sm:w-auto bg-gradient-to-r from-white to-white/90 hover:from-white/95 hover:to-white/85 text-gray-900 hover:text-gray-900 font-bold text-lg py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 glow-white"
              >
                <Zap className="w-5 h-5 mr-2" />
                Calculate Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
