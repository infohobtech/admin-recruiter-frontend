import { axiosAuth } from ".";

type LoginRequest = { email: string; password: string };

export default {
  login(payload: LoginRequest) {
    return axiosAuth.post("/login", payload);
  }
};
