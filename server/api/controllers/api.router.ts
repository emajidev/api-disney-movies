import express from "express";
import controller from "./api.controller";
export default express
  .Router()
  .get("", controller.welcome)
  .get("/", controller.welcome);
