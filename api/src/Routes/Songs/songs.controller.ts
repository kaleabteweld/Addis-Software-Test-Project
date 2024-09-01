import { SongSearchBuilder } from "../../Schema/Songs/song.utils";
import SongsModel from "../../Schema/Songs/songs.schema";
import { INewSongFrom, ISongs, ISongSearchFrom, ISongUpdateFrom } from "../../Schema/Songs/songs.type";
import { newSongSchema, songSearchSchema, songUpdateSchema } from "../../Schema/Songs/songs.validation";
import { IResponseType } from "../../Types";


export default class SongController {

    static async create(_song: INewSongFrom): Promise<IResponseType<ISongs>> {

        await SongsModel.validator(_song, newSongSchema)
        const song = await new SongsModel((_song as any));
        await song.save();

        return { body: song.toJSON() }
    }

    static async update(_song: ISongUpdateFrom, songId: string): Promise<IResponseType<ISongs | null>> {

        await SongsModel.validator(_song, songUpdateSchema)
        const song = await SongsModel.getById(songId);
        const updateSong = await SongsModel.update(song.id, _song)
        return { body: (updateSong as any).toJSON() }
    }

    static async getById(songId: string = ""): Promise<IResponseType<ISongs | null>> {
        return { body: ((await SongsModel.getById(songId))?.toJSON() as any) };
    }

    static async getAll(page: number): Promise<IResponseType<ISongs[]>> {
        return { body: await SongsModel.find().skip(page * 10).limit(10).exec() }
    }

    static async search(searchFrom: ISongSearchFrom, page: number = 1): Promise<IResponseType<ISongs[]>> {
        console.log({ searchFrom })
        await SongsModel.validator(searchFrom, songSearchSchema);
        return {
            body: await ((await SongSearchBuilder.fromJSON(searchFrom)).withPagination(page)).execute()

        }
    }

    static async removeById(songId: string): Promise<IResponseType<{} | null>> {
        const song = await SongsModel.getById(songId);
        await SongsModel.removeByID(song?.id)

        return { body: {} };

    }

    static async total(type: "songs" | "artists" | "albums" | "genres" | "all"): Promise<IResponseType<number | { songs: number, artists: number, albums: number, genres: number }>> {
        return { body: await SongsModel.total(type) }
    }

    static async totalSongsPerGenre(): Promise<IResponseType<{ _id: string, count: number }[]>> {
        return { body: await SongsModel.totalSongsPerGenre() }
    }

    static async artistStats(): Promise<IResponseType<{ _id: string, totalAlbums: number, totalSongs: number }[]>> {
        return { body: await SongsModel.artistStats() }
    }

    static async songsPerAlbum(): Promise<IResponseType<{ _id: string, count: number }[]>> {
        return { body: await SongsModel.songsPerAlbum() }
    }
}
