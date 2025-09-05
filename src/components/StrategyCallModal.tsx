
import { X, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Analytics } from "@vercel/analytics/next"

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StrategyCallModal = ({ isOpen, onClose }: StrategyCallModalProps) => {
  const handleCalendlyClick = () => {
    window.open('https://calendly.com/fayboon3/30min', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Gradient border glow */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-green-500 opacity-70 blur-md" />
        <div className="relative bg-card/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl z-10">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Book Your Free Strategy Call
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                <h3 className="font-semibold text-primary mb-2 text-sm sm:text-base">What to Expect:</h3>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                  <li>• 30-minute conversation about your goals</li>
                  <li>• Assessment of your current situation</li>
                  <li>• Personalized recommendations</li>
                  <li>• No sales pitch or pressure</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                Ready to take the first step? Click below to schedule your free 30-minute strategy call.
              </p>
              
              <Button 
                onClick={handleCalendlyClick}
                className="w-full bg-primary hover:bg-primary/90 text-base sm:text-lg py-3 sm:py-3"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Schedule My Free Call
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4">
                You'll be redirected to our secure booking system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyCallModal;
