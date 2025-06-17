'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw, Mail, Share2, Heart } from 'lucide-react';

interface ThankYouStepProps {
  onRestart: () => void;
}

export default function ThankYouStep({ onRestart }: ThankYouStepProps) {
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
          <h3 className="font-semibold text-purple-700 mb-2">Share with Friends</h3>
          <p className="text-sm text-purple-600">
            Help your friends discover their animal personality too!
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
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