<script lang="ts" setup></script>

<template>
  <div class="auth-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.auth-card {
  background: #ffffff;
  border: 1px solid #e4e4e4;
  backdrop-filter: blur(20px);
  border-radius: 10px;
  padding: 30px 33px;
}
</style>
