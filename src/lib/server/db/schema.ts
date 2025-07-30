import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, serial, integer, text, timestamp, uuid, boolean, varchar, bigint } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom().notNull(),
	username: varchar('username', { length: 50}).notNull().unique(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	lastSeen: timestamp('last_seen', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	passwordHash: text('password_hash').notNull(),
	hasVideo: boolean('has_video').default(false),
	hasAudio: boolean('has_audio').default(false),
	hasMedia: boolean('has_media').default(false)
});

export const session = pgTable('session', {
	id: uuid('id').primaryKey().defaultRandom().notNull(),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


export const family = pgTable('family', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	childId: uuid('child_id').references(() => user.id), 
	parentId: uuid('parent_id').references(() => user.id)
})

export const file = pgTable('file', {
	id: uuid('id').primaryKey().defaultRandom().notNull(),
	name: varchar('name', { length: 150}).notNull(),
	uploadedAt: timestamp('uploaded_at', {withTimezone: true, mode: 'date'}).notNull().defaultNow(),
	url: text('url').notNull(),
	size: bigint('size', { mode: 'number' }).default(0),
	folderId: uuid('folder_id').references(() => folder.id),
	ownerId: uuid('owner_id').references(() => user.id)

})

export const folder = pgTable('folder', {
	id: uuid('id').primaryKey().defaultRandom().notNull(),
	name: varchar('name' ,{ length: 50}).notNull().unique(),
	createdAt: timestamp('created_at', {withTimezone: true, mode: 'date'}).notNull().defaultNow(),
	lastUpdated: timestamp('last_updated', {withTimezone: true, mode: 'date'}).notNull().defaultNow(),
	isPublic: boolean('is_public').default(false),
	comment: varchar('comment', {length: 300}),
	ownerId: uuid('owner_id').references(() => user.id)
})

export const stats = pgTable('stats', {
	id: integer().default(1),
	maxUsers: integer('max_users').default(0),
	enabledUsers: integer('enabled_users').default(0),
	currentUsers: integer('current_users').default(0),
	thisDayUsers: integer('this_day_users').default(0),
	thisWeekUsers: integer('this_week_users').default(0),
	thisMonthUsers: integer('this_month_users').default(0),
	requests: integer('requests').default(0),
	requestsDone: integer('requests_done').default(0),
	movies: integer('movies').default(0),
	series: integer('series').default(0),
	artists: integer('artists').default(0),
	albums: integer('albums').default(0),
	authors: integer('authors').default(0),
	books: integer('books').default(0),
	qbitUploadedSize: integer('uploaded').default(0),
	qbitDownloadedSize: integer('downloaded').default(0),
	qbitRealRatio: integer('real_ratio').default(0),
	qbitTorrents: integer('torrents').default(0),
	qbitSnatched: integer('snatched').default(0),
	qbitStalled: integer('stalled').default(0),
	qbitSeeding: integer('seeding').default(0),
	qbitAvgRatio: integer('avg_ratio').default(0),
	spaceTaken: bigint({mode: 'bigint'})
})


export const request = pgTable("request", {
id: uuid('id').primaryKey().defaultRandom().notNull(),
authorId: uuid('author_id').references(() => user.id),
text: text('text'),
createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
isDone: boolean('is_done').default(false),
})

export const userRelations = relations(user, ({ many }) => ({
  userFamilyChild: many(family,{relationName: 'child'}),
  userFamilyParent: many(family,{relationName: 'parent'}),
  userFile: many(file),
  userFolder: many(userFolder),
  userRequest: many(request)
}));

export const fileRelations = relations(file, ({ one }) => ({
  folder: one(folder, {
	fields: [file.folderId],
	references: [folder.id]
  }),

  owner: one(user, {
	fields: [file.ownerId],
	references: [user.id]
  })
}));

export const folderRelations = relations(folder, ({ one, many }) => ({
  userFolder: many(userFolder),
  file: many(file),
  owner: one(user, {
	fields: [folder.ownerId],
	references: [user.id]
  }),
}));

export const requestRelations = relations(request, ({ one }) => ({
	author: one(user, {
		fields: [request.authorId],
		references: [user.id]
	}),
}));

export const familyRelations = relations(family, ({ one }) => ({
	child: one(user, {
		fields: [family.childId],
		references: [user.id],
		relationName: 'child'
	}),
	parent: one(user, {
		fields: [family.parentId],
		references: [user.id],
		relationName: 'parent'
	}),
}));

export const userFolder = pgTable(
  'user_folder',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id),
    folderId: uuid('folder_id')
      .notNull()
      .references(() => folder.id),
  },
  (t) => [
		primaryKey({ columns: [t.userId, t.folderId] })
	],
);

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Family = typeof family.$inferSelect;
export type File = typeof file.$inferSelect;
export type Folder = typeof folder.$inferSelect;
export type Stats = typeof stats.$inferSelect;
