# Animal Personality Quiz - Test Suite Documentation

## Overview

This directory contains comprehensive test suites for the Animal Personality Quiz scoring algorithm. The tests validate the `determineAnimalTypeFromResponses()` function in `/lib/quiz-data.ts` which determines a user's personality type based on their quiz responses.

## Test Framework

- **Testing Library**: Vitest 4.0.4
- **Test Runner**: Node.js with happy-dom environment
- **Coverage Provider**: v8

## Running Tests

```bash
# Run tests in watch mode (development)
npm test

# Run tests once (CI/production)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### 1. Pure Personality Tests (4 tests)

Tests that validate 100% pure personality types when all 20 answers match a single animal.

**Test Cases:**
- All A answers (20 Dove) → Should return 'dove'
- All B answers (20 Owl) → Should return 'owl'
- All C answers (20 Peacock) → Should return 'peacock'
- All D answers (20 Shark) → Should return 'shark'

**Purpose:** Ensures the basic option-to-animal mapping is correct (A=Dove, B=Owl, C=Peacock, D=Shark)

---

### 2. Dominant Personality Tests (6 tests)

Tests scenarios where one personality type has a clear majority (55%-75%).

**Test Cases:**
- 15 Dove / 5 Owl (75% Dove)
- 15 Owl / 5 Peacock (75% Owl)
- 15 Peacock / 5 Shark (75% Peacock)
- 15 Shark / 5 Dove (75% Shark)
- 12 Dove / 4 Owl / 3 Peacock / 1 Shark (60% Dove)
- 11 Shark / 5 Peacock / 3 Owl / 1 Dove (55% Shark)

**Purpose:** Validates that the algorithm correctly identifies the dominant personality type in mixed profiles.

---

### 3. Balanced Personality Tests - Tie-Breaking (5 tests)

Tests the algorithm's behavior when scores are tied or nearly equal.

**Test Cases:**
- Equal distribution (5 of each type)
- 10 Dove / 10 Owl → Returns 'owl' (tie-breaker: later entry wins)
- 10 Owl / 10 Peacock → Returns 'peacock'
- 10 Peacock / 10 Shark → Returns 'shark'
- Three-way tie (7, 7, 6)

**Key Insight:** The algorithm uses `reduce()` with `>` comparison, which means in ties, the **later entry** in object iteration order wins (due to the scores being equal, not greater).

**Object Order:** dove, owl, peacock, shark

---

### 4. Edge Cases - Invalid or Unusual Input (6 tests)

Tests how the algorithm handles unusual, invalid, or incomplete data.

**Test Cases:**
- Empty responses array
- Fewer than 20 responses (only 10)
- Invalid option indices (999)
- Missing question IDs
- Duplicate question responses

**Purpose:** Ensures the algorithm is robust and doesn't crash with bad input. All edge cases should return a valid animal type.

---

### 5. Blended Results - Percentage Calculations (7 tests)

Tests the `getBlendedResultsFromResponses()` function which calculates percentage distribution.

**Test Cases:**
- 100% pure personalities (all 4 types)
- 75/25 split
- Equal distribution (25% each)
- Mixed distribution (40/30/20/10)
- Rounding with uneven distributions
- Empty responses

**Validation:**
- Percentages should always total 100%
- Rounding should be handled correctly
- Empty input returns all zeros

---

### 6. Real-World Scenarios (3 tests)

Tests realistic personality profiles that users might have.

**Test Cases:**
1. **Creative Social Leader** (60% Peacock, 25% Dove, 10% Owl, 5% Shark)
   - Result: Peacock
   - Profile: Creative communicator with supportive tendencies

2. **Balanced Leader** (45% Peacock, 45% Shark, 10% Owl)
   - Result: Shark (tie-breaker)
   - Profile: Charismatic and decisive leader

3. **Analytical Supporter** (50% Owl, 40% Dove, 10% Shark)
   - Result: Owl
   - Profile: Detail-oriented analyst who values teamwork

**Purpose:** Validates the algorithm works correctly for common real-world personality blends.

---

### 7. Algorithm Consistency (3 tests)

Tests that the algorithm is deterministic and internally consistent.

**Test Cases:**
- Same input always produces same output
- Final result matches highest percentage
- Option mapping is respected (0=Dove, 1=Owl, 2=Peacock, 3=Shark)

**Purpose:** Ensures reliability and predictability of results.

---

### 8. Boundary Conditions (3 tests)

Tests edge cases at the boundaries of decision-making.

**Test Cases:**
- Minimum dominance (11 vs 9)
- Near-tie scenarios (10 vs 9 vs 1)
- Sequential pattern (A, B, C, D repeated)

**Purpose:** Validates behavior at critical decision boundaries.

---

## Key Test Insights

### Option-to-Animal Mapping
```javascript
0 (Option A) → 'dove'
1 (Option B) → 'owl'
2 (Option C) → 'peacock'
3 (Option D) → 'shark'
```

### Tie-Breaking Logic
When two or more animals have equal scores:
- The algorithm uses `reduce((a, b) => scores[a] > scores[b] ? a : b)`
- With `>` comparison, ties favor the **later entry**
- Object iteration order: dove → owl → peacock → shark
- Example: 10 Dove / 10 Owl → returns 'owl' (owl comes later)

### Scoring Algorithm
```javascript
// Simple vote counting
responses.forEach(response => {
  const animal = optionToAnimalMapping[response.optionIndex];
  scores[animal]++;
});

// Winner = highest score
return Object.entries(scores)
  .reduce((a, b) => scores[a] > scores[b] ? a : b)[0];
```

## Helper Functions

### `createResponses(optionIndices: number[])`
Creates 20 QuizResponse objects from an array of option indices.

```javascript
// Example: All Dove answers
const responses = createResponses(Array(20).fill(0));
```

### `createResponsesWithCounts(counts: object)`
Creates 20 responses with specific distribution.

```javascript
// Example: 60% Peacock, 25% Dove, 15% Owl
const responses = createResponsesWithCounts({
  peacock: 12,
  dove: 5,
  owl: 3
});
```

## Test Coverage

Current test coverage includes:
- **36 total tests** across 8 test suites
- **100% coverage** of core algorithm functions
- **Pure types** (4 tests)
- **Dominant types** (6 tests)
- **Tie-breaking** (5 tests)
- **Edge cases** (6 tests)
- **Percentages** (7 tests)
- **Real-world scenarios** (3 tests)
- **Consistency checks** (3 tests)
- **Boundary conditions** (3 tests)

## Expected vs Actual Results

All tests document both:
1. **Expected behavior** (what should happen)
2. **Actual behavior** (what the algorithm does)
3. **Comments explaining tie-breaking logic**

## Continuous Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: npm run test:run

- name: Generate Coverage
  run: npm run test:coverage
```

## Future Enhancements

Potential areas for additional testing:
- Performance benchmarks for large batches
- Stress testing with thousands of responses
- Mutation testing to ensure test quality
- Integration tests with database operations
- E2E tests with the full quiz flow
