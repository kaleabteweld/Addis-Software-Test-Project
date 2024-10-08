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

    total(type: "songs" | "artists" | "albums" | "genres" | "all"): Promise<number | { songs: number, artists: number, albums: number, genres: number }>
    totalSongsPerGenre(): Promise<{ _id: string, count: number }[]>
    artistStats(): Promise<{ _id: string, totalAlbums: number, totalSongs: number }[]>
    songsPerAlbum(): Promise<{ _id: string, count: number }[]>
}

export interface INewSongFrom {
    title: string;
    artist: string;
    album: string;
    genre: string;
}

export interface ISongUpdateFrom extends Partial<INewSongFrom> {
}


export interface ISongSearchFrom {
    title?: string;
    artist?: string;
    album?: string;
    genre?: string;
    page?: number;
    sort?: { field: string, order: "asc" | "desc" }[]
}
