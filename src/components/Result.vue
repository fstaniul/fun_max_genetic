<script lang="ts" setup>
import { PropType } from "vue";
import { type GeneticAlgorithm } from "../utils/genetic_algorithm";

const props = defineProps({
    result: {
        type: Object as PropType<GeneticAlgorithm.Result>,
    },
});
</script>

<template>
    <code v-if="result">
        Iterations: {{ props.result!.iterations }}<br />
        Best Population:<br />
        <span v-for="(i, index) in props.result!.best.population" :key="index">
            &nbsp;&nbsp;&nbsp;&nbsp;
            - {{ i.toString() }}
            ({{ i.genotype }})
            <br />
        </span>
        <br />
        Score: {{ props.result!.best.populationScore }}<br />
        Answer: {{ props.result!.best.bestIndividual.toString() }}
        ({{ props.result!.answer }})
    </code>
</template>

<style lang="sass" scoped>
code
    display: block
    white-space: pre
    width: 100%
</style>
