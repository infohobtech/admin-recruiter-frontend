<template>
  <button
    :class="classes"
    :type="type"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot> </slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, PropType, useAttrs } from "vue";
const emit = defineEmits(["click"]);

type colors =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "info"
  | "success"
  | string;

const attrs = useAttrs();

type sizes = "sm" | "md" | "lg" | "xl" | "xxl" | string;

type types = "submit" | "button" | "reset";

const props = defineProps({
  color: {
    type: String as PropType<colors>,
    default: "primary",
    validator(value: string) {
      return [
        "",
        "primary",
        "secondary",
        "warning",
        "danger",
        "success",
        "info"
      ].includes(value);
    }
  },
  size: {
    type: String as PropType<sizes>,
    default: "md",
    validator(value: string) {
      return ["", "sm", "md", "lg", "xl", "xxl"].includes(value);
    }
  },
  loading: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  raised: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  flat: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<types>,
    default: "button"
  }
});

const classes = computed(() => {
  return {
    btn: true,
    [props.color]: true,
    [props.size]: true,
    loading: props.loading,
    outlined: props.outlined,
    raised: props.raised,
    rounded: props.rounded,
    flat: props.flat,
    text: props.text,
    icon: props.icon,
    block: props.block
  };
});

const disabled = computed(() => {
  return props.loading || Boolean(attrs.disabled);
});

function handleClick() {
  if (!disabled.value) {
    emit("click");
  }
}
</script>
<style>
.btn:hover {
  background: var(--ac-theme-500);
}
.btn {
  --font-size: 14px;
  --border-radius: calc(var(--font-size) * 0.2);
  --color: var(--ac-theme-50);
  --background: var(--ac-theme-600);
  --border: 1px solid var(--ac-theme-600);
  --padding-x: 32px;
  --padding-y: 14px;
  outline: 0 solid var(--ac-theme-200);
  border-radius: var(--border-radius);
  font-size: var(--font-size);
  color: var(--color);
  background: var(--background);
  border: var(--border);
  padding: var(--padding-y) var(--padding-x);
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.1s ease;
  cursor: pointer;
  outline: 0 solid var(--ac-theme-200);
  user-select: none;
  font-weight: 600;
  min-width: 88px;
}
@media (hover: none) {
  .btn {
    cursor: default;
  }
}
.btn:hover {
  background: var(--ac-theme-500);
}
.btn:active {
  transform: scale(0.99);
  outline: 0 solid var(--ac-theme-200);
}
.btn:focus {
  outline: 3px solid var(--ac-theme-200);
  z-index: 1;
}

.btn.block {
  width: 100%;
}
.btn-group > .btn.block {
  width: initial;
}

.btn.text {
  border: none;
}
.btn:not(.text):not(.outlined) {
  background: var(--ac-theme-600);
  color: var(--ac-theme-50);
  fill: var(--ac-theme-50);
}
.btn:not(.text):not(.outlined):hover {
  background: var(--ac-theme-500);
  border-color: var(--ac-theme-500);
  color: var(--ac-theme-50);
}

.btn.text,
.btn.outlined {
  background: transparent;
  color: var(--ac-theme-600);
  fill: var(--ac-theme-600);
}

.btn.text:hover,
.btn.outlined:hover {
  background: var(--ac-theme-50);
}

.btn.raised,
.btn-group.raised {
  box-shadow: 0 3px 1px -2px var(--ac-gray-500), 0 2px 2px 0 var(--ac-gray-400),
    0 1px 5px 0 var(--ac-gray-300);
}
.btn.raised.text,
.btn.raised.outlined {
  box-shadow: 0 3px 1px -2px var(--ac-gray-400), 0 2px 2px 0 var(--ac-gray-300),
    0 1px 5px 0 var(--ac-gray-200);
}

.btn.rounded {
  --border-radius: 10rem;
}

.btn.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  fill: var(--ac-theme-600);
  padding: var(--padding-y);
  aspect-ratio: 1/1;
}

.btn.icon > svg {
  width: var(--font-size);
  height: var(--font-size);
}

.btn.flat {
  --border-radius: 0;
}

.btn:disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
.btn-group {
  --font-size: 1rem;
  --border-radius: calc(var(--font-size) * 0.2);
  display: inline-flex;
  vertical-align: middle;
  flex-wrap: wrap;
  border-radius: var(--border-radius);
}
.btn-group > .btn {
  --font-size: 1rem;
  --border-radius: calc(var(--font-size) * 0.2);
}
.btn-group.flat,
.btn-group.flat > .btn {
  --border-radius: 0;
}

.btn-group.rounded,
.btn-group.rounded > .btn {
  --border-radius: 10rem;
}

.btn.sm,
.btn-group.sm,
.btn-group.sm > .btn {
  --font-size: 0.7rem;
  --padding-y: 0.2rem;
  --padding-x: 0.5rem;
}
.btn.md,
.btn-group.md,
.btn-group.md > .btn,
.btn-group:not(.sm):not(.lg):not(.xl):not(.xxl) > .btn {
  --font-size: 14px;
  --padding-y: 14px;
  --padding-x: 32px;
}
.btn.lg,
.btn-group.lg,
.btn-group.lg > .btn {
  --font-size: 1.5rem;
  --padding-y: 0.5rem;
  --padding-x: 1.5rem;
}
.btn.xl,
.btn-group.xl,
.btn-group.xl > .btn {
  --font-size: 2rem;
  --padding-y: 1rem;
  --padding-x: 2rem;
}
.btn.xxl,
.btn-group.xxl,
.btn-group.xxl > .btn {
  --font-size: 4rem;
  --padding-y: 1.3rem;
  --padding-x: 4rem;
}

.btn-group > .btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}

.btn-group > .btn.raised {
  box-shadow: none;
}
.btn-group > .btn:not(:focus):not(:last-child) {
  border-right: none;
}
.btn-group > .btn:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group > .btn:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

@media screen and (max-width: 700px) {
  .btn.md {
    --padding-x: 14px;
  }
}
</style>
