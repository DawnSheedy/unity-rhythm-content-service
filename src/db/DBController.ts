import { SongMeta } from "../model/SongMeta";

/**
 * Standard interface for DB control.
 */
export interface DBController {
  addSong: (meta: SongMeta) => Promise<SongMeta | null>;
  getSongByTitle: (title: string) => Promise<SongMeta | null>;
  getAllSongs: () => Promise<SongMeta[] | null>;
  getSongLoadState: () => Promise<boolean>;
  markSongsLoaded: () => Promise<boolean>;
}
