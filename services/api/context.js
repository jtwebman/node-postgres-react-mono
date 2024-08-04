import { waitDBConnect } from './data/db.js';

/**
 * @typedef {object} Context
 * @property {import('./config.js').Config} config - The config object
 * @property {import('./logger.js').Logger} logger - The logger object
 * @property {Promise<import('./data/db.js').DB>} db - The database object
 */

/**
 * Use to get an context to be used for the applciation run. It also tests that it can connect to the DB.
 * @param {import('./config.js').Config} config - The config object
 * @param {import('./logger.js').Logger} logger - The logger object
 * @param {import('./data/db.js').DB} db - The DB object
 * @returns {Promise<Context>} - The context object used throught the app
 */
export function getContext(config, logger, db) {
  logger.info(`Setting up context for App ${config.APP_NAME} api and checking the DB connection`);
  return waitDBConnect(db).then(() => ({
    config,
    logger,
    db,
  }));
}
