import mongoose from "mongoose";
import { ValidationErrorFactory } from "../../Types/error";
import Joi from "joi";
import { BSONError } from 'bson';
import { ISongs, ISongsDocument, ISongSearchFrom } from "./songs.type";
import SongsModel from "./songs.schema";


export class SongSearchBuilder {
    public query: mongoose.FilterQuery<ISongsDocument> = {};
    private sortCriteria: { [key: string]: mongoose.SortOrder } = {};
    private page: number = 1;

    constructor(private model: mongoose.Model<ISongs> = SongsModel, private pageSize: number = 10) { }

    withTitle(title: string): this {
        this.query.title = title;
        return this;
    }

    withArtist(artist: string): this {
        this.query.artist = artist;
        return this;
    }

    withAlbum(album: string): this {
        this.query.album = album;
        return this;
    }

    withGenre(genre: string): this {
        this.query.genre = genre;
        return this;
    }

    withSort(sort: { field: string, order: mongoose.SortOrder }[]): this {
        sort.forEach((s) => {
            this.sortCriteria[s.field] = s.order;
        });
        return this;
    }

    withPagination(page: number = 1): this {
        if (page < 1) throw ValidationErrorFactory({
            msg: 'page must be greater than 1',
            statusCode: 400,
            type: "validation"
        }, "page");
        this.page = page;
        return this;
    }



    async execute(): Promise<ISongs[]> {
        try {
            console.log({ query: this.query, sort: this.sortCriteria });
            const skip = (this.page - 1) * this.pageSize;
            const result = await this.model
                .find(this.query)
                .sort(this.sortCriteria)
                .skip(skip)
                .limit(this.pageSize);
            return result;
        } catch (error) {
            if (error instanceof BSONError || error instanceof mongoose.Error.CastError) {
                throw ValidationErrorFactory({
                    msg: "Input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
                    statusCode: 400,
                    type: "validation",
                }, "organizerId");
            }
            throw error;
        }
    }

    static async fromJSON(json: ISongSearchFrom): Promise<SongSearchBuilder> {
        const builder = new SongSearchBuilder();
        if (json.title) {
            builder.withTitle(json.title);
        }
        if (json.artist) {
            builder.withArtist(json.artist);
        }
        if (json.album) {
            builder.withAlbum(json.album);
        }
        if (json.genre) {
            builder.withGenre(json.genre);
        }
        if (json.page) {
            builder.withPagination(json.page);
        }
        if (json.sort) {
            builder.withSort(json.sort);
        }

        return builder;
    }
}
