<script setup lang="ts">
const items = [
    { text: "Info", path: "/" },
    { text: "Function Maximum", path: "/maximum" },
    { text: "Backpack Problem", path: "/backpack-problem" },
];
</script>

<template>
    <div class="tabs navigation">
        <router-link
            v-for="item in items"
            :key="item.path"
            class="tab"
            active-class="active"
            :to="item.path"
        >
            {{ item.text }}
        </router-link>
    </div>
</template>

<style lang="sass" scoped>
.navigation
    margin: 3rem 0
    a
        text-transform: uppercase
        letter-spacing: 0.2rem
        font-size: 1.1rem
        font-weight: bold
        text-decoration: none
        &:hover
            text-decoration: underline
</style>
