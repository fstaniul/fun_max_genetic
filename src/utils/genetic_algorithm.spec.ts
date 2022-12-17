import { describe, expect, test, vi } from "vitest";
import {
    createIndividual,
    createPopulation,
    crossover,
    mutate,
    selection,
} from "./genetic_algorithm";

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

test("Should mutate individual", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(2 / 6);

    const individual = createIndividual(6, 0b101011);

    const mutated = mutate(individual);

    expect(mutated.genotype).toEqual(0b101111);
    expect(mutated.size).toEqual(6);
});

test("Should select population of same size", () => {
    const population = createPopulation(6, 5);
    const individualsScore = population.map((i) => i.score((x) => 2 * x + 1));
    const populationScore = individualsScore.reduce((a, b) => a + b, 0);
    const selected = selection(population, individualsScore, populationScore);

    expect(selected.length).toEqual(6);
});
