<script lang="ts" setup>
import AuthLayout from "../layouts/AuthLayout.vue";
import AuthCard from "../components/cards/AuthCard.vue";
import InputText from "../components/inputs/InputText.vue";
import Button from "../components/inputs/Button.vue";
</script>

<template>
  <AuthLayout>
    <div class="mt-5 ta-center">
      <img src="/img/logo.png" alt="" />
    </div>

    <AuthCard class="mt-5">
      <h2 class="text-center">Admin Login</h2>
      <InputText class="mt-3" placeholder="Email Address"></InputText>
      <InputText class="mt-3" placeholder="Password"></InputText>
      <div class="ta-right mt-2">
        <router-link to="#">Forget Password?</router-link>
      </div>

      <Button block class="mt-3" size="lg">Login</Button>
    </AuthCard>
  </AuthLayout>
</template>
