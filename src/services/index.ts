import axios from "axios";
const backEndDomain = "https://api.infohob.com/"; //import.meta.env.VITE_BACK_END_DOMAIN;

let apiBaseUrl = backEndDomain; //+ "/api/v1/";

// export const axiosPrivate = axios.create({
//   baseURL: apiBaseUrl + "private/",
//   timeout: 60000
//   // headers: {'X-Custom-Header': 'foobar'}
// });

export const axiosAdmin = axios.create({
  baseURL: apiBaseUrl + "admin/",
  timeout: 60000
  // headers: {'X-Custom-Header': 'foobar'}
});

export const axiosPublic = axios.create({
  baseURL: apiBaseUrl + "public/",
  timeout: 60000
  // headers: {'X-Custom-Header': 'foobar'}
});

export const axiosAuth = axios.create({
  baseURL: apiBaseUrl + "auth/",
  timeout: 60000
  // headers: {'X-Custom-Header': 'foobar'}
});

export const setAdminHeaders = (token: string) => {
  axiosAdmin.defaults.headers.common["authorization"] = token;
};

// Add a response interceptor
axiosAdmin.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    // Do something with response error
    if (error.response && error.response.status == 401) {
      if (window.location.href.indexOf("force-logout") === -1) {
        setTimeout(() => {
          window.location.href = "/force-logout";
        }, 111);
      }
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosAuth.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    // Do something with response error
    if (error.response && error.response.status == 401) {
      if (window.location.href.indexOf("force-logout") === -1) {
        setTimeout(() => {
          window.location.href = "/force-logout";
        }, 111);
      }
    }
    return Promise.reject(error);
  }
);
