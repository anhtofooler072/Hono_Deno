import { pgEnum, pgTable, text, timestamp, uuid } from "npm:drizzle-orm/pg-core";

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

export const usersCommentsTable = pgTable("users_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => usersTable.id),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertUserComment = typeof usersCommentsTable.$inferInsert;
export type SelectUserComment = typeof usersCommentsTable.$inferSelect;
