'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Info, X } from 'lucide-react';
import { getTraitDefinition } from '@/lib/trait-definitions';
import { Button } from '@/components/ui/button';

interface TraitCardProps {
  trait: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  index: number;
}

export function TraitCard({ trait, isSelected, isDisabled, onClick, index }: TraitCardProps) {
  const [showDefinition, setShowDefinition] = useState(false);
  const traitDef = getTraitDefinition(trait);

  const handleCardClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDefinition(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.02 }}
        className={`
          p-3 rounded-xl text-sm font-medium transition-all duration-200 text-left
          border-2 relative overflow-hidden group cursor-pointer
          ${isSelected
            ? 'bg-violet-100 border-violet-300 text-violet-800 shadow-md scale-105'
            : isDisabled
            ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-gray-200 text-gray-700'
          }
        `}
        onClick={handleCardClick}
      >
        <div className="flex items-start justify-between">
          <span className="flex-1 pr-2">{trait}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {traitDef && (
              <motion.div
                onClick={handleInfoClick}
                className={`
                  p-1 rounded-full cursor-pointer
                  ${isSelected 
                    ? 'text-violet-600' 
                    : 'text-gray-400'
                  }
                  opacity-100
                `}
              >
                <Info className="h-3 w-3" />
              </motion.div>
            )}
            {isSelected ? (
              <CheckCircle className="h-4 w-4 text-violet-600" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
        
        {isSelected && (
          <motion.div
            layoutId="selected-bg"
            className="absolute inset-0 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-xl -z-10"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.div>

      {/* Trait Definition Modal */}
      <AnimatePresence>
        {showDefinition && traitDef && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDefinition(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-violet-700">{traitDef.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDefinition(false)}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Definition</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{traitDef.definition}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Examples</h4>
                  <ul className="space-y-1">
                    {traitDef.examples.map((example, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {traitDef.relatedTo.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Related Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      {traitDef.relatedTo.map((related, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-violet-100 text-violet-700 rounded-md text-xs font-medium"
                        >
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}