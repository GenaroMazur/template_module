import MongoConnection from "../database/MongoConnection";
import { RedisConnection } from "../database/RedisConnection";
import { EnvironmentsEnum } from "../enums/environments.enum";
import ExpressServer from "./ExpressServer";
import HttpServer from "./HttpServer";
import WebsocketServer from "./WebsocketServer";

export default class Core {
  private static _instance: Core;
  public static get instance() {
    if (!this._instance) throw new Error("Core is not instancied");
    return this._instance;
  }

  constructor(httpServer: HttpServer) {
    if (Core._instance)
      throw new Error("Core already instancied, use Core.instance");
    this.httpServer = httpServer;
    Core._instance = this;
  }

  private httpServer: HttpServer;
  private _expressServer: ExpressServer | null = null;
  private _websocketServer: WebsocketServer | null = null;
  private _redisConnection: RedisConnection | null = null;
  private _mongoConnection: MongoConnection | null = null;

  public get mongoConnection(): MongoConnection | null {
    return this._mongoConnection;
  }
  public set mongoConnection(value: MongoConnection | null) {
    this._mongoConnection = value;
  }

  public get redisConnection(): RedisConnection | null {
    return this._redisConnection;
  }
  public set redisConnection(value: RedisConnection | null) {
    this._redisConnection = value;
  }

  public get expressServer(): ExpressServer | null {
    return this._expressServer;
  }

  public set expressServer(expressServer: ExpressServer) {
    this._expressServer = expressServer;
  }

  public get websocketServer(): WebsocketServer | null {
    return this._websocketServer;
  }

  public set websocketServer(websocketServer: WebsocketServer) {
    this._websocketServer = websocketServer;
  }

  public async start(): Promise<Core> {
    this.httpServer.server.listen(
      this.getEnvironments(EnvironmentsEnum.PORT_TCP)
    );
    const mongo = this._mongoConnection?.open();
    const redis = this._redisConnection?.open();
    await Promise.all([mongo, redis]);
    return this;
  }

  public getEnvironments(key: EnvironmentsEnum): string | null {
    return process.env[key] || null;
  }
}
