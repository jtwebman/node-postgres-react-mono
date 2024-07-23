import express from "express";
import { appName } from "settings";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`Hello World from ${appName}!`);
});

app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
