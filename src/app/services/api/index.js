import axios from "axios";
import jwtService from "../jwtService";
import { APP_CONST } from "../../../constant";

const getHeaders = () => {
  const header = {
    "Content-Type": "application/json",
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
export const POST = (endpoint, params = {}, body = {}) => {
  return request(endpoint, "POST", params, body);
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

export const PUT = (endpoint, params = {}, body = {}) => {
  return request(endpoint, "PUT", params, body);
};

export const ENDPOINT = {
  CAR_CONTROLLER_GETALL: "/car",
  CAR_CONTROLLER_GETBYID: (id) => `/car/${id}`,
  REVIEW_CONTROLLER_GETALL: "/review",
};
