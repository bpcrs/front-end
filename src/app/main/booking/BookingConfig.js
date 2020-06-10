import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import { authRoles } from 'app/auth';
import CarDetail from './CarDetail';
import { APP_PATH } from '../../../constant';

export const BookingConfig = {
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
    routes  : [
        {
            path     : APP_PATH.CAR_LIST,
            component: FuseLoadable({
                loader: () => import('./CarList')
            }),
        },
        {
            path     : APP_PATH.CAR_ITEM + "/:id",
            component: CarDetail
        },
        {
            path     : APP_PATH.VIEW_BOOKING,
            component: FuseLoadable({
                loader: () => import('./ViewBooking')
            }),
        },
    ],
};