import { green, red } from "cli-color";
import mongoose from "mongoose";

export default class MongoConnection {
  public mongoUrl: string;
  private _connection?: typeof mongoose | null;

  constructor(mongoUrl: string = "") {
    this.mongoUrl = mongoUrl;
  }

  public get connection() {
    return this._connection || null;
  }

  public async open() {
    this._connection = await mongoose.connect(this.mongoUrl, {
      readPreference: "secondary",
    });
    if (
      this._connection.connection.readyState ==
        mongoose.ConnectionStates.disconnected ||
      this._connection.connection.readyState ==
        mongoose.ConnectionStates.disconnecting
    ) {
      console.log(`Base de datos: ${red("Connection Error")} 🔴`);
    } else {
      console.log(`Base de datos: ${green("online")} 🟢`);
    }
  }

  public close() {}
}
