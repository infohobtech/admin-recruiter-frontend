<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function logoutNow() {
  router.push("/force-logout");
}
</script>

<template>
  <div class="admin-header flex-1 flex jc-between ai-center">
    <div class="admin-header__left">Admin</div>
    <div class="admin-header__right">
      <div class="c-pointer" @click="logoutNow">
        Auwalu Adamu <FIcon icon="angle-down" class="ml-2"></FIcon>
      </div>
    </div>
  </div>
</template>
