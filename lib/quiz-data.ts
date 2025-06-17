export type AnimalType = 'fox' | 'dolphin' | 'tortoise' | 'tiger' | 'owl' | 'shark';

export interface AnimalArchetype {
  id: AnimalType;
  name: string;
  emoji: string;
  title: string;
  description: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  workStyle: string;
  communication: string;
  relationships: string;
  leadership: string;
  motivation: string;
  stress: string;
  growth: string;
  compatibleWith: AnimalType[];
  conflictsWith: AnimalType[];
}

export const animalArchetypes: Record<AnimalType, AnimalArchetype> = {
  fox: {
    id: 'fox',
    name: 'Fox',
    emoji: '🦊',
    title: 'The Clever Strategist',
    description: 'Foxes are intelligent, adaptable, and resourceful. They excel at finding creative solutions and thinking outside the box.',
    traits: ['Strategic thinking', 'Adaptability', 'Quick wit', 'Problem-solving', 'Resourcefulness'],
    strengths: [
      'Excellent at strategic planning and seeing the big picture',
      'Highly adaptable to changing circumstances',
      'Creative problem-solver who finds unconventional solutions',
      'Quick learner who grasps new concepts easily',
      'Skilled at navigating complex social and professional situations'
    ],
    challenges: [
      'May overthink situations and delay action',
      'Can be perceived as cunning or manipulative',
      'Might struggle with routine or repetitive tasks',
      'Tendency to be restless when not mentally stimulated'
    ],
    workStyle: 'Thrives in dynamic environments that require strategic thinking and problem-solving. Prefers variety and intellectual challenges.',
    communication: 'Articulate and persuasive, often using analogies and stories to make points. Values intelligent discourse.',
    relationships: 'Forms deep connections based on intellectual compatibility. Appreciates wit and cleverness in others.',
    leadership: 'Leads through vision and strategy. Inspires others with innovative ideas and long-term thinking.',
    motivation: 'Driven by intellectual challenges, creative freedom, and the opportunity to implement innovative solutions.',
    stress: 'Becomes stressed when forced into rigid structures or when unable to use their creativity and intelligence.',
    growth: 'Should focus on translating ideas into action and building trust through consistent follow-through.',
    compatibleWith: ['owl', 'dolphin'],
    conflictsWith: ['tiger', 'shark']
  },
  dolphin: {
    id: 'dolphin',
    name: 'Dolphin',
    emoji: '🐬',
    title: 'The Harmonious Collaborator',
    description: 'Dolphins are social, empathetic, and cooperative. They excel at building relationships and creating harmony in groups.',
    traits: ['Empathy', 'Cooperation', 'Social intelligence', 'Communication', 'Team building'],
    strengths: [
      'Exceptional emotional intelligence and empathy',
      'Natural ability to build and maintain relationships',
      'Excellent team player who brings out the best in others',
      'Strong communication skills across different personality types',
      'Creates inclusive and supportive environments'
    ],
    challenges: [
      'May avoid necessary conflicts to maintain harmony',
      'Can be overly sensitive to criticism or rejection',
      'Might sacrifice personal needs for group consensus',
      'May struggle with making tough decisions that affect others'
    ],
    workStyle: 'Excels in collaborative environments where teamwork and relationship-building are valued. Prefers consensus-based decision making.',
    communication: 'Warm, inclusive, and emotionally aware. Excellent listener who makes others feel heard and valued.',
    relationships: 'Forms strong, lasting bonds with a wide circle of friends and colleagues. Highly valued for their loyalty and support.',
    leadership: 'Leads through inspiration and relationship-building. Creates strong team cohesion and loyalty.',
    motivation: 'Motivated by meaningful relationships, helping others succeed, and contributing to something larger than themselves.',
    stress: 'Becomes stressed in highly competitive or conflict-heavy environments where relationships are strained.',
    growth: 'Should work on setting healthy boundaries and becoming more comfortable with necessary conflicts.',
    compatibleWith: ['fox', 'tortoise', 'owl'],
    conflictsWith: ['shark']
  },
  tortoise: {
    id: 'tortoise',
    name: 'Tortoise',
    emoji: '🐢',
    title: 'The Steady Achiever',
    description: 'Tortoises are patient, reliable, and persistent. They excel at long-term planning and consistent execution.',
    traits: ['Patience', 'Reliability', 'Persistence', 'Methodical approach', 'Long-term thinking'],
    strengths: [
      'Exceptional patience and ability to work toward long-term goals',
      'Highly reliable and consistent in their efforts',
      'Methodical approach ensures thorough and quality work',
      'Resilient in the face of setbacks and challenges',
      'Provides stability and grounding influence for others'
    ],
    challenges: [
      'May be perceived as slow or resistant to change',
      'Can become overwhelmed by urgent deadlines',
      'Might miss opportunities due to over-cautious approach',
      'May struggle to adapt quickly to unexpected changes'
    ],
    workStyle: 'Prefers structured environments with clear processes and expectations. Excels at long-term projects requiring sustained effort.',
    communication: 'Thoughtful and measured in their words. Prefers written communication for important matters.',
    relationships: 'Forms deep, loyal relationships that develop slowly over time. Highly dependable friend and colleague.',
    leadership: 'Leads through example and steady guidance. Provides stability and continuity during uncertain times.',
    motivation: 'Driven by the satisfaction of completing quality work and achieving long-term goals.',
    stress: 'Becomes stressed when pressured to make quick decisions or adapt rapidly to major changes.',
    growth: 'Should work on becoming more flexible and open to new approaches and technologies.',
    compatibleWith: ['dolphin', 'owl'],
    conflictsWith: ['tiger', 'shark']
  },
  tiger: {
    id: 'tiger',
    name: 'Tiger',
    emoji: '🐅',
    title: 'The Bold Leader',
    description: 'Tigers are confident, decisive, and action-oriented. They excel at taking charge and driving results.',
    traits: ['Confidence', 'Decisiveness', 'Action-oriented', 'Leadership', 'Goal-focused'],
    strengths: [
      'Natural leadership ability with strong presence',
      'Quick decision-maker who takes action when others hesitate',
      'Highly goal-oriented and results-focused',
      'Confident in their abilities and comfortable taking risks',
      'Motivates others through their energy and determination'
    ],
    challenges: [
      'May be perceived as domineering or impatient',
      'Can make hasty decisions without considering all perspectives',
      'Might overlook the importance of team input and collaboration',
      'May become frustrated with slower-paced individuals or processes'
    ],
    workStyle: 'Thrives in fast-paced, competitive environments where quick decisions and bold action are valued.',
    communication: 'Direct, confident, and results-oriented. May need to work on listening and empathy.',
    relationships: 'Forms relationships based on mutual respect and shared goals. Values competence and drive in others.',
    leadership: 'Natural leader who takes charge and drives results. Inspires others through their confidence and energy.',
    motivation: 'Driven by achievement, competition, and the opportunity to lead and make an impact.',
    stress: 'Becomes stressed when progress is slow or when their authority is questioned or undermined.',
    growth: 'Should focus on developing patience, empathy, and collaborative leadership skills.',
    compatibleWith: ['shark'],
    conflictsWith: ['fox', 'tortoise', 'dolphin']
  },
  owl: {
    id: 'owl',
    name: 'Owl',
    emoji: '🦉',
    title: 'The Wise Analyst',
    description: 'Owls are analytical, detail-oriented, and knowledge-seeking. They excel at research, analysis, and providing expertise.',
    traits: ['Analytical thinking', 'Attention to detail', 'Research skills', 'Expertise', 'Objectivity'],
    strengths: [
      'Exceptional analytical and critical thinking abilities',
      'Meticulous attention to detail and accuracy',
      'Deep expertise and knowledge in their areas of interest',
      'Objective and logical approach to problem-solving',
      'Excellent research and information-gathering skills'
    ],
    challenges: [
      'May get lost in details and lose sight of the big picture',
      'Can be perceived as overly critical or perfectionist',
      'Might struggle with ambiguous or incomplete information',
      'May delay decisions while seeking more data'
    ],
    workStyle: 'Excels in environments that value expertise, accuracy, and thorough analysis. Prefers working independently with minimal interruptions.',
    communication: 'Precise, fact-based, and well-researched. Values accuracy and detailed explanations.',
    relationships: 'Forms relationships based on intellectual respect and shared interests. Values competence and reliability.',
    leadership: 'Leads through expertise and knowledge. Provides valuable insights and helps others make informed decisions.',
    motivation: 'Driven by the pursuit of knowledge, accuracy, and the opportunity to solve complex problems.',
    stress: 'Becomes stressed when forced to make decisions without adequate information or when their expertise is questioned.',
    growth: 'Should work on seeing the bigger picture and being more decisive with incomplete information.',
    compatibleWith: ['fox', 'dolphin', 'tortoise'],
    conflictsWith: ['tiger']
  },
  shark: {
    id: 'shark',
    name: 'Shark',
    emoji: '🦈',
    title: 'The Relentless Achiever',
    description: 'Sharks are ambitious, competitive, and focused. They excel at pursuing goals with intensity and determination.',
    traits: ['Ambition', 'Competitiveness', 'Focus', 'Determination', 'Results-oriented'],
    strengths: [
      'Relentless pursuit of goals with unwavering determination',
      'Highly competitive nature that drives peak performance',
      'Laser-focused on results and outcomes',
      'Thrives under pressure and in challenging situations',
      'Efficient and direct in their approach to tasks'
    ],
    challenges: [
      'May prioritize results over relationships and team morale',
      'Can be perceived as aggressive or insensitive',
      'Might burn out from intense focus and high standards',
      'May struggle with work-life balance and relaxation'
    ],
    workStyle: 'Excels in high-pressure, competitive environments where individual performance and results are paramount.',
    communication: 'Direct, efficient, and results-focused. May need to develop more empathy and active listening skills.',
    relationships: 'Forms relationships based on mutual benefit and shared ambition. Values competence and drive.',
    leadership: 'Leads through example and high performance standards. Pushes teams to achieve ambitious goals.',
    motivation: 'Driven by success, recognition, and the opportunity to outperform others and achieve ambitious goals.',
    stress: 'Becomes stressed when progress is blocked or when forced to work in overly collaborative environments.',
    growth: 'Should focus on building relationships, developing empathy, and maintaining work-life balance.',
    compatibleWith: ['tiger'],
    conflictsWith: ['fox', 'dolphin', 'tortoise', 'owl']
  }
};

export const quizTraits = [
  'Strategic thinking',
  'Empathy',
  'Patience',
  'Confidence',
  'Analytical thinking',
  'Ambition',
  'Adaptability',
  'Cooperation',
  'Reliability',
  'Decisiveness',
  'Attention to detail',
  'Competitiveness',
  'Quick wit',
  'Social intelligence',
  'Persistence',
  'Action-oriented',
  'Research skills',
  'Focus',
  'Problem-solving',
  'Communication',
  'Methodical approach',
  'Leadership',
  'Expertise',
  'Determination',
  'Resourcefulness',
  'Team building',
  'Long-term thinking',
  'Goal-focused',
  'Objectivity',
  'Results-oriented'
];

export function determineAnimalType(selectedTraits: string[]): AnimalType {
  const scores: Record<AnimalType, number> = {
    fox: 0,
    dolphin: 0,
    tortoise: 0,
    tiger: 0,
    owl: 0,
    shark: 0
  };

  // Score each animal based on selected traits
  selectedTraits.forEach(trait => {
    Object.entries(animalArchetypes).forEach(([animalType, archetype]) => {
      if (archetype.traits.includes(trait)) {
        scores[animalType as AnimalType] += 2; // Primary traits get 2 points
      }
      // Check if trait appears in strengths (1 point)
      if (archetype.strengths.some(strength => strength.toLowerCase().includes(trait.toLowerCase()))) {
        scores[animalType as AnimalType] += 1;
      }
    });
  });

  // Find the animal with the highest score
  return Object.entries(scores).reduce((a, b) => 
    scores[a[0] as AnimalType] > scores[b[0] as AnimalType] ? a : b
  )[0] as AnimalType;
}