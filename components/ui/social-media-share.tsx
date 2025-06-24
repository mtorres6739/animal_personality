'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Download, Share2, Facebook, Twitter, Linkedin, Instagram, Loader2, Camera, Copy, RefreshCw, ExternalLink } from 'lucide-react';
import {
  createSocialMediaCard,
  downloadImage,
  shareToSocialMedia,
  generateShareCaption,
  getRandomMotivationalQuote,
  SocialCardData,
  SocialCardFormat,
  SocialShareOptions,
  SOCIAL_CARD_DIMENSIONS
} from '@/lib/social-media-card';
import { AnimalType, AnimalArchetype } from '@/lib/quiz-data';

interface SocialMediaShareProps {
  animalType: AnimalType;
  animal: AnimalArchetype;
  selectedTraits?: string[];
  className?: string;
}

export default function SocialMediaShare({
  animalType,
  animal,
  selectedTraits = [],
  className = ''
}: SocialMediaShareProps) {
  const [selectedFormat, setSelectedFormat] = useState<SocialCardFormat>('facebook');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState<string>(() => getRandomMotivationalQuote(animalType));
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  // Prepare card data
  const cardData: SocialCardData = {
    animalType,
    animal,
    topTraits: selectedTraits.length > 0 ? selectedTraits.slice(0, 4) : animal.traits.slice(0, 4),
    topCareers: animal.idealCareers.slice(0, 3),
    motivationalQuote: currentQuote
  };

  // Generate initial caption and image when format changes
  useEffect(() => {
    generateImage();
    generateCaption();
  }, [selectedFormat]);

  const generateCaption = () => {
    const animalArticle = animalType === 'owl' ? 'an' : 'a';
    const animalEmoji = animalType === 'dove' ? '🕊️' : animalType === 'owl' ? '🦉' : animalType === 'peacock' ? '🦚' : '🦈';

    const captions = [
      `I just discovered I'm ${animalArticle} ${animal.name} ${animalEmoji}! My personality quiz results revealed so much about my strengths and ideal career path. Take the quiz to discover your animal personality! ${typeof window !== 'undefined' ? window.location.origin : 'ethosaz.com'}`,

      `${animalEmoji} ${animal.name} personality unlocked! The Animal Personality Quiz showed me exactly what makes me tick and which careers would be perfect for me. What's your animal personality? Find out at ${typeof window !== 'undefined' ? window.location.origin : 'ethosaz.com'}`,

      `Just took the Animal Personality Quiz and I'm ${animalArticle} ${animal.name}! ${animalEmoji} The insights about my personality and career matches were spot-on. Highly recommend taking this quiz! ${typeof window !== 'undefined' ? window.location.origin : 'ethosaz.com'}`,

      `${animalEmoji} Turns out I'm ${animalArticle} ${animal.name}! This personality quiz gave me amazing insights into my strengths and perfect career matches. Take the quiz and discover your animal personality type! ${typeof window !== 'undefined' ? window.location.origin : 'ethosaz.com'}`,

      `Animal Personality Quiz results are in: I'm ${animalArticle} ${animal.name}! ${animalEmoji} Love how this revealed my natural strengths and ideal work environment. What animal personality are you? ${typeof window !== 'undefined' ? window.location.origin : 'ethosaz.com'}`
    ];

    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    setCurrentCaption(randomCaption);
  };

  const generateImage = async (newQuote?: boolean) => {
    setIsGenerating(true);
    setError(null);

    if (newQuote) {
      setCurrentQuote(getRandomMotivationalQuote(animalType));
    }

    try {
      const imageDataURL = await createSocialMediaCard(cardData, selectedFormat);
      setGeneratedImage(imageDataURL);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error generating social media card:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewQuote = () => {
    setCurrentQuote(getRandomMotivationalQuote(animalType));
    generateImage(true);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const filename = `${animal.name}-personality-${selectedFormat}-${Date.now()}.png`;
      downloadImage(generatedImage, filename);

      // Track download event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'social_card_download', {
          animal_type: animalType,
          format: selectedFormat,
          event_category: 'engagement'
        });
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      // Show success feedback (you could add a toast here)
      console.log('Caption copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy caption:', err);
    }
  };

  const handlePlatformOpen = (platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram') => {
    const urls = {
      facebook: 'https://www.facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
      instagram: 'https://www.instagram.com'
    };

    window.open(urls[platform], '_blank');

    // Track platform open event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'social_platform_open', {
        animal_type: animalType,
        platform: platform,
        format: selectedFormat,
        event_category: 'engagement'
      });
    }
  };

  const formatLabels: Record<SocialCardFormat, string> = {
    facebook: 'Facebook/LinkedIn',
    instagram: 'Instagram',
    twitter: 'Twitter'
  };

  const formatDimensions = SOCIAL_CARD_DIMENSIONS[selectedFormat];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
      className={`bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl p-8 border-2 border-violet-200 shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Share2 className="h-8 w-8 text-violet-600" />
          <h2 className="text-3xl font-bold text-violet-700">Share Your Results</h2>
          <Camera className="h-8 w-8 text-violet-600" />
        </div>
        <p className="text-lg text-violet-600 max-w-2xl mx-auto">
          Create a beautiful graphic to share your personality results on social media
        </p>
      </div>

      {/* Format Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-violet-700 mb-3 text-center">Choose Format:</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(formatLabels).map(([format, label]) => {
            const dimensions = SOCIAL_CARD_DIMENSIONS[format as SocialCardFormat];
            return (
              <button
                key={format}
                onClick={() => setSelectedFormat(format as SocialCardFormat)}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  selectedFormat === format
                    ? 'bg-violet-600 text-white border-violet-600 shadow-md'
                    : 'bg-white text-violet-600 border-violet-200 hover:border-violet-400 hover:bg-violet-50'
                }`}
              >
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs opacity-75">{dimensions.width}×{dimensions.height}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-violet-700 mb-3 text-center">Preview:</h3>
        <div className="flex justify-center">
          <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-md">
            {isGenerating ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-violet-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Generating your card...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <p className="text-sm text-red-600 mb-2">{error}</p>
                  <Button onClick={generateImage} size="sm" variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt={`${animal.title} personality card`}
                className="w-full h-auto rounded-lg shadow-sm"
                style={{
                  aspectRatio: `${formatDimensions.width}/${formatDimensions.height}`
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-48">
                <p className="text-sm text-gray-600">Click generate to create your card</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Generate Buttons */}
        <div className="text-center space-y-3">
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => generateImage()}
              disabled={isGenerating}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Generate Card
                </>
              )}
            </Button>

            {!isGenerating && (
              <Button
                onClick={handleNewQuote}
                variant="outline"
                className="border-violet-200 text-violet-600 hover:bg-violet-50 px-4 py-3"
              >
                ✨ New Quote
              </Button>
            )}
          </div>

          {currentQuote && (
            <p className="text-sm text-violet-600 italic max-w-md mx-auto">
              Current quote: "{currentQuote}"
            </p>
          )}
        </div>

        {/* Download Button */}
        {generatedImage && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-violet-200 text-violet-600 hover:bg-violet-50 px-6 py-3"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </div>

            {/* Caption Section */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-violet-700">
                    Share Caption:
                  </h4>
                  <Button
                    onClick={generateCaption}
                    size="sm"
                    variant="outline"
                    className="border-violet-200 text-violet-600 hover:bg-violet-50"
                    disabled={isGeneratingCaption}
                  >
                    <RefreshCw className={`mr-1 h-3 w-3 ${isGeneratingCaption ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                </div>

                <div className="relative">
                  <textarea
                    value={currentCaption}
                    onChange={(e) => setCurrentCaption(e.target.value)}
                    className="flex min-h-[100px] w-full rounded-md border border-violet-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-12 resize-none"
                    placeholder="Your social media caption will appear here..."
                  />
                  <Button
                    onClick={() => copyToClipboard(currentCaption)}
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-violet-100"
                    title="Copy caption"
                  >
                    <Copy className="h-4 w-4 text-violet-600" />
                  </Button>
                </div>
              </div>

              {/* Social Platform Links */}
              <div>
                <h4 className="text-center text-sm font-medium text-violet-700 mb-3">
                  Share on your favorite platform:
                </h4>
                <div className="flex justify-center gap-3 flex-wrap">
                  <Button
                    onClick={() => handlePlatformOpen('facebook')}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Facebook className="mr-1 h-4 w-4" />
                    <ExternalLink className="ml-1 h-3 w-3" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handlePlatformOpen('twitter')}
                    size="sm"
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    <Twitter className="mr-1 h-4 w-4" />
                    <ExternalLink className="ml-1 h-3 w-3" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() => handlePlatformOpen('linkedin')}
                    size="sm"
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    <Linkedin className="mr-1 h-4 w-4" />
                    <ExternalLink className="ml-1 h-3 w-3" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={() => handlePlatformOpen('instagram')}
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    <Instagram className="mr-1 h-4 w-4" />
                    <ExternalLink className="ml-1 h-3 w-3" />
                    Instagram
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-violet-100 rounded-lg border border-violet-200"
      >
        <h4 className="font-medium text-violet-700 mb-2">💡 How to Share:</h4>
        <ul className="text-sm text-violet-600 space-y-1">
          <li>• <strong>Download your image</strong> using the button above</li>
          <li>• <strong>Copy the caption</strong> using the copy button or customize it</li>
          <li>• <strong>Click a platform</strong> to open it in a new tab</li>
          <li>• <strong>Create a new post,</strong> upload your image, and paste the caption</li>
          <li>• <strong>Tag friends</strong> to encourage them to take the quiz too!</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
