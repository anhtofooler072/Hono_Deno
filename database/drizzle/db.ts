import { drizzle } from "npm:drizzle-orm/neon-http";
import { neon } from "npm:@neondatabase/serverless";

const dataUrl = Deno.env.get("DATABASE_URL")!;
if (!dataUrl) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const sql = neon(dataUrl);
export const db = drizzle({ client: sql });
