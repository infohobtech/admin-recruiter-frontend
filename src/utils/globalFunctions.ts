import { eventBus } from "./eventBus";

export const handleError = (error: any) => {
  let errorMessage = error;

  if (error.response) {
    errorMessage = error.response.data.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  eventBus.emit("toast", {
    type: "danger",
    summary: "Error",
    detail: errorMessage
  });
};

export const handleSuccess = (res: any) => {
  eventBus.emit("toast", {
    type: "success",
    summary: "Success",
    detail: res.data.message || "Success"
  });
};
