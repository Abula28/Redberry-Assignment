import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const getAxiosClient = (
  axiosConfig?: AxiosRequestConfig | undefined
): AxiosInstance => {
  const apiUrl = "https://api.real-estate-manager.redberryinternship.ge/api";

  const axiosClient = axios.create({
    baseURL: new URL(apiUrl).toString(),
    withCredentials: false,
    ...axiosConfig,
  });

  const token = "9cfc4a2c-50a6-44b4-8e02-03e4136cb1d3";

  axiosClient.interceptors.request.use((req) => {
    if (req && req.headers) {
      if (!req.headers.authorization) {
        req.headers.authorization = `Bearer ${token}`;
      }
    }
    return req;
  });

  return axiosClient;
};
