import { axiosAdmin } from ".";

type IndustryModel = { title: string; id?: number };
type CountryModel = {
  name: string;
  phoneCode: string;
  shortName: string;
  id?: number;
};

type StateModel = {
  name: string;
  id?: number;
};

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
  },

  getAllCountries() {
    return axiosAdmin.get("/country");
  },
  addCountry(payload: CountryModel) {
    return axiosAdmin.post("/country", payload);
  },

  editCountry(payload: CountryModel) {
    return axiosAdmin.put("/country/" + payload.id, payload);
  },

  deleteCountry(payload: number) {
    return axiosAdmin.delete("/country/" + payload);
  },

  getAllStates(countryId: string) {
    return axiosAdmin.get(`country/${countryId}/state`);
  },

  addState(countryId: string, payload: StateModel) {
    return axiosAdmin.post(`/country/${countryId}/state`, payload);
  },
  editState(payload: StateModel) {
    return axiosAdmin.put(`/country/state/${payload.id}`, payload);
  },
  deleteState(payload: number) {
    return axiosAdmin.delete(`/country/state/${payload}`);
  }
};
