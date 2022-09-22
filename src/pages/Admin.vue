<script lang="ts" setup>
import { reactive, ref } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { handleError, handleSuccess } from "../utils/globalFunctions";
import AdminNavs from "../components/sections/AdminNavs.vue";
import AdminHeader from "../components/sections/AdminHeader.vue";

const formData = reactive({ email: "", password: "" });
const loggingIn = ref(false);
const showPassword = ref(false);
</script>

<template>
  <DashboardLayout>
    <template #navigation>
      <AdminNavs></AdminNavs>
    </template>

    <template #header>
      <AdminHeader></AdminHeader>
    </template>

    <template #main>
      <RouterView></RouterView>
    </template>
  </DashboardLayout>
</template>

<style scoped>
.show-hide {
  cursor: pointer;
  font-weight: 400;
  font-size: 8px;
  line-height: 16px;
  color: #909090;
}
</style>
