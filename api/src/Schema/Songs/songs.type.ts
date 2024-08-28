import Joi from "joi";
import mongoose from "mongoose";

export interface ISongs extends mongoose.Document {

    title: string;
    artist: string;
    album: string;
    genre: string;
}

export interface ISongsMethods {
}

export interface ISongsDocument extends ISongs, ISongsMethods, mongoose.Document { }

export interface ISongsModel extends mongoose.Model<ISongsDocument> {
    validator<T>(userInput: T, schema: Joi.ObjectSchema<T>): Promise<any>
    getById(_id: string, populate?: string | string[]): Promise<ISongs>
    update(_id: string, newSong: ISongUpdateFrom, populatePath?: string | string[]): Promise<ISongsDocument | null>
    removeByID(_id: string): Promise<void>

    total(type: "songs" | "artists" | "albums" | "genres"): Promise<number>
    totalSongsPerGenre(): Promise<{ _id: string, count: number }>
    artistStats(): Promise<{ _id: string, count: number }>
    songsPerAlbum(): Promise<{ _id: string, count: number }>
}

export interface INewSongFrom {
    title: string;
    artist: string;
    album: string;
    genre: string;
}

export interface ISongUpdateFrom extends Partial<INewSongFrom> {
}
