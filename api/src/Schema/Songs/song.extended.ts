import mongoose from "mongoose";
import Joi from "joi";
import { ValidationErrorFactory } from "../../Types/error"
import { BSONError } from 'bson';
import { MakeValidator } from "../../Util";
import { ISongs, ISongUpdateFrom } from "./songs.type";




export function validator<T>(songsInput: T, schema: Joi.ObjectSchema<T>) {
    return MakeValidator<T>(schema, songsInput);
}

export async function getById(this: mongoose.Model<ISongs>, _id: string, populate?: string | string[]): Promise<ISongs> {
    try {
        let songs: any = this.findById(new mongoose.Types.ObjectId(_id))
        if (populate) songs.populate(populate)
        songs = await songs.exec();
        if (songs == null) {
            throw ValidationErrorFactory({
                msg: "songs not found",
                statusCode: 404,
                type: "Validation"
            }, "_id")
        }
        return songs;
    } catch (error) {
        if (error instanceof BSONError) {
            throw ValidationErrorFactory({
                msg: "Input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
                statusCode: 400,
                type: "validation",
            }, "id");
        }
        throw error;
    }

}

export async function removeByID(this: mongoose.Model<ISongs>, _id: string): Promise<void> {
    try {
        const result = await this.deleteOne({ _id: new mongoose.Types.ObjectId(_id) })
        if (result.deletedCount === 0) {
            throw ValidationErrorFactory({
                msg: "songs not found",
                statusCode: 404,
                type: "Validation"
            }, "_id")
        }
    } catch (error) {
        if (error instanceof BSONError) {
            throw ValidationErrorFactory({
                msg: "Input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
                statusCode: 400,
                type: "validation",
            }, "id");
        }
        throw error;
    }
}

export async function update(this: mongoose.Model<ISongs>, _id: string, sewSongs: ISongUpdateFrom, populatePath: string | string[]): Promise<ISongs | null> {

    try {
        const newDoc = await this.findByIdAndUpdate(_id, sewSongs, { new: true, overwrite: true });
        await newDoc?.populate(populatePath)
        return newDoc;
    } catch (error) {
        throw error;
    }
}

export async function total(this: mongoose.Model<ISongs>, type: "songs" | "artists" | "albums" | "genres"): Promise<number> {
    try {
        switch (type) {
            case "songs":
                return await this.countDocuments();
            case "artists":
                return await this.distinct("artist").countDocuments();
            case "albums":
                return await this.distinct("album").countDocuments();
            case "genres":
                return await this.distinct("genre").countDocuments();
            default:
                throw new Error("Invalid type");
        }
    } catch (error) {
        throw error;
    }
}

export async function totalSongsPerGenre(this: mongoose.Model<ISongs>): Promise<{ _id: string, count: number }> {
    try {
        const totalSongsPerGenre = await this.aggregate<ISongs>([
            {
                $group: {
                    _id: "$genre",
                    count: { $sum: 1 }
                }
            }
        ])
        console.log({ totalSongsPerGenre })
        return totalSongsPerGenre as any
    } catch (error) {
        throw error;
    }
}

export async function artistStats(this: mongoose.Model<ISongs>): Promise<{ _id: string, count: number }> {
    try {
        const artistStats = await this.aggregate<ISongs>([
            {
                $group: {
                    _id: "$artist",
                    totalSongs: { $sum: 1 },
                    albums: { $addToSet: "$album" }
                }
            },
            {

                $project: {
                    _id: 1,
                    totalSongs: 1,
                    totalAlbums: { $size: "$albums" }
                }
            }
        ]);
        console.log({ artistStats })
        return artistStats as any
    } catch (error) {
        throw error;
    }
}

export async function songsPerAlbum(this: mongoose.Model<ISongs>): Promise<{ _id: string, count: number }> {
    try {
        const songsPerAlbum = await this.aggregate<ISongs>([
            {
                $group: {
                    _id: "$album",
                    count: { $sum: 1 }
                }
            }
        ])
        console.log({ songsPerAlbum })
        return songsPerAlbum as any
    } catch (error) {
        throw error;
    }
}