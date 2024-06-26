import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cell";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    const clientProxy = createProxyMiddleware({
      target: "http://localhost:3000",
      ws: true,
      changeOrigin: true,
    });

    app.use(clientProxy);
  } else {
    const packagePath = require.resolve("@jsnote-nemo/local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
