<script lang="ts" setup>
import { reactive, ref } from "vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import AuthCard from "../components/cards/AuthCard.vue";
import InputText from "../components/inputs/InputText.vue";
import Button from "../components/inputs/Button.vue";
import authService from "../services/authService";
import { handleError, handleSuccess } from "../utils/globalFunctions";

const formData = reactive({ email: "", password: "" });
const loggingIn = ref(false);
const showPassword = ref(false);

function handleSubmit() {
  console.log(formData);
  loggingIn.value = true;
  authService
    .login(formData)
    .then((res) => {
      handleSuccess(res);
    })
    .catch((e) => {
      handleError(e);
    })
    .finally(() => {
      loggingIn.value = false;
    });
}

function toggleShowHide() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <AuthLayout>
    <div class="ta-center">
      <img src="/img/logos/logo.png" alt="" />
    </div>

    <AuthCard class="mt-5">
      <form @submit.prevent="handleSubmit" action="#">
        <h2 class="text-center font-600">Admin Login</h2>
        <InputText
          type="email"
          class="mt-4"
          placeholder="Email Address"
          v-model="formData.email"
          required
        ></InputText>
        <InputText
          :type="showPassword ? 'text' : 'password'"
          class="mt-3"
          placeholder="Password"
          v-model="formData.password"
        >
          <template #append>
            <div class="show-hide c-pointer" @click="toggleShowHide">
              {{ showPassword ? "HIDE" : "SHOW" }}
            </div>
          </template>
        </InputText>
        <div class="ta-right mt-3">
          <router-link to="#">Forget Password?</router-link>
        </div>

        <Button
          block
          class="mt-3"
          type="submit"
          :disabled="!formData.email || !formData.password"
          :loading="loggingIn"
        >
          Login
        </Button>
      </form>
    </AuthCard>
  </AuthLayout>
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
