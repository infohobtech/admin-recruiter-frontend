import type { App } from "vue";
import Modal from "../components/overlay/Modal.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Modal: typeof Modal;
  }
}

export default {
  install(app: App) {
    app.component("Modal", Modal);
  }
};
