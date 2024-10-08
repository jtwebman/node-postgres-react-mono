import { appName, appVersion } from 'settings';

/**
 * @typedef {object} Config
 * @property {string} APP_NAME - The whole app name
 * @property {string} APP_VERSION - The whole app version
 * @property {number} PORT - The port number to start the API on defaults to 3000
 * @property {string} LOG_LEVEL - The log level to use for the logger defaults to info
 * @property {string} PG_CONNECTION - The Postgres connection uri for the app to use
 */

/**
 * Get the application config
 * @returns {Config} - The application config
 */
export function getConfig() {
  return {
    APP_NAME: appName,
    APP_VERSION: appVersion,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    PG_CONNECTION: process.env.PG_CONNECTION,
  };
}
