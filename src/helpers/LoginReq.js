import Axios from "axios";
import { baseURL } from "../configurations/environments";
import { RequestConfig } from "./RequestConfig";

export const LoginReq = async (form) => {
  let requestURL = baseURL + `/api/v1/auth`;
  let responseResult = {
    status: "",
    message: "",
    data: "",
  };
  await Axios.post(requestURL, form)
    .then((response) => {
      responseResult = {
        status: true,
        message: response.data && response.data.message && response.data.message,
        data: response.data && response.data.data && response.data.data,
      };
    })
    .catch((error) => {
      responseResult = {
        status: false,
        message:
          error.response &&
          error.response?.data &&
          error.response.data.errors &&
          error.response.data.errors,
      };
    });
  return responseResult;
};

export const changePassword = async (form) => {
  let requestURL = baseURL + `/api/v1/auth/changePassword`;
  let responseResult = {
    status: "",
    message: "",
    data: "",
  };
  await Axios.put(requestURL, form, RequestConfig())
    .then((response) => {
      responseResult = {
        status: true,
        message: response.data && response.data.message && response.data.message,
        data: response.data && response.data.data && response.data.data,
      };
    })
    .catch((error) => {
      responseResult = {
        status: false,
        message:
          error.response &&
          error.response?.data &&
          error.response.data.errors &&
          error.response.data.errors,
      };
    });
  return responseResult;
};
