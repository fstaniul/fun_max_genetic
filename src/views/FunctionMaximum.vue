<script lang="ts" setup>
import { computed, ref } from "vue";
import { useGeneticAlgorithm } from "../composables/useGeneticAlgorithm";
import Result from '../components/Result.vue';

const aRef = ref(0);
const bRef = ref(0);
const cRef = ref(0);
const dRef = ref(0);
const populationSize = ref(6);
const mutationRate = ref(0.2);
const crossoverRate = ref(0.8);

const running = ref(false);

const { steps, result, run } = useGeneticAlgorithm();

const runDisabled = computed(() => {
    return [aRef.value, bRef.value, cRef.value, dRef.value].some(
        (value) => typeof value !== "number" || isNaN(value)
    );
});

async function start() {
    const a = aRef.value || 0;
    const b = bRef.value || 0;
    const c = cRef.value || 0;
    const d = dRef.value || 0;

    run({
        populationSize: populationSize.value,
        genotypeSize: 5,
        crossingProbability: crossoverRate.value,
        mutationProbability: mutationRate.value,
        maxBestOccurrences: 5,
        maxIterations: 10000,
        fittingFunction: (x) => a * x ** 3 + b * x ** 2 + c * x + d,
    });
}
</script>

<template>
    <div class="container container-centered">
        <div class="row">
            <div class="twelve columns flex flex-columns flex-centered">
                <h3 class="title">Find function maximum</h3>
                <code class="fn"
                    >f(x) = <strong>a</strong>x<sup>3</sup> +
                    <strong>b</strong>x<sup>2</sup> + <strong>c</strong>x +
                    <strong>d</strong></code
                >
            </div>
        </div>
        <div class="row forms">
            <div class="four columns">
                <label for="populationSizeInput">Population Size</label>
                <input
                    id="populationSizeInput"
                    class="u-full-width"
                    type="number"
                    placeholder="Population size"
                    v-model="populationSize"
                    step="2"
                />
            </div>
            <div class="four columns">
                <label for="crossoverRateInput">Crossover Probability</label>
                <input
                    id="crossoverRateInput"
                    class="u-full-width"
                    type="number"
                    placeholder="Crossover Probability"
                    v-model="crossoverRate"
                    step="0.1"
                />
            </div>
            <div class="four columns">
                <label for="mutationRateInput">Mutation Probability</label>
                <input
                    id="mutationRateInput"
                    class="u-full-width"
                    type="number"
                    placeholder="Mutation Probability"
                    v-model="mutationRate"
                    step="0.1"
                />
            </div>
        </div>
        <div class="row forms">
            <div class="three columns">
                <input
                    class="u-full-width"
                    type="number"
                    placeholder="a"
                    v-model="aRef"
                />
            </div>
            <div class="three columns">
                <input
                    class="u-full-width"
                    type="number"
                    placeholder="b"
                    v-model="bRef"
                />
            </div>
            <div class="three columns">
                <input
                    class="u-full-width"
                    type="number"
                    placeholder="c"
                    v-model="cRef"
                />
            </div>
            <div class="three columns">
                <input
                    class="u-full-width"
                    type="number"
                    placeholder="d"
                    v-model="dRef"
                />
            </div>
        </div>
        <div class="row forms">
            <div class="twelve columns">
                <button class="button-primary" :disabled="runDisabled" @click="start">
                    Find maximum
                </button>
            </div>
        </div>
        <Result :result="result" />
    </div>
</template>

<style lang="sass" scoped>
.title
    text-align: center
.fn
    font-size: 1.6rem
.forms
    margin-top: 3rem
.forms + .forms
    margin-top: 1.5rem
</style>
