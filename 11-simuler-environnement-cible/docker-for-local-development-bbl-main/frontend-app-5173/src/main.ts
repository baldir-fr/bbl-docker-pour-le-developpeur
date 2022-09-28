import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import auth from "@/auth/auth.service";
import setupInterceptors from "./auth/auth.axios.interceptors";
import {loadConfiguration, useAppConfiguration} from "@/conf/conf.runtime";

const appConfiguration = await loadConfiguration();
console.log("appConfiguration : ", appConfiguration);

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
        //    .use(useAppConfiguration, appConfiguration)
            .mount("#app");
    } else {
        auth.login();
    }
})
    .catch((err) => {
        console.error("Initial Auth error:", err)
        createApp(App)
            .use(router)
            .mount("#app");
    });

