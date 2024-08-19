import pino from 'pino';

/**
 * @typedef {object} Logger
 * @property {(message:string - message to add to logs, values:object - Extra object values to add to json logs) => void} info - Call to log info messages with extra values
 * @property {(message:string - message to add to logs, error:Error - The Javascript error) => void} error - Call to log an error message and error object
 * @property {() => Promise<void>} close - Closes the logger makign sure all messages are sent
 */

/**
 *
 * @param {('fatal'|'error'|'warn'|'info'|'debug'|'trace')} - level - The log level to use
 * @param {object} extraMetaData - Extra meta data to attach to the logger
 * @returns {Logger} - Returns the logger
 */
export function getLogger(level = 'info', extraMetaData = {}) {
  const pinoLogger = pino({
    level,
  });
  const metaDataLogger = pinoLogger.child(extraMetaData);

  return {
    info: (message, values) => metaDataLogger.info(values, message),
    error: (message, error) => metaDataLogger.error(error, message),
    flush: () => metaDataLogger.flush(),
  };
}
