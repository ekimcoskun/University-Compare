import Axios from "axios";
import { baseURL } from "../../configurations/environments";
import { RequestConfig } from "../RequestConfig";

export const createUniversity = async (form) => {
  let requestURL = baseURL + `/api/admin/university/create`;
  let responseResult = {
    status: "",
    message: "",
    data: "",
  };
  await Axios.post(requestURL, form, RequestConfig())
    .then((response) => {
      responseResult = {
        status: true,
        message: response.message && response.message,
        data: response.data && response.data,
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
export const updateUniversity = async (form) => {
  let requestURL = baseURL + `/api/v1/customer/campaign`;
  let responseResult = {
    status: "",
    message: "",
    data: "",
  };
  await Axios.put(requestURL, form, RequestConfig())
    .then((response) => {
      responseResult = {
        status: true,
        message: response.message && response.message,
        data: response.data && response.data,
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

export const deleteUniversity = async (form) => {
  let requestURL = baseURL + `/api/v1/admin/announcement/updateAnnouncement`;
  let responseResult = {
    status: "",
    message: "",
    data: "",
  };
  await Axios.delete(requestURL, form, RequestConfig())
    .then((response) => {
      responseResult = {
        status: true,
        message: response.message && response.message,
        data: response.data && response.data,
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
