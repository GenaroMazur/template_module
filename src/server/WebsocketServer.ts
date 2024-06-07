import { IncomingMessage, Server } from "http";
import { WebSocket, Server as WsServer } from "ws";

export default class WebsocketServer {
  private server: WsServer;

  constructor(app: Server, onListening: () => void) {
    this.server = new WsServer({ server: app });

    this.server.on("listening", onListening);

    this.server.on("connection", (ws, req) => {
      if (this.onConnect) {
        this.onConnect(ws, req);
      }
    });
  }

  private _onConnect: null | ((ws: WebSocket, req: IncomingMessage) => void) =
    null;

  public get onConnect():
    | ((ws: WebSocket, req: IncomingMessage) => void)
    | null {
    return this._onConnect;
  }

  public set onConnect(
    onConnect: (ws: WebSocket, req: IncomingMessage) => void
  ) {
    this._onConnect = onConnect;
  }
}
