import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse/index";
import { UserConfig } from "app/main/user/UserConfig";
import { LoginConfig } from "../login/LoginConfig";
import { LandingConfig } from "../main/landing/LandingConfig";
// import { CarConfig } from '../car/CarConfig'
import {SubmitLicenseConfig} from '../main/submitLicense/submitLicenseConfig';

import { BookingConfig } from "../main/booking/BookingConfig";
import { CompareCarConfig } from "../main/CompareCar/CompareCarConfig";
import { ChatConfig } from "../main/chat/ChatConfig";
import { ErrorConfig } from "../main/error/ErrorConfig";
import { APP_PATH } from "../../constant";
const routeConfigs = [
  UserConfig,
  LoginConfig,
  LandingConfig,
  CompareCarConfig,
  BookingConfig,
  SubmitLicenseConfig,
  ChatConfig,
  ErrorConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    component: () => <Redirect to={APP_PATH.ERORR_404} />,
  },
];

export default routes;
