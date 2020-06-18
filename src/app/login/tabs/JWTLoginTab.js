import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { APP_CONST } from '../../../constant';
import { showMessageError } from '../../store/actions/fuse';
import { useDispatch } from 'react-redux';
import { submitLogin } from '../../auth/store/actions';
function JWTLoginTab() {
    const dispatch = useDispatch()

    const responseGoogle = (response) => {
        if (response.tokenId) {
            dispatch(submitLogin(response.tokenId))
        } else {
            if (response.details) {
                dispatch(showMessageError(response.details));
            } else {
                dispatch(showMessageError("An error occurred"));
            }
        }
    }
    return (
        <div className="w-full">
            <GoogleLogin
                clientId={APP_CONST.GOOGLE_CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="LOG IN"
                    value="legacy"
                >
                    Login with Google Account
                        </Button>}
            />
        </div>
    );
}
export default withRouter(JWTLoginTab);
