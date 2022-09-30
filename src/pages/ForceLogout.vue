<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  router.push("/");
});
</script>

<template>
  <div></div>
</template>
