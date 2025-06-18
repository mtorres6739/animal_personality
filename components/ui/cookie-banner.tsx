'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Cookie Notice:</strong> We use cookies and similar technologies to improve your experience on our website. 
              By using our services, you consent to our use of cookies in accordance with our privacy policy.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Decline
              </button>
              <a
                href="https://www.ethosaz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 hover:text-violet-700 text-sm underline self-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}