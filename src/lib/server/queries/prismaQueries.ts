import * as schema from '../db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import dayjs from 'dayjs'
import { eq, ne, gt, gte, count } from "drizzle-orm";

const dbUrl = process.env.DATABASE_URL
const db = drizzle({ schema });

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
  const getThisWeekUsers = await prisma.user.findMany({
    where: {
      lastSeen: {
        gte: dayjs().subtract(7, "day").toISOString(),
      },
    },
  });
  return getThisWeekUsers.length
}

async function getThisMonthUsers() {
  const getThisMonthUsers = await prisma.user.findMany({
    where: {
      lastSeen: {
        gte: dayjs().subtract(30, "day").toISOString(),
      },
    },
  });
  return getThisMonthUsers.length
}

async function getRequests() {
  const requests = await prisma.requests.findMany({
  })
  return requests.length
}

async function getDoneRequests() {
  const doneRequests = await prisma.requests.findMany({
    where:{
      isDone: true
    }
  })
  return doneRequests.length
}

async function userCreate(username: string, password: string) {
  await prisma.user.create({
    data: {
      username: username, 
      password: password
    }
  })
}

async function userFindByName(username: string) {
  const userFindByName = await prisma.user.findFirst({
    where:{
      username: username
    }
  })
  return userFindByName
}

async function userFindById(id: string) {
  const userFindById = await prisma.user.findFirst({
    where:{
      id: id
    }
  })
  return userFindById
}

async function userGet(username: string) {
  const userFindById = await prisma.user.findFirst({
    where:{
      username: username,
    }
  })
  return userGet
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
    userGet
}