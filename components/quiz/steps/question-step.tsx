'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { personalityQuestions, QuizResponse } from '@/lib/quiz-data';
import { ArrowLeft, Check } from 'lucide-react';
import TraitTooltip from '@/components/ui/trait-tooltip';

interface QuestionStepProps {
  onSubmit: (responses: QuizResponse[]) => void;
  initialResponses?: QuizResponse[];
}

export default function QuestionStep({ onSubmit, initialResponses = [] }: QuestionStepProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>(initialResponses);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const currentQuestion = personalityQuestions[currentQuestionIndex];
  const totalQuestions = personalityQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Check if current question has been answered
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);
  const canProceed = currentResponse !== undefined;

  const handleOptionSelect = useCallback(async (optionIndex: number) => {
    if (isAdvancing) return; // Prevent multiple selections during advance

    const selectedOptionText = currentQuestion.options[optionIndex];

    // Update responses array
    const newResponses = responses.filter(r => r.questionId !== currentQuestion.id);
    newResponses.push({
      questionId: currentQuestion.id,
      selectedOption: selectedOptionText,
      optionIndex
    });

    setResponses(newResponses);
    setSelectedOption(optionIndex);
    setIsAdvancing(true);

    // Brief delay to show selection feedback
    await new Promise(resolve => setTimeout(resolve, 600));

    // Auto-advance logic
    if (isLastQuestion) {
      // Submit all responses on final question
      onSubmit(newResponses);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAdvancing(false);
    }
  }, [currentQuestion, responses, isLastQuestion, currentQuestionIndex, onSubmit, isAdvancing]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0 && !isAdvancing) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setIsAdvancing(false);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-8 py-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-violet-500 to-indigo-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Header */}
      <div className="text-center mb-8">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-violet-700 mb-4">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the trait that best describes you:
          </p>
        </motion.div>
      </div>

      {/* Help Text for First Question */}
      {currentQuestionIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <p className="text-sm text-violet-600 bg-violet-50 px-4 py-2 rounded-lg inline-block">
            💡 Click the <span className="font-medium">ℹ️ icons on the left</span> to learn what each trait means
          </p>
        </motion.div>
      )}

      {/* Question Options */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 max-w-2xl mx-auto"
      >
        {currentQuestion.options.map((option, index) => {
          const isSelected = currentResponse?.optionIndex === index;
          const isCurrentlySelected = selectedOption === index;
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <div className="flex items-center gap-4 w-full">
              {/* Help Icon - Positioned on the Left */}
              <div className="flex-shrink-0 flex items-center justify-center w-12">
                <TraitTooltip trait={option} />
              </div>

              {/* Main Option Button */}
              <motion.div
                key={`${currentQuestion.id}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: isCurrentlySelected ? 1.02 : 1,
                  backgroundColor: isCurrentlySelected ? '#f3f4f6' : undefined
                }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative
                  ${isSelected || isCurrentlySelected
                    ? 'bg-violet-100 border-violet-300 text-violet-800 shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-violet-200 hover:bg-violet-50'
                  }
                  ${isAdvancing ? 'pointer-events-none' : ''}
                `}
                onClick={() => !isAdvancing && handleOptionSelect(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${isSelected || isCurrentlySelected
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {isCurrentlySelected ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      optionLabel
                    )}
                  </div>
                  <span className="text-lg font-medium capitalize flex-1">{option}</span>
                </div>

                {/* Selection confirmation animation */}
                {isCurrentlySelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Navigation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-center pt-8 max-w-2xl mx-auto"
      >
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 || isAdvancing}
          variant="outline"
          size="lg"
          className="px-6 py-3"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Previous
        </Button>

        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">
            {currentQuestionIndex + 1} / {totalQuestions}
          </div>
          {isAdvancing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-violet-600 font-medium"
            >
              {isLastQuestion ? 'Getting your results...' : 'Moving to next question...'}
            </motion.div>
          ) : (
            <div className="text-xs text-gray-500">
              Select an option to continue
            </div>
          )}
        </div>

        {/* Placeholder for visual balance */}
        <div className="w-[120px]"></div>
      </motion.div>
    </div>
  );
}
