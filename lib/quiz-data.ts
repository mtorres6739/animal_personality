export type AnimalType = 'dove' | 'owl' | 'peacock' | 'shark';

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
  famousPeople: string[];
  careersToAvoid: string[];
  idealCareers: string[];
}

export const animalArchetypes: Record<AnimalType, AnimalArchetype> = {

  dove: {
    id: 'dove',
    name: 'Dove',
    emoji: '🕊️',
    title: 'The Peaceful Supporter',
    description: 'Doves are peaceful, friendly, and loyal. They excel at supporting others and maintaining harmony while avoiding conflict and change.',
    traits: ['Peaceful', 'Friendly', 'Loyal', 'Team-oriented', 'Supportive'],
    strengths: [
      'Empathetic and supportive, always putting others first',
      'Patient and dependable, providing stability to teams',
      'Collaboration-focused, excelling in team environments',
      'Harmony-building, creating peaceful work environments',
      'Excellent listener who makes others feel valued and heard'
    ],
    challenges: [
      'Avoids necessary conflicts and difficult conversations',
      'Resistant to change and new approaches',
      'May be too risk-averse and miss opportunities',
      'Struggles with assertiveness and self-advocacy'
    ],
    workStyle: 'Excels in stable, collaborative environments where teamwork and relationship-building are valued. Prefers predictable routines and consensus-based decision making.',
    communication: 'Warm, gentle, and non-confrontational. Excellent listener who avoids conflict and seeks harmony in all interactions.',
    relationships: 'Forms deep, loyal relationships built on trust and mutual support. Highly valued for their reliability and caring nature.',
    leadership: 'Leads through service and support. Creates inclusive environments where everyone feels valued and heard.',
    motivation: 'Motivated by helping others, maintaining harmony, and contributing to team success in a supportive role.',
    stress: 'Becomes stressed when faced with conflict, rapid change, or pressure to be assertive and competitive.',
    growth: 'Should work on becoming more comfortable with necessary conflicts and developing assertiveness skills.',
    compatibleWith: ['owl', 'peacock'],
    conflictsWith: ['shark'],
    famousPeople: ['Oprah Winfrey', 'Ellen DeGeneres', 'Barack Obama', 'Maya Angelou', 'Fred Rogers'],
    careersToAvoid: [
      'Debt Collector',
      'Corporate Auditor',
      'Security Guard',
      'Quality Control Inspector',
      'Parking Enforcement Officer'
    ],
    idealCareers: [
      'Chief People Officer',
      'Organizational Development Director',
      'Executive Coach',
      'Nonprofit Executive Director',
      'Chief Diversity Officer',
      'Patient Experience Officer'
    ]
  },
  peacock: {
    id: 'peacock',
    name: 'Peacock',
    emoji: '🦚',
    title: 'The Charismatic Communicator',
    description: 'Peacocks are showy, talkative, and optimistic. They excel at inspiring others and building relationships through their enthusiasm and creativity.',
    traits: ['Showy', 'Talkative', 'Optimistic', 'Enthusiastic', 'Attention-seeking'],
    strengths: [
      'Creative and energetic communicator who inspires others',
      'Natural ability to see the big picture and envision possibilities',
      'Excellent at building relationships and networking',
      'Brings enthusiasm and positive energy to teams',
      'Skilled at motivating others and generating excitement for ideas'
    ],
    challenges: [
      'May neglect important details in favor of the big picture',
      'Can struggle with time management and meeting deadlines',
      'Might dominate conversations and seek too much attention',
      'May lose interest in projects once the initial excitement fades'
    ],
    workStyle: 'Thrives in dynamic, people-focused environments where creativity and communication are valued. Prefers variety and social interaction.',
    communication: 'Expressive, enthusiastic, and persuasive. Excellent at presenting ideas and inspiring others with their vision.',
    relationships: 'Forms many relationships easily and enjoys being the center of attention. Values fun and excitement in interactions.',
    leadership: 'Leads through inspiration and charisma. Motivates teams with their enthusiasm and ability to paint compelling visions.',
    motivation: 'Driven by recognition, social interaction, and the opportunity to influence and inspire others.',
    stress: 'Becomes stressed in highly detailed, routine work or when forced to work in isolation for extended periods.',
    growth: 'Should focus on developing attention to detail, time management skills, and following through on commitments.',
    compatibleWith: ['dove', 'shark'],
    conflictsWith: ['owl'],
    famousPeople: ['Tony Robbins', 'Richard Branson', 'Oprah Winfrey', 'Robin Williams', 'Steve Jobs'],
    careersToAvoid: [
      'Data Analyst',
      'Accountant',
      'Quality Control Inspector',
      'Library Researcher',
      'Technical Writer'
    ],
    idealCareers: [
      'Chief Marketing Officer',
      'Sales Director',
      'Public Relations Manager',
      'Creative Director',
      'Motivational Speaker',
      'Entertainment Executive'
    ]
  },
  owl: {
    id: 'owl',
    name: 'Owl',
    emoji: '🦉',
    title: 'The Methodical Perfectionist',
    description: 'Owls are logical, detail-oriented, and methodical. They excel at systematic analysis and maintaining high standards through structured approaches.',
    traits: ['Logical', 'Detail-oriented', 'Methodical', 'Perfectionist', 'Rule-following'],
    strengths: [
      'Analytical and well-organized in their approach to problems',
      'Thorough and meticulous, ensuring high-quality outcomes',
      'Quality-focused with exceptional attention to detail',
      'Ideal for data-driven roles requiring precision',
      'Values structure and follows established procedures'
    ],
    challenges: [
      'May get lost in details and lose sight of the big picture',
      'Can be overly perfectionist, causing delays',
      'Slow to make decisions due to need for complete information',
      'May struggle with ambiguous or rapidly changing situations'
    ],
    workStyle: 'Excels in structured environments with clear rules and procedures. Prefers working independently with time to analyze and perfect their work.',
    communication: 'Precise, fact-based, and methodical. Values accuracy and detailed explanations over quick decisions.',
    relationships: 'Forms relationships based on mutual respect for competence and reliability. Values consistency and dependability.',
    leadership: 'Leads through expertise and systematic approaches. Ensures quality and accuracy in all team outputs.',
    motivation: 'Driven by the pursuit of perfection, accuracy, and the opportunity to work within well-defined systems.',
    stress: 'Becomes stressed when forced to make quick decisions without adequate analysis or when working in chaotic environments.',
    growth: 'Should work on being more decisive with incomplete information and focusing on practical outcomes over perfection.',
    compatibleWith: ['dove', 'shark'],
    conflictsWith: ['peacock'],
    famousPeople: ['Stephen Hawking', 'Marie Curie', 'Neil deGrasse Tyson', 'Bill Nye', 'Jane Goodall'],
    careersToAvoid: [
      'Sales Representative',
      'Public Relations Manager',
      'Event Planner',
      'Tour Guide',
      'Stand-up Comedian'
    ],
    idealCareers: [
      'Chief Data Officer',
      'Research Director',
      'Principal Scientist',
      'University Professor',
      'Chief Technology Officer',
      'Medical Director'
    ]
  },
  shark: {
    id: 'shark',
    name: 'Shark',
    emoji: '🦈',
    title: 'The Dominant Leader',
    description: 'Sharks are bold, decisive, and dominant. They excel at taking charge and driving results through direct action and challenge-driven approaches.',
    traits: ['Bold', 'Decisive', 'Dominant', 'Direct', 'Challenge-driven'],
    strengths: [
      'Natural leaders who thrive under pressure',
      'Goal-oriented with exceptional focus on results',
      'Quick decision-making abilities in challenging situations',
      'Confident and comfortable taking charge of situations',
      'Drives teams to achieve ambitious goals through determination'
    ],
    challenges: [
      'May be blunt or insensitive in communication',
      'Can be perceived as domineering or overly aggressive',
      'Might overlook team input in favor of quick action',
      'May struggle with patience and collaborative processes'
    ],
    workStyle: 'Excels in high-pressure, fast-paced environments where quick decisions and bold leadership are valued. Prefers autonomy and control.',
    communication: 'Direct, assertive, and results-focused. Values efficiency over diplomacy and may be blunt in delivery.',
    relationships: 'Forms relationships based on mutual respect for competence and results. Values strength and determination in others.',
    leadership: 'Leads through dominance and decisive action. Takes charge naturally and pushes teams toward ambitious goals.',
    motivation: 'Driven by challenges, competition, and the opportunity to lead and achieve significant results.',
    stress: 'Becomes stressed when progress is slow, when micromanaged, or when forced into overly collaborative decision-making.',
    growth: 'Should focus on developing empathy, patience, and collaborative leadership skills to balance their direct approach.',
    compatibleWith: ['peacock', 'owl'],
    conflictsWith: ['dove'],
    famousPeople: ['Michael Jordan', 'Serena Williams', 'Kobe Bryant', 'Martha Stewart', 'Simon Cowell'],
    careersToAvoid: [
      'Social Worker',
      'Elementary School Teacher',
      'Grief Counselor',
      'Non-profit Coordinator',
      'Customer Service Representative'
    ],
    idealCareers: [
      'Investment Banking Managing Director',
      'Private Equity Partner',
      'Chief Operating Officer',
      'Trial Attorney',
      'Professional Athlete',
      'Hedge Fund Manager'
    ]
  }
};

export const quizTraits = [
  'Persistent',
  'Adventurous',
  'Thorough',
  'Patient',
  'Powerful',
  'Charismatic',
  'Logical',
  'Sincere',
  'Motivated',
  'Optimistic',
  'Practical',
  'Accurate',
  'Competitive',
  'Demanding',
  'Risk taker',
  'Serious',
  'Compassionate',
  'Driven',
  'Curious',
  'Passionate',
  'Talkative',
  'Assertive',
  'Independent',
  'Enthusiastic',
  'Idealistic',
  'Charitable',
  'Peaceful',
  'Strong willed',
  'Respectful',
  'Cheerful',
  'Goal oriented',
  'Procedural',
  'Selfless',
  'People focused',
  'Achieving',
  'Meticulous',
  'Seeking',
  'Conventional',
  'Social',
  'Dependable',
  'Influential',
  'Impulsive',
  'Perfectionist',
  'Forward',
  'Supportive',
  'Analytical'
];

// New 20-question personality assessment structure
export interface QuizQuestion {
  id: number;
  options: [string, string, string, string]; // Exactly 4 options: A, B, C, D
}

export const personalityQuestions: QuizQuestion[] = [
  { id: 1, options: ['restless', 'harsh', 'persistent', 'dependent'] },
  { id: 2, options: ['risk taker', 'adventurous', 'thorough', 'patient'] },
  { id: 3, options: ['moralistic', 'pleasant', 'powerful', 'charismatic'] },
  { id: 4, options: ['persistent', 'influential', 'logical', 'sincere'] },
  { id: 5, options: ['interested', 'motivator', 'motivated', 'willing'] },
  { id: 6, options: ['optimistic', 'practical', 'accurate', 'dependable'] },
  { id: 7, options: ['uninvolved', 'undisciplined', 'unemotional', 'unsympathetic'] },
  { id: 8, options: ['severe', 'competitive', 'perfectionist', 'compromising'] },
  { id: 9, options: ['myopic', 'predictable', 'demanding', 'interrupts'] },
  { id: 10, options: ['impulsive', 'reacting', 'minimize risk', 'risk averse'] },
  { id: 11, options: ['tough', 'serious', 'awkward', 'excitable'] },
  { id: 12, options: ['compassionate', 'driven', 'curious', 'passionate'] },
  { id: 13, options: ['withdrawn', 'shy', 'bossy', 'talkative'] },
  { id: 14, options: ['doormat', 'reclusive', 'forward', 'braggart'] },
  { id: 15, options: ['hotheaded', 'vengeful', 'rash', 'fearful'] },
  { id: 16, options: ['consistent', 'achieving', 'meticulous', 'seeking'] },
  { id: 17, options: ['enthusiastic', 'assertive', 'idealistic', 'charitable'] },
  { id: 18, options: ['peaceful', 'independent', 'conventional', 'social'] },
  { id: 19, options: ['elaborate', 'strong willed', 'respectful', 'cheerful'] },
  { id: 20, options: ['goal oriented', 'procedural', 'selfless', 'people focused'] }
];

// Interface for tracking user responses to the 20 questions
export interface QuizResponse {
  questionId: number;
  selectedOption: string;
  optionIndex: number; // 0=A, 1=B, 2=C, 3=D
}

export function determineAnimalType(selectedTraits: string[]): AnimalType {
  const scores: Record<AnimalType, number> = {
    dove: 0,
    owl: 0,
    peacock: 0,
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

// New function to determine animal type from quiz responses
export function determineAnimalTypeFromResponses(responses: QuizResponse[]): AnimalType {
  // Extract selected traits from responses
  const selectedTraits = responses.map(response => response.selectedOption);

  // Use the existing scoring logic
  return determineAnimalType(selectedTraits);
}

// Helper function to convert responses to traits array (for backward compatibility)
export function responsesToTraits(responses: QuizResponse[]): string[] {
  return responses.map(response => response.selectedOption);
}

// Function to get blended results with percentages for all animals
export function getBlendedResults(selectedTraits: string[]): Record<AnimalType, number> {
  const scores: Record<AnimalType, number> = {
    dove: 0,
    owl: 0,
    peacock: 0,
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

  // Calculate total score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Convert to percentages
  const percentages: Record<AnimalType, number> = {
    dove: totalScore > 0 ? Math.round((scores.dove / totalScore) * 100) : 0,
    owl: totalScore > 0 ? Math.round((scores.owl / totalScore) * 100) : 0,
    peacock: totalScore > 0 ? Math.round((scores.peacock / totalScore) * 100) : 0,
    shark: totalScore > 0 ? Math.round((scores.shark / totalScore) * 100) : 0
  };

  return percentages;
}

// Function to get blended results from quiz responses
export function getBlendedResultsFromResponses(responses: QuizResponse[]): Record<AnimalType, number> {
  const selectedTraits = responses.map(response => response.selectedOption);
  return getBlendedResults(selectedTraits);
}