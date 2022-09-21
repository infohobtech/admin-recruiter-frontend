<template>
  <teleport to="body">
    <TransitionGroup name="slide-left" tag="div" class="toasts">
      <div v-for="(toast, key) in toasts" :key="key">
        <Toast
          :unique-id="Number(key)"
          :type="toast.type"
          :detail="toast.detail"
          :summary="toast.summary"
          @close="removeToast"
        >
        </Toast>
      </div>
    </TransitionGroup>
  </teleport>
</template>

<script setup lang="ts">
import Toast from "./Toast.vue";
import { onMounted, reactive } from "vue";
import { eventBus, ToastItem } from "../../utils/eventBus";

interface Toasts {
  [key: number]: ToastItem;
}

const toasts = reactive<Toasts>({});

onMounted(() => {
  eventBus.on("toast", (toastItem) => {
    const key = Date.now() + Math.ceil(Math.random() * 1000);
    toasts[key] = toastItem;

    setTimeout(() => {
      removeToast(key);
    }, toastItem.duration || 2222);
  });
});

function removeToast(key: number) {
  delete toasts[key];
}
</script>

<style scoped>
.toasts {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999999;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(70px);
}
</style>
