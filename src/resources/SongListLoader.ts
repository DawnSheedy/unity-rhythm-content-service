import { NedbController } from "../db/NedbController";
import { Logger } from "./Logger";
import * as fs from "fs";
import path from "path";
import { SongMeta } from "../model/SongMeta";

export const songListLoader = async () => {
  Logger.log("Checking song load state...");
  const needToLoad = !(await NedbController.getSongLoadState());
  if (!needToLoad) {
    Logger.log("Songs loaded.");
    return;
  }
  NedbController.markSongsLoaded();
  introspectDataFolder();
  Logger.warn("Need to build songs database. This might take a while.");
};

const introspectDataFolder = async () => {
  const subDirs = await fs.promises.readdir("./data");
  const promises = [];

  for (const file of subDirs) {
    // Get the full paths
    const fullPath = path.join("./data", file);

    // Stat the file to see if we have a file or dir
    const stat = await fs.promises.stat(fullPath);

    if (!stat.isDirectory()) {
      continue;
    }

    promises.push(importSongFromDir(fullPath));
  }

  await Promise.all(promises);
  console.log(`Loaded ${promises.length} songs.`);
};

const importSongFromDir = async (filePath: string) => {
  const songObj = await getJsonFromFile(path.join(filePath, "meta.json"));
  Logger.log(`Loading Song: ${songObj.title} | Artist: ${songObj.artist}`);
  NedbController.addSong(songObj);
};

const getJsonFromFile = async (path: string) => {
  const file = await fs.promises.readFile(path, { encoding: "utf-8" });
  const obj = JSON.parse(file);
  return obj as SongMeta;
};
