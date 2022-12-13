import { SongDifficultyMeta } from "./SongDifficultyMeta";

export interface SongMeta {
    id?: number;
    title: string;
    artist: string;
    length: number;
    tempo: number;
    versions: SongDifficultyMeta[];
}