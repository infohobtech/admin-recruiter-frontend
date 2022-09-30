<script setup lang="ts">
import { computed, PropType, ref, useSlots, onMounted } from "vue";

const focused = ref(false);

const slots = useSlots();

const input = ref<HTMLInputElement | null>(null);

type types =
  | "text"
  | "number"
  | "email"
  | "password"
  | "search"
  | "url"
  | "tel"
  | "date"
  | "time"
  | "range"
  | "color"
  | string
  | null
  | undefined;

type sizes = "sm" | "md" | "lg" | "xl" | "xxl" | string;

const props = defineProps({
  type: {
    type: String as PropType<types>,
    default: "text",
    validator(value: string) {
      return [
        "",
        "text",
        "number",
        "email",
        "password",
        "search",
        "url",
        "tel",
        "date",
        "time",
        "range",
        "color",
        null,
        undefined
      ].includes(value);
    }
  },
  modelValue: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: null
  },
  size: {
    type: String as PropType<sizes>,
    default: "md",
    validator(value: string) {
      return ["", "sm", "md", "lg", "xl", "xxl"].includes(value);
    }
  },
  placeholder: {
    type: String,
    default: ""
  },
  clearable: {
    type: Boolean,
    default: false
  },
  floatingLabel: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: "auto"
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

// function handleInput(event: { target: HTMLInputElement }) {
//   // console.log(event.target.value);
//   emit("update:modelValue", event.target.value);
// }

function handleInput(event: any) {
  // console.log(event.target.value);
  emit("update:modelValue", event.target.value);
}

function clearValue() {
  emit("update:modelValue", "");
  focusToInput();
}

function focusToInput() {
  input.value?.focus();
}

const classes = computed(() => {
  return {
    "input-text": true,
    "input-text--focused": focused.value,
    "input-text--no-border": props.type === "range" || props.type === "color",
    "input-text--disabled": props.disabled,
    "input-text--fl": props.floatingLabel,
    [props.state]: props.state,
    [props.size]: true
  };
});

const generatedPlaceholder = computed(() => {
  return props.floatingLabel ? "" : props.placeholder;
});

onMounted(() => {
  // console.log(slots.prepend);
});
</script>

<template>
  <div :class="classes" :style="{ width: width || 'auto' }">
    <div
      class="input-text__prepend"
      :class="{ 'input-text__prepend--empty': !slots.prepend }"
      @click="focusToInput"
    >
      <slot name="prepend" v-if="slots.prepend">Pre</slot>
      <div
        v-if="floatingLabel"
        class="input-text__floating-label"
        :class="{ 'input-text__floating-label--focused ': modelValue }"
        @click="focusToInput"
      >
        {{ placeholder }}
      </div>
    </div>

    <!-- <div
        v-if="floatingLabel"
        class="input-text__floating-label"
        :class="{ 'input-text__floating-label--focused ': modelValue }"
        @click="focusToInput"
      >
        {{ placeholder }}
      </div> -->

    <input
      :type="type"
      :value="modelValue"
      @input="handleInput"
      class="input"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="generatedPlaceholder"
      :disabled="disabled"
      :required="required"
      ref="input"
    />
    <div class="input-text__append" v-if="slots.append" @click="focusToInput">
      <slot name="append">Suf</slot>
    </div>
    <div
      class="input-text__append input-text__clear"
      v-if="clearable && (modelValue || modelValue == 0)"
      @click="clearValue"
    ></div>
  </div>
</template>

<style scoped>
/*======================== Parent style ==========================*/
.input-text {
  display: flex;
  align-items: center;
  --font-size: 14px;
  --padding-y: 14px;
  --padding-x: calc(var(--padding-y) * 1.5);
  border: 1px solid #e4e4e4;
  color: var(--ac-gray-600);
  /* margin: 1rem; */
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  position: relative;
  line-height: 1;
  --fl-size: calc(0.75 * var(--font-size));
  --fl-height: calc(-1 * var(--fl-size) - var(--padding-y) * 0.3 - 5px);
  transform: translate(1);
  max-width: 100% !important;
  font-weight: 400;
  background-color: #fff;
}

.input-text--fl {
  margin-top: calc(-1 * var(--fl-height));
}

.input-text--no-border {
  border: 0;
}

.input-text__prepend {
  padding-left: var(--padding-x);
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: center;
}

.input-text__prepend--empty {
  padding-left: 0;
}

.input-text__append {
  padding-right: var(--padding-x);
}

.input-text .input {
  font-size: var(--font-size);
  padding: var(--padding-y) var(--padding-x);
  flex: 1;
  width: 100%;
  border-radius: 0.2rem;
  border: 0;
  outline: 0;
  color: var(--color-gray-900);
}

.input-text .input::-webkit-input-placeholder {
  /* Edge */
  color: rgb(192, 192, 192);
}

.input-text .input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgb(192, 192, 192);
}

.input-text .input::placeholder {
  color: rgb(192, 192, 192);
  /* font-size: var(--font-size);
  font-weight: 300; */
}
/* .input:not([type='color']):not([type='range']):not([type='date']):not([type='time']) {
    padding: 0.4rem 0.7rem;
  } */

.input-text--focused {
  outline: 3px solid var(--ac-theme-200);
  border: 1.2px solid var(--ac-theme-500);
}
.input-text:not(.info):not(.success):not(.warning):not(.danger):not(.input-text--focused) {
  --ac-theme-200: var(--ac-green-200);
  --ac-theme-500: var(--ac-gray-400);
  --ac-theme-600: var(--ac-green-600);
}
.input-text.full {
  width: 100%;
}
.input-text.sm {
  --font-size: 0.75rem;
  --padding-y: 0.2rem;
}
.input-text.md {
  /* --font-size: 1.3rem;
  --padding-y: 0.5rem; */
}
.input-text.lg {
  --font-size: 1.6rem;
  --padding-y: 0.8rem;
}
.input-text.xl {
  --font-size: 2rem;
  --padding-y: 1rem;
}
.input-text.xxl {
  --font-size: 4rem;
  --padding-y: 1.3rem;
}

.input-text .input[type="color"],
.input-text .input[type="range"] {
  padding: 0;
}

.input-text__clear {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  height: 100%;
  aspect-ratio: 1 /1;
}

.input-text__clear::after {
  content: "";
  height: var(--font-size);
  width: var(--font-size);
  background: currentColor;
  clip-path: polygon(
    20% 0%,
    0% 20%,
    30% 50%,
    0% 80%,
    20% 100%,
    50% 70%,
    80% 100%,
    100% 80%,
    70% 50%,
    100% 20%,
    80% 0%,
    50% 30%
  );
}

.input-text__floating-label {
  position: absolute;
  top: calc((100% - var(--font-size)) / 2);
  left: 100%;
  transition: all 0.25s;
  /* z-index: 1; */
  padding-left: var(--padding-x);
  color: rgb(192, 192, 192);
  font-size: var(--font-size);
  line-height: 1;
  transform: translate(1);
  min-width: max-content;
}
.input-text--focused .input-text__floating-label,
.input-text__floating-label--focused {
  position: absolute;
  top: var(--fl-height);
  padding-left: 0px;
  font-size: var(--fl-size);
  /* transform: translate(0px, var(--fl-height)); */
  left: 0%;
  color: rgb(134, 134, 134);
}

.input-text--disabled {
  opacity: 0.3;
}
</style>
