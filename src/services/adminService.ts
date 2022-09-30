import { axiosAdmin } from ".";

type IndustryModel = { title: string; id?: number };

export default {
  getUserInfo() {
    return axiosAdmin.get("/auth/user-info");
  },
  getAllIndustries() {
    return axiosAdmin.get("/industry");
  },
  addIndustry(payload: IndustryModel) {
    return axiosAdmin.post("/industry", payload);
  },

  deleteIndustry(payload: number) {
    return axiosAdmin.delete("/industry/" + payload);
  },

  editIndustry(payload: IndustryModel) {
    return axiosAdmin.put("/industry/" + payload.id, payload);
  }
};
