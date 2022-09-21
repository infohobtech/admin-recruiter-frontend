<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import Toasts from "./components/overlay/Toasts.vue";
</script>

<template>
  <RouterView></RouterView>
  <Toasts></Toasts>
</template>

<style scoped></style>
