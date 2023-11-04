import Axios from "axios";
import { baseURL } from "./configurations/environments";
import Swal from "sweetalert2";

let isRefreshing = false;

let failedRequests = [];

// AccessTokenInterceptor
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  Axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const refreshToken = localStorage.getItem("refresh_token");
              const newTokenRes = await Axios.post(
                baseURL + `/api/v1/auth/refreshtoken`,
                { RefreshToken: refreshToken }
              );
              if (newTokenRes.status) {
                localStorage.setItem("token", newTokenRes.data.data.token);
                localStorage.setItem(
                  "refresh_token",
                  newTokenRes.data.data.refreshToken
                );
                failedRequests.length > 0 &&
                  failedRequests.forEach((request) => request());
                failedRequests = [];
              } else {
                Swal.fire({
                  title: "Hata",
                  text: "Yetkisiz giriş yaptınız! Lütfen tekrar giriş yapın",
                  icon: "warning",
                  timer: 5000,
                });
                localStorage.clear();
                setTimeout(() => {
                  window.location = "/login";
                }, 3000);
              }
            } catch (error) {
              Swal.fire({
                title: "Hata",
                text: "Yetkisiz giriş yaptınız! Lütfen tekrar giriş yapın",
                icon: "warning",
                timer: 5000,
              });
              localStorage.clear();
              setTimeout(() => {
                window.location = "/login";
              }, 3000);
            }
          }

          const retryOriginalRequest = new Promise((resolve) => {
            failedRequests.push(() => {
              originalConfig.headers["Authorization"] =
                "Bearer " + localStorage.getItem("token");
              resolve(Axios(originalConfig));
            });
          });

          return retryOriginalRequest;
        } else if (err.response.status === 403 && !originalConfig._retry) {
          window.location = "/login";
        }
      }
      return Promise.reject(err);
    }
  );
};
