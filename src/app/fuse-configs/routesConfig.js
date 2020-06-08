import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import { LoginConfig } from '../login/LoginConfig';
import Landing from '../main/landing/Landing';
import { LandingConfig } from '../main/landing/LandingConfig';
import { BookingConfig } from '../main/booking/BookingConfig';

const routeConfigs = [
    ExampleConfig,
    LoginConfig,
    LandingConfig,
    BookingConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    }
];

 export default routes;
