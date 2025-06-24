'use client';

import { motion } from 'framer-motion';
import { AnimalType, animalArchetypes } from '@/lib/quiz-data';

interface PercentageBreakdownProps {
  percentages: Record<AnimalType, number>;
  cohortData?: {
    totalParticipants: number;
    userPosition?: number;
    distributions?: Array<{
      animal: string;
      count: number;
      percentage: number;
    }>;
  };
}

export default function PercentageBreakdown({ percentages, cohortData }: PercentageBreakdownProps) {
  // Sort animals by percentage (highest first) - show all animals, even 0%
  const sortedAnimals = (Object.entries(percentages) as [AnimalType, number][])
    .sort(([, a], [, b]) => b - a);

  // Find the primary animal (highest percentage)
  const primaryAnimal = sortedAnimals[0];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-violet-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-violet-700 mb-2">
          Your Personality Breakdown
        </h3>
        {cohortData && cohortData.userPosition && (
          <p className="text-sm text-violet-600">
            You are participant #{cohortData.userPosition} of {cohortData.totalParticipants}
          </p>
        )}
      </div>
      
      <div className="space-y-3">
        {sortedAnimals.map(([animalType, percentage], index) => {
          const animal = animalArchetypes[animalType];
          const isHighest = index === 0;
          const isPrimary = percentage > 0; // Show different styling for 0% animals

          return (
            <motion.div
              key={animalType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center gap-4 p-4 rounded-lg transition-all duration-200
                ${isHighest
                  ? 'bg-violet-50 border-2 border-violet-300 shadow-sm'
                  : isPrimary
                    ? 'bg-gray-50 border border-gray-200'
                    : 'bg-gray-25 border border-gray-100 opacity-75'
                }
              `}
            >
              {/* Animal Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-2xl">{animal.emoji}</span>
                <div className="min-w-0">
                  <div className={`font-semibold ${
                    isHighest
                      ? 'text-violet-700'
                      : isPrimary
                        ? 'text-gray-700'
                        : 'text-gray-500'
                  }`}>
                    {animal.name}
                    {isHighest && <span className="text-sm ml-2 text-violet-600">(Primary)</span>}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {animal.title}
                  </div>
                </div>
              </div>

              {/* Percentage Bar */}
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      isHighest
                        ? 'bg-gradient-to-r from-violet-500 to-indigo-600'
                        : isPrimary
                          ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                          : 'bg-gray-300'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(percentage, 2)}%` }} // Minimum 2% width for visibility
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
                <span className={`font-bold text-lg min-w-[50px] text-right ${
                  isHighest
                    ? 'text-violet-700'
                    : isPrimary
                      ? 'text-gray-600'
                      : 'text-gray-500'
                }`}>
                  {percentage}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-violet-50 rounded-lg border border-violet-200"
      >
        <p className="text-center text-violet-700 font-medium">
          You are primarily{' '}
          <span className="font-bold">
            {primaryAnimal[1]}% {animalArchetypes[primaryAnimal[0]].name}
          </span>
          {sortedAnimals.filter(([, percentage]) => percentage > 0).length > 1 && (
            <>
              {' '}with traits from{' '}
              {sortedAnimals
                .filter(([, percentage]) => percentage > 0)
                .slice(1)
                .map(([animalType, percentage], index, arr) => (
                  <span key={animalType}>
                    <span className="font-semibold">{animalArchetypes[animalType].name} ({percentage}%)</span>
                    {index < arr.length - 1 && (index === arr.length - 2 ? ' and ' : ', ')}
                  </span>
                ))
              }
            </>
          )}
        </p>

        {cohortData && cohortData.distributions && cohortData.distributions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-violet-200">
            <p className="text-sm text-violet-600 text-center">
              <strong>Cohort Insight:</strong> You're one of{' '}
              {cohortData.distributions.find(d => d.animal === primaryAnimal[0])?.count || 1}{' '}
              {animalArchetypes[primaryAnimal[0]].name}s in your group of {cohortData.totalParticipants}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
