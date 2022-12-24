import express, { Router } from "express";
import { NedbController } from "../db/NedbController";
import { Logger } from "../resources/Logger";
import { GameplayResults } from "../model/GameplayResults";

const api = Router();

api.use(express.json());

api.get("/songs", (req, res) => {
  Logger.log(`Providing song list.`);
  NedbController.getAllSongs({}).then((songs) => {
    songs.map((song) => {
      delete song.type;
      return song;
    });

    songs.sort(function (a, b) {
      return a.title.localeCompare(b.title, "ja");
    });
    res.json({ songs });
  });
});

api.get("/songs/specific/:songId", (req, res) => {
  const songId = req.params.songId;
  Logger.log(`Providing metadata for song ${songId}`);
  NedbController.getAllSongs({ songId }).then((songs) => {
    songs.map((song) => {
      delete song.type;
      return song;
    });

    songs.sort(function (a, b) {
      return a.title.localeCompare(b.title, "ja");
    });
    res.json(songs[0]);
  });
});

api.get("/scores", (req, res) => {
  Logger.log(`Providing score list.`);
  NedbController.getAllScores({}).then((scores) => {
    scores.map((score) => {
      delete score.type;
      return score;
    });

    res.json({ scores });
  });
});

api.post("/scores", (req, res) => {
  Logger.log(`Inserting new score.`);
  const results = req.body as GameplayResults;
  NedbController.addSongResult(results).then((result) => {
    res.json(result);
  });
});

api.get("/songs/favorites", (req, res) => {
    Logger.log(`Providing favorites list.`);
  NedbController.getAllSongs({ favorites: true }).then((songs) => {
    songs.map((song) => {
      delete song.type;
      return song;
    });

    songs.sort(function (a, b) {
      return a.title.localeCompare(b.title, "ja");
    });
    res.json({ songs });
  });
});

interface FavoriteRequestBody {
  songId: string;
  favorite: boolean;
}

api.post("/songs/favorites", (req, res) => {
  const newFavorite = req.body as FavoriteRequestBody;
  Logger.log(
    `Setting favorited for song ${newFavorite.songId} to ${newFavorite.favorite}.`
  );
  NedbController.updateFavorite(newFavorite.songId, newFavorite.favorite).then(
    (item) => {
      if (!item) {
        Logger.warn("Error favoriting song!");
        res.status(400);
        res.json({ error: "DB Error" });
        return;
      }
      res.json(item);
    }
  );
});

export { api as ApiRouter };
