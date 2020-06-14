import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { GoogleLogin, LoadingCreate, LoadingRemove } from "./tabs/authFirebase";



class ChatLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            modal: false
        };
    }   

    handelGoogleLogin = () => {
        const { googleLogin } = this.props;
        googleLogin();
    };


    render() {
        const { auth } = this.props;
        const { modal } = this.state;

        if (auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <React.Fragment>
                <button
                    className="btn flex-container"
                    onClick={this.handelGoogleLogin}
                >
                    {/* <Link to="/chat" style={{ textDecoration: "none" }}> */}
                    <i className="fab fa-twitter-square item" />
                    <span className="item">Login With Google</span>
                    {/* </Link> */}
                </button>
            </React.Fragment>
        );
    }
}

// export default Login;
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        status: state.auth.status
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        googleLogin: () => {
            dispatch(GoogleLogin());
        },
        loadingCreate: () => {
            dispatch(LoadingCreate());
        },
        loadingRemove: () => {
            dispatch(LoadingRemove());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatLogin);
