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

export const pgp = pgPromise(pgpConfig);
pgp.pg.defaults.max = 50; // set pool size to 50

/**
 * @typedef {object} DBTransaction
 * @property {boolean} isTransaction - if the DB is a transaction
 * @property {() => object} getInternalDB - Get the concret DB object pg-promise transaction in this case
 */

/**
 * @typedef {object} DB
 * @property {(fn: (db: DBTransaction) => Promise<void>) => Promise<void>} tx - Call your function with a DBTransaction
 * @property {boolean} isTransaction - if the DB is a transaction
 * @property {() => object} getInternalDB - Get the concret DB object pg-promise in this case
 * @property {() => void} end - Shutdown the DB pool
 */

/**
 * Get a DB object but no connections just a ready to use pool
 * @param {string} conn - The DB connection url
 * @returns {Promise<DB>} - Returns a Promise that resolves to a DB
 */
export function getDB(conn) {
  const db = pgp(conn);
  /* Wrapping in a Promsie as not all DB's and ORMs start syncronmous and this will make it easier to switch out. */
  return new Promise(resolve => {
    resolve({
      tx: fn => {
        return db.tx(t => {
          return fn({
            isTransaction: true,
            getInternalDB: () => t,
          });
        });
      },
      isTransaction: false,
      getInternalDB: () => db,
      end: () => db.$pool.end(),
    });
  });
}

/**
 * Use to test the DB can be connected too
 * @param {DB} db - The DB object to test connection on
 * @param {number} retries - Number of retries defaults to 6
 * @returns {Promise<void>} - Returns a Promise that resolves if connection was successful
 */
export function waitDBConnect(db, retries = 6) {
  return retry(
    async () => {
      const conn = await db.getInternalDB().connect();
      conn.done();
      return db;
    },
    {
      retries,
    },
  );
}
