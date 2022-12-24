import { GameplayResults } from "../model/GameplayResults";
import { SongMeta } from "../model/SongMeta";

export interface GetSongsConfig {
  favorites?: boolean;
  songId?: string;
}

export interface GetScoresConfig {
  songId?: string
}

/**
 * Standard interface for DB control.
 */
export interface DBController {
  addSong: (meta: SongMeta) => Promise<SongMeta | null>;
  addSongResult: (result: GameplayResults) => Promise<GameplayResults>;
  getSongByTitle: (title: string) => Promise<SongMeta | null>;
  getAllSongs: (config: GetSongsConfig) => Promise<SongMeta[] | null>;
  getAllScores: (config: GetScoresConfig) => Promise<GameplayResults[] | null>;
  updateFavorite: (songId: string, favorite: boolean) => Promise<SongMeta[] | null>;
  getSongLoadState: () => Promise<boolean>;
  markSongsLoaded: () => Promise<boolean>;
}
