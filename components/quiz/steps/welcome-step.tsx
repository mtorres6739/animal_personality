'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QRCodeDialog } from '@/components/ui/qr-code-dialog';
import { Sparkles, Heart, Brain, Users, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onStart: (cohortId?: string) => void;
}

const animals = [
  { emoji: '🦊', name: 'Fox', delay: 0.1 },
  { emoji: '🐬', name: 'Dolphin', delay: 0.2 },
  { emoji: '🐢', name: 'Tortoise', delay: 0.3 },
  { emoji: '🐅', name: 'Tiger', delay: 0.4 },
  { emoji: '🦉', name: 'Owl', delay: 0.5 },
  { emoji: '🦈', name: 'Shark', delay: 0.6 },
];

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  const [cohortId, setCohortId] = useState('');
  const [showCohortInput, setShowCohortInput] = useState(false);

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
          <div className="relative mb-8">
            <div className="bg-gradient-to-br from-violet-100 to-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="h-12 w-12 text-violet-600" />
            </div>
            
            {/* Floating animal emojis */}
            <div className="absolute inset-0 flex items-center justify-center">
              {animals.map((animal, index) => (
                <motion.div
                  key={animal.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: animal.delay, duration: 0.3 }}
                  className={`absolute text-2xl`}
                  style={{
                    transform: `rotate(${index * 60}deg) translateY(-80px) rotate(-${index * 60}deg)`
                  }}
                >
                  {animal.emoji}
                </motion.div>
              ))}
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text mb-4">
            Discover Your Animal Personality
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Unlock the secrets of your personality through the wisdom of animal archetypes. 
            This scientifically-inspired quiz reveals your inner nature and how you connect with the world.
          </p>
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