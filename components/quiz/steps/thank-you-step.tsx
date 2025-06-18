'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw, Mail, Share2, Heart, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { AnimalType, animalArchetypes } from '@/lib/quiz-data';

interface ThankYouStepProps {
  onRestart: () => void;
  animalType?: AnimalType;
}

export default function ThankYouStep({ onRestart, animalType }: ThankYouStepProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const animal = animalType ? animalArchetypes[animalType] : null;

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://animalquiz.com';
  
  const socialCaptions = animal ? [
    {
      platform: 'Twitter',
      icon: Twitter,
      color: 'text-blue-400',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      caption: `Just discovered I'm ${animal.title} ${animal.emoji} on the Animal Personality Quiz! ${animal.description} Take the quiz to find your spirit animal: ${shareUrl} #PersonalityQuiz #${animal.name}Personality`,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just discovered I'm ${animal.title} ${animal.emoji} on the Animal Personality Quiz! ${animal.description} Take the quiz to find your spirit animal:`)}&url=${encodeURIComponent(shareUrl)}&hashtags=PersonalityQuiz,${animal.name}Personality`
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      caption: `I just took the Animal Personality Quiz and discovered I'm ${animal.title} ${animal.emoji}!\n\n${animal.description}\n\nMy key strengths include: ${animal.strengths.slice(0, 3).join(', ')}.\n\nTake the quiz to discover your animal personality and unlock insights about your work style, relationships, and ideal career paths!`,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`I'm ${animal.title} ${animal.emoji}! ${animal.description}`)}`
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      caption: `Fascinating insights from the Animal Personality Quiz - I'm ${animal.title} ${animal.emoji}!\n\nKey professional traits:\n• ${animal.traits.slice(0, 3).join('\n• ')}\n\nIdeal careers for my personality type include: ${animal.idealCareers.slice(0, 3).join(', ')}.\n\nThis quiz offers valuable insights for professional development and team building. Highly recommend for understanding work styles and communication preferences!`,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
  ] : [];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  return (
    <div className="space-y-8 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="text-center"
      >
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            Thank You!
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your detailed personality results have been sent to your email. Check your inbox for your complete animal archetype analysis!
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <Mail className="h-8 w-8 text-blue-500 mx-auto mb-3" />
          <h3 className="font-semibold text-blue-700 mb-2">Check Your Email</h3>
          <p className="text-sm text-blue-600">
            Your complete personality report with insights and recommendations is waiting for you
          </p>
        </div>
        
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
          <Share2 className="h-8 w-8 text-purple-500 mx-auto mb-3" />
          <h3 className="font-semibold text-purple-700 mb-2">Share Your Results</h3>
          <p className="text-sm text-purple-600">
            {animal ? `Proud to be ${animal.title}? Share it!` : 'Help your friends discover their animal personality too!'}
          </p>
        </div>
        
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
          <Heart className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <h3 className="font-semibold text-green-700 mb-2">Apply Insights</h3>
          <p className="text-sm text-green-600">
            Use your personality insights to improve relationships and work performance
          </p>
        </div>
      </motion.div>

      {/* Social Media Share Section */}
      {animal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Share Your {animal.name} Personality!
          </h3>
          
          <div className="grid gap-4">
            {socialCaptions.map((social, index) => (
              <div key={social.platform} className={`rounded-xl p-4 border ${social.borderColor} ${social.bgColor}`}>
                <div className="flex items-start gap-4">
                  <social.icon className={`h-6 w-6 ${social.color} flex-shrink-0 mt-1`} />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{social.platform}</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line mb-3">
                      {social.caption}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => window.open(social.url, '_blank')}
                        size="sm"
                        className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700"
                      >
                        Share on {social.platform}
                      </Button>
                      <Button
                        onClick={() => copyToClipboard(social.caption, index)}
                        size="sm"
                        variant="outline"
                        className="border-violet-200 hover:bg-violet-50"
                      >
                        {copiedIndex === index ? (
                          <><Check className="h-4 w-4 mr-1" /> Copied!</>
                        ) : (
                          <><Copy className="h-4 w-4 mr-1" /> Copy Caption</>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Quiz URL to share:</strong>
            </p>
            <div className="flex items-center justify-center gap-2">
              <code className="bg-white px-3 py-1 rounded border border-gray-300 text-sm">
                {shareUrl}
              </code>
              <Button
                onClick={() => copyToClipboard(shareUrl, -1)}
                size="sm"
                variant="outline"
                className="border-gray-300"
              >
                {copiedIndex === -1 ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-6 border border-violet-100"
      >
        <h3 className="font-semibold text-lg mb-4 text-violet-700 text-center">
          What&apos;s in Your Email Report?
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Detailed personality breakdown</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Career and leadership insights</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Relationship compatibility guide</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Personal growth recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Stress management strategies</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
            <span>Communication style guide</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="px-8 py-3 text-violet-600 border-violet-200 hover:bg-violet-50"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Take Quiz Again
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="text-center text-sm text-muted-foreground"
      >
        <p>
          🌟 Thank you for taking the Animal Personality Quiz! We hope these insights help you better understand yourself and improve your relationships.
        </p>
      </motion.div>
    </div>
  );
}