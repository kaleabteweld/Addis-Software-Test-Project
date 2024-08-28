import Joi from "joi";
import { INewSongFrom, ISongUpdateFrom } from "./songs.type";


export const newSongSchema = Joi.object<INewSongFrom>({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    album: Joi.string().required(),
    genre: Joi.string().required(),
});

export const songUpdateSchema = Joi.object<ISongUpdateFrom>({
    title: Joi.string().optional(),
    artist: Joi.string().optional(),
    album: Joi.string().optional(),
    genre: Joi.string().optional(),
});

