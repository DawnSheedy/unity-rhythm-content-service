import express from "express";
import { ApiRouter } from "../routing/ApiRouter";
import { Logger } from "./Logger";

const webServerResource = () => {
  const app = express();
  const port = 8080;

  app.use("/api", ApiRouter);

  app.use('/songdata', (req, res, next) => {
    Logger.log(`${req.ip}: ${req.path}`);
    express.static('data')(req, res, next);
  })

  app.listen(port, () => {
    Logger.log(`Content Service listening on port ${port}`);
  });
};

export { webServerResource as LoadWebServerResource };
