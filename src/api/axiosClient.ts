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

  const token = import.meta.env.VITE_APP_API_TOKEN;
  if (!token) return axiosClient;

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
