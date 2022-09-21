import { axiosAdmin } from ".";

export default {
  getUserInfo() {
    return axiosAdmin.get("/auth/user-info");
  }
};
