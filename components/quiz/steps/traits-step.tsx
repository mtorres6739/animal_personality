'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { quizTraits } from '@/lib/quiz-data';
import { ArrowRight } from 'lucide-react';
import { TraitCard } from '@/components/ui/trait-card';

interface TraitsStepProps {
  onSubmit: (traits: string[]) => void;
  initialTraits?: string[];
}

export default function TraitsStep({ onSubmit, initialTraits = [] }: TraitsStepProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>(initialTraits);
  const minTraits = 10;
  const maxTraits = 10;

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

  const canProceed = selectedTraits.length === minTraits;
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
            Choose exactly {minTraits} traits that best describe your personality and work style.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTraits.length === minTraits 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {selectedTraits.length} of {minTraits} selected
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
        {quizTraits.map((trait, index) => {
          const isSelected = selectedTraits.includes(trait);
          const isDisabled = !isSelected && isAtMax;
          
          return (
            <TraitCard
              key={trait}
              trait={trait}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onClick={() => toggleTrait(trait)}
              index={index}
            />
          );
        })}
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
          Please select exactly {minTraits} traits to continue
        </motion.p>
      )}
    </div>
  );
}