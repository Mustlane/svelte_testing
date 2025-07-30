import * as schema from '../db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import dayjs from 'dayjs'
import { eq, ne, gt, gte, count } from "drizzle-orm";

import postgres from 'postgres';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')

const client = postgres(process.env.DATABASE_URL);

const db = drizzle(client, { schema });

async function getEnabledUsers() {
  const getEnabledUsers = await db.select({ count: count() }).from(schema.user)
  return getEnabledUsers
}

async function getThisDayUsers() {
  const getThisDayUsers = await db.select()
  .from(schema.user)
  .where(gte(schema.user.lastSeen, dayjs().subtract(1, 'day').toDate()))
  return getThisDayUsers.length
}

async function getThisWeekUsers() {
  const getThisWeekUsers = await db.select()
    .from(schema.user)
    .where(gte(schema.user.lastSeen, dayjs().subtract(7, 'day').toDate()))
  return getThisWeekUsers.length
  };


async function getThisMonthUsers() {
  const getThisMonthUsers = await db.select()
  .from(schema.user)
  .where(gte(schema.user.lastSeen, dayjs().subtract(7, 'day').toDate()))
  return getThisMonthUsers.length
  }

async function getRequests() {
  const requests = await db.select( { count: count() }).from(schema.user)
  return requests
}

async function getDoneRequests() {
  const doneRequests = await db.select()
  .from(schema.user)
  .where(eq(schema.request.isDone, true))
  return doneRequests.length
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