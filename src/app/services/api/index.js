import axios from "axios";
import jwtService from "../jwtService";
import { APP_CONST } from "../../../constant";

const getHeaders = () => {
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  };
  if (jwtService.getAccessToken()) {
    header.Authorization = `Bearer ${jwtService.getAccessToken()}`;
  }
  return header;
};
export const GET = (endpoint, params = {}) => {
  return request(endpoint, "GET", params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message);
      return errResponse;
    });
};
export const FETCH = (endpoint, params = {}) => {
  return requestMap(endpoint, "GET", params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message);
      return errResponse;
    });
};
export const POST = (endpoint, params = {}, body = {}) => {
  return request(endpoint, "POST", params, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message);
      return errResponse;
    });
};
export const request = (endpoint, method, params = {}, body = {}) => {
  return axios({
    url: APP_CONST.API_URL + endpoint,
    method: method,
    headers: getHeaders(),
    params: params,
    data: body,
  });
};
export const requestMap = (endpoint, method, params = {}, body = {}) => {
  return axios({
    url: endpoint,
    method: method,
    headers: getHeaders(),
    params: params,
    data: body,
  });
};

export const PUT = (endpoint, params = {}, body = {}) => {
  return request(endpoint, "PUT", params, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const errResponse =
        (error && error.response && error.response.data) ||
        (error && error.message);
      return errResponse;
    });
};

export const ENDPOINT = {
  CAR_CONTROLLER_GETALL: "/car",
  CAR_CONTROLLER_ADMIN_GETALL: "/car/available",
  CAR_CONTROLLER_GETBYID: (id) => `/car/${id}`,
  CAR_INFORMATION_OWNER_GETBYID: (id) => `/car/owner/${id}`,

  REVIEW_CONTROLLER_GETALL: "/review",
  ACCOUNT_ADDRESS_GETBYID: (id) => `/account/address/${id}`,
  ACCOUNT_CONTROLLER_GETALL: "/account",
  ACCOUNT_CONTROLLER_GETBYID: (id) => `/account/${id}`,
  ACCOUNT_LICENSE_UPDATE: (id) => `/account/license/${id}`,
  
  IMAGE_CONTROLLER_GETALL: "/image",
  BRAND_CONTROLLER_GETALL: "/brand",
  MODEL_CONTROLLER_GETALL: "/model",

  BOOKING_CONTROLLER_GETALL: "/booking",
  BOOKING_CONTROLLER_GETBYID: (id) => `/booking/${id}`,
  BOOKING_CONTROLLER_OWNER_GETBYID: (id) => `/booking/car/${id}`,
  BOOKING_CONTROLLER_RENTER_GETBYID: (id) => `/booking/renter/${id}`,

  CRITERIA_CONTROLLER_GETALL: "/criteria",

  AGREEMENT_CONTROLLER_GETALL: "/agreement",
  AGREEMENT_CONTROLLER_PUTBYID: (id) => `/agreement/${id}`,
  AGREEMENT_CONTROLLER_GETBYID: (id) => `/agreement/get/${id}`,
};
