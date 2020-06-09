import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { LoginConfig } from '../login/LoginConfig';
import Landing from '../main/landing/Landing';
import { LandingConfig } from '../main/landing/LandingConfig';
import { CarConfig } from '../car/CarConfig'
import { BookingConfig } from '../main/booking/BookingConfig';
const routeConfigs = [
    ExampleConfig,
    LoginConfig,
    LandingConfig,
    CarConfig,
    BookingConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    // {
    //     path     : '/',
    //     component: () => <Redirect to="/404"/>
    // }
];

export default routes;
