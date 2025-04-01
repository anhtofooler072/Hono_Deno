import { db } from "../database/drizzle/db.ts";
import { usersTable } from "../database/drizzle/schemas.ts";
import { eq } from "drizzle-orm";

// deno-lint-ignore no-explicit-any
export const userHandler = async (c: { req: { valid: (arg0: string) => { id: any; }; }; json: (arg0: { id: string; name: string; dob: string; }) => any; }) => {
  const { id } = c.req.valid("param");
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .execute();
  console.log(user);
  return c.json({
    id: user[0].id,
    name: user[0].name,
    dob: user[0].dob.toDateString(),
  });
};
