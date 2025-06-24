'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface QuizTakerCounterProps {
  sessionId: string;
}

interface QuizStats {
  totalQuizTakers: number;
  quizTakerNumber: number;
}

export default function QuizTakerCounter({ sessionId }: QuizTakerCounterProps) {
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/quiz-stats?sessionId=${encodeURIComponent(sessionId)}`);
        const data = await response.json();
        
        if (response.ok) {
          setStats(data);
        } else {
          console.error('Failed to fetch quiz stats:', data.error);
          // Set default values if API fails
          setStats({ totalQuizTakers: 0, quizTakerNumber: 0 });
        }
      } catch (error) {
        console.error('Error fetching quiz stats:', error);
        // Set default values if API fails
        setStats({ totalQuizTakers: 0, quizTakerNumber: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchStats();
    } else {
      setLoading(false);
      setStats({ totalQuizTakers: 0, quizTakerNumber: 0 });
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="animate-pulse flex items-center gap-2 text-sm text-gray-500">
          <Users className="h-4 w-4" />
          <span>Loading stats...</span>
        </div>
      </div>
    );
  }

  if (!stats || stats.quizTakerNumber === 0) {
    return null; // Don't show anything if we can't get the stats
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center py-3 mb-4"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full border border-violet-200">
        <Users className="h-4 w-4 text-violet-600" />
        <span className="text-sm font-medium text-violet-700">
          You are quiz taker #{stats.quizTakerNumber.toLocaleString()}
        </span>
        {stats.totalQuizTakers > 0 && (
          <span className="text-xs text-violet-500 ml-1">
            of {stats.totalQuizTakers.toLocaleString()} total
          </span>
        )}
      </div>
    </motion.div>
  );
}
