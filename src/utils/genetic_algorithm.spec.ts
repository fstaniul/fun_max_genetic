import { describe, expect, test, vi } from "vitest";
import {
    createIndividual,
    createPopulation,
    crossover,
    mutate,
    Population,
    selection,
} from "./genetic_algorithm";
import { Random } from "./random";

describe("createIndividual", () => {
    test("Should generate individual 111111", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.5);

        const individual = createIndividual(6);

        expect(individual.genotype).toEqual(0b111111);
        expect(individual.size).toEqual(6);
    });

    test("Should generate individual 0", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.49);

        const individual = createIndividual(6);

        expect(individual.genotype).toEqual(0);
        expect(individual.size).toEqual(6);
    });

    test("Should print individual, when to string used", () => {
        const individual = createIndividual(6, 0b001011);
        expect(individual.toString()).toEqual("001011");
    });
});

test("Should create population of given size", () => {
    const population = createPopulation(3, 6);
    expect(population.length).toEqual(3);
});

test("Should crossover two individuals", () => {
    vi.spyOn(Math, "random").mockReturnValue(3 / 6);

    const parent1 = createIndividual(6, 0b101011);
    const parent2 = createIndividual(6, 0b011101);

    const [child1, child2] = crossover(parent1, parent2);

    expect(child1.genotype).toEqual(0b101101);
    expect(child2.genotype).toEqual(0b011011);
});

test("Should select population of same size", () => {
    const population = createPopulation(6, 5);
    const individualsScore = population.map((i) => i.score((x) => 2 * x + 1));
    const populationScore = individualsScore.reduce((a, b) => a + b, 0);
    const selected = selection(population, individualsScore, populationScore);

    expect(selected.length).toEqual(6);
});

describe("mutation", () => {
    test.each([
        [0, 0b00001],
        [1, 0b00010],
        [2, 0b00100],
        [3, 0b01000],
        [4, 0b10000],
    ])("Should mutate individual at position %i", (position, expected) => {
        vi.spyOn(Random, "getInt").mockReturnValue(position);
        const individual = createIndividual(5, 0b00000);
        expect(mutate(individual).genotype).toEqual(expected);
    });
});

describe("crossover", () => {
    test.each([
        [1, 0b00001, 0b11110],
        [2, 0b00011, 0b11100],
        [3, 0b00111, 0b11000],
        [4, 0b01111, 0b10000],
    ])("Should crossover individual at position %i", (position, expected1, expected2) => {
        vi.spyOn(Random, "getInt").mockReturnValue(position);
        const parent1 = createIndividual(5, 0b00000);
        const parent2 = createIndividual(5, 0b11111);
        const [child1, child2] = crossover(parent1, parent2);
        expect(child1.genotype).toEqual(expected1);
        expect(child2.genotype).toEqual(expected2);
    });
});

describe("selection", () => {
    test('test selection', () => {
        const dummyPopulation = [1, 2, 3, 4, 5].map((i) => createIndividual(5, i));
        const individualsScore = [1, 1, 5, 3, 2];
        const populationScore = individualsScore.reduce((a, b) => a + b, 0);

        vi.spyOn(Random, 'getFloat')
            .mockReturnValueOnce(6 / populationScore) // select 3
            .mockReturnValueOnce(5 / populationScore) // select 3
            .mockReturnValueOnce(11 / populationScore) // select 5
            .mockReturnValueOnce(2 / populationScore) // select 2
            .mockReturnValueOnce(8 / populationScore) // select 4

        const selected = selection(dummyPopulation as unknown as Population, individualsScore, populationScore);

        expect(selected.map(s => s.genotype)).toEqual([3, 3, 5, 2, 4]);
    });
})
