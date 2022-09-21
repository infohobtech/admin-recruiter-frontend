<script lang="ts" setup></script>

<template>
  <div class="auth">
    <div class="auth__container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.auth {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}

.auth__container {
  width: 545px;
  margin: auto;
  padding: 11px;
}
</style>
