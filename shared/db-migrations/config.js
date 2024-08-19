import { appName, appVersion } from 'settings';

/**
 * @typedef {object} Config
 * @property {string} APP_NAME - The whole app name
 * @property {string} APP_VERSION - The whole app version
 * @property {string} PATCH_FOLDER - The full path to the patch folder
 * @property {string} LOG_LEVEL - The log level to use for the logger defaults to info
 * @property {string} PG_CONNECTION - The Postgres connection uri for the app to use
 * @property {string} PG_MIGRATION_CONNECTION - The Postgres connection uri to use for running db migrations
 */

/**
 * Get the application config
 * @returns {Config} - The application config
 */
export function getConfig() {
  return {
    APP_NAME: appName,
    APP_VERSION: appVersion,
    PATCH_FOLDER: process.env.PATCH_FOLDER,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    PG_CONNECTION: process.env.PG_CONNECTION,
    PG_MIGRATION_CONNECTION: process.env.PG_MIGRATION_CONNECTION,
  };
}
