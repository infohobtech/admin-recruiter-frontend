import { createApp } from "vue";
import router from "./router";
import "./assets/css/style.css";
import "./assets/css/utility.css";
import "./assets/css/loader.css";
import "ayoflex/dist/ayoflex.min.css";
import App from "./App.vue";
import FIcons from "./plugins/fontawesome";
import GlobalComponents from "./plugins/global";

const app = createApp(App);
app.use(router);
app.use(FIcons);
app.use(GlobalComponents);

router.isReady().then(() => {
  app.mount("#app");
});
