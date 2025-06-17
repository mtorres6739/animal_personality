'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WelcomeStep from './steps/welcome-step';
import TraitsStep from './steps/traits-step';
import ResultsStep from './steps/results-step';
import ThankYouStep from './steps/thank-you-step';
import { Progress } from '@/components/ui/progress';
import { AnimalType, determineAnimalType } from '@/lib/quiz-data';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type QuizStep = 'welcome' | 'traits' | 'results' | 'thank-you';

export default function QuizContainer() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('welcome');
  const [email, setEmail] = useState('');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [animalResult, setAnimalResult] = useState<AnimalType | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [cohortId, setCohortId] = useState<string>('');
  const { toast } = useToast();

  // Generate session ID on component mount
  useEffect(() => {
    const generateSessionId = () => {
      return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    };
    
    setSessionId(generateSessionId());
  }, []);

  const progressPercentage = 
    currentStep === 'welcome' ? 0 :
    currentStep === 'traits' ? 33 :
    currentStep === 'results' ? 66 : 100;

  const handleWelcomeStart = (groupCohortId?: string) => {
    if (groupCohortId) {
      setCohortId(groupCohortId);
    }
    setCurrentStep('traits');
  };

  const handleTraitsSubmit = async (traits: string[]) => {
    setSelectedTraits(traits);
    const result = determineAnimalType(traits);
    setAnimalResult(result);
    setCurrentStep('results');
  };

  const handleResultsSubmit = async (email: string): Promise<void> => {
    setEmail(email);
    
    // Simulate email sending (since we don't have real API routes yet)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Success!',
      description: 'Your results have been sent to your email.',
      variant: 'default',
    });
    
    setCurrentStep('thank-you');
  };

  const handleRestart = () => {
    setEmail('');
    setSelectedTraits([]);
    setAnimalResult(null);
    setCohortId('');
    setCurrentStep('welcome');
  };

  const handleRestartConfirm = () => {
    if (currentStep !== 'welcome' && currentStep !== 'thank-you') {
      const confirmed = window.confirm('Are you sure you want to start over? Your progress will be lost.');
      if (confirmed) {
        handleRestart();
      }
    } else {
      handleRestart();
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        className="mb-12 text-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-6 w-6 text-violet-500" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            Animal Personality Quiz
          </h1>
          <Sparkles className="h-6 w-6 text-violet-500" />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover which animal archetype matches your personality traits and learn what it reveals about you.
        </p>
        
        {currentStep !== 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestartConfirm}
              className="gap-2 text-violet-600 border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Start Over
            </Button>
          </motion.div>
        )}
      </motion.div>

      {currentStep !== 'welcome' && (
        <div className="mb-10">
          <div className="flex justify-between mb-2 relative">
            {['traits', 'results', 'thank-you'].map((step, index) => {
              const isActive = currentStep === step;
              const isPast = 
                (step === 'traits' && ['results', 'thank-you'].includes(currentStep)) ||
                (step === 'results' && currentStep === 'thank-you');
                
              return (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                      ${isActive ? 'bg-violet-600 text-white' : 
                        isPast ? 'bg-violet-200 text-violet-700' : 'bg-gray-200 text-gray-500'}`}
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                      backgroundColor: isActive ? '#7c3aed' : isPast ? '#ddd6fe' : '#e5e7eb'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {isPast ? '✓' : index + 1}
                  </motion.div>
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'text-violet-600' : isPast ? 'text-violet-500' : 'text-gray-500'}`}>
                    {step.charAt(0).toUpperCase() + step.slice(1).replace('-', ' ')}
                  </span>
                  {index < 2 && (
                    <div className="absolute top-4 left-8 w-[calc(100%-2rem)] h-[2px] -z-10 bg-gray-200">
                      {isPast && (
                        <motion.div 
                          className="h-full bg-violet-500" 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-lg border-t-4 border-t-violet-500 overflow-hidden backdrop-blur-sm bg-white/90">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-violet-100 to-transparent rounded-bl-full opacity-50"></div>
          <CardContent className="pt-6 relative z-10">
            {currentStep === 'welcome' && (
              <WelcomeStep onStart={handleWelcomeStart} />
            )}
            {currentStep === 'traits' && (
              <TraitsStep onSubmit={handleTraitsSubmit} initialTraits={selectedTraits} />
            )}
            {currentStep === 'results' && animalResult && (
              <ResultsStep 
                animalType={animalResult} 
                selectedTraits={selectedTraits} 
                onSubmit={handleResultsSubmit}
                cohortId={cohortId}
                sessionId={sessionId}
              />
            )}
            {currentStep === 'thank-you' && (
              <ThankYouStep onRestart={handleRestart} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}