import songAPI from "..";
import { INewSongFrom, ISongs, ISongUpdateFrom } from "../types/songs.types";

const reviewApiSlice = songAPI.injectEndpoints({
    endpoints: (builder) => ({

        getSongById: builder.query<ISongs, string>({
            query: (id) => `/${id}`,
            transformResponse: (response: { body: ISongs }) => response.body,
            providesTags: (result, _, id) => result ? [{ type: 'Song', id }] : [],
        }),

        getSongs: builder.query<ISongs[], number>({
            query: (page) => `/all/${page}`,
            transformResponse: (response: { body: ISongs[] }) => response.body,
            providesTags: (result) => result ?
                result.map(({ _id }) => ({ type: 'Song', id: _id })) : [],
        }),

        updateSong: builder.mutation<ISongs, { id: string, song: ISongUpdateFrom }>({
            query: ({ id, song }) => ({
                url: `/update/${id}`,
                method: 'PATCH',
                body: song,
            }),
            invalidatesTags: (result, _, { id }) => result ? [{ type: 'Song', id }] : [],
        }),

        createSong: builder.mutation<ISongs, INewSongFrom>({
            query: (newSong) => ({
                url: '/create',
                method: 'POST',
                body: newSong,
            }),
            invalidatesTags: (result) => result ? [{ type: 'Song', }] : [],
        }),

        deleteSong: builder.mutation<void, string>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, _, id) => result ? [{ type: 'Song', id }] : [],
        }),

        getTotalByType: builder.query<number | { songs: number, artists: number, albums: number, genres: number }, "songs" | "artists" | "albums" | "genres" | "all">({
            query: (type) => `/total/${type}`,
            transformResponse: (response: { body: number | { songs: number, artists: number, albums: number, genres: number } }) => response.body,
        }),

        getTotalSongsPerGenre: builder.query<{ _id: string, count: number }[], void>({
            query: () => '/total/per/genre',
            transformResponse: (response: { body: { _id: string, count: number }[] }) => response.body,

        }),
        getArtistStats: builder.query({
            query: () => '/total/per/artistStats',
        }),

        getSongsPerAlbum: builder.query({
            query: () => '/total/album',
        }),
    }),

});

export const {
    useGetSongByIdQuery,
    useGetSongsQuery,
    useUpdateSongMutation,
    useCreateSongMutation,
    useDeleteSongMutation,
    useGetTotalByTypeQuery,
    useGetTotalSongsPerGenreQuery,
    useGetArtistStatsQuery,
    useGetSongsPerAlbumQuery,
} = reviewApiSlice