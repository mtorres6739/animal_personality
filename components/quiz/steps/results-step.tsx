'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { AnimalType, animalArchetypes, getBlendedResults, QuizResponse } from '@/lib/quiz-data';
import { Mail, ArrowRight, CheckCircle, Star, Users, Lightbulb, Target, Zap, Heart, AlertTriangle, TrendingUp, Shield, Brain, UserPlus, UserX, Crown, BarChart3, Users2, Percent, X, Camera } from 'lucide-react';
import PercentageBreakdown from '../percentage-breakdown';
import QuizTakerCounter from '../quiz-taker-counter';
import SocialMediaShare from '@/components/ui/social-media-share';

interface ResultsStepProps {
  animalType: AnimalType;
  selectedTraits: string[];
  onSubmit: (email: string) => Promise<void>;
  cohortId?: string;
  sessionId: string;
  quizResponses?: QuizResponse[]; // Add quiz responses for percentage calculation
}

export default function ResultsStep({ animalType, selectedTraits, onSubmit, cohortId, sessionId, quizResponses }: ResultsStepProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Calculate percentage breakdown from quiz responses or selected traits
  const percentageBreakdown = quizResponses
    ? getBlendedResults(quizResponses.map(r => r.selectedOption))
    : getBlendedResults(selectedTraits);

  // Determine the actual primary animal from percentage breakdown (highest percentage)
  const primaryAnimalType = (Object.entries(percentageBreakdown) as [AnimalType, number][])
    .sort(([, a], [, b]) => b - a)[0][0];

  // Use the primary animal from percentage breakdown for consistency
  const animal = animalArchetypes[primaryAnimalType];

  // Fetch real cohort data from API
  const [cohortData, setCohortData] = useState<any>(null);
  
  useEffect(() => {
    if (cohortId) {
      fetch(`/api/cohort/${encodeURIComponent(cohortId)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setCohortData(data.cohortStats);
          }
        })
        .catch(err => console.error('Failed to fetch cohort data:', err));
    }
  }, [cohortId]);

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
      {/* Quiz Taker Counter */}
      <QuizTakerCounter sessionId={sessionId} />

      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="text-9xl mb-6"
          >
            {animal.emoji}
          </motion.div>
          <h1 className="text-5xl font-bold text-violet-700 mb-4">
            You are {animal.title}!
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {animal.description}
          </p>
        </div>
      </motion.div>

      {/* Percentage Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <PercentageBreakdown
          percentages={percentageBreakdown}
          cohortData={cohortData}
        />
      </motion.div>

      {/* Comprehensive Results Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-8"
      >
        {/* Highlighted Strengths Section */}
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="h-8 w-8 text-green-600" />
              <h2 className="text-3xl font-bold text-green-700">Your Superpowers</h2>
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg text-green-600 max-w-2xl mx-auto">These are your natural talents that set you apart and drive your success</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {animal.strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm"
              >
                <CheckCircle className="h-6 w-6 mt-1 text-green-500 flex-shrink-0" />
                <span className="text-green-700 font-medium leading-relaxed">{strength}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Traits Section */}
        <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl p-8 border-2 border-violet-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-violet-600" />
              <h2 className="text-3xl font-bold text-violet-700">Your Signature Traits</h2>
              <Zap className="h-8 w-8 text-violet-600" />
            </div>
            <p className="text-lg text-violet-600 max-w-2xl mx-auto">The personality characteristics that define how you approach work and life</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {animal.traits.map((trait, index) => (
              <motion.span
                key={trait}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="px-6 py-3 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-lg font-semibold border border-violet-200 shadow-sm"
              >
                {trait}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Work Style and Communication Row */}
        <div className="grid md:grid-cols-2 gap-6">
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
              <h3 className="font-semibold text-lg text-orange-700">Communication Style</h3>
            </div>
            <p className="text-sm text-orange-700">{animal.communication}</p>
          </div>
        </div>

        {/* Leadership and Relationships Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Leadership */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-lg text-purple-700">Leadership Style</h3>
            </div>
            <p className="text-sm text-purple-700">{animal.leadership}</p>
          </div>

          {/* Relationships */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-pink-600" />
              <h3 className="font-semibold text-lg text-pink-700">Relationships</h3>
            </div>
            <p className="text-sm text-pink-700">{animal.relationships}</p>
          </div>
        </div>

        {/* Motivation and Challenges Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Motivation */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-lg text-yellow-700">What Motivates You</h3>
            </div>
            <p className="text-sm text-yellow-700">{animal.motivation}</p>
          </div>

          {/* Challenges */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-lg text-red-700">Potential Challenges</h3>
            </div>
            <ul className="space-y-2">
              {animal.challenges.map((challenge, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-red-700"
                >
                  <AlertTriangle className="h-3 w-3 mt-1 text-red-500 flex-shrink-0" />
                  <span>{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stress and Growth Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Stress Triggers */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-lg text-gray-700">Stress Triggers</h3>
            </div>
            <p className="text-sm text-gray-700">{animal.stress}</p>
          </div>

          {/* Growth Areas */}
          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <h3 className="font-semibold text-lg text-teal-700">Growth Opportunities</h3>
            </div>
            <p className="text-sm text-teal-700">{animal.growth}</p>
          </div>
        </div>
      </motion.div>

      {/* Best Friend vs Worst Enemy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Best Friend */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-lg text-green-700">Your Best Friend</h3>
          </div>
          {animal.compatibleWith.length > 0 && (
            <div className="text-center">
              {(() => {
                const bestFriend = animalArchetypes[animal.compatibleWith[0]];
                return (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring", bounce: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="text-6xl">{bestFriend.emoji}</div>
                    <h4 className="text-xl font-bold text-green-700">{bestFriend.title}</h4>
                    <p className="text-sm text-green-600">
                      You naturally click with {bestFriend.name}s because you complement each other's strengths and share similar values.
                    </p>
                  </motion.div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Worst Enemy */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
          <div className="flex items-center gap-2 mb-4">
            <UserX className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-lg text-red-700">Your Biggest Challenge</h3>
          </div>
          {animal.conflictsWith.length > 0 && (
            <div className="text-center">
              {(() => {
                const worstEnemy = animalArchetypes[animal.conflictsWith[0]];
                return (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.0, type: "spring", bounce: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="text-6xl opacity-60">{worstEnemy.emoji}</div>
                    <h4 className="text-xl font-bold text-red-700">{worstEnemy.title}</h4>
                    <p className="text-sm text-red-600">
                      You might clash with {worstEnemy.name}s due to different working styles and priorities, but understanding each other can lead to growth.
                    </p>
                  </motion.div>
                );
              })()}
            </div>
          )}
        </div>
      </motion.div>

      {/* Career Excellence Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg mb-6"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-green-700">Careers Where You'll Excel</h2>
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">These career paths perfectly align with your natural talents and work style</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animal.idealCareers.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-green-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">{career}</h4>
                  <p className="text-sm text-green-600 mt-1">Perfect match for your {animal.name} strengths</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Career Guidance Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Famous People */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <Crown className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-xl text-purple-700">Famous {animal.name}s</h3>
          </div>
          <p className="text-purple-600 mb-4">
            You share personality traits with these successful people:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {animal.famousPeople.map((person, index) => (
              <motion.div
                key={person}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-purple-100"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Camera className="h-5 w-5 text-purple-600" />
                </div>
                <div className="font-medium text-purple-700">{person}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Careers to Avoid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <X className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold text-xl text-red-700">Careers to Avoid</h3>
          </div>
          <p className="text-red-600 mb-4">
            These career paths might not align with your natural strengths:
          </p>
          <ul className="space-y-2">
            {animal.careersToAvoid.map((career, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="flex items-center gap-2 text-red-700"
              >
                <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span>{career}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-red-100 rounded-lg">
            <p className="text-sm text-red-700">
              💡 <strong>Remember:</strong> While these roles might be challenging, your unique perspective could still bring value in the right context!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Cohort Analytics */}
      {cohortData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-blue-700">
              {cohortData.cohortId} Group Analytics
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <Users2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{cohortData.totalParticipants}</div>
              <div className="text-sm text-blue-600">Total Participants</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <div className="text-4xl mb-2">{animal.emoji}</div>
              <div className="text-sm text-blue-600">You are a {animal.name}</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <Percent className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">
                {cohortData.distributions && cohortData.distributions.length > 0
                  ? (cohortData.distributions.find((d: any) => d.animal === primaryAnimalType)?.percentage || 0)
                  : 100}%
              </div>
              <div className="text-sm text-blue-600">Share Your Type</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-blue-700 mb-3">Group Distribution:</h4>
            {cohortData.distributions && cohortData.distributions.length > 0 ? cohortData.distributions.map((dist: any, index: number) => {
              const animalData = animalArchetypes[dist.animal as AnimalType];
              const isUserType = dist.animal === primaryAnimalType;
              
              return (
                <motion.div
                  key={dist.animal}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    isUserType 
                      ? 'bg-blue-100 border-2 border-blue-300' 
                      : 'bg-white border border-blue-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{animalData.emoji}</span>
                    <div>
                      <div className={`font-medium ${isUserType ? 'text-blue-800' : 'text-blue-700'}`}>
                        {animalData.title}
                        {isUserType && <span className="text-sm ml-2">(You!)</span>}
                      </div>
                      <div className="text-sm text-blue-600">
                        {dist.count} participant{dist.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-blue-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dist.percentage}%` }}
                        transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${
                          isUserType ? 'bg-blue-500' : 'bg-blue-300'
                        }`}
                      />
                    </div>
                    <span className={`font-semibold text-sm w-10 text-right ${
                      isUserType ? 'text-blue-800' : 'text-blue-600'
                    }`}>
                      {dist.percentage}%
                    </span>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="text-center py-8">
                <p className="text-blue-600 text-sm">
                  No other participants in this cohort yet. You're the first one!
                </p>
              </div>
            )}
          </div>
          
          {cohortData.distributions && cohortData.distributions.length > 0 && (
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Insight:</strong> Your group has a{' '}
                {cohortData.distributions[0].animal === 'dolphin' ? 'collaborative' :
                 cohortData.distributions[0].animal === 'tiger' ? 'leadership-focused' :
                 cohortData.distributions[0].animal === 'fox' ? 'innovation-driven' :
                 cohortData.distributions[0].animal === 'tortoise' ? 'methodical' :
                 cohortData.distributions[0].animal === 'owl' ? 'analytical' : 'results-driven'} culture with{' '}
                <strong>{cohortData.distributions[0].percentage}% {animalArchetypes[cohortData.distributions[0].animal as AnimalType].name}s</strong> leading the way.
              </p>
            </div>
          )}
          
          {cohortData.distributions && cohortData.distributions.length === 0 && (
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Welcome!</strong> You're the first person in this cohort. Share the quiz with your group to see how personality types are distributed!
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Social Media Share */}
      <SocialMediaShare
        animalType={animalType}
        animal={animal}
        selectedTraits={selectedTraits}
      />

      {/* Email Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            📧 Get Your Complete Results
          </h3>
          <p className="text-lg text-gray-600">
            Receive a detailed personality report with career recommendations, growth strategies, and team collaboration tips.
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