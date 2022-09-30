<template>
  <teleport to="body">
    <Transition name="fade">
      <div class="modal" v-show="modelValue" @click="handleOutsideClick">
        <Transition name="zoom">
          <div
            class="modal__container"
            :style="{ width: width }"
            v-show="modelValue"
          >
            <div v-if="!hideHeader" @click.stop>
              <slot name="header">
                <div class="modal__header d-flex jc-between">
                  <div class="modal__heading">{{ heading }}</div>
                  <div class="modal__close" @click="closeModal">&times;</div>
                </div>
              </slot>
            </div>

            <div class="modal__body" @click.stop>
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </teleport>
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    default: false
  },
  heading: {
    default: "Modal Heading"
  },
  width: {
    type: String,
    default: "800px"
  },
  closeOnOutsideClick: {
    type: Boolean,
    default: false
  },
  hideHeader: {
    type: Boolean,
    default: false
  }
});

function handleOutsideClick() {
  if (props.closeOnOutsideClick) {
    closeModal();
  }
}

function closeModal() {
  emit("update:modelValue", false);
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__container {
  max-width: 95%;
  min-height: 22px;
  background-color: rgb(235, 235, 235);
  border-radius: 9px;
  box-shadow: 0 0 15px 5px rgb(0 0 0 / 20%);
}
/* .modal__container--lg {
    width: 555px;
  } */
.modal__header {
  font-size: 22px;
  font-weight: bold;
  color: var(--brand-color);
}
.modal__heading {
  padding: 22px 33px;
}
.modal__close {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 4px 22px;
  font-weight: bold;
  font-size: 33px;
}
.modal__close:hover {
  color: red;
}
.modal__body {
  padding: 0 33px;
  padding-bottom: 24px;
  padding-top: 0;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 9px;
  margin-bottom: 9px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.25s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>
