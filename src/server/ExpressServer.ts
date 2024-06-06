import express, { Application } from "express";

export default class ExpressServer {
  public app: Application;

  constructor() {
    this.app = express();

    this.app.use(express.json(), express.urlencoded({ extended: true }));
  }
}
