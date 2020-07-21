import { APP_PATH } from "../../../constant";
import FuseLoadable from "@fuse/components/FuseLoadable/FuseLoadable";

export const CheckingConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: true
                },
                toolbar: {
                    display: false
                },
                footer: {
                    display: false
                },
                leftSidePanel: {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    routes: [
        {
            path: APP_PATH.CHECKING,
            component: FuseLoadable({
                loader: () => import("./Checking"),
              }),
        },
        
    ]
};