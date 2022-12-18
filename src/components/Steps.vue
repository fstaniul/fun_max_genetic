<script setup lang="ts">
import { PropType, shallowRef, watch } from "vue";
import { type GeneticAlgorithm } from "../utils/genetic_algorithm";

const props = defineProps({
    steps: {
        type: Array as PropType<GeneticAlgorithm.IterationData[]>,
        required: true,
    },
});

const expanded = shallowRef(false);

watch(() => props.steps, () => {
    expanded.value = false;
});
</script>

<template>
    <template v-if="steps?.length > 0">
        <div v-if="expanded" class="steps">
            <div v-for="(step, index) in steps" :key="index" class="step">
                <code class="code">
                    Iteration {{ step.iteration }}<br />
                    Population: <br />
                    <span v-for="i in step.population">
                        &nbsp;&nbsp;&nbsp;&nbsp; - {{ i.toString() }} ({{
                            i.genotype
                        }})
                        <br />
                    </span>
                    Score: {{ step.score }}<br />
                </code>
            </div>
        </div>
        <button class="button" @click="expanded = !expanded">
            {{ expanded ? "HIDE" : "SHOW" }} STEPS
        </button>
    </template>
</template>

<style lang="sass" scoped>
.steps
    border: 1px solid #d1d1d1
    border-radius: 0.8rem
    padding: 2rem
    max-height: 500px
    overflow: auto
    margin-bottom: 1rem
.code
    display: block
    margin-bottom: 1rem
</style>
