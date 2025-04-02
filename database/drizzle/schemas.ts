import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  PgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const usersRoles = pgEnum("usersRoles", ["ADMIN", "BASIC"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  dob: timestamp("dob").notNull(),
  password: text("password").notNull(),
  usersRoles: usersRoles("users_roles").notNull().default("BASIC"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersPostsTable = pgTable("users_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  autthorId: uuid("author_id")
    .notNull()
    .references(() => usersTable.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersCommentsTable = pgTable("users_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => usersTable.id),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postsRelations = relations(usersPostsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersPostsTable.autthorId],
    references: [usersTable.id],
  }),
}));

export const commentsRelations = relations(usersCommentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersCommentsTable.authorId],
    references: [usersTable.id],
  }),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  comments: many(usersCommentsTable),
  posts: many(usersPostsTable),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertUserComment = typeof usersCommentsTable.$inferInsert;
export type SelectUserComment = typeof usersCommentsTable.$inferSelect;
