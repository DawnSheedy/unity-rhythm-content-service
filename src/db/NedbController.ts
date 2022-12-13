import { SongMeta } from "../model/SongMeta";
import { DBController } from "./DBController";
import Datastore from "@seald-io/nedb";

const db = new Datastore({ filename: "./data.jbtstore", autoload: true });

class NedbController implements DBController {
  addSong = async (song: SongMeta) => {
    await db.insert({ type: "song", ...song });
    return song;
  };
  
  getSongByTitle = async (title: string) => {
    return (await db.findAsync({ title }))[0];
  };

  getAllSongs = async () => {
    return await db.findAsync({ type: "song" });
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
}

const controller = new NedbController();

export { controller as NedbController };
