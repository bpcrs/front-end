import React, { Component } from 'react';
import { Button, Divider, Typography, InputAdornment, Icon } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import { bindActionCreators } from 'redux';
import { withRouter, useHistory } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import { GoogleLogin } from 'react-google-login';
import { APP_CONST } from '../../../constant';
function JWTLoginTab(props) {

    const responseGoogle = (response) => {
        if (response.tokenId) {
            props.submitLogin(response.tokenId)
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


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({ auth }) {
    return {
        login: auth.login,
        user: auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTLoginTab));
