import { AnimalType, AnimalArchetype } from './quiz-data';

export interface SocialCardData {
  animalType: AnimalType;
  animal: AnimalArchetype;
  topTraits: string[];
  topCareers: string[];
  motivationalQuote: string;
}

export type SocialCardFormat = 'facebook' | 'instagram' | 'twitter';

export interface SocialCardDimensions {
  width: number;
  height: number;
}

export const SOCIAL_CARD_DIMENSIONS: Record<SocialCardFormat, SocialCardDimensions> = {
  facebook: { width: 1200, height: 630 },
  instagram: { width: 1080, height: 1080 },
  twitter: { width: 1200, height: 675 }
};

// Motivational quotes for each animal type
export const MOTIVATIONAL_QUOTES: Record<AnimalType, string[]> = {
  dove: [
    "Your compassion creates connections that change the world.",
    "In a world of noise, your harmony brings peace.",
    "Your gentle strength moves mountains with kindness."
  ],
  owl: [
    "Your wisdom illuminates the path for others to follow.",
    "In complexity, you find clarity. In chaos, you create order.",
    "Your analytical mind solves what others can't even see."
  ],
  peacock: [
    "Your enthusiasm ignites inspiration in everyone around you.",
    "You turn ordinary moments into extraordinary experiences.",
    "Your creativity paints the world in brilliant colors."
  ],
  shark: [
    "Your determination turns obstacles into stepping stones.",
    "You don't just chase success—you create it.",
    "Your leadership drives results that others only dream of."
  ]
};

export function getRandomMotivationalQuote(animalType: AnimalType): string {
  const quotes = MOTIVATIONAL_QUOTES[animalType];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function createSocialMediaCard(
  data: SocialCardData,
  format: SocialCardFormat = 'facebook'
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      const dimensions = SOCIAL_CARD_DIMENSIONS[format];
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
      gradient.addColorStop(0, '#8B5CF6'); // violet-500
      gradient.addColorStop(0.5, '#A855F7'); // purple-500
      gradient.addColorStop(1, '#6366F1'); // indigo-500
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Add subtle pattern overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < dimensions.width; i += 40) {
        for (let j = 0; j < dimensions.height; j += 40) {
          ctx.beginPath();
          ctx.arc(i, j, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Load and draw content
      drawCardContent(ctx, data, format, dimensions)
        .then(() => {
          const dataURL = canvas.toDataURL('image/png', 0.9);
          resolve(dataURL);
        })
        .catch(reject);

    } catch (error) {
      reject(error);
    }
  });
}

async function drawCardContent(
  ctx: CanvasRenderingContext2D,
  data: SocialCardData,
  format: SocialCardFormat,
  dimensions: SocialCardDimensions
): Promise<void> {
  const { width, height } = dimensions;
  const padding = width * 0.08; // 8% padding
  const contentWidth = width - (padding * 2);

  // Set text properties
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';

  let yPosition = padding;

  // Add decorative elements
  drawDecorations(ctx, width, height);

  // Draw animal emoji (large)
  const emojiSize = format === 'instagram' ? 120 : 80;
  ctx.font = `${emojiSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", Arial`;
  ctx.fillText(data.animal.emoji, width / 2, yPosition + emojiSize);
  yPosition += emojiSize + 30;
  
  // Draw animal title with shadow effect
  const titleSize = format === 'instagram' ? 48 : 36;
  ctx.font = `bold ${titleSize}px "Helvetica Neue", Arial, sans-serif`;

  // Add text shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillText(`I am ${data.animal.title}!`, width / 2 + 2, yPosition + 2);

  // Main title text
  ctx.fillStyle = 'white';
  ctx.fillText(`I am ${data.animal.title}!`, width / 2, yPosition);
  yPosition += titleSize + 30;

  // Draw motivational quote with better styling
  const quoteSize = format === 'instagram' ? 24 : 18;
  ctx.font = `italic ${quoteSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';

  const wrappedQuote = wrapText(ctx, `"${data.motivationalQuote}"`, contentWidth * 0.85);
  wrappedQuote.forEach(line => {
    ctx.fillText(line, width / 2, yPosition);
    yPosition += quoteSize + 10;
  });
  yPosition += 25;
  
  // Draw top traits with better styling
  ctx.fillStyle = 'white';
  const traitHeaderSize = format === 'instagram' ? 28 : 22;
  ctx.font = `bold ${traitHeaderSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillText('My Top Traits:', width / 2, yPosition);
  yPosition += traitHeaderSize + 20;

  const traitSize = format === 'instagram' ? 20 : 16;
  ctx.font = `${traitSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  data.topTraits.slice(0, 4).forEach((trait, index) => {
    ctx.fillText(`✨ ${trait}`, width / 2, yPosition);
    yPosition += traitSize + 12;
  });
  yPosition += 25;

  // Draw top careers with better styling
  ctx.fillStyle = 'white';
  const careerHeaderSize = format === 'instagram' ? 28 : 22;
  ctx.font = `bold ${careerHeaderSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillText('Perfect Careers for Me:', width / 2, yPosition);
  yPosition += careerHeaderSize + 25; // Increased spacing after header

  const careerSize = format === 'instagram' ? 20 : 16;
  ctx.font = `${careerSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';

  // Improved career list spacing
  const careerSpacing = format === 'instagram' ? 22 : 18; // Increased spacing between items
  data.topCareers.slice(0, 3).forEach((career, index) => {
    ctx.fillText(`${index + 1}. ${career}`, width / 2, yPosition);
    yPosition += careerSize + careerSpacing;
  });

  // Add extra spacing before attribution
  yPosition += 30; // Additional spacing before branding

  // Calculate remaining space and position branding at bottom with proper spacing
  const brandSize = format === 'instagram' ? 16 : 14;
  const brandingHeight = brandSize + 10; // Text height plus some buffer
  const brandingY = Math.max(yPosition, height - padding - brandingHeight);

  // Draw branding at bottom with better styling
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = `${brandSize}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillText('🔍 Discover your animal personality at ethosaz.com', width / 2, brandingY);
}

function drawDecorations(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  // Add subtle geometric decorations
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

  // Top left corner decoration
  ctx.beginPath();
  ctx.arc(width * 0.1, height * 0.1, 30, 0, Math.PI * 2);
  ctx.fill();

  // Top right corner decoration
  ctx.beginPath();
  ctx.arc(width * 0.9, height * 0.15, 20, 0, Math.PI * 2);
  ctx.fill();

  // Bottom left corner decoration
  ctx.beginPath();
  ctx.arc(width * 0.15, height * 0.85, 25, 0, Math.PI * 2);
  ctx.fill();

  // Bottom right corner decoration
  ctx.beginPath();
  ctx.arc(width * 0.85, height * 0.9, 15, 0, Math.PI * 2);
  ctx.fill();

  // Add some sparkle effects
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

export function downloadImage(dataURL: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export interface SocialShareOptions {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
  imageDataURL: string;
  animalType: AnimalType;
  animalName: string;
  downloadAndShare?: boolean;
}

export function generateShareCaption(animalType: AnimalType, animalName: string, platform: string): string {
  const animalArticle = animalType === 'owl' ? 'an' : 'a';
  const animalEmoji = animalType === 'dove' ? '🕊️' : animalType === 'owl' ? '🦉' : animalType === 'peacock' ? '🦚' : '🦈';

  const baseText = `I just discovered I'm ${animalArticle} ${animalName} ${animalEmoji} on the Animal Personality Quiz!`;
  const callToAction = `Take the quiz to discover your animal personality and ideal career path!`;
  const url = typeof window !== 'undefined' ? window.location.origin : 'ethosaz.com';

  switch (platform) {
    case 'twitter':
      return `${baseText} ${callToAction} ${url} #PersonalityQuiz #${animalName}Personality #CareerGuidance`;
    case 'facebook':
    case 'linkedin':
      return `${baseText}\n\n${callToAction}\n\n🎯 Discover your strengths, ideal work environment, and perfect career matches based on your unique personality type.\n\n${url}`;
    case 'instagram':
      return `${baseText}\n\n${callToAction}\n\n🎯 Swipe to see my personality breakdown and career matches!\n\n#PersonalityQuiz #${animalName}Personality #CareerGuidance #PersonalityTest #AnimalPersonality`;
    default:
      return `${baseText} ${callToAction} ${url}`;
  }
}

export function shareToSocialMedia(options: SocialShareOptions): void {
  const { platform, imageDataURL, animalType, animalName, downloadAndShare = false } = options;
  const shareText = generateShareCaption(animalType, animalName, platform);
  const shareURL = typeof window !== 'undefined' ? window.location.origin : 'https://ethosaz.com';

  // If downloadAndShare is true, automatically download the image first
  if (downloadAndShare && imageDataURL) {
    const filename = `${animalName}-personality-${platform}-${Date.now()}.png`;
    downloadImage(imageDataURL, filename);

    // Show instructions for manual image attachment
    setTimeout(() => {
      showImageAttachmentInstructions(platform, shareText);
    }, 500);
    return;
  }

  let url = '';

  switch (platform) {
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}&quote=${encodeURIComponent(shareText)}`;
      break;
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareURL)}`;
      break;
    case 'linkedin':
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}&summary=${encodeURIComponent(shareText)}`;
      break;
    case 'instagram':
      // Instagram doesn't support direct web sharing, so we'll copy text and show instructions
      copyToClipboard(shareText);
      showInstagramSharingInstructions();
      return;
  }

  if (url) {
    window.open(url, '_blank', 'width=600,height=400');
  }
}

function showImageAttachmentInstructions(platform: string, shareText: string): void {
  const instructions = `📸 Image downloaded! Here's how to share with your personality card:

1. The image has been saved to your Downloads folder
2. Copy this caption: "${shareText}"
3. Go to ${platform} and create a new post
4. Attach the downloaded image
5. Paste the caption and share!

The caption has been copied to your clipboard for easy pasting.`;

  copyToClipboard(shareText);
  alert(instructions);
}

function showInstagramSharingInstructions(): void {
  const instructions = `📱 Instagram Sharing Instructions:

1. Your personality card image has been downloaded
2. The caption has been copied to your clipboard
3. Open Instagram on your phone
4. Create a new post and select the downloaded image
5. Paste the caption and add any additional hashtags
6. Share your personality results!

Note: Instagram doesn't support direct web sharing, so manual posting is required.`;

  alert(instructions);
}

function copyToClipboard(text: string): void {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
