import express from "express";
import { publicRouter } from "./Authorization";

const appRouter = express.Router();


appRouter.use("/Api/v1/public/", publicRouter);


export default appRouter;