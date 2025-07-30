import * as schema from '../db/schema';
import dayjs from 'dayjs'
import { eq, gte, count } from "drizzle-orm";


import { db } from '../db/index';


async function getEnabledUsers(): Promise<number> {
  const result = await db.select({ count: count() }).from(schema.user).then((res) => res[0])
  return result.count
}

async function getThisDayUsers() {
  const result = await db.select({ count: count() })
  .from(schema.user)
  .where(gte(schema.user.lastSeen, dayjs().subtract(1, 'day').toDate())).then((res) => res[0])
  return result.count
}

async function getThisWeekUsers() {
  const result = await db.select({ count: count() })
    .from(schema.user)
    .where(gte(schema.user.lastSeen, dayjs().subtract(7, 'day').toDate())).then((res) => res[0])
  return result.count
  };


async function getThisMonthUsers() {
  const result = await db.select({ count: count() })
  .from(schema.user)
  .where(gte(schema.user.lastSeen, dayjs().subtract(7, 'day').toDate())).then((res) => res[0])
  return result.count
  }

async function getRequests() {
  const result = await db.select( { count: count() }).from(schema.user).then((res) => res[0])
  return result.count
}

async function getDoneRequests() {
  const result = await db.select({ count: count()})
  .from(schema.user)
  .where(eq(schema.request.isDone, true)).then((res) => res[0])
  return result.count
}

async function userCreate(username: string, password: string) {
  await db.insert(schema.user).values({
      username: username, 
      passwordHash: password
    })
}

async function userFindByName(username: string) {
  await db.select()
  .from(schema.user)
  .where(eq(schema.user.username, username))
}

async function userFindById(id: string) {
  await db.select()
  .from(schema.user)
  .where(eq(schema.user.id, id))
}

export {
    getEnabledUsers,
    getThisDayUsers,
    getThisWeekUsers,
    getThisMonthUsers,
    getRequests,
    getDoneRequests,
    userCreate,
    userFindByName,
    userFindById,
}