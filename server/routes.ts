import config from "config";
import { Application } from "express";
const basePath = config.get("basePath");
export default function routes(app: Application): void {
  app.use(basePath, apiRouter);
}
