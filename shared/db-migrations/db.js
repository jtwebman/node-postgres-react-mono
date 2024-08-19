import pgPromise from 'pg-promise';
import retry from 'async-retry';

const pgpConfig = {
  capSQL: true,
  noWarnings: true,
  query: e => {
    if (process.env.SHOW_SQL === '1') {
      // eslint-disable-next-line no-console
      console.log(e.query);
    }
  },
};

const pgp = pgPromise(pgpConfig);
pgp.pg.defaults.max = 50; // set pool size to 50

/**
 * Get a PG-Promise connection ppol object
 * @param {string} conn - The connection string to pass to PG Promise
 * @returns {pgPromise.IDatabase<{}, pg.IClient>} - Returns the pg promise db object
 */
export function getDB(conn) {
  return pgp(conn);
}

/**
 * Takes in pg-promise db and checks that the DB can be connected too
 * @param {pgPromise.IDatabase<{}, pg.IClient>} db - The pg-promise db object
 * @param {number} retries - the number of retries before failing
 * @returns {pgPromise.IDatabase<{}, pg.IClient>} - Returns the same DB object it is passed to help chain
 */
export function waitDBConnect(db, retries = 6) {
  return retry(
    async () => {
      const conn = await db.connect();
      conn.done();
      return db;
    },
    {
      retries,
    },
  );
}
