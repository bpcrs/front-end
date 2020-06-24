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
  return request(endpoint, "GET", params);
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

export const ENDPOINT = {
  CAR_CONTROLLER_GETALL: "/car",
  REVIEW_CONTROLLER_GETALL: "/review",
};
