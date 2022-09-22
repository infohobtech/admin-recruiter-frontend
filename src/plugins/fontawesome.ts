import type { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faBorderAll,
  faUsers,
  faUserGroup,
  faGear,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faBorderAll, faUsers, faUserGroup, faGear, faAngleDown);

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    AIcon: typeof FontAwesomeIcon;
  }
}

export default {
  install(app: App) {
    app.component("FIcon", FontAwesomeIcon);
  }
};
