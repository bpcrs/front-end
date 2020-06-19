import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';
import { APP_PATH } from '../../../constant';

export const LandingConfig = {
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
            path     : APP_PATH.LANDING,
            component: FuseLoadable({
                loader: () => import('./Landing')
            })
        },
        {
            path     : APP_PATH.LANDING_MOBILE,
            component: FuseLoadable({
                loader: () => import('./LandingMobile')
            })
        }
    ]
};