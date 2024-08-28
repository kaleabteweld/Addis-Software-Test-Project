import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../Types/error";

export const MakeErrorHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

export function errorMiddleWare(error: errorResponse, req: Request, res: Response, next: NextFunction): any {
    console.log("[-] Error Middleware", error);
    return res.status(error.statusCode ?? 400).send({ error });
};
