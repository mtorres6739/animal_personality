'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { quizTraits } from '@/lib/quiz-data';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface TraitsStepProps {
  onSubmit: (traits: string[]) => void;
  initialTraits?: string[];
}

export default function TraitsStep({ onSubmit, initialTraits = [] }: TraitsStepProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>(initialTraits);
  const minTraits = 8;
  const maxTraits = 12;

  const toggleTrait = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else if (selectedTraits.length < maxTraits) {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const handleSubmit = () => {
    if (selectedTraits.length >= minTraits) {
      onSubmit(selectedTraits);
    }
  };

  const canProceed = selectedTraits.length >= minTraits;
  const isAtMax = selectedTraits.length >= maxTraits;

  return (
    <div className="space-y-8 py-4">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-violet-700 mb-4">
            Select Your Top Traits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose {minTraits}-{maxTraits} traits that best describe your personality and work style.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTraits.length >= minTraits 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {selectedTraits.length} of {minTraits}-{maxTraits} selected
            </div>
            {isAtMax && (
              <div className="text-sm text-amber-600 font-medium">
                Maximum traits selected
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        <AnimatePresence>
          {quizTraits.map((trait, index) => {
            const isSelected = selectedTraits.includes(trait);
            const isDisabled = !isSelected && isAtMax;
            
            return (
              <motion.button
                key={trait}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => !isDisabled && toggleTrait(trait)}
                disabled={isDisabled}
                className={`
                  p-3 rounded-xl text-sm font-medium transition-all duration-200 text-left
                  border-2 relative overflow-hidden
                  ${isSelected
                    ? 'bg-violet-100 border-violet-300 text-violet-800 shadow-md scale-105'
                    : isDisabled
                    ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-violet-200 hover:bg-violet-50 hover:scale-102'
                  }
                `}
                whileHover={!isDisabled ? { y: -2 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{trait}</span>
                  {isSelected ? (
                    <CheckCircle className="h-4 w-4 text-violet-600 ml-2 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                  )}
                </div>
                
                {isSelected && (
                  <motion.div
                    layoutId="selected-bg"
                    className="absolute inset-0 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-8"
      >
        <Button
          onClick={handleSubmit}
          disabled={!canProceed}
          size="lg"
          className={`
            px-8 py-3 text-lg font-medium transition-all duration-200
            ${canProceed
              ? 'bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <span>Continue to Results</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>

      {!canProceed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          Please select at least {minTraits} traits to continue
        </motion.p>
      )}
    </div>
  );
}