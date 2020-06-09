import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { UserConfig } from 'app/main/user/UserConfig';
import { LoginConfig } from '../login/LoginConfig';
import { LandingConfig } from '../main/landing/LandingConfig';
import { BookingConfig } from '../main/booking/BookingConfig';

const routeConfigs = [
    UserConfig,
    LoginConfig,
    LandingConfig,
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
