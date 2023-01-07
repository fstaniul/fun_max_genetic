import { describe, test, expect, it } from "vitest";
import {
  findLowestValueWeightRatio,
  calculateWeightAndValue,
  ensureWeightIsBelowMaximum,
  BackpackItem,
} from "./backpack_problem";

describe("backpack problem utilities", () => {
  const createTestItems = (): BackpackItem[] => {
    return [
      { value: 4, weight: 2 },
      { value: 4, weight: 4 },
      { value: 2, weight: 4 },
    ];
  };

  describe("findLowestValueWeightRatio", () => {
    test("should return bit 0 as last item has lowest ratio when all in backpack", () => {
      const items = createTestItems();
      const pickedItems = 0b111;
      const expected = 0;

      const actual = findLowestValueWeightRatio(items, pickedItems);

      expect(actual).toBe(expected);
    });

    test("should return bit 1 as lowest item when only 110 are picked", () => {
      const items = createTestItems();
      const pickedItems = 0b110;
      const expected = 1;

      const actual = findLowestValueWeightRatio(items, pickedItems);

      expect(actual).toBe(expected);
    });
  });

  describe("ensureWeightIsBelowMaximum", () => {
    it.each([
        [0b111, 2, 0b100],
        [0b110, 6, 0b110],
        [0b110, 4, 0b100],
        [0b101, 6, 0b101],
        [0b101, 4, 0b100],
        [0b001, 2, 0b000],
    ])("should remove items from backpack when weight is too big", (picked, maxWeight, expected) => {
      const items = createTestItems();

      const actual = ensureWeightIsBelowMaximum(items, picked, maxWeight);

      expect(actual).toEqual(expected);
    });
  });
});
