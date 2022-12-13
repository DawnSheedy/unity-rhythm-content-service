export enum SongDifficulty {
    Basic, Advanced, Expert
}

export interface SongDifficultyMeta {
    difficulty: SongDifficulty;
    noteCount: number;
}