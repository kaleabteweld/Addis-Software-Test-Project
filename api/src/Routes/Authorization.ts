import express from "express";
import { publicSongRouter } from "./Songs";



const publicRouter = express.Router();
// const privateRouter = express.Router();

publicRouter.use([publicSongRouter]);

export { publicRouter }