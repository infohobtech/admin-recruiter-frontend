<script setup lang="ts">
import { useRouter } from "vue-router";

const emit = defineEmits(["navIconClick"]);

const router = useRouter();

function logoutNow() {
  router.push("/force-logout");
}
</script>

<template>
  <div class="admin-header flex-1 flex jc-between ai-center">
    <div class="admin-header__left flex ai-center">
      <div
        class="admin-nav-icon mr-3 d-inline-block d-md-none"
        @click="emit('navIconClick')"
      >
        <FIcon icon="bars"></FIcon>
      </div>
      <div class="d-none d-md-inline-block">Admin</div>
    </div>
    <div class="admin-header__right">
      <div class="c-pointer" @click="logoutNow">
        Auwalu Adamu <FIcon icon="angle-down" class="ml-2"></FIcon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-nav-icon {
  font-size: 22px;
}
</style>
