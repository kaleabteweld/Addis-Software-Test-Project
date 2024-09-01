
export interface ISongs {

    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
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

export enum ESongSearchField {
    title = 'title',
    artist = 'artist',
    album = 'album',
    genre = 'genre',
}