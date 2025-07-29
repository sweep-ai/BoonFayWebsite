
import { useState } from 'react';
import { Heart, Mail, Phone } from 'lucide-react';
import StrategyCallModal from './StrategyCallModal';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <footer className="bg-background text-foreground py-12 md:py-16 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Boon Fay Fitness
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Helping men and women achieve sustainable weight loss without giving up their lifestyle. 
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                <span className="text-xs md:text-sm">Transforming lives</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-base md:text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="hover:text-white transition-colors text-left text-sm md:text-base"
                  >
                    About Boon
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('results')}
                    className="hover:text-white transition-colors text-left text-sm md:text-base"
                  >
                    Success Stories
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('process')}
                    className="hover:text-white transition-colors text-left text-sm md:text-base"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="hover:text-white transition-colors text-left text-sm md:text-base"
                  >
                    Book a Call
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-base md:text-lg font-semibold">Get In Touch</h4>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">bfay@boonfay-pt.com</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Schedule a free call</span>
                </div>
              </div>
              
              <div className="pt-3 md:pt-4">
                <p className="text-xs md:text-sm text-gray-500">
                  Available Monday - Friday<br />
                  9 AM - 6 PM PST
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
              <p className="text-gray-500 text-xs md:text-sm">
                © 2024 Boon Fay Fitness. All rights reserved.
              </p>
              <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <StrategyCallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Footer;
