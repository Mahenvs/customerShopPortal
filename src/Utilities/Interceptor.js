import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const basicAuthToken = localStorage.getItem("basicAuthToken");
    if (basicAuthToken) {
      config.headers.Authorization = `Basic ${basicAuthToken}`;
    }
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";

    console.log("Request Config:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export async function apiRequest(
  url,
  method,
  data = null,
  params = {},
  headers = {}
) {
  try {
    console.log(headers);
    // log;
    const response = api({
      method,
      url,
      data,
      params,
      headers,
    });
    console.log(response);

    return response;
  } catch (error) {
    // throw error;
    console.error(error);
  }
}
