<script lang="ts" setup>
import { ref } from "vue";
import BackpackProblemInput from "../components/BackpackProblemInput.vue";
import { useGeneticAlgorithm } from "../composables/useGeneticAlgorithm";
import {
    BackpackItem,
    calculateWeightAndValue,
    ensureWeightIsBelowMaximum,
} from "../utils/backpack_problem";
import { createIndividual, Population } from "../utils/genetic_algorithm";
import Result from "../components/Result.vue";
import Steps from "../components/Steps.vue";

const items = ref<BackpackItem[]>([
    { value: 50, weight: 2 },
    { value: 60, weight: 3 },
    { value: 80, weight: 4 },
    { value: 100, weight: 5 },
]);

const maximumWeight = ref(5);

const populationSize = ref(10);
const crossoverProbability = ref(0.8);
const mutationProbability = ref(0.2);

const { steps, result, run } = useGeneticAlgorithm();

const fittingFunction = (genotype: number) => {
    const { weight, value } = calculateWeightAndValue(items.value, genotype);
    return weight > maximumWeight.value ? 0 : value;
};

const modifyPopulationBeforeScoring = (population: Population) => {
    return population;
    return population.map((item) => {
        const optimizedGenotype = ensureWeightIsBelowMaximum(
            items.value,
            item.genotype,
            maximumWeight.value
        );
        return createIndividual(item.size, optimizedGenotype);
    });
};

function solve() {
    run({
        populationSize: populationSize.value,
        crossingProbability: crossoverProbability.value,
        mutationProbability: mutationProbability.value,
        genotypeSize: items.value.length,
        maxBestOccurrences: 5,
        maxIterations: 100000,
        modifyPopulationBeforeScoring,
        fittingFunction,
    });
}
</script>

<template>
    <div class="container container-centered">
        <BackpackProblemInput v-model="items" />
        <div class="row">
            <div class="six columns">
                <label for="maximum-weight">Maximum weight</label>
                <input
                    class="u-full-width"
                    type="number"
                    id="maximum-weight"
                    v-model="maximumWeight"
                />
            </div>
        </div>
        <div class="row">
            <div class="four columns">
                <label for="population-size">Population size</label>
                <input
                    class="u-full-width"
                    type="number"
                    id="population-size"
                    v-model="populationSize"
                />
            </div>
            <div class="four columns">
                <label for="crossover-probability">Crossover probability</label>
                <input
                    class="u-full-width"
                    type="number"
                    id="crossover-probability"
                    v-model="crossoverProbability"
                />
            </div>
            <div class="four columns">
                <label for="mutation-probability">Mutation probability</label>
                <input
                    class="u-full-width"
                    type="number"
                    id="mutation-probability"
                    v-model="mutationProbability"
                />
            </div>
        </div>
        <div>
            <button class="button button-primary" @click="solve">Solve</button>
        </div>
        <Steps :steps="steps" />
        <Result :result="result" />
    </div>
</template>

<style lang="scss" scoped></style>
