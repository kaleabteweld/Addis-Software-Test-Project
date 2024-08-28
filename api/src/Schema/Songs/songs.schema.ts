import mongoose, { Schema } from 'mongoose';
import { mongooseErrorPlugin } from '../Middleware/errors.middleware';
import { ISongs, ISongsMethods, ISongsModel } from './songs.type';
import { artistStats, getById, removeByID, songsPerAlbum, total, totalSongsPerGenre, update, validator } from './song.extended';


const songsSchema = new Schema<ISongs, ISongsModel, ISongsMethods>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    statics: {
        validator,
        getById,
        removeByID,
        update,
        total,
        totalSongsPerGenre,
        artistStats,
        songsPerAlbum,
    }
});


songsSchema.plugin<any>(mongooseErrorPlugin);


songsSchema.post('save', async function (doc) {

    const songs: ISongs = this;

});

const SongsModel = mongoose.model<ISongs, ISongsModel>('songs', songsSchema);

export default SongsModel;
