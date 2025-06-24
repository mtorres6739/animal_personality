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
  },
  // Additional traits from quiz questions
  'Restless': {
    name: 'Restless',
    definition: 'Having difficulty staying still or focused, always seeking new stimulation and activity.',
    examples: [
      'Feeling the need to constantly move or change activities',
      'Getting bored easily with routine tasks'
    ],
    relatedTo: ['Impulsive', 'Seeking', 'Adventurous']
  },
  'Harsh': {
    name: 'Harsh',
    definition: 'Direct and sometimes blunt in communication, prioritizing honesty over diplomacy.',
    examples: [
      'Speaking directly about problems without sugar-coating',
      'Giving feedback that may seem critical but is meant to help'
    ],
    relatedTo: ['Forward', 'Assertive', 'Strong willed']
  },
  'Dependent': {
    name: 'Dependent',
    definition: 'Preferring to rely on others for support and guidance rather than acting independently.',
    examples: [
      'Seeking approval before making important decisions',
      'Feeling more comfortable when working with others'
    ],
    relatedTo: ['Supportive', 'People focused', 'Peaceful']
  },
  'Moralistic': {
    name: 'Moralistic',
    definition: 'Having strong beliefs about right and wrong, and expecting others to follow the same moral standards.',
    examples: [
      'Standing firm on ethical principles',
      'Feeling uncomfortable when others act against your values'
    ],
    relatedTo: ['Idealistic', 'Respectful', 'Conventional']
  },
  'Pleasant': {
    name: 'Pleasant',
    definition: 'Friendly, agreeable, and enjoyable to be around; creating positive interactions.',
    examples: [
      'Making others feel comfortable in social situations',
      'Maintaining a positive attitude even during challenges'
    ],
    relatedTo: ['Cheerful', 'Social', 'Compassionate']
  },
  'Motivator': {
    name: 'Motivator',
    definition: 'Someone who inspires and encourages others to achieve their goals and potential.',
    examples: [
      'Helping team members see their strengths and possibilities',
      'Encouraging others to push through difficult challenges'
    ],
    relatedTo: ['Charismatic', 'Enthusiastic', 'People focused']
  },
  'Willing': {
    name: 'Willing',
    definition: 'Ready and eager to help, participate, or take on new challenges.',
    examples: [
      'Volunteering for new projects or responsibilities',
      'Being open to trying different approaches'
    ],
    relatedTo: ['Supportive', 'Adventurous', 'Cooperative']
  },
  // Challenging traits from question 7
  'Uninvolved': {
    name: 'Uninvolved',
    definition: 'Preferring to stay detached from situations rather than actively participating.',
    examples: [
      'Choosing to observe rather than engage in group activities',
      'Maintaining emotional distance from workplace conflicts'
    ],
    relatedTo: ['Independent', 'Withdrawn', 'Conventional']
  },
  'Undisciplined': {
    name: 'Undisciplined',
    definition: 'Having difficulty maintaining self-control or following structured routines.',
    examples: [
      'Struggling to stick to schedules or deadlines',
      'Acting on impulse rather than following plans'
    ],
    relatedTo: ['Impulsive', 'Restless', 'Adventurous']
  },
  'Unemotional': {
    name: 'Unemotional',
    definition: 'Not easily affected by or expressing emotions; maintaining emotional distance.',
    examples: [
      'Staying calm and rational during emotional situations',
      'Making decisions based on logic rather than feelings'
    ],
    relatedTo: ['Logical', 'Analytical', 'Independent']
  },
  'Unsympathetic': {
    name: 'Unsympathetic',
    definition: 'Having difficulty understanding or sharing the feelings of others.',
    examples: [
      'Focusing on facts rather than emotions in conversations',
      'Expecting others to handle their problems independently'
    ],
    relatedTo: ['Logical', 'Demanding', 'Independent']
  },
  // Additional traits
  'Severe': {
    name: 'Severe',
    definition: 'Strict and demanding in standards; not tolerating mistakes or weakness.',
    examples: [
      'Setting very high expectations for performance',
      'Being critical when standards are not met'
    ],
    relatedTo: ['Demanding', 'Perfectionist', 'Strong willed']
  },
  'Compromising': {
    name: 'Compromising',
    definition: 'Willing to find middle ground and make mutual concessions to reach agreement.',
    examples: [
      'Finding solutions that work for everyone involved',
      'Being flexible about your preferences to maintain harmony'
    ],
    relatedTo: ['Peaceful', 'Respectful', 'People focused']
  },
  // More challenging traits
  'Myopic': {
    name: 'Myopic',
    definition: 'Focused on immediate concerns without considering long-term consequences.',
    examples: [
      'Making decisions based on short-term benefits',
      'Having difficulty seeing the bigger picture'
    ],
    relatedTo: ['Impulsive', 'Demanding', 'Focused']
  },
  'Predictable': {
    name: 'Predictable',
    definition: 'Consistent and reliable in behavior; others know what to expect from you.',
    examples: [
      'Following the same routines and approaches consistently',
      'Responding to situations in expected ways'
    ],
    relatedTo: ['Dependable', 'Conventional', 'Procedural']
  },
  'Interrupts': {
    name: 'Interrupts',
    definition: 'Tendency to break into conversations or activities before others are finished.',
    examples: [
      'Speaking up with ideas before others complete their thoughts',
      'Jumping into activities without waiting for instructions'
    ],
    relatedTo: ['Impulsive', 'Enthusiastic', 'Forward']
  },
  'Reacting': {
    name: 'Reacting',
    definition: 'Responding immediately to situations based on emotions rather than reflection.',
    examples: [
      'Giving quick responses to unexpected situations',
      'Acting on first instincts rather than careful consideration'
    ],
    relatedTo: ['Impulsive', 'Passionate', 'Emotional']
  },
  'Minimize risk': {
    name: 'Minimize risk',
    definition: 'Preferring safe, proven approaches and avoiding uncertain situations.',
    examples: [
      'Choosing well-tested methods over experimental approaches',
      'Avoiding situations with unpredictable outcomes'
    ],
    relatedTo: ['Conventional', 'Practical', 'Careful']
  },
  'Risk averse': {
    name: 'Risk averse',
    definition: 'Strongly preferring certainty and security over potentially rewarding but uncertain options.',
    examples: [
      'Choosing stable options even if they offer lower rewards',
      'Feeling uncomfortable with unpredictable situations'
    ],
    relatedTo: ['Conventional', 'Practical', 'Dependable']
  },
  // Additional traits from later questions
  'Tough': {
    name: 'Tough',
    definition: 'Resilient and able to handle difficult situations without being easily discouraged.',
    examples: [
      'Persevering through challenging circumstances',
      'Maintaining strength during stressful times'
    ],
    relatedTo: ['Strong willed', 'Persistent', 'Independent']
  },
  'Awkward': {
    name: 'Awkward',
    definition: 'Feeling uncomfortable or clumsy in social situations; lacking social ease.',
    examples: [
      'Feeling uncertain about what to say in conversations',
      'Having difficulty reading social cues'
    ],
    relatedTo: ['Shy', 'Withdrawn', 'Serious']
  },
  'Excitable': {
    name: 'Excitable',
    definition: 'Easily aroused to enthusiasm or agitation; quick to show strong emotions.',
    examples: [
      'Getting very enthusiastic about new opportunities',
      'Showing strong reactions to unexpected events'
    ],
    relatedTo: ['Enthusiastic', 'Passionate', 'Impulsive']
  },
  'Withdrawn': {
    name: 'Withdrawn',
    definition: 'Tending to avoid social interaction and keep to oneself.',
    examples: [
      'Preferring to work alone rather than in groups',
      'Feeling drained by too much social interaction'
    ],
    relatedTo: ['Shy', 'Independent', 'Serious']
  },
  'Shy': {
    name: 'Shy',
    definition: 'Feeling nervous or timid in the company of other people.',
    examples: [
      'Feeling uncomfortable speaking up in group settings',
      'Preferring to listen rather than lead conversations'
    ],
    relatedTo: ['Withdrawn', 'Peaceful', 'Respectful']
  },
  'Bossy': {
    name: 'Bossy',
    definition: 'Fond of giving orders and telling others what to do.',
    examples: [
      'Taking charge of situations and directing others',
      'Having strong opinions about how things should be done'
    ],
    relatedTo: ['Assertive', 'Demanding', 'Strong willed']
  },
  // Final set of traits
  'Doormat': {
    name: 'Doormat',
    definition: 'Allowing others to take advantage of you; having difficulty standing up for yourself.',
    examples: [
      'Agreeing to requests even when you prefer not to',
      'Having trouble saying no to others'
    ],
    relatedTo: ['Dependent', 'Peaceful', 'Compromising']
  },
  'Reclusive': {
    name: 'Reclusive',
    definition: 'Preferring to avoid contact with others and live in isolation.',
    examples: [
      'Choosing to spend time alone rather than socializing',
      'Feeling most comfortable in solitary activities'
    ],
    relatedTo: ['Withdrawn', 'Independent', 'Shy']
  },
  'Braggart': {
    name: 'Braggart',
    definition: 'Someone who boasts about their achievements or abilities.',
    examples: [
      'Frequently talking about personal accomplishments',
      'Emphasizing your successes in conversations'
    ],
    relatedTo: ['Confident', 'Talkative', 'Forward']
  },
  'Hotheaded': {
    name: 'Hotheaded',
    definition: 'Quick to anger or lose temper; impulsive in emotional reactions.',
    examples: [
      'Reacting strongly to frustrating situations',
      'Having difficulty controlling anger when provoked'
    ],
    relatedTo: ['Impulsive', 'Passionate', 'Reacting']
  },
  'Vengeful': {
    name: 'Vengeful',
    definition: 'Seeking to harm someone in return for a perceived injury or wrong.',
    examples: [
      'Remembering slights and wanting to get even',
      'Having difficulty forgiving those who have wronged you'
    ],
    relatedTo: ['Demanding', 'Strong willed', 'Unforgiving']
  },
  'Rash': {
    name: 'Rash',
    definition: 'Acting without thinking carefully about consequences; hasty.',
    examples: [
      'Making quick decisions without considering all options',
      'Jumping into situations without proper planning'
    ],
    relatedTo: ['Impulsive', 'Risk taker', 'Excitable']
  },
  'Fearful': {
    name: 'Fearful',
    definition: 'Feeling afraid or anxious about potential dangers or negative outcomes.',
    examples: [
      'Worrying about things that might go wrong',
      'Avoiding situations that feel risky or uncertain'
    ],
    relatedTo: ['Risk averse', 'Cautious', 'Anxious']
  },
  'Consistent': {
    name: 'Consistent',
    definition: 'Acting or behaving in the same way over time; reliable and steady.',
    examples: [
      'Maintaining the same standards and approaches',
      'Being predictable in your responses and decisions'
    ],
    relatedTo: ['Dependable', 'Predictable', 'Conventional']
  },
  'Elaborate': {
    name: 'Elaborate',
    definition: 'Involving many carefully arranged parts or details; complex and detailed.',
    examples: [
      'Providing detailed explanations and descriptions',
      'Creating comprehensive plans with many components'
    ],
    relatedTo: ['Thorough', 'Meticulous', 'Detailed']
  }
};

export function getTraitDefinition(traitName: string): TraitDefinition | null {
  // First try exact match
  if (traitDefinitions[traitName]) {
    return traitDefinitions[traitName];
  }

  // Try capitalized version
  const capitalizedTrait = traitName.charAt(0).toUpperCase() + traitName.slice(1);
  if (traitDefinitions[capitalizedTrait]) {
    return traitDefinitions[capitalizedTrait];
  }

  // Try case-insensitive search
  const lowerTrait = traitName.toLowerCase();
  for (const [key, value] of Object.entries(traitDefinitions)) {
    if (key.toLowerCase() === lowerTrait) {
      return value;
    }
  }

  return null;
}