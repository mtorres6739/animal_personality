'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QRCodeDialog } from '@/components/ui/qr-code-dialog';
import { Typewriter } from '@/components/ui/typewriter';
import { Sparkles, Heart, Brain, Users, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { animalArchetypes, AnimalType } from '@/lib/quiz-data';

interface WelcomeStepProps {
  onStart: (cohortId?: string) => void;
}

const animalOrder: AnimalType[] = ['dove', 'owl', 'peacock', 'shark'];

const animals = animalOrder.map((type, index) => ({
  ...animalArchetypes[type],
  delay: 0.1 + index * 0.1
}));

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  const [cohortId, setCohortId] = useState('');
  const [showCohortInput, setShowCohortInput] = useState(false);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);

  // Sync with typewriter cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
    }, 4000); // Match typewriter timing (3000ms wait + 1000ms for typing)
    
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    onStart(cohortId.trim() || undefined);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Hero Section with Prominent CTA */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Discover Your Animal Personality
          </motion.h1>

          <div className="text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            <div className="text-center">
              <span className="text-gray-600">Are you </span>
              <Typewriter
                text={animals.map(animal => `${animal.emoji} ${animal.title}`)}
                speed={60}
                deleteSpeed={30}
                waitTime={3000}
                className="text-violet-600 font-semibold"
                cursorChar="|"
                cursorClassName="text-violet-400 ml-1"
              />
              <span className="text-gray-600">?</span>
            </div>
          </div>

          {/* Primary CTA Button - Most Prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <Button
              onClick={handleStart}
              size="lg"
              className="w-full max-w-md mx-auto bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 border-none shadow-2xl shadow-violet-300/50 text-xl py-8 px-12 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Start Your Personality Quiz
              {cohortId.trim() && (
                <span className="ml-2 text-sm opacity-80">({cohortId.trim()})</span>
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-4">
              ⏱️ Takes 2 minutes • 📧 Results sent to email • 🔒 Completely private
            </p>
          </motion.div>
        </motion.div>

        {/* Compact Animal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mb-6">
            {animals.map((animal, index) => {
              const isActive = index === currentAnimalIndex;
              return (
                <motion.div
                  key={animal.id}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-500 ${
                    isActive
                      ? 'border-violet-400 shadow-lg shadow-violet-300/30 scale-105'
                      : 'border-gray-200 shadow-sm'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.05 : 1
                  }}
                  transition={{
                    delay: animal.delay,
                    duration: 0.4
                  }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
                    isActive
                      ? 'from-violet-200 via-purple-200 to-indigo-200'
                      : 'from-violet-50 via-purple-50 to-indigo-50'
                  }`} />

                  {/* Animal emoji */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl">
                      {animal.emoji}
                    </div>
                  </div>

                  {/* Animal name */}
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className={`text-center text-xs font-medium px-1 py-0.5 rounded transition-all duration-500 ${
                      isActive
                        ? 'bg-white/90 text-violet-700'
                        : 'bg-white/70 text-gray-600'
                    }`}>
                      {animal.name}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-gray-600 text-sm mt-4">
            Meet the four personality types you could be
          </p>
        </motion.div>
      </div>

      {/* Simplified Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-6 border border-violet-100 max-w-2xl mx-auto"
      >
        <h3 className="font-semibold text-lg mb-4 text-violet-700 text-center">What you'll discover:</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Your animal archetype</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Personality strengths</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Communication style</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Compatibility insights</span>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">

        {/* Compact Cohort Input Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="max-w-md mx-auto"
        >
          {!showCohortInput ? (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCohortInput(true)}
                className="text-gray-500 hover:text-emerald-600 text-sm"
              >
                <Users2 className="mr-2 h-4 w-4" />
                Taking this for a group? Enter cohort code
              </Button>
            </div>
          ) : (
            <div className="space-y-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div>
                <Label htmlFor="cohortId" className="text-sm font-medium text-emerald-700">
                  Cohort Code
                </Label>
                <Input
                  id="cohortId"
                  type="text"
                  placeholder="e.g., Leadership2025"
                  value={cohortId}
                  onChange={(e) => setCohortId(e.target.value)}
                  className="mt-1 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCohortInput(false);
                    setCohortId('');
                  }}
                  className="text-gray-600 border-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCohortInput(false)}
                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Secondary Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex justify-center"
        >
          <QRCodeDialog />
        </motion.div>
      </div>
    </div>
  );
}