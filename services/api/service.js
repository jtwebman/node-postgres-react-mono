import express from "express";
import { appName } from "settings";
import stoppable from "stoppable";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`Hello World from API on ${appName}`);
});

const nodeApp = stoppable(
  app.listen(port, async () => {
    try {
      console.log(`${appName} listening locally on port ${port}`);
    } catch (error) {
      console.log(`Error: shutting down: ${error.stack}`);
      shutdown(killSignals.SHUTDOWN);
    }
  })
);

const killSignals = {
  SHUTDOWN: 0,
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

/**
 * Shutdown apps correctly
 * @param  {String} signal signal used to exit
 * @param  {Number} value  signal value
 */
function shutdown(signal) {
  console.log(`Trying shutdown by got ${signal} shutting down App ${appName}`);
  nodeApp.stop(async () => {
    console.log(`App ${appName} shutdown`);
  });
}

process.on("SIGHUP", () => shutdown("SIGHUP", killSignals.SIGHUP));
process.on("SIGINT", () => shutdown("SIGINT", killSignals.SIGINT));
process.on("SIGTERM", () => shutdown("SIGTERM", killSignals.SIGTERM));
