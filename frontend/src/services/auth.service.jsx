import store from "../helpers/redux/store";
import { AuthActions } from "../helpers/redux/slices/auth.slice";
import Request from "../helpers/utils/request";
const request = new Request("/auth");

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        request.http.post("/login", { username, password }).then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            store.dispatch(AuthActions.update({ 
                token: res.data.token,
                role:  res.data.role,
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
            request.http.post("/verifyToken").then(res => {
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