import axiosInstance from "@/http/api";
import type AuthService from "./auth.service";
import type {AxiosError, AxiosResponse, AxiosRequestConfig} from "axios"

const setup = (auth?: typeof AuthService) => {
    if (auth) {
        // auth is enabled
        axiosInstance.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                let token = "";
                if (auth) {
                    token = (await auth.getAccessToken()) as string;
                } else {
                    token = "test-env";
                }
                if (token) {
                    config.headers["Authorization"] = "Bearer " + token;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(
            (res: AxiosResponse) => {
                return res;
            },
            async (err: AxiosError) => {
                const originalConfig = err.config;
                if (err.response && originalConfig.url !== "/auth/signin") {
                    // Access Token was expired
                    if (err.response.status === 401 && !originalConfig._retry) {
                        renewToken(originalConfig, auth);
                    } else if (err.response.status === 400) {
                        console.error("Http response error: ", err)
                    }
                }
                return Promise.reject(err);
            }
        );
    } else {
        // Auth is not enabled
        axiosInstance.interceptors.response.use(
            (res: AxiosResponse) => {
                return res;
            },
            async (err: AxiosError) => {
                if (err?.response?.status === 400) {
                    console.error("Http response error: ", err)
                }
                return Promise.reject(err);
            }
        );
    }

};

function renewToken(originalConfig: any, auth: any) {
    originalConfig._retry = true;
    try {
        auth.renewToken();

        return axiosInstance(originalConfig);
    } catch (_error) {
        return Promise.reject(_error);
    }
}

export default setup;
