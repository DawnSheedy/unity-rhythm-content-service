import { SongMeta } from "../model/SongMeta";

export class SongListProvider {
    private songMeta: SongMeta[];

    constructor() {
        this.songMeta = [];
    }

    setSongMeta(newMeta: SongMeta[]) {
        this.songMeta = newMeta;
    }

    getSongMeta(): SongMeta[] {
        return this.songMeta;
    }
}

const songListProvider = new SongListProvider();

export { songListProvider }