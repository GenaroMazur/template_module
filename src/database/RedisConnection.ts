import { createClient } from "redis";
import { green, red } from "cli-color";

export class RedisConnection {
  private readonly redisUrl;
  private connection: ReturnType<typeof createClient> | null;
  private subscription: ReturnType<typeof createClient> | null;

  constructor(redisUrl: string = "") {
    this.redisUrl = redisUrl;
    this.connection = null;
    this.subscription = null;
  }

  public async open() {
    if (this.connection) await this.connection.disconnect();
    this.connection = createClient({ url: this.redisUrl });
    this.subscription = createClient({ url: this.redisUrl });

    this.connection.on("connect", () => {
      console.log("Redis:", green(`online`), "🟢");
    });

    this.connection.on("error", () => {
      console.log("Error al conectar con redis, REINTENTANDO");
    });

    await this.connection.connect();
    await this.subscription?.connect();

    return this;
  }

  public async setSubscription(
    channel: string | string[],
    cb: (message: string, channel: string) => void
  ) {
    await this.subscription?.subscribe(channel, cb as any);
  }

  public async close() {
    if (this.connection) await this.connection.disconnect();
    console.log("Redis:", red("Closed"));
  }

  public publish(channel: string, message: string | object) {
    if (typeof message == "object") message = JSON.stringify(message);

    this.connection?.publish(channel, message);
  }

  public get caching() {
    return this.connection;
  }
}
