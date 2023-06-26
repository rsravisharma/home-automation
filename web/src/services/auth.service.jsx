import store from "../redux/store";
import { AuthActions } from "../redux/slices/auth.slice";
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

export const verify = () => {
    if (localStorage.getItem("accessToken")) {
        return new Promise((resolve, reject) => {
            request.http.post("/verify").then(res => {
                store.dispatch(AuthActions.update({ 
                    accessToken: localStorage.getItem("accessToken"),
                    refreshToken: localStorage.getItem("refreshToken")
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

export const me = () => {
    return request.http.get("/me", {accessToken: localStorage.getItem("accessToken")}).then(res => {
        store.dispatch(AuthActions.update({
            profile: res.data,
        }));
        return res;
    });
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    store.dispatch(AuthActions.reset());
}