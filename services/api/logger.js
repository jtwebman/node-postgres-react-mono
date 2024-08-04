import pino from 'pino';
import npmPackage from './package.json' with { type: 'json' };

/**
 * @typedef {object} Logger
 * @property {(message:string - message to add to logs, values:object - Extra object values to add to json logs) => void} info - Call to log info messages with extra values
 * @property {(message:string - message to add to logs, error:Error - The Javascript error) => void} error - Call to log an error message and error object
 */

/**
 *
 * @param {import('./config.js').Config} config
 * @returns {Logger} - Returns the logger
 */
export function getLogger(config) {
  const pinoLogger = pino();
  const metaDataLogger = pinoLogger.child({
    app: `${config.APP_NAME} api`,
    version: npmPackage.version,
  });

  return {
    info: (message, values) => metaDataLogger.info(values, message),
    error: (message, error) => metaDataLogger.error(error, message),
  };
}
