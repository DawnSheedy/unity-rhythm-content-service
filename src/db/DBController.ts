import { SongMeta } from "../model/SongMeta";

export interface GetSongsConfig {
  favorites?: boolean;
}

/**
 * Standard interface for DB control.
 */
export interface DBController {
  addSong: (meta: SongMeta) => Promise<SongMeta | null>;
  getSongByTitle: (title: string) => Promise<SongMeta | null>;
  getAllSongs: (config: GetSongsConfig) => Promise<SongMeta[] | null>;
  updateFavorite: (songId: string, favorite: boolean) => Promise<SongMeta[] | null>;
  getSongLoadState: () => Promise<boolean>;
  markSongsLoaded: () => Promise<boolean>;
}
