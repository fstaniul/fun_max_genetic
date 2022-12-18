import { shallowRef } from "vue";
import { GeneticAlgorithm } from "../utils/genetic_algorithm";

export function useGeneticAlgorithm() {
    const steps = shallowRef<GeneticAlgorithm.IterationData[]>([]);
    const result = shallowRef<GeneticAlgorithm.Result | undefined>(undefined);

    const run = (
        options: GeneticAlgorithm.Options & GeneticAlgorithm.RunOptions
    ) => {
        steps.value = [];
        result.value = undefined;

        const ga = new GeneticAlgorithm(options);
        result.value = ga.run({
            ...options,
            afterIteration(data) {
                steps.value.push(data);
            },
        });

        return result.value;
    };

    return {
        steps,
        result,
        run,
    };
}
