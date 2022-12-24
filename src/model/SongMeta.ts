import { SongDifficultyMeta } from "./SongDifficultyMeta";

export interface SongMeta {
    id?: number;
    uuid: string;
    title: string;
    artist: string;
    length: number;
    tempo: number;
    favorited: boolean;
    versions: SongDifficultyMeta[];
}