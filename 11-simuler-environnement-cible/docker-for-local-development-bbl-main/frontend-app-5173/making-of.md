
## Install axios

```shell
npm install axios
npm install oidc-client
npm update
```

```
the package esbuild-windows-64 could not be found
# delete node_modules and npm install
```

## Auth service

Copier le auth.service.ts

```ts
import {AUTH_CLIENT_ID, AUTH_SERVER_BASE_URL} from "@/constants";
import {UserManager, WebStorageStateStore} from "oidc-client";

class AuthService {
    userManager: UserManager;

    constructor() {
        const settings = {
            userStore: new WebStorageStateStore({store: window.localStorage}),
            authority: "http://utl_to_your_oidc_server",
            client_id: "oauth_client_id-of-this-frontend-app",
            redirect_uri:
                window.location.protocol +
                "//" +
                window.location.hostname +
                ":" +
                window.location.port +
                "/callback.html",
            automaticSilentRenew: true,
            silent_redirect_uri:
                window.location.protocol +
                "//" +
                window.location.hostname +
                ":" +
                window.location.port +
                "/silent-renew.html",
            response_type: "code",
            scope: "openid profile",
            post_logout_redirect_uri:
                window.location.protocol +
                "//" +
                window.location.hostname +
                ":" +
                window.location.port,
            filterProtocolClaims: true,
        };
        this.userManager = new UserManager(settings);
    }

    getUser() {
        return this.userManager.getUser();
    }

    login() {
        return this.userManager.signinRedirect({state: window.location.pathname});
    }

    logout() {
        return this.userManager.signoutRedirect();
    }

    renewToken() {
        return this.userManager.signinSilent();
    }

    removeUser() {
        return this.userManager.removeUser();
    }

    getAccessToken() {
        return this.userManager.getUser().then((data) => {
            return data?.access_token;
        });
    }
}

export default new AuthService();

```

## public

créer `public/callback.html` et `public/silent-renew.html`

`public/callback.html`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Waiting...</title>
</head>
<body>
    <script src="js/oidc-client.js"></script>
    <script>

        var mgr = new Oidc.UserManager({ response_mode: 'query', userStore: new Oidc.WebStorageStateStore() }).signinRedirectCallback().then(function (user) {
            console.log("signin response success", user);
            window.location.href = '..'+user.state;
        }).catch(function (err) {
            console.log(err);
            });

    </script>
</body>
</html>
```

`public/silent-renew.html`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Waiting...</title>
</head>
<body>
    <script src="js/oidc-client.js"></script>
    <script>

        var mgr = new Oidc.UserManager().signinSilentCallback();
    </script>
</body>
</html>
```

copier node_modules/oidc-client/dist/oidc-client.min.js dans public/js

dans les scripts de callback et silent renew remplacer l'import oidc-client.js par oidc-client.min.js

## add axios instance

`src/http/api.ts`

```ts
import { BACKEND_API_BASE_URL } from "@/constants";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;

```

## axios interceptors setup

```ts
import axiosInstance from "@/http/api";
import type AuthService from "./auth.service";
 import type {AxiosError, AxiosResponse, AxiosRequestConfig} from "axios"

const setup = (auth?: typeof AuthService) => {
    if (auth) {
        // auth is enabled
        axiosInstance.interceptors.request.use(
            async (config:AxiosRequestConfig) => {
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
            (error:AxiosError) => {
                return Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(
            (res:AxiosResponse) => {
                return res;
            },
            async (err:AxiosError) => {
                const originalConfig = err.config;
                if (err.response && originalConfig.url !== "/auth/signin") {
                    // Access Token was expired
                    if (err.response.status === 401 && !originalConfig._retry) {
                        renewToken(originalConfig, auth);
                    } else if (err.response.status === 400) {
                        console.error("Http response error: ",err)
                    }
                }
                return Promise.reject(err);
            }
        );
    } else {
        // Auth is not enabled
        axiosInstance.interceptors.response.use(
            (res:AxiosResponse) => {
                return res;
            },
            async (err:AxiosError) => {
                if (err?.response?.status === 400) {
                    console.error("Http response error: ",err)
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

```

## main.ts

```ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import auth from "@/services/auth.service";
import setupInterceptors from "./services/setupInterceptors";


auth.getUser().then((user) => {
if (user && user !== null) {
  if (user.expires_at < Date.now() / 1000) {
    auth.removeUser();
    auth.login();
  }
  console.log("auth ok");

  setupInterceptors(auth);
  
  createApp(App)
    .use(router)
    .mount("#app");
} else {
  auth.login();
}
});
// Else we don't create the app if the user is not logged in

```

## Externalize configuration

`env.d.ts`

```ts

```




