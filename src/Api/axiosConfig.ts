import axios from "axios";

// const myEnv = import.meta.env.VITE_COIN_SERVER;

const axiosInstance = axios.create({
  baseURL: "https://api.coinbase.com/v2",
});

// Handle axios during sending request
// axiosInstance.interceptors.request.use(
//   (config: any) => {
//     console.log("axios Config", config);
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );

// Handler axios responses
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return error.response;
  }
);

// Api classes

export default class ApiClass {
  get(url: any, config?: any) {
    return axiosInstance.get(url, config);
  }

  post(url: string, payload: any, config?: any) {
    return axiosInstance.post(url, payload, config);
  }
}
