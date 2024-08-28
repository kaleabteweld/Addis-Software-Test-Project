import express, { Request, Response } from "express";
import { MakeErrorHandler } from "../../Util/middlewares";
import SongController from "./songs.controller";


const publicSongRouter = express.Router();

publicSongRouter.get("/:id", MakeErrorHandler(
    async (req: any, res: Response) => {
        const songId = req.params.id;
        res.json(await SongController.getById(songId));
    }
));

publicSongRouter.patch("/update/:id", MakeErrorHandler(
    async (req: any, res: Response) => {
        const songId = req.params.id;
        res.json(await SongController.update(req.body, songId));
    }
));

publicSongRouter.post("/create", MakeErrorHandler(
    async (req: any, res: Response) => {
        res.json(await SongController.create(req.body));
    }
));

publicSongRouter.delete("/delete/:id", MakeErrorHandler(
    async (req: any, res: Response) => {
        const songId = req.params.id;
        res.json(await SongController.removeById(songId));
    }
));



publicSongRouter.use("/song", publicSongRouter);


export { publicSongRouter } 