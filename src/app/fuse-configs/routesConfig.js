import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import { LoginConfig } from '../login/LoginConfig';
import Landing from '../main/landing/Landing';
import { LandingConfig } from '../main/landing/LandingConfig';

const routeConfigs = [
    ExampleConfig,
    LoginConfig,
    LandingConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    // {
    //     path     : '/',
    //     component: () => <Redirect to="/404"/>
    // }
];

 export default routes;
