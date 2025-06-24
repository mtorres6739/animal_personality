'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { getTraitDefinition } from '@/lib/trait-definitions';

interface TraitTooltipProps {
  trait: string;
  className?: string;
}

export default function TraitTooltip({ trait, className = '' }: TraitTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [horizontalPosition, setHorizontalPosition] = useState<'left' | 'center' | 'right'>('center');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const traitDef = getTraitDefinition(trait);

  if (!traitDef) {
    return null; // Don't render if no definition found
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events

    // Calculate optimal position based on available space
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const spaceAbove = rect.top;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = viewportWidth - rect.right;

      // Tooltip dimensions: width ~320px (w-80), height ~200px
      const tooltipWidth = 320;
      const tooltipHeight = 220;

      // Vertical positioning
      setPosition(spaceBelow > spaceAbove && spaceBelow > tooltipHeight ? 'bottom' : 'top');

      // Horizontal positioning - check if centered tooltip would overflow
      const centerOffset = tooltipWidth / 2;
      if (rect.left + rect.width / 2 - centerOffset < 16) {
        // Too close to left edge, align to left
        setHorizontalPosition('left');
      } else if (rect.left + rect.width / 2 + centerOffset > viewportWidth - 16) {
        // Too close to right edge, align to right
        setHorizontalPosition('right');
      } else {
        // Enough space to center
        setHorizontalPosition('center');
      }
    }

    setIsOpen(!isOpen);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 rounded-full text-violet-500 hover:text-violet-700 hover:bg-violet-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300 border border-violet-200 bg-white shadow-sm hover:shadow-md"
        aria-label={`Learn more about ${trait}`}
        title={`Learn more about "${trait}"`}
      >
        <Info className="h-4 w-4" />
      </button>

      {/* Tooltip/Popover */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
              onClick={handleClose}
            />
            
            {/* Tooltip Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? -10 : 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? -10 : 10 }}
              transition={{ duration: 0.2 }}
              className={`absolute z-50 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl border border-violet-200 p-4
                         ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
                         ${horizontalPosition === 'left'
                           ? 'left-0'
                           : horizontalPosition === 'right'
                           ? 'right-0'
                           : 'left-1/2 transform -translate-x-1/2'
                         }`}
            >
              {/* Arrow */}
              <div className={`absolute ${
                horizontalPosition === 'left'
                  ? 'left-6'
                  : horizontalPosition === 'right'
                  ? 'right-6'
                  : 'left-1/2 transform -translate-x-1/2'
              } ${position === 'top' ? 'top-full' : 'bottom-full'}`}>
                {position === 'top' ? (
                  // Arrow pointing down (tooltip above)
                  <>
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-violet-200"></div>
                    <div className="absolute top-[-7px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-t-7 border-l-transparent border-r-transparent border-t-white"></div>
                  </>
                ) : (
                  // Arrow pointing up (tooltip below)
                  <>
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-violet-200"></div>
                    <div className="absolute bottom-[-7px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-b-7 border-l-transparent border-r-transparent border-b-white"></div>
                  </>
                )}
              </div>

              {/* Close Button (Mobile) */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 md:hidden"
                aria-label="Close tooltip"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="pr-8 md:pr-0">
                <h4 className="font-semibold text-violet-700 mb-2 capitalize">
                  {traitDef.name}
                </h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {traitDef.definition}
                </p>
                
                {/* Examples */}
                {traitDef.examples && traitDef.examples.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-violet-600 mb-1 uppercase tracking-wide">
                      Examples:
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {traitDef.examples.slice(0, 2).map((example, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-violet-400 mr-1 mt-0.5">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Traits */}
                {traitDef.relatedTo && traitDef.relatedTo.length > 0 && (
                  <div>
                    <h5 className="text-xs font-medium text-violet-600 mb-1 uppercase tracking-wide">
                      Related to:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {traitDef.relatedTo.slice(0, 3).map((related, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-0.5 bg-violet-50 text-violet-600 text-xs rounded-full"
                        >
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simplified version for mobile-first design
export function TraitTooltipSimple({ trait, className = '' }: TraitTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const traitDef = getTraitDefinition(trait);

  if (!traitDef) {
    return null;
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleToggle}
        className="p-1.5 rounded-full text-violet-500 hover:text-violet-700 hover:bg-violet-100 transition-colors duration-200 border border-violet-200 bg-white shadow-sm"
        aria-label={`Learn more about ${trait}`}
        title={`Learn more about "${trait}"`}
      >
        <Info className="h-3 w-3" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-64 bg-white rounded-lg shadow-lg border border-violet-200 p-3 
                       bottom-full left-1/2 transform -translate-x-1/2 mb-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
            
            <h4 className="font-medium text-violet-700 mb-1 text-sm capitalize">
              {traitDef.name}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {traitDef.definition}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
