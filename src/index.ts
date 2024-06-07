require("dotenv").config();
import { green } from "cli-color";
import Core from "./server/Core";
import ExpressServer from "./server/ExpressServer";
import HttpServer from "./server/HttpServer";
import WebsocketServer from "./server/WebsocketServer";
import MongoConnection from "./database/MongoConnection";
import { EnvironmentsEnum } from "./enums/environments.enum";
import { RedisConnection } from "./database/RedisConnection";

const expressServer = new ExpressServer();

const httpServer = new HttpServer(() => {
  console.log(`Http: 🟢 ${green("online")} on ${process.env.PORT_TCP}`);
}, expressServer.app);

const core = new Core(httpServer);

if (core.getEnvironments(EnvironmentsEnum.MONGO_URL)) {
  const mongoConnection = new MongoConnection(
    core.getEnvironments(EnvironmentsEnum.MONGO_URL)!
  );
  core.mongoConnection = mongoConnection;
}

if (core.getEnvironments(EnvironmentsEnum.REDIS_URL)) {
  const redisConnection = new RedisConnection(
    core.getEnvironments(EnvironmentsEnum.REDIS_URL)!
  );

  core.redisConnection = redisConnection;
}

if (core.getEnvironments(EnvironmentsEnum.WEBSOCKET)?.toLowerCase() == "true") {
  const websocketServer = new WebsocketServer(httpServer.server, () => {
    console.log(`Websocket: 🟢 ${green("online")} on ${process.env.PORT_TCP}`);
  });
  core.websocketServer = websocketServer;
}

core.expressServer = expressServer;

core.start();

//---------------------------------code here------------------------------------------
//-------All imports you need
import indexRouter from "./infraestructure/index.routes";

//---------------------------
if (core.websocketServer) {
  core.websocketServer.onConnect = (_websocketClient, _request) => {
    console.log("Socket connected");
  };
}

if (core.redisConnection) {
  core.redisConnection.setSubscription(
    ["gps:gp1"],
    (mensajeReceive, channel) => {
      console.log("message recive", mensajeReceive, "from", channel);
    }
  );
}

core.expressServer.app.use(indexRouter);

//------------------------------------------------------------------------------------
