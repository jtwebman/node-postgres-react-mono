import { getConfig } from './config.js';
import { getContext } from './context.js';
import { getLogger } from './logger.js';
import { getDB } from './data/db.js';
import { getApp } from './app.js';
import stoppable from 'stoppable';

const killSignals = {
  SHUTDOWN: 0,
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

const config = getConfig();
const logger = getLogger(config);
let db = null;
let nodeApp = null;

/**
 * Shutdown apps correctly
 * @param  {String} signal - signal used to exit
 * @param  {import('./data/db.js').DB} db - the DB object
 * @param  {*} nodeApp - the stopable app
 */
async function shutdown(signal) {
  if (nodeApp) {
    logger.info(`Trying shutdown by got ${signal} shutting down App ${config.APP_NAME} api`);
    await new Promise((resolve, reject) => {
      nodeApp.stop(error => {
        if (error) {
          return reject(error);
        }
        logger.info(`App ${config.APP_NAME} api shutdown`);
        return resolve();
      });
    });
  }
  if (db) {
    logger.info(`Trying shutdown of DB for App ${config.APP_NAME} api`);
    db.end();
    logger.info(`App ${config.APP_NAME} api DB shutdown`);
  }
}

try {
  db = await getDB(config.PG_CONNECTION);
  const context = await getContext(config, logger, db);
  const app = getApp(context);
  nodeApp = stoppable(
    app.listen(config.PORT, err => {
      if (err) {
        logger.error(`Error starting App ${config.APP_NAME} api shutting down`, err);
        return shutdown(killSignals.SHUTDOWN);
      }
      logger.info(`App ${config.APP_NAME} api listening locally on port ${config.PORT}`);
    }),
  );
} catch (error) {
  logger.error(`Error starting App ${config.APP_NAME} api shutting down`, error);
  shutdown(killSignals.SHUTDOWN);
}

process.on('SIGHUP', () => shutdown('SIGHUP', killSignals.SIGHUP));
process.on('SIGINT', () => shutdown('SIGINT', killSignals.SIGINT));
process.on('SIGTERM', () => shutdown('SIGTERM', killSignals.SIGTERM));
