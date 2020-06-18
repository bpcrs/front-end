// import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { UserConfig } from 'app/main/user/UserConfig';
import { LoginConfig } from '../login/LoginConfig';
import { LandingConfig } from '../main/landing/LandingConfig';
// import { CarConfig } from '../car/CarConfig'
import { BookingConfig } from '../main/booking/BookingConfig';
import { CompareCarConfig } from '../main/CompareCar/CompareCarConfig';
import { ChatConfig } from '../main/chat/ChatConfig';
const routeConfigs = [
    UserConfig,
    LoginConfig,
    LandingConfig,
    CompareCarConfig,
    BookingConfig,
    ChatConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    // {
    //     path: '/',
    //     component: () => <Redirect to="/landing" />
    // }
];

export default routes;
