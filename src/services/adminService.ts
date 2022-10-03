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

  editIndustry(payload: IndustryModel) {
    return axiosAdmin.put("/industry/" + payload.id, payload);
  },

  deleteIndustry(payload: number) {
    return axiosAdmin.delete("/industry/" + payload);
  },

  getAllNetworks() {
    return axiosAdmin.get("/network");
  },
  addNetwork(payload: IndustryModel) {
    return axiosAdmin.post("/network", payload);
  },

  editNetwork(payload: IndustryModel) {
    return axiosAdmin.put("/network/" + payload.id, payload);
  },

  deleteNetwork(payload: number) {
    return axiosAdmin.delete("/network/" + payload);
  },
  getAllSkills() {
    return axiosAdmin.get("/skill");
  },
  addSkill(payload: IndustryModel) {
    return axiosAdmin.post("/skill", payload);
  },

  editSkill(payload: IndustryModel) {
    return axiosAdmin.put("/skill/" + payload.id, payload);
  },

  deleteSkill(payload: number) {
    return axiosAdmin.delete("/skill/" + payload);
  }
};
