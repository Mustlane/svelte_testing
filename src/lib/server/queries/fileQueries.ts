import fs from "fs-extra";
import * as schema from '../db/schema';
import { eq, and, isNull } from "drizzle-orm";

import { db } from '../db/index';


async function folderGetAll(id: string){
  const folderGetAll = await db.select()
  .from(schema.folder)
  .where(eq(schema.folder.ownerId, id))

  return folderGetAll
};

async function filesGetWithoutFolder(id: string){
  const filesGetWithoutFolder = await db.select()
  .from(schema.file)
  .where(
    and(
      eq(schema.file.ownerId, id),
      isNull(schema.file.folderId)
    )
  )
  return filesGetWithoutFolder
};

async function createFolder(folderName: string, ownerId: string, comment: string) {
  await db.insert(schema.folder).values({ name: folderName, ownerId: ownerId, comment: comment })
};

async function openFolder(folderId: string) {
  const openFolder = await db.select()
  .from(schema.folder)
  .where(eq(schema.folder.id, folderId))
  return openFolder;
}

async function folderChangePublic(folderId: string, publicize: boolean) {
    if (publicize) {
      await db.update(schema.folder)
      .set({ isPublic: true })
      .where(eq(schema.folder.id, folderId))
    } else {
      await db.update(schema.folder)
      .set({ isPublic: false })
      .where(eq(schema.folder.id, folderId))
    }}


async function addFile(ownerId: string, fileName: string, path: string, folderId?: string) {
  
    await db.insert(schema.file).values({ ownerId: ownerId, name: fileName, url: path })

    if(folderId) {
      await db.update(schema.file)
        .set({ folderId: folderId })
        .where(
          and(
            eq(schema.file.name, fileName),
            eq(schema.file.ownerId, ownerId)
          ))
    }
};

async function deleteFile(fileId: string, url: string) {
  await db.delete(schema.file)
  .where(eq(schema.file.id, fileId))

  fs.unlink(url, (err) => {
  if (err) {
    throw err 
  }
  }); 
        return true
};

async function deleteFolder(folderId: string) {
  await db.delete(schema.folder)
  .where(eq(schema.folder.id, folderId))
};

async function deleteFileFromFolder(folderId: string, fileId: string) {
  const deleteFile: { url: string} = await db.delete(schema.file)
  .where(
    and(
      eq(schema.file.id, fileId),
      eq(schema.file.folderId, folderId)
    )).returning({ url: schema.file.url }).then((res) => res[0])

  // Assuming deleteFile returns an array of objects, and we only care about the first one's URL
  fs.unlink(deleteFile.url, (err) => {
    if (err) {
      throw err;
    }
  });
     return true

}

export {
  folderGetAll,
  filesGetWithoutFolder,
  createFolder,
  openFolder,
  folderChangePublic,
  addFile,
  deleteFile,
  deleteFolder,
  deleteFileFromFolder
}