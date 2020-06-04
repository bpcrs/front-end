import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { APP_CONST } from '../../../constant';
import { showMessage } from '../../store/actions/fuse';
import { useDispatch } from 'react-redux';
import { submitLogin } from '../../auth/store/actions';
function JWTLoginTab() {
    const dispatch = useDispatch()

    const responseGoogle = (response) => {
        if (response.tokenId) {
            dispatch(submitLogin(response.tokenId))
            // props.submitLogin(response.tokenId);
            dispatch(showMessage({
                message : "Login successfully",
                variant : "success"
            }));
        } else {
            dispatch(showMessage({
                message : "Your account not permitted",
                variant : "error"
            }));
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


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         submitLogin: authActions.submitLogin
//     }, dispatch);
// }

// function mapStateToProps({ auth }) {
//     return {
//         login: auth.login,
//         user: auth.user
//     }
// }

export default withRouter(JWTLoginTab);
