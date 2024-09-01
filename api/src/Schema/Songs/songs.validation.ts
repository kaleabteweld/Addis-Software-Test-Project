import Joi from "joi";
import { INewSongFrom, ISongSearchFrom, ISongUpdateFrom } from "./songs.type";


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


export const songSearchSchema = Joi.object<ISongSearchFrom>({
    title: Joi.string().allow('').optional(),
    artist: Joi.string().allow('').optional(),
    album: Joi.string().allow('').optional(),
    genre: Joi.string().allow('').optional(),
    sort: Joi.array().items(Joi.object({
        field: Joi.string().allow('').required(),
        order: Joi.string().valid("asc", "desc").required()
    })).optional()
});

