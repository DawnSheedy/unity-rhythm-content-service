import { SongDifficultyMeta } from "./SongDifficultyMeta";

export interface SongMeta {
    id?: number;
    uuid: string;
    title: string;
    artist: string;
    length: number;
    tempo: number;
    versions: SongDifficultyMeta[];
}