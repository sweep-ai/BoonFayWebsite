
import { useState } from 'react';
import { X, Calendar, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StrategyCallModal = ({ isOpen, onClose }: StrategyCallModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    struggle: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const struggles = [
    "I can't find time to exercise consistently",
    "I lose weight then gain it all back",
    "I don't know what to eat",
    "I'm too tired after work",
    "I travel too much for work",
    "I've tried everything and nothing works"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Strategy call form submitted:', formData);
    setSubmitted(true);
    // Here you would integrate with your calendar booking system
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {submitted ? (
          // Thank You State
          <div className="p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thanks for Booking!
            </h2>
            <p className="text-gray-600 mb-6">
              I'll contact you within 24 hours to schedule your free strategy call. 
              In the meantime, check your email for some preparation tips.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-700">
                <strong>Next Steps:</strong><br />
                1. Check your email for confirmation<br />
                2. I'll call you to schedule<br />
                3. Prepare to discuss your goals
              </p>
            </div>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          // Form State
          <>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                Book Your Free Strategy Call
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-blue-900 mb-2">What to Expect:</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 30-minute conversation about your goals</li>
                    <li>• Assessment of your current situation</li>
                    <li>• Personalized recommendations</li>
                    <li>• No sales pitch or pressure</li>
                  </ul>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number <span className="text-gray-500">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="struggle" className="mb-2 block">
                    What's your biggest fitness struggle?
                  </Label>
                  <select
                    id="struggle"
                    value={formData.struggle}
                    onChange={(e) => handleChange('struggle', e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your biggest challenge</option>
                    {struggles.map((struggle) => (
                      <option key={struggle} value={struggle}>
                        {struggle}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book My Free Call
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to receive communication from Boon Fay Fitness. 
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StrategyCallModal;
