import { exec } from "child_process";
import path from "path";

const timestamp = new Date()
  .toISOString()
  .replace(/[-T:\.Z]/g, "")
  .slice(0, 14);
const migrationName = process.argv[2] || "migration";
const knexfilePath = path.resolve(__dirname, "src", "database", "knexfile.ts");
const command = `npx knex migrate:make ${timestamp}_${migrationName} --knexfile ${knexfilePath}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
