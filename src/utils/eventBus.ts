import mitt from "mitt";

type Events = {
  toast: ToastItem;
};

const eventBusInstance = mitt<Events>();

export const eventBus = eventBusInstance;

export interface ToastItem {
  type: string;
  summary?: string;
  detail?: string;
  duration?: number;
}
