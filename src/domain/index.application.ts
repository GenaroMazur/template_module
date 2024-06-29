import { IndexService } from "./index.service";

export default class IndexApplication implements IndexService {
  helloWorld(): string {
    return "Hello World";
  }

  throwMethod() {
    throw new Error("Not implemented");
  }
}
