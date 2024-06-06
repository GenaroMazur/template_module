import { Application } from "express";
import { Server } from "http";

export default class HttpServer {
  public readonly server: Server;
  constructor(onListening: () => void, express?: Application) {
    this.server = new Server(express);

    this.server.on("listening", onListening);
  }
}
