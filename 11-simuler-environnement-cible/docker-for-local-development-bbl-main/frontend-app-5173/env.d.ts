/// <reference types="vite/client" />

// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ImportMetaEnv {

    // Variables are prefixed with VITE
    // https://vitejs.dev/guide/env-and-mode.html#env-files
    // > To prevent accidentally leaking env variables to the client,
    // only variables prefixed with VITE_ are exposed to your Vite-processed code.

    readonly VITE_BACKEND_API_BASE_URL: string;
    // Auth server : keycloak
    readonly VITE_AUTH_SERVER_BASE_URL: string;
    // Client : this vuejs application
    readonly VITE_AUTH_CLIENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}