import {UserManager, WebStorageStateStore} from "oidc-client";
import {loadConfiguration} from "@/conf/conf.runtime";

class AuthService {
    userManager: UserManager;

    constructor() {
        const settings = {
            userStore: new WebStorageStateStore({store: window.localStorage}),
            authority: import.meta.env.VITE_AUTH_SERVER_BASE_URL,
            client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
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
