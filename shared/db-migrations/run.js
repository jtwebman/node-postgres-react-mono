#!/usr/bin/env node
import { getLogger } from 'logger';
import pgConnString from 'pg-connection-string';

import { getConfig } from './config.js';
import { runMigrations } from './migrations.js';

try {
  const config = getConfig();

  const pgConfig = pgConnString.parse(config.PG_CONNECTION);

  const logger = getLogger(config.LOG_LEVEL, {
    appName: `${config.APP_NAME} DB Migrations for DB ${pgConfig.host} ${pgConfig.database}`,
    appVersion: config.APP_VERSION,
  });

  runMigrations(config.PATCH_FOLDER, config.PG_CONNECTION, config.PG_MIGRATION_CONNECTION, logger)
    .then(async () => {
      logger.info('Exiting run');
      await logger.flush();
      process.exit(0);
    })
    .catch(error => {
      logger.error('Error running migrations exiting', error);
      process.exit(1);
    });
} catch (error) {
  console.log(`Error running migrations exiting: ${error.stack}`);
  process.exit(1);
}
