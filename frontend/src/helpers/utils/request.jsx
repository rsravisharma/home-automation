import axios from "axios";
import store from "../redux/store";
import { AuthActions } from "../redux/slices/auth.slice";
class Request {
    http;
    _http;
    constructor(base = undefined) {
        const _uri_with_base = base
            ? process.env.REACT_APP_API_URL + base
            : process.env.REACT_APP_API_URL || "";
        const _uri = process.env.REACT_APP_API_URL || "";


        this.http = this.createHttp(_uri_with_base);
        this._http = this.createHttp(_uri);
    }

    createHttp(_uri) {
        const _axios = axios.create({ baseURL: _uri });
        _axios.interceptors.request.use(
            function (config) {
                // Do something before request is sent
                const headers = {};
                if (localStorage.getItem("token")) {
                    headers.Authorization = `${localStorage.getItem("token")}`;
                }
                config.headers = headers;
                return config;
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        _axios.interceptors.response.use(
            (response) => {
                if (response.config.parse) {
                    //perform the manipulation here and change the response object
                    if (response.status !== 200) return Promise.reject(new Error(response.data.message));
                }
                if(response.data) return Promise.resolve(response.data);
                return response;
            },
            (error) => {
                error.message = error?.response?.data?.message ?? error.message
                console.log(error);
                if (error.response.status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    store.dispatch(AuthActions.reset());
                }
                return Promise.reject(new Error(error.message));
            }
        );
        return _axios;
    }
}

export default Request;