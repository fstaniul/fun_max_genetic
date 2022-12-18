<script setup lang="ts">
import { PropType, ref } from 'vue';

export interface BackpackProblemInputValue {
    value: number;
    weight: number;
}

const props = defineProps({
    modelValue: {
        type: Array as PropType<BackpackProblemInputValue[]>,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue']);


function update(index: number, key: keyof BackpackProblemInputValue, newValue: number) {
    const newModelValue = [...props.modelValue];
    newModelValue[index][key] = newValue;
    emit('update:modelValue', newModelValue);
}

function addColumn() {
    const newModelValue = [...props.modelValue];
    newModelValue.push({ value: 0, weight: 0 });
    emit('update:modelValue', newModelValue);
}

function removeColumn(index: number) {
    const newModelValue = [...props.modelValue];
    newModelValue.splice(index, 1);
    emit('update:modelValue', newModelValue);
}
</script>

<template>
    <div>
        <table class="u-full-width">
            <thead>
                <tr class="header-row">
                    <th>
                        <button class="add-button" @click="addColumn">
                            <span>+</span>
                        </button>
                    </th>
                    <th v-for="(input, index) in props.modelValue" :key="index" class="header-col" @click="removeColumn(index)">
                        {{ index + 1 }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Value</th>
                    <td v-for="(input, index) in props.modelValue" :key="index">
                        <input
                            class="input input-value"
                            type="number"
                            :value="input.value"
                            @input="update(index, 'value', $event.target?.value)"
                            :tabindex="2*(index+1)"
                        />
                    </td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td v-for="(input, index) in props.modelValue" :key="index">
                        <input
                            class="input input-weight"
                            type="number"
                            :value="input.weight"
                            @input="update(index, 'weight', $event.target?.value)"
                            :tabindex="2*(index+1)+1"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="sass" scoped>
table
    width: 100%
    td,th
        border: 1px solid #d1d1d1
    th
        width: 8rem
        padding: 0.5rem 1rem
    td
        width: 5rem
        padding: 0
.input
    display: inline-block
    background: transparent
    border: none
    margin: 0
    width: 100%
    padding: 1rem
    border-radius: 0
.header-row
    position: relative

.header-col
    position: relative
    &:hover
        cursor: pointer
    &::after
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: #bf0000
        color: #fff
        content: '-'
        opacity: 0
        text-align: center
        transition: opacity 0.2s ease-in-out
    &:hover::after
        opacity: 1


.add-button
    display: inline-block
    position: absolute
    right: -1.25rem
    padding: 0
    margin: 0
    text-align: center
    height: 2.5rem
    width: 2.5rem
    top: 0.7rem
    border-radius: 100px
    border: 0
    background: #8eff7a
    span
        font-size: 1.5rem
        line-height: 1.5rem
        display: inline-block
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%) translate(0.1rem, -0.3rem)
</style>
