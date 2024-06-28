import "dotenv/config";
import { spawn } from "child_process";
import path from "path";

import { initializeDatabase, runMigrations } from "./database";

const startApp = () => {
  const appPath = path.join(`${__dirname}/index.js`);
  const child = spawn("node", [appPath]);
  child.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  child.stderr.on("data", (data) => {
    console.log(`${data}`);
  });

  child.on("error", (error) => {
    console.log(`${error.message}`);
  });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const runScripts = async () => {
  try {
   await initializeDatabase();
    await runMigrations();
    startApp();
  } catch (error) {}
};

export default runScripts();
