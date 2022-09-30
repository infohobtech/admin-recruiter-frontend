import { axiosAdmin } from ".";

type IndustryRequest = { title: string };

export default {
  getUserInfo() {
    return axiosAdmin.get("/auth/user-info");
  },
  addIndustry(payload: IndustryRequest) {
    return axiosAdmin.post("/industry", payload);
  }
};
