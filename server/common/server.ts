import express, { Application } from "express";
import bodyParser from "body-parser";
import os from "os";

const app = express();
const PORT = process.env.PORT || 3000;

export default class ExpressServer {
  private routes: (app: Application) => void;

  constructor() {
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(bodyParser.urlencoded({ extended: false }));
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void => {
      // Service details
      console.log(
        `up and running in ${
          process.env.NODE_ENV || "development"
        } @: ${os.hostname()} on port: ${p}`
      );
    };
    app.listen(port, welcome(port));
  }
}
