
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
