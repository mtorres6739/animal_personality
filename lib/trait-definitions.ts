export interface TraitDefinition {
  name: string;
  definition: string;
  examples: string[];
  relatedTo: string[];
}

export const traitDefinitions: Record<string, TraitDefinition> = {
  'Persistent': {
    name: 'Persistent',
    definition: 'Continuing steadily despite problems or difficulties, refusing to give up on important goals.',
    examples: [
      'Working through challenges without losing motivation',
      'Maintaining effort when progress is slow',
      'Following through on commitments despite obstacles'
    ],
    relatedTo: ['Determined', 'Patient', 'Goal-oriented']
  },
  'Adventurous': {
    name: 'Adventurous',
    definition: 'Willing to take risks and try new experiences, embracing uncertainty and change.',
    examples: [
      'Seeking out new challenges and opportunities',
      'Taking calculated risks for potential rewards',
      'Exploring unfamiliar situations with enthusiasm'
    ],
    relatedTo: ['Risk taker', 'Curious', 'Independent']
  },
  'Thorough': {
    name: 'Thorough',
    definition: 'Performing tasks completely and carefully, paying attention to all details and requirements.',
    examples: [
      'Double-checking work for accuracy and completeness',
      'Researching all aspects before making decisions',
      'Following procedures methodically'
    ],
    relatedTo: ['Meticulous', 'Accurate', 'Procedural']
  },
  'Patient': {
    name: 'Patient',
    definition: 'Able to wait calmly for results, tolerating delays without becoming frustrated or anxious.',
    examples: [
      'Working steadily toward long-term goals',
      'Teaching others without showing irritation',
      'Waiting for the right opportunity to act'
    ],
    relatedTo: ['Persistent', 'Peaceful', 'Dependable']
  },
  'Powerful': {
    name: 'Powerful',
    definition: 'Having strong influence and the ability to make significant impact on situations and people.',
    examples: [
      'Taking charge in challenging situations',
      'Influencing outcomes through strong presence',
      'Making decisions that affect important outcomes'
    ],
    relatedTo: ['Influential', 'Strong willed', 'Assertive']
  },
  'Charismatic': {
    name: 'Charismatic',
    definition: 'Naturally appealing and inspiring to others, able to attract and motivate people.',
    examples: [
      'Drawing others in with natural charm',
      'Inspiring people to follow your lead',
      'Creating enthusiasm and excitement in groups'
    ],
    relatedTo: ['Talkative', 'Enthusiastic', 'Social']
  },
  'Logical': {
    name: 'Logical',
    definition: 'Making decisions based on reason and systematic thinking rather than emotion.',
    examples: [
      'Analyzing problems step-by-step',
      'Making choices based on facts and evidence',
      'Approaching situations rationally'
    ],
    relatedTo: ['Practical', 'Accurate', 'Conventional']
  },
  'Sincere': {
    name: 'Sincere',
    definition: 'Honest and genuine in thoughts, feelings, and actions, without pretense or deception.',
    examples: [
      'Speaking truthfully even when difficult',
      'Showing authentic emotions and reactions',
      'Being consistent between private thoughts and public actions'
    ],
    relatedTo: ['Respectful', 'Charitable', 'Idealistic']
  },
  'Motivated': {
    name: 'Motivated',
    definition: 'Having strong reasons for acting and maintaining enthusiasm for achieving goals.',
    examples: [
      'Maintaining energy and drive toward objectives',
      'Finding internal reasons to keep working',
      'Staying focused on desired outcomes'
    ],
    relatedTo: ['Driven', 'Goal oriented', 'Achieving']
  },
  'Optimistic': {
    name: 'Optimistic',
    definition: 'Hopeful and confident about the future, expecting positive outcomes.',
    examples: [
      'Seeing opportunities in challenging situations',
      'Maintaining positive attitude during setbacks',
      'Encouraging others with hopeful perspective'
    ],
    relatedTo: ['Enthusiastic', 'Cheerful', 'People focused']
  },
  'Practical': {
    name: 'Practical',
    definition: 'Focused on what actually works in real situations, preferring sensible approaches.',
    examples: [
      'Choosing solutions that are feasible and effective',
      'Prioritizing functionality over theory',
      'Making realistic plans and expectations'
    ],
    relatedTo: ['Logical', 'Procedural', 'Dependable']
  },
  'Accurate': {
    name: 'Accurate',
    definition: 'Precise and correct in details, careful to avoid errors or mistakes.',
    examples: [
      'Checking facts and figures carefully',
      'Paying attention to specific requirements',
      'Ensuring quality and correctness in work'
    ],
    relatedTo: ['Thorough', 'Meticulous', 'Logical']
  },
  'Competitive': {
    name: 'Competitive',
    definition: 'Driven to outperform others and win in challenging situations.',
    examples: [
      'Thriving in contests and challenges',
      'Setting high standards to beat others',
      'Using comparison as motivation to excel'
    ],
    relatedTo: ['Driven', 'Achieving', 'Strong willed']
  },
  'Demanding': {
    name: 'Demanding',
    definition: 'Having high expectations and standards, requiring excellence from self and others.',
    examples: [
      'Setting challenging goals and expectations',
      'Insisting on quality and high performance',
      'Not accepting mediocre results'
    ],
    relatedTo: ['Perfectionist', 'Achieving', 'Strong willed']
  },
  'Risk taker': {
    name: 'Risk taker',
    definition: 'Willing to accept uncertainty and potential loss for the chance of gain.',
    examples: [
      'Making bold decisions with uncertain outcomes',
      'Investing time or resources in unproven opportunities',
      'Choosing challenging paths over safe options'
    ],
    relatedTo: ['Adventurous', 'Impulsive', 'Independent']
  },
  'Serious': {
    name: 'Serious',
    definition: 'Thoughtful and focused, treating important matters with appropriate gravity.',
    examples: [
      'Approaching tasks with careful consideration',
      'Maintaining professional demeanor in work situations',
      'Taking responsibilities seriously'
    ],
    relatedTo: ['Respectful', 'Conventional', 'Procedural']
  },
  'Compassionate': {
    name: 'Compassionate',
    definition: 'Showing deep concern for others\' suffering and a desire to help.',
    examples: [
      'Feeling empathy for others in difficult situations',
      'Taking action to help those in need',
      'Considering the impact of decisions on others'
    ],
    relatedTo: ['Charitable', 'People focused', 'Selfless']
  },
  'Driven': {
    name: 'Driven',
    definition: 'Intensely motivated to achieve goals, with strong internal push toward success.',
    examples: [
      'Working long hours to reach objectives',
      'Maintaining focus despite distractions',
      'Pushing through obstacles with determination'
    ],
    relatedTo: ['Motivated', 'Competitive', 'Goal oriented']
  },
  'Curious': {
    name: 'Curious',
    definition: 'Eager to know and learn more, asking questions and exploring new ideas.',
    examples: [
      'Investigating how things work',
      'Asking thoughtful questions to understand better',
      'Exploring new subjects and areas of knowledge'
    ],
    relatedTo: ['Adventurous', 'Seeking', 'Independent']
  },
  'Passionate': {
    name: 'Passionate',
    definition: 'Showing intense enthusiasm and strong feelings about important matters.',
    examples: [
      'Speaking with energy about things you care about',
      'Investing significant time in meaningful activities',
      'Showing strong emotional commitment to causes'
    ],
    relatedTo: ['Enthusiastic', 'Motivated', 'Idealistic']
  },
  'Talkative': {
    name: 'Talkative',
    definition: 'Enjoying conversation and communication, readily sharing thoughts and ideas.',
    examples: [
      'Engaging others in conversation easily',
      'Sharing stories and experiences openly',
      'Contributing actively to group discussions'
    ],
    relatedTo: ['Social', 'Charismatic', 'Enthusiastic']
  },
  'Assertive': {
    name: 'Assertive',
    definition: 'Confident in expressing opinions and needs while respecting others.',
    examples: [
      'Speaking up for your ideas in meetings',
      'Setting clear boundaries with others',
      'Advocating for what you believe is right'
    ],
    relatedTo: ['Powerful', 'Strong willed', 'Forward']
  },
  'Independent': {
    name: 'Independent',
    definition: 'Preferring to work and make decisions autonomously, relying on own capabilities.',
    examples: [
      'Working effectively without close supervision',
      'Making decisions without needing approval',
      'Taking responsibility for own actions and outcomes'
    ],
    relatedTo: ['Risk taker', 'Strong willed', 'Seeking']
  },
  'Enthusiastic': {
    name: 'Enthusiastic',
    definition: 'Showing eager enjoyment and interest, approaching tasks with positive energy.',
    examples: [
      'Bringing energy and excitement to projects',
      'Inspiring others with positive attitude',
      'Approaching challenges with eagerness'
    ],
    relatedTo: ['Optimistic', 'Passionate', 'Cheerful']
  },
  'Idealistic': {
    name: 'Idealistic',
    definition: 'Having high principles and standards, working toward noble goals and values.',
    examples: [
      'Standing up for important principles',
      'Working toward making positive change',
      'Maintaining hope for better outcomes'
    ],
    relatedTo: ['Sincere', 'Charitable', 'Selfless']
  },
  'Charitable': {
    name: 'Charitable',
    definition: 'Generous in giving help and showing kindness toward others.',
    examples: [
      'Helping others without expecting return',
      'Donating time or resources to good causes',
      'Showing kindness to those in need'
    ],
    relatedTo: ['Compassionate', 'Selfless', 'People focused']
  },
  'Peaceful': {
    name: 'Peaceful',
    definition: 'Preferring harmony and avoiding conflict, maintaining calm in difficult situations.',
    examples: [
      'Staying calm during stressful situations',
      'Seeking compromise rather than confrontation',
      'Creating harmonious environments'
    ],
    relatedTo: ['Patient', 'Respectful', 'Conventional']
  },
  'Strong willed': {
    name: 'Strong willed',
    definition: 'Determined to do what you believe is right, not easily influenced by others.',
    examples: [
      'Sticking to decisions despite pressure to change',
      'Pursuing goals even when others disagree',
      'Maintaining personal standards and values'
    ],
    relatedTo: ['Assertive', 'Independent', 'Demanding']
  },
  'Respectful': {
    name: 'Respectful',
    definition: 'Showing consideration and regard for others, their feelings, and their rights.',
    examples: [
      'Listening to others without interrupting',
      'Considering different viewpoints fairly',
      'Treating everyone with dignity'
    ],
    relatedTo: ['Sincere', 'Peaceful', 'Conventional']
  },
  'Cheerful': {
    name: 'Cheerful',
    definition: 'Maintaining a positive and happy disposition, bringing lightness to situations.',
    examples: [
      'Smiling and laughing easily',
      'Finding reasons to be happy in daily life',
      'Lifting others\' spirits with positive energy'
    ],
    relatedTo: ['Optimistic', 'Enthusiastic', 'Social']
  },
  'Goal oriented': {
    name: 'Goal oriented',
    definition: 'Focused on achieving specific objectives, organizing efforts around desired outcomes.',
    examples: [
      'Setting clear targets for projects and activities',
      'Measuring progress toward specific objectives',
      'Prioritizing activities that advance important goals'
    ],
    relatedTo: ['Driven', 'Achieving', 'Procedural']
  },
  'Procedural': {
    name: 'Procedural',
    definition: 'Following established methods and systems, preferring organized approaches.',
    examples: [
      'Using step-by-step processes for complex tasks',
      'Following established guidelines and protocols',
      'Creating systematic approaches to work'
    ],
    relatedTo: ['Thorough', 'Conventional', 'Meticulous']
  },
  'Selfless': {
    name: 'Selfless',
    definition: 'Putting others\' needs before your own, acting for the benefit of others.',
    examples: [
      'Sacrificing personal gain to help others',
      'Volunteering time for community benefit',
      'Considering others\' welfare in decisions'
    ],
    relatedTo: ['Charitable', 'Compassionate', 'People focused']
  },
  'People focused': {
    name: 'People focused',
    definition: 'Prioritizing relationships and human connections, caring about others\' well-being.',
    examples: [
      'Considering impact on people in all decisions',
      'Building strong personal relationships',
      'Putting team welfare before individual success'
    ],
    relatedTo: ['Social', 'Compassionate', 'Charitable']
  },
  'Achieving': {
    name: 'Achieving',
    definition: 'Successfully reaching goals and completing objectives, focused on accomplishment.',
    examples: [
      'Completing projects successfully and on time',
      'Reaching targets and milestones consistently',
      'Building a track record of accomplishments'
    ],
    relatedTo: ['Goal oriented', 'Driven', 'Competitive']
  },
  'Meticulous': {
    name: 'Meticulous',
    definition: 'Extremely careful and precise, paying attention to the smallest details.',
    examples: [
      'Checking every detail for accuracy',
      'Taking time to ensure perfect quality',
      'Organizing work with extreme care'
    ],
    relatedTo: ['Thorough', 'Accurate', 'Procedural']
  },
  'Seeking': {
    name: 'Seeking',
    definition: 'Actively searching for new knowledge, experiences, or opportunities.',
    examples: [
      'Looking for ways to learn and grow',
      'Exploring new possibilities and options',
      'Pursuing answers to important questions'
    ],
    relatedTo: ['Curious', 'Independent', 'Adventurous']
  },
  'Conventional': {
    name: 'Conventional',
    definition: 'Preferring traditional and established ways of doing things, following accepted norms.',
    examples: [
      'Using proven methods and approaches',
      'Following established social and professional customs',
      'Preferring stability over radical change'
    ],
    relatedTo: ['Procedural', 'Respectful', 'Practical']
  },
  'Social': {
    name: 'Social',
    definition: 'Enjoying interaction with others, preferring group activities and collaboration.',
    examples: [
      'Thriving in team environments',
      'Building networks and relationships easily',
      'Enjoying group activities and social events'
    ],
    relatedTo: ['Talkative', 'People focused', 'Charismatic']
  },
  'Dependable': {
    name: 'Dependable',
    definition: 'Reliable and trustworthy, consistently meeting commitments and expectations.',
    examples: [
      'Following through on promises consistently',
      'Being available when others need support',
      'Maintaining steady performance over time'
    ],
    relatedTo: ['Patient', 'Practical', 'Conventional']
  },
  'Influential': {
    name: 'Influential',
    definition: 'Having the power to affect change and guide others\' decisions and actions.',
    examples: [
      'Persuading others to adopt new ideas',
      'Leading change initiatives successfully',
      'Having impact on important decisions'
    ],
    relatedTo: ['Powerful', 'Charismatic', 'Assertive']
  },
  'Impulsive': {
    name: 'Impulsive',
    definition: 'Acting on sudden urges or feelings without careful planning or consideration.',
    examples: [
      'Making quick decisions based on instinct',
      'Jumping into new opportunities without extensive analysis',
      'Responding immediately to interesting possibilities'
    ],
    relatedTo: ['Risk taker', 'Adventurous', 'Passionate']
  },
  'Perfectionist': {
    name: 'Perfectionist',
    definition: 'Striving for flawless results and having very high standards for quality.',
    examples: [
      'Refusing to settle for "good enough" results',
      'Spending extra time to achieve excellent quality',
      'Setting extremely high standards for self and others'
    ],
    relatedTo: ['Demanding', 'Meticulous', 'Achieving']
  },
  'Forward': {
    name: 'Forward',
    definition: 'Direct and bold in approach, willing to take initiative and speak openly.',
    examples: [
      'Addressing issues directly rather than avoiding them',
      'Speaking up about problems or opportunities',
      'Taking initiative to start important conversations'
    ],
    relatedTo: ['Assertive', 'Strong willed', 'Risk taker']
  },
  'Supportive': {
    name: 'Supportive',
    definition: 'Providing encouragement and assistance to others, helping them succeed and feel valued.',
    examples: [
      'Offering help when others are struggling',
      'Encouraging teammates during challenging times',
      'Celebrating others\' successes and achievements'
    ],
    relatedTo: ['Compassionate', 'People focused', 'Charitable']
  },
  'Analytical': {
    name: 'Analytical',
    definition: 'Examining situations systematically, breaking down complex information to understand patterns.',
    examples: [
      'Studying data to identify trends and insights',
      'Breaking complex problems into manageable parts',
      'Using logic and reasoning to evaluate options'
    ],
    relatedTo: ['Logical', 'Thorough', 'Seeking']
  }
};

export function getTraitDefinition(traitName: string): TraitDefinition | null {
  return traitDefinitions[traitName] || null;
}