import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import { APP_CONST } from '../../../constant';

class jwtService extends FuseUtils.EventEmitter {

    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }


    getUserDataFromToken = () => {
        const token = this.getAccessToken();
        if (!token) {
            return;
        }
        const decoded = jwtDecode(token);
        return JSON.parse(decoded.sub);
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if (!access_token) {
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithToken = (token) => {
        return new Promise((resolve, reject) => {
            axios.post(APP_CONST.API_URL + '/account/google/login', {
                token: token
            })
                .then(response => {
                    if (response.data.success) {
                        let accessToken = response.data.data;
                        this.setSession(accessToken);
                        resolve(accessToken);
                    }
                    else {
                        reject(response.data.message);
                    }
                }).catch(err => {
                    if (err.response) {
                        reject(err.response.status === 400 ? err.response.data : err)
                    } else {
                        reject(err)
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }
        else {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
