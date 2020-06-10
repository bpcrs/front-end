import Car from './Car';
import {authRoles} from 'app/auth';
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import CarDetail from './CarDetail';

export const CarConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/car',
            component: Car
        }
        // {
        //     path     : '/car/details',
        //     component: CarDetail
        // }
    ]
};

