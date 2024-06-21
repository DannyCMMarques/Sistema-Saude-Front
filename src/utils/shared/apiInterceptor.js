import { useEffect } from "react";
import axios from "axios";

const apiInterceptor = () => {
  const token = localStorage.getItem("acess_token");
  const baseUrl = "http://localhost:8080"

  const api = axios.create({
    baseURL: baseUrl,
  });

  api.interceptors.response.use( 
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        (error.response &&
          error.response.data &&
          error.response.data.error === "Token inválido") ||
        (error.response &&
          error.response.data &&
          error.response.data.error ===
            "Você não tem permissão para acessar essa rota, entre em contato com o administrador")
      ) {
        localStorage.removeItem("access_token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 200);
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      api.interceptors.response.eject();
      api.interceptors.request.eject();
    };
  }, []); 
  return api;
};

export default apiInterceptor;
