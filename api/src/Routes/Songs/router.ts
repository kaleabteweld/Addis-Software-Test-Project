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

publicSongRouter.get("/all/:page", MakeErrorHandler(
    async (req: any, res: Response) => {
        const page = req.params.page;
        res.json(await SongController.getAll(page));
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

publicSongRouter.get("/total/:type", MakeErrorHandler(
    async (req: any, res: Response) => {
        const type = req.params.type;
        res.json(await SongController.total(type));
    }
));

publicSongRouter.get("/total/per/genre", MakeErrorHandler(
    async (req: any, res: Response) => {
        res.json(await SongController.totalSongsPerGenre());
    }
));

publicSongRouter.get("/total/per/artistStats", MakeErrorHandler(
    async (req: any, res: Response) => {
        res.json(await SongController.artistStats());
    }
));

publicSongRouter.get("/total/per/album", MakeErrorHandler(
    async (req: any, res: Response) => {
        res.json(await SongController.songsPerAlbum());
    }
));



publicSongRouter.use("/song", publicSongRouter);


export { publicSongRouter } 