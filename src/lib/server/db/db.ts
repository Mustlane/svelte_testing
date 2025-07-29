import * as prismaQueries from "../queries/prismaQueries";
import * as arrQueries from "../queries/arrQueries";
import * as qbittorrentQueries from "../queries/qbittorrentQueries";
import * as fileQueries from "../queries/fileQueries";
import * as fsQueries from "../queries/fs";
import 'dotenv/config'
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
const dbUrl = process.env.DATABASE_URL

const db = drizzle({ schema });

const queries = {
  ...prismaQueries,
  ...arrQueries,
  ...qbittorrentQueries,
  ...fileQueries,
  ...fsQueries,
};

async function updateStats(
  enabledUsers = queries.getEnabledUsers,
  thisDayUsers = queries.getThisDayUsers,
  thisWeekUsers = queries.getThisWeekUsers,
  thisMonthUsers = queries.getThisMonthUsers,
  requests = queries.getRequests,
  requestsDone = queries.getDoneRequests,
  movies = queries.getMovies,
  series = queries.getSeries,
  artists = queries.getArtists,
  albums = queries.getAlbums,
  authors = queries.getAuthors,
  books = queries.getBooks,
  qbitTorrents = queries.getTorrents,
  qbitDownloaded = queries.getDownloaded,
  qbitUploaded = queries.getUploaded,
  qbitSnatched = queries.getSnatched,
  qbitStalled = queries.getStalled,
  qbitSeeding = queries.getSeeding,
  qbitRatio = queries.getRatio,
  qbitRealRatio = queries.getRealRatio,
  spaceTaken = queries.getSize,
) {

  await db.update(schema.stats)
  .set({enabledUsers: await enabledUsers(),
        thisDayUsers: await thisDayUsers(),
        thisWeekUsers: await thisWeekUsers(),
        thisMonthUsers: await thisMonthUsers(),
        requests: await requests(),
        requestsDone: await requestsDone(),
        movies: await movies(),
        series: await series(),
        artists: await artists(),
        albums: await albums(),
        authors: await authors(),
        books: await books(),
        qbitTorrents: await qbitTorrents(),
        qbitUploadedSize: await qbitUploaded(),
        qbitDownloadedSize: await qbitDownloaded(),
        qbitSnatched: await qbitSnatched(),
        qbitStalled: await qbitStalled(),
        qbitSeeding: await qbitSeeding(),
        qbitAvgRatio: await qbitRatio(),
        qbitRealRatio: await qbitRealRatio(),
        spaceTaken: await spaceTaken(),
  })
  console.log(movies)
}

async function getStats() {
  const result = await db.select().from(schema.stats);
  {
    id: 1
  }
  return result
}

updateStats()

export {
  updateStats,
  getStats
}