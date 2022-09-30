<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from "vue";
import Toasts from "./components/overlay/Toasts.vue";

import authService from "./services/authService";

import { setAdminHeaders } from "./services";

onMounted(() => {
  refreshToken();
});

let timer = 0;

function refreshToken() {
  timer = setTimeout(refreshToken, 4 * 60 * 1000);

  const token = localStorage.getItem("token");
  const rt = localStorage.getItem("refreshToken");

  if (!token || !rt) {
    return;
  }

  authService
    .refreshToken(rt)
    .then((res) => {
      setAdminHeaders(res.data.token);
    })
    .catch()
    .finally(() => {});
}
</script>

<template>
  <RouterView></RouterView>
  <Toasts></Toasts>
</template>

<style scoped></style>
