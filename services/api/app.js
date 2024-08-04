import express from 'express';

/**
 * Get the express app
 * @param {import('./context.js').Context} context - the application context
 * @returns {Express} - Returns the express app
 */
export function getApp(context) {
  const app = express();

  app.get('/', (req, res) => {
    res.send(`Hello World from API on ${context.config.APP_NAME}`);
  });

  return app;
}
