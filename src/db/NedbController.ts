import { SongMeta } from "../model/SongMeta";
import { DBController, GetSongsConfig } from "./DBController";
import Datastore from "@seald-io/nedb";

const db = new Datastore({ filename: "./data.jbtstore", autoload: true });

class NedbController implements DBController {
  addSong = async (song: SongMeta) => {
    await db.insert({ type: "song", favorited: false, ...song });
    return song;
  };

  getSongByTitle = async (title: string) => {
    return (await db.findAsync({ title }))[0];
  };

  getAllSongs = async ({ favorites }: GetSongsConfig) => {
    const queryInjections = favorites ? { favorited: true } : {};
    return await db
      .findAsync({ type: "song", ...queryInjections })
      .sort((a: SongMeta, b: SongMeta) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
  };

  getSongLoadState = async () => {
    const songLoadedSettings = await db.findAsync({
      setting: "songsLoaded",
      value: true,
    });
    return !!songLoadedSettings[0];
  };

  markSongsLoaded = async () => {
    await db.insertAsync({ setting: "songsLoaded", value: true });
    return true;
  };

  updateFavorite = async (songId: string, favorite: boolean) => {
    const response = await db.updateAsync(
      { type: "song", uuid: songId },
      { $set: { favorited: favorite }},
      { returnUpdatedDocs: true }
    );
    if (response.numAffected > 0) {
      return response.affectedDocuments;
    } else
    return null;
  };
}

const controller = new NedbController();

export { controller as NedbController };
