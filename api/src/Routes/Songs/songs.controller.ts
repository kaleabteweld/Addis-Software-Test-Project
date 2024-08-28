import SongsModel from "../../Schema/Songs/songs.schema";
import { INewSongFrom, ISongs, ISongUpdateFrom } from "../../Schema/Songs/songs.type";
import { newSongSchema, songUpdateSchema } from "../../Schema/Songs/songs.validation";
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

    static async removeById(songId: string): Promise<IResponseType<{} | null>> {
        const song = await SongsModel.getById(songId);
        await SongsModel.removeByID(song?.id)

        return { body: {} };

    }
}
