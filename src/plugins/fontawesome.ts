import type { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faBorderAll,
  faUsers,
  faUserGroup,
  faGear,
  faAngleDown,
  faIndustry,
  faPlus,
  faSearch,
  faPenToSquare,
  faTrash,
  faBars,
  faNetworkWired,
  faGears,
  faFlag
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faBorderAll,
  faUsers,
  faUserGroup,
  faGear,
  faAngleDown,
  faIndustry,
  faPlus,
  faSearch,
  faPenToSquare,
  faTrash,
  faBars,
  faNetworkWired,
  faGears,
  faFlag
);

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    FIcon: typeof FontAwesomeIcon;
  }
}

export default {
  install(app: App) {
    app.component("FIcon", FontAwesomeIcon);
  }
};
