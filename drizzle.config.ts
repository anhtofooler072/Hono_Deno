import { defineConfig } from "npm:drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schemas.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: Deno.env.get("DATABASE_URL")!,
  },
  verbose: true,
  strict: true,
});