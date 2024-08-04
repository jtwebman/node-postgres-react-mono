import { appName } from 'settings';

/**
 * @typedef {object} Config
 * @property {string} APP_NAME - The app name
 * @property {number} PORT - The port number to start the API on defaults to 3000
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
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    PG_CONNECTION: process.env.PG_CONNECTION,
    PG_MIGRATION_CONNECTION: process.env.PG_MIGRATION_CONNECTION,
  };
}
