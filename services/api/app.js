import express from 'express';

/**
 * Get the express app
 * @param {import('./context.js').Context} context - the application context
 * @returns {Express} - Returns the express app
 */
export function getApp(context) {
  const app = express();

  /* Healthcheck Route */
  app.get('/status', (req, res) => {
    res.json({
      message: 'Healthy API',
      appName: context.config.APP_NAME,
      appVersion: context.config.APP_VERSION,
    });
  });

  return app;
}
