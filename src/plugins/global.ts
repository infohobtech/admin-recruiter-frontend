import type { App } from "vue";
import InputText from "../components/inputs/InputText.vue";
import Button from "../components/inputs/Button.vue";
import Modal from "../components/overlay/Modal.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Modal: typeof Modal;
    InputText: typeof InputText;
  }
}

export default {
  install(app: App) {
    app.component("Modal", Modal);
    app.component("InputText", InputText);
    app.component("Button", Button);
  }
};
