<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { handleError, handleSuccess } from "../utils/globalFunctions";
import AdminNavs from "../components/sections/AdminNavs.vue";
import AdminHeader from "../components/sections/AdminHeader.vue";
import { useRouter } from "vue-router";

import { setAdminHeaders } from "../services";

const formData = reactive({ email: "", password: "" });
const loggingIn = ref(false);
const showPassword = ref(false);
const router = useRouter();

onMounted(() => {
  verifyLoggedIn();
});

function verifyLoggedIn() {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token || !refreshToken) {
    router.push("/");
  } else {
    // console.log("setted", token);
    setAdminHeaders(token);
  }
}
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
