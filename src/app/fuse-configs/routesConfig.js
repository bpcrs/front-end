import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse/index";
import { UserConfig } from "app/main/user/UserConfig";
import { LoginConfig } from "../login/LoginConfig";
import { LandingConfig } from "../main/landing/LandingConfig";
// import { CarConfig } from '../car/CarConfig'
import {SubmitLicenseConfig} from '../main/submitLicense/submitLicenseConfig';
import { BookingConfig } from "../main/booking/BookingConfig";
import { ChatConfig } from "../main/chat/ChatConfig";
import { ErrorConfig } from "../main/error/ErrorConfig";
import { APP_PATH } from "../../constant";
import {CheckingConfig} from "../main/checking/CheckingConfig";

const routeConfigs = [
  UserConfig,
  LoginConfig,
  LandingConfig,
  BookingConfig,
  SubmitLicenseConfig,
  ChatConfig,
  ErrorConfig,
  CheckingConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    component: () => <Redirect to={APP_PATH.ERORR_404} />,
  },
];

export default routes;
