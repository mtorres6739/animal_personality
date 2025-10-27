import { describe, it, expect } from 'vitest';
import {
  determineAnimalTypeFromResponses,
  getBlendedResultsFromResponses,
  type QuizResponse,
  type AnimalType,
  personalityQuestions
} from '../lib/quiz-data';

/**
 * Helper function to create quiz responses
 * @param optionIndices - Array of 20 numbers (0-3) representing A, B, C, D choices
 * @returns Array of QuizResponse objects
 */
function createResponses(optionIndices: number[]): QuizResponse[] {
  if (optionIndices.length !== 20) {
    throw new Error('Must provide exactly 20 responses');
  }

  return personalityQuestions.map((question, index) => ({
    questionId: question.id,
    selectedOption: question.options[optionIndices[index]],
    optionIndex: optionIndices[index]
  }));
}

/**
 * Helper to create responses with specific counts
 * @param counts - Object with animal type counts (e.g., {dove: 10, owl: 5, peacock: 3, shark: 2})
 */
function createResponsesWithCounts(counts: { dove?: number; owl?: number; peacock?: number; shark?: number }): QuizResponse[] {
  const { dove = 0, owl = 0, peacock = 0, shark = 0 } = counts;
  const total = dove + owl + peacock + shark;

  if (total !== 20) {
    throw new Error(`Total responses must equal 20, got ${total}`);
  }

  const optionIndices: number[] = [];

  // 0=Dove, 1=Owl, 2=Peacock, 3=Shark
  for (let i = 0; i < dove; i++) optionIndices.push(0);
  for (let i = 0; i < owl; i++) optionIndices.push(1);
  for (let i = 0; i < peacock; i++) optionIndices.push(2);
  for (let i = 0; i < shark; i++) optionIndices.push(3);

  return createResponses(optionIndices);
}

/**
 * NOTE: These tests are currently FAILING because the quiz questions are not properly structured.
 *
 * The algorithm now uses TRAIT-BASED scoring (semantic mapping) instead of POSITION-BASED scoring.
 *
 * Current Status:
 * - The tests use REAL quiz questions from personalityQuestions array
 * - The quiz questions have traits in RANDOM positions (not A=Dove, B=Owl, C=Peacock, D=Shark)
 * - Therefore, selecting all "A" answers does NOT give you all Dove traits
 *
 * These tests will PASS once we rewrite the questions to match official DOPE structure
 * where position A always contains Dove traits, B contains Owl traits, etc.
 *
 * This is intentional - the failing tests PROVE the quiz needs to be restructured.
 */
describe('Animal Personality Quiz Scoring Algorithm', () => {

  describe('Pure Personality Tests - Single Animal Type', () => {

    it('should return Dove for all A answers (20 Dove responses)', () => {
      // All option index 0 = Dove (WILL PASS after questions are rewritten)
      const responses = createResponses(Array(20).fill(0));
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('dove');
    });

    it('should return Owl for all B answers (20 Owl responses)', () => {
      // All option index 1 = Owl
      const responses = createResponses(Array(20).fill(1));
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('owl');
    });

    it('should return Peacock for all C answers (20 Peacock responses)', () => {
      // All option index 2 = Peacock
      const responses = createResponses(Array(20).fill(2));
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('peacock');
    });

    it('should return Shark for all D answers (20 Shark responses)', () => {
      // All option index 3 = Shark
      const responses = createResponses(Array(20).fill(3));
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('shark');
    });
  });

  describe('Dominant Personality Tests - Clear Majority', () => {

    it('should return Dove when 15 A answers and 5 B answers (75% Dove)', () => {
      const responses = createResponsesWithCounts({ dove: 15, owl: 5 });
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('dove');
    });

    it('should return Owl when 15 B answers and 5 C answers (75% Owl)', () => {
      const responses = createResponsesWithCounts({ owl: 15, peacock: 5 });
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('owl');
    });

    it('should return Peacock when 15 C answers and 5 D answers (75% Peacock)', () => {
      const responses = createResponsesWithCounts({ peacock: 15, shark: 5 });
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('peacock');
    });

    it('should return Shark when 15 D answers and 5 A answers (75% Shark)', () => {
      const responses = createResponsesWithCounts({ shark: 15, dove: 5 });
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('shark');
    });

    it('should return Dove when 12 A, 4 B, 3 C, 1 D (60% Dove)', () => {
      const responses = createResponsesWithCounts({
        dove: 12,
        owl: 4,
        peacock: 3,
        shark: 1
      });
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('dove');
    });

    it('should return Shark when 11 D, 5 C, 3 B, 1 A (55% Shark)', () => {
      const responses = createResponsesWithCounts({
        shark: 11,
        peacock: 5,
        owl: 3,
        dove: 1
      });
      const result = determineAnimalTypeFromResponses(responses);

      expect(result).toBe('shark');
    });
  });

  describe('Balanced Personality Tests - Tie-Breaking Logic', () => {

    it('should handle equal distribution (5 of each)', () => {
      const responses = createResponsesWithCounts({
        dove: 5,
        owl: 5,
        peacock: 5,
        shark: 5
      });
      const result = determineAnimalTypeFromResponses(responses);

      // The algorithm uses reduce which should consistently return the first highest
      // Based on Object.entries order: dove, owl, peacock, shark
      expect(['dove', 'owl', 'peacock', 'shark']).toContain(result);
    });

    it('should return Owl when 10 A and 10 B (tied between Dove and Owl)', () => {
      const responses = createResponsesWithCounts({ dove: 10, owl: 10 });
      const result = determineAnimalTypeFromResponses(responses);

      // When tied, reduce returns the later one that equals the current max
      // The algorithm uses (a[1] > b[1]) which means ties go to the later entry
      expect(result).toBe('owl');
    });

    it('should return Peacock when 10 B and 10 C (tied between Owl and Peacock)', () => {
      const responses = createResponsesWithCounts({ owl: 10, peacock: 10 });
      const result = determineAnimalTypeFromResponses(responses);

      // When tied, the later entry wins
      expect(result).toBe('peacock');
    });

    it('should return Shark when 10 C and 10 D (tied between Peacock and Shark)', () => {
      const responses = createResponsesWithCounts({ peacock: 10, shark: 10 });
      const result = determineAnimalTypeFromResponses(responses);

      // When tied, the later entry wins
      expect(result).toBe('shark');
    });

    it('should handle three-way tie (7, 7, 6)', () => {
      const responses = createResponsesWithCounts({
        dove: 7,
        owl: 7,
        peacock: 6
      });
      const result = determineAnimalTypeFromResponses(responses);

      // Should return one of the tied highest
      expect(['dove', 'owl']).toContain(result);
    });
  });

  describe('Edge Cases - Invalid or Unusual Input', () => {

    it('should handle empty responses array gracefully', () => {
      const responses: QuizResponse[] = [];

      // Algorithm will process but all scores will be 0
      // reduce will return first entry
      const result = determineAnimalTypeFromResponses(responses);
      expect(['dove', 'owl', 'peacock', 'shark']).toContain(result);
    });

    it('should handle fewer than 20 responses', () => {
      // Create exactly 20 responses first, then take only 10
      const fullResponses = createResponses([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]);
      const partialResponses = fullResponses.slice(0, 10); // First 10 only

      const result = determineAnimalTypeFromResponses(partialResponses);
      expect(['dove', 'owl', 'peacock', 'shark']).toContain(result);
    });

    it('should handle responses with invalid option indices', () => {
      // Create responses with some invalid indices
      const validResponses = createResponsesWithCounts({ dove: 10, owl: 10 });
      const invalidResponse: QuizResponse = {
        questionId: 21,
        selectedOption: 'invalid',
        optionIndex: 999 as any // Invalid index
      };

      const responses = [...validResponses, invalidResponse];

      // Should still process valid responses
      const result = determineAnimalTypeFromResponses(responses);
      expect(['dove', 'owl', 'peacock', 'shark']).toContain(result);
    });

    it('should handle missing question IDs', () => {
      const responses: QuizResponse[] = [
        { questionId: 0, selectedOption: 'test', optionIndex: 0 },
        { questionId: 0, selectedOption: 'test', optionIndex: 1 },
        { questionId: 0, selectedOption: 'test', optionIndex: 2 },
        { questionId: 0, selectedOption: 'test', optionIndex: 3 }
      ];

      const result = determineAnimalTypeFromResponses(responses);
      expect(['dove', 'owl', 'peacock', 'shark']).toContain(result);
    });

    it('should handle duplicate question responses', () => {
      const responses = createResponsesWithCounts({ dove: 20 });
      // Add duplicate responses for question 1
      const duplicates = [...responses, responses[0], responses[0]];

      const result = determineAnimalTypeFromResponses(duplicates);
      expect(result).toBe('dove');
    });
  });

  describe('Blended Results - Percentage Calculations', () => {

    it('should return 100% for pure Dove personality', () => {
      const responses = createResponses(Array(20).fill(0));
      const percentages = getBlendedResultsFromResponses(responses);

      expect(percentages.dove).toBe(100);
      expect(percentages.owl).toBe(0);
      expect(percentages.peacock).toBe(0);
      expect(percentages.shark).toBe(0);
    });

    it('should return 100% for pure Owl personality', () => {
      const responses = createResponses(Array(20).fill(1));
      const percentages = getBlendedResultsFromResponses(responses);

      expect(percentages.dove).toBe(0);
      expect(percentages.owl).toBe(100);
      expect(percentages.peacock).toBe(0);
      expect(percentages.shark).toBe(0);
    });

    it('should return correct percentages for 75% Dove / 25% Owl split', () => {
      const responses = createResponsesWithCounts({ dove: 15, owl: 5 });
      const percentages = getBlendedResultsFromResponses(responses);

      expect(percentages.dove).toBe(75);
      expect(percentages.owl).toBe(25);
      expect(percentages.peacock).toBe(0);
      expect(percentages.shark).toBe(0);
    });

    it('should return correct percentages for equal distribution', () => {
      const responses = createResponsesWithCounts({
        dove: 5,
        owl: 5,
        peacock: 5,
        shark: 5
      });
      const percentages = getBlendedResultsFromResponses(responses);

      expect(percentages.dove).toBe(25);
      expect(percentages.owl).toBe(25);
      expect(percentages.peacock).toBe(25);
      expect(percentages.shark).toBe(25);
    });

    it('should return correct percentages for mixed distribution', () => {
      const responses = createResponsesWithCounts({
        dove: 8,   // 40%
        owl: 6,    // 30%
        peacock: 4, // 20%
        shark: 2   // 10%
      });
      const percentages = getBlendedResultsFromResponses(responses);

      expect(percentages.dove).toBe(40);
      expect(percentages.owl).toBe(30);
      expect(percentages.peacock).toBe(20);
      expect(percentages.shark).toBe(10);
    });

    it('should handle rounding correctly for uneven distributions', () => {
      const responses = createResponsesWithCounts({
        dove: 7,   // 35%
        owl: 7,    // 35%
        peacock: 3, // 15%
        shark: 3   // 15%
      });
      const percentages = getBlendedResultsFromResponses(responses);

      expect(percentages.dove).toBe(35);
      expect(percentages.owl).toBe(35);
      expect(percentages.peacock).toBe(15);
      expect(percentages.shark).toBe(15);

      // Total should equal 100%
      const total = Object.values(percentages).reduce((sum, val) => sum + val, 0);
      expect(total).toBe(100);
    });

    it('should handle empty responses gracefully', () => {
      const responses: QuizResponse[] = [];
      const percentages = getBlendedResultsFromResponses(responses);

      // All percentages should be 0 for empty input
      expect(percentages.dove).toBe(0);
      expect(percentages.owl).toBe(0);
      expect(percentages.peacock).toBe(0);
      expect(percentages.shark).toBe(0);
    });
  });

  describe('Real-World Scenarios', () => {

    it('should handle a real mixed personality profile', () => {
      // Scenario: Someone who is mostly Peacock (creative/social)
      // with some Dove (supportive) tendencies
      const responses = createResponsesWithCounts({
        peacock: 12,  // 60%
        dove: 5,      // 25%
        owl: 2,       // 10%
        shark: 1      // 5%
      });

      const result = determineAnimalTypeFromResponses(responses);
      const percentages = getBlendedResultsFromResponses(responses);

      expect(result).toBe('peacock');
      expect(percentages.peacock).toBe(60);
      expect(percentages.dove).toBe(25);
      expect(percentages.owl).toBe(10);
      expect(percentages.shark).toBe(5);
    });

    it('should handle a balanced leader profile', () => {
      // Scenario: Leader with equal parts Shark and Peacock
      const responses = createResponsesWithCounts({
        peacock: 9,   // 45%
        shark: 9,     // 45%
        owl: 2        // 10%
      });

      const result = determineAnimalTypeFromResponses(responses);
      const percentages = getBlendedResultsFromResponses(responses);

      // When tied, the later entry (shark) wins due to reduce logic
      expect(result).toBe('shark');
      expect(percentages.shark).toBe(45);
      expect(percentages.peacock).toBe(45);
      expect(percentages.owl).toBe(10);
    });

    it('should handle analytical supporter profile', () => {
      // Scenario: Data analyst who is supportive
      const responses = createResponsesWithCounts({
        owl: 10,      // 50%
        dove: 8,      // 40%
        shark: 2      // 10%
      });

      const result = determineAnimalTypeFromResponses(responses);
      const percentages = getBlendedResultsFromResponses(responses);

      expect(result).toBe('owl');
      expect(percentages.owl).toBe(50);
      expect(percentages.dove).toBe(40);
      expect(percentages.shark).toBe(10);
      expect(percentages.peacock).toBe(0);
    });
  });

  describe('Algorithm Consistency', () => {

    it('should return same result for same input (deterministic)', () => {
      const responses = createResponsesWithCounts({
        dove: 8,
        owl: 6,
        peacock: 4,
        shark: 2
      });

      const result1 = determineAnimalTypeFromResponses(responses);
      const result2 = determineAnimalTypeFromResponses(responses);
      const result3 = determineAnimalTypeFromResponses(responses);

      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });

    it('should have matching percentages and final result', () => {
      const responses = createResponsesWithCounts({
        shark: 11,
        owl: 5,
        peacock: 3,
        dove: 1
      });

      const result = determineAnimalTypeFromResponses(responses);
      const percentages = getBlendedResultsFromResponses(responses);

      // The result should match the highest percentage
      const highestAnimal = Object.entries(percentages)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0] as AnimalType;

      expect(result).toBe(highestAnimal);
    });

    it('should respect the option-to-animal mapping (0=Dove, 1=Owl, 2=Peacock, 3=Shark)', () => {
      // Test each mapping individually
      const doveResponses = createResponses(Array(20).fill(0));
      const owlResponses = createResponses(Array(20).fill(1));
      const peacockResponses = createResponses(Array(20).fill(2));
      const sharkResponses = createResponses(Array(20).fill(3));

      expect(determineAnimalTypeFromResponses(doveResponses)).toBe('dove');
      expect(determineAnimalTypeFromResponses(owlResponses)).toBe('owl');
      expect(determineAnimalTypeFromResponses(peacockResponses)).toBe('peacock');
      expect(determineAnimalTypeFromResponses(sharkResponses)).toBe('shark');
    });
  });

  describe('Boundary Conditions', () => {

    it('should handle minimum Dove dominance (11 Dove vs 9 others)', () => {
      const responses = createResponsesWithCounts({
        dove: 11,
        owl: 3,
        peacock: 3,
        shark: 3
      });

      const result = determineAnimalTypeFromResponses(responses);
      expect(result).toBe('dove');
    });

    it('should handle near-tie scenarios (10 vs 9 vs 1)', () => {
      const responses = createResponsesWithCounts({
        peacock: 10,
        shark: 9,
        dove: 1
      });

      const result = determineAnimalTypeFromResponses(responses);
      expect(result).toBe('peacock');
    });

    it('should handle sequential pattern (A, B, C, D, repeated)', () => {
      const pattern = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
      const responses = createResponses(pattern);

      // Should result in equal distribution
      const percentages = getBlendedResultsFromResponses(responses);
      expect(percentages.dove).toBe(25);
      expect(percentages.owl).toBe(25);
      expect(percentages.peacock).toBe(25);
      expect(percentages.shark).toBe(25);
    });
  });
});
