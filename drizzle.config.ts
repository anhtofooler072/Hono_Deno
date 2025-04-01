import { defineConfig } from "npm:drizzle-kit";

export default defineConfig({
  schema: "./database/drizzle/schemas.ts",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: Deno.env.get("DATABASE_URL")!,
  },
  verbose: true,
  strict: true,
});
