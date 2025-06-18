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

const animalOrder: AnimalType[] = ['fox', 'dolphin', 'tortoise', 'tiger', 'owl', 'shark'];

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
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {/* Animal Collage Hero */}
          <div className="relative mb-12">
            {/* Main collage grid */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              {animals.map((animal, index) => {
                const isActive = index === currentAnimalIndex;
                return (
                  <motion.div
                    key={animal.id}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-500 ${
                      isActive 
                        ? 'border-violet-400 shadow-2xl shadow-violet-300/50 scale-105' 
                        : 'border-gray-200 shadow-lg'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isActive ? 1.05 : 1,
                      rotate: isActive ? [0, 2, 0] : 0
                    }}
                    transition={{ 
                      delay: animal.delay,
                      duration: 0.6,
                      rotate: { duration: 2, repeat: isActive ? Infinity : 0 }
                    }}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
                      isActive 
                        ? 'from-violet-400 via-purple-400 to-indigo-400' 
                        : 'from-violet-100 via-purple-100 to-indigo-100'
                    }`} />
                    
                    {/* Animal emoji */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className={`text-6xl transition-all duration-500 ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                        animate={isActive ? { 
                          y: [0, -5, 0],
                          rotateY: [0, 10, 0]
                        } : {}}
                        transition={{ 
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        {animal.emoji}
                      </motion.div>
                    </div>
                    
                    {/* Animal name */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className={`text-center text-xs font-semibold px-2 py-1 rounded-full transition-all duration-500 ${
                        isActive 
                          ? 'bg-white/90 text-violet-700' 
                          : 'bg-white/70 text-gray-600'
                      }`}>
                        {animal.name}
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Sparkles className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-6 left-10 text-2xl opacity-30"
              animate={{ y: [-5, 5, -5], rotate: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-6 right-10 text-2xl opacity-30"
              animate={{ y: [5, -5, 5], rotate: [10, -10, 10] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              🌟
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text mb-4"
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
          </motion.h2>
          <div className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed h-20 flex items-center justify-center">
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
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100"
        >
          <Heart className="h-8 w-8 text-pink-500 mx-auto mb-3" />
          <h3 className="font-semibold text-pink-700 mb-2">Understand Yourself</h3>
          <p className="text-sm text-pink-600">Discover your core traits and natural tendencies</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
        >
          <Brain className="h-8 w-8 text-blue-500 mx-auto mb-3" />
          <h3 className="font-semibold text-blue-700 mb-2">Learn & Grow</h3>
          <p className="text-sm text-blue-600">Gain insights into your decision-making patterns</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100"
        >
          <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-green-700 mb-2">Connect Better</h3>
          <p className="text-sm text-green-600">Improve relationships with compatibility insights</p>
        </motion.div>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-6 border border-violet-100"
        >
          <h3 className="font-semibold text-lg mb-4 text-violet-700">What you&apos;ll discover:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
              <span>Your primary animal archetype</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
              <span>Key personality strengths</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
              <span>Natural communication style</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
              <span>Relationship compatibility</span>
            </div>
          </div>
        </motion.div>

        {/* Cohort Input Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users2 className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-lg text-emerald-700">Group or Training Session?</h3>
          </div>
          <p className="text-sm text-emerald-600 mb-4">
            If you&apos;re taking this quiz as part of a group training or workshop, enter your cohort code below to see group results.
          </p>
          
          {!showCohortInput ? (
            <Button
              variant="outline"
              onClick={() => setShowCohortInput(true)}
              className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              <Users2 className="mr-2 h-4 w-4" />
              Enter Cohort Code
            </Button>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="cohortId" className="text-sm font-medium text-emerald-700">
                  Cohort Code or Group Name
                </Label>
                <Input
                  id="cohortId"
                  type="text"
                  placeholder="e.g., Leadership2025, Team-Alpha, etc."
                  value={cohortId}
                  onChange={(e) => setCohortId(e.target.value)}
                  className="mt-1 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>
              <div className="flex gap-2">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
          className="space-y-4"
        >
          <Button 
            onClick={handleStart} 
            size="lg"
            className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 border-none shadow-lg shadow-violet-200 text-lg py-6"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Begin Your Journey
            {cohortId.trim() && (
              <span className="ml-2 text-sm opacity-80">({cohortId.trim()})</span>
            )}
          </Button>
          
          <div className="flex justify-center">
            <QRCodeDialog />
          </div>
        </motion.div>

        <p className="text-sm text-center text-muted-foreground">
          ⏱️ Takes about 2 minutes • 📧 Results sent to your email • 🔒 Completely private
        </p>
      </div>
    </div>
  );
}