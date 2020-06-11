import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { UserConfig } from 'app/main/user/UserConfig';
import { LoginConfig } from '../login/LoginConfig';
import { LandingConfig } from '../main/landing/LandingConfig';
import { CarConfig } from '../car/CarConfig'
import { BookingConfig } from '../main/booking/BookingConfig';
import {CompareCarConfig} from '../main/CompareCar/CompareCarConfig';
const routeConfigs = [
<<<<<<< HEAD
=======
    UserConfig,
>>>>>>> eb92ece3744b82c8cdae327e547997f6a3d903d5
    LoginConfig,
    LandingConfig,
    CompareCarConfig,
    BookingConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        component: () => <Redirect to="/example" />
    }
];

export default routes;
