import Axios from "axios";
import { baseURL } from "./configurations/environment";
import Swal from "sweetalert2";

// Bu değişken, refreshToken isteği yapılırken, kullanıcının yönlendirilmemesi için kullanılacak
let isRefreshing = false;

// Bu değişken, refreshToken isteği beklerken, 401 durum kodu alan istekleri tutacak
let failedRequests = [];

// AccessTokenInterceptor
export default (props) => {
  Axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          // Eğer refreshToken isteği yapılmıyorsa veya beklenmiyorsa, yeni bir refreshToken isteği yapın.
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              // refreshToken isteği yapın ve yeni access_token alın
              const refreshToken = localStorage.getItem("refresh_token");
              const newTokenRes = await Axios.post(
                baseURL + `/api/v1/auth/refreshtoken`,
                { RefreshToken: refreshToken }
              );
              if (newTokenRes.status) {
                // Yeni access_token localStorage'a kaydedin
                localStorage.setItem("token", newTokenRes.data.data.token);
                localStorage.setItem(
                  "refresh_token",
                  newTokenRes.data.data.refreshToken
                );

                // Yapılmayan diğer istekleri başlatın
                failedRequests.length > 0 &&
                  failedRequests.forEach((request) => request());
                failedRequests = [];
              } else {
                // Eğer refreshToken isteği başarısız olursa, kullanıcıyı yeniden yönlendirin.

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

          // Bu istekler refreshToken isteği beklerken hata alabilirler. Bu istekleri failedRequests listesine ekleyin.
          const retryOriginalRequest = new Promise((resolve) => {
            failedRequests.push(() => {
              originalConfig.headers["Authorization"] =
                "Bearer " + localStorage.getItem("token");
              resolve(Axios(originalConfig));
            });
          });

          return retryOriginalRequest;
        } else if (err.response.status === 403 && !originalConfig._retry) {
          window.location = "/error";
        }
      }
      return Promise.reject(err);
    }
  );
};
