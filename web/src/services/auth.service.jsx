import store from "../helpers/redux/store";
import { AuthActions } from "../helpers/redux/slices/auth.slice";
import Request from "../helpers/utils/request";
const request = new Request("/auth");

export const signIn = (username, password) => {
    return new Promise((resolve, reject) => {
        request.http.post("/signin", { username, password }).then(res => {
            localStorage.setItem("accessToken", res.result.accessToken);
            localStorage.setItem("refreshToken", res.result.refreshToken);
            store.dispatch(AuthActions.update({ 
                accessToken: res.result.accessToken,
                refreshToken:  res.result.refreshToken,
             }));
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    });
}

export const signUp = (name, username, email, password) => {
    return new Promise((resolve, reject) => {
        request.http.post("/signup", { name, username, email, password }).then(res => {
            localStorage.setItem("accessToken", res.result.accessToken);
            localStorage.setItem("refreshToken", res.result.refreshToken);
            store.dispatch(AuthActions.update({ 
                accessToken: res.result.accessToken,
                refreshToken:  res.result.refreshToken,
             }));
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    });
}

export const verifyToken = () => {
    if (localStorage.getItem("token")) {
        return new Promise((resolve, reject) => {
            request.http.post("/verify").then(res => {
                store.dispatch(AuthActions.update({ 
                    token: localStorage.getItem("token"),
                    role: localStorage.getItem("role")
                 }));
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    } else {
        return Promise.reject(new Error("Token is not there"));
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    store.dispatch(AuthActions.reset());
}