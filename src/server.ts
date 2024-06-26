import http from "http";
import os from "node:os";
import app from "./app";
import cluster from "cluster";

const port = process.env.PORT || 3000;
const { pid } = process;

app.set("port", port);
const server = http.createServer(app);

process.on("unhandledRejection", (reason: any): void => {
  throw reason;
});

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  const message = `🚀 Server listening on ${bind} with PID ${pid}`;
  console.log(message);
};

const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);

    default:
      throw error;
  }
};

const startServer = () => {
  if (cluster.isPrimary) {
    const num_workers = os.cpus().length;
    for (let index = 0; index < num_workers; index++) {
      cluster.fork();
    }
  } else {
    server.listen(port);
    server.keepAliveTimeout = 90000;
    server.headersTimeout = 100000;
    server.on("error", onError);
    server.on("listening", onListening);
  }
};

export default startServer;
