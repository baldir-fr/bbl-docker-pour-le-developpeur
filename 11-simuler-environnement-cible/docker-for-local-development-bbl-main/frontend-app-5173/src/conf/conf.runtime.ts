import type {App, Plugin} from 'vue';

export const useAppConfiguration: Plugin = {
    install: (app: App, options: AppConfiguration) => {
        app.provide("appConfiguration", options)
    }
}

export interface AppConfiguration extends ImportMetaEnv {
    instance: AppConfiguration;
}

/**
 * Loads runtime configuration from static file (in /public folder).
 * Merges it with default configuration and then merges them with configuration from env variables.
 */
export const loadConfiguration = async (): Promise<AppConfiguration> => {
    const resp = await fetch('/conf.runtime.json')
    const runtimeConfig: Partial<AppConfiguration> = await resp?.json() as AppConfiguration ?? {} as AppConfiguration

    const envConfig: Partial<AppConfiguration> = import.meta.env;
    const defaultConfig: Partial<AppConfiguration> = {}

    // TODO merge fil then env
    return {
        ...defaultConfig,
        ...runtimeConfig,
        ...envConfig
    } as AppConfiguration
}