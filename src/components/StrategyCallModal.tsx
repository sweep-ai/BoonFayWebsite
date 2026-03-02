import { X } from 'lucide-react';

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StrategyCallModal = ({ isOpen, onClose }: StrategyCallModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col animate-scale-in">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white to-gray-400 opacity-70 blur-md glow-white" />
        <div className="relative bg-card/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Book Your Free Strategy Call
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="overflow-auto">
            <iframe
              src="https://calendly.com/fayboon3/30min"
              width="100%"
              height="630"
              className="w-full border-0"
              title="Schedule a call with Boon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyCallModal;
