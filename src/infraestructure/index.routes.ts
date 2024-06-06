import { Router } from "express";
import { endpointResponse } from "../utils/succes";
import { indexApp } from "./dependenciesInversion";

const indexRouter = Router({ mergeParams: true });

indexRouter.get("/", (_, res) => {
  endpointResponse({ res, message: indexApp.helloWorld() });
});

export default indexRouter;
