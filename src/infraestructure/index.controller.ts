import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { endpointResponse } from "../utils/succes";
import {
  BadRequestException,
  ForbiddenException,
  MethodNotAllowedException,
  NotFoundException,
  UnautorizedException,
} from "../utils/exceptions";

export const checkAlive = catchAsync(async (_, res) => {
  endpointResponse({ res, message: "server is on!" });
});

export const notFound = catchAsync(async (_, res) => {
  return endpointResponse({ res, code: 404, message: "URL invalida" });
});

export const errorPage = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    console.error(err);
    return next(err);
  }

  if (err instanceof BadRequestException)
    return endpointResponse({ res, code: 400, message: err.message });
  if (err instanceof UnautorizedException)
    return endpointResponse({ res, code: 401, message: err.message });
  if (err instanceof ForbiddenException)
    return endpointResponse({ res, code: 403, message: err.message });
  if (err instanceof NotFoundException)
    return endpointResponse({ res, code: 404, message: err.message });
  if (err instanceof MethodNotAllowedException)
    return endpointResponse({ res, code: 405, message: err.message });
  if (err.status === 400 && err.type === "entity.parse.failed")
    return endpointResponse({ res, code: 400, message: "JSON invalido" });

  console.error(err);
  return endpointResponse({
    res,
    code: 500,
    body: { error: "Error interno del servidor." },
  });
};
