'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { AnimalType, animalArchetypes } from '@/lib/quiz-data';
import { Mail, ArrowRight, CheckCircle, Star, Users, Lightbulb, Target, Zap } from 'lucide-react';

interface ResultsStepProps {
  animalType: AnimalType;
  selectedTraits: string[];
  onSubmit: (email: string) => Promise<void>;
  cohortId?: string;
  sessionId: string;
}

export default function ResultsStep({ animalType, selectedTraits, onSubmit, cohortId, sessionId }: ResultsStepProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const animal = animalArchetypes[animalType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(email.trim());
    } catch (err) {
      setError('Failed to send results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = email.includes('@') && email.includes('.');

  return (
    <div className="space-y-8 py-4">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="text-8xl mb-4"
          >
            {animal.emoji}
          </motion.div>
          <h2 className="text-4xl font-bold text-violet-700 mb-2">
            You are {animal.title}!
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {animal.description}
          </p>
        </div>
      </motion.div>

      {/* Traits Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6 mb-8"
      >
        {/* Strengths */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-lg text-green-700">Your Strengths</h3>
          </div>
          <ul className="space-y-2">
            {animal.strengths.slice(0, 3).map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-2 text-sm text-green-700"
              >
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>{strength}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Key Traits */}
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-6 border border-violet-100">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-violet-600" />
            <h3 className="font-semibold text-lg text-violet-700">Key Traits</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {animal.traits.map((trait, index) => (
              <motion.span
                key={trait}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
              >
                {trait}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Work Style */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-blue-700">Work Style</h3>
          </div>
          <p className="text-sm text-blue-700">{animal.workStyle}</p>
        </div>

        {/* Communication */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-lg text-orange-700">Communication</h3>
          </div>
          <p className="text-sm text-orange-700">{animal.communication}</p>
        </div>
      </motion.div>

      {/* Compatibility */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-lg text-purple-700">Team Compatibility</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-purple-700 mb-2">Works best with:</h4>
            <div className="flex gap-2">
              {animal.compatibleWith.map(compatibleType => {
                const compatibleAnimal = animalArchetypes[compatibleType];
                return (
                  <span key={compatibleType} className="text-2xl" title={compatibleAnimal.name}>
                    {compatibleAnimal.emoji}
                  </span>
                );
              })}
            </div>
          </div>
          {animal.conflictsWith.length > 0 && (
            <div>
              <h4 className="font-medium text-purple-700 mb-2">May clash with:</h4>
              <div className="flex gap-2">
                {animal.conflictsWith.map(conflictType => {
                  const conflictAnimal = animalArchetypes[conflictType];
                  return (
                    <span key={conflictType} className="text-2xl opacity-60" title={conflictAnimal.name}>
                      {conflictAnimal.emoji}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Email Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Get Your Complete Results
          </h3>
          <p className="text-muted-foreground">
            Enter your email to receive a detailed personality report with growth insights and career recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            disabled={!isValidEmail || isSubmitting}
            size="lg"
            className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Sending Results...</span>
            ) : (
              <>
                <span>Send My Results</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
          <span>🔒 Your email is secure and will only be used for sending results</span>
        </div>
      </motion.div>
    </div>
  );
}