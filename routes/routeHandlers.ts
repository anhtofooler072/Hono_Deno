import { db } from "../database/drizzle/db.ts";
import { usersTable } from "../database/drizzle/schemas.ts";
import { eq } from "drizzle-orm";
import { hash } from "jsr:@denorg/scrypt@4.4.4";

// deno-lint-ignore ban-ts-comment
// @ts-expect-error
export const createUserHandler = async (c) => {
  const { name, dob, email, password } = await c.req.json();
  const hashedPassword = hash(password);
  const user = await db
    .insert(usersTable)
    .values({
      name: name,
      dob: new Date(dob),
      password: hashedPassword,
      email: email,
    })
    .returning({ id: usersTable.id })
    .execute();
  return c.json({
    id: user,
    name,
    dob: new Date(dob).toDateString(),
    message: "User created successfully",
  });
};

export const getUserHandler = async (c: {
  // deno-lint-ignore no-explicit-any
  req: { valid: (arg0: string) => { id: any } };
  // deno-lint-ignore no-explicit-any
  json: (arg0: { id: string; name: string; dob: string }) => any;
}) => {
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

export const deleteUserHandler = async (c: {
  // deno-lint-ignore no-explicit-any
  req: { valid: (arg0: string) => { id: any } };
  // deno-lint-ignore no-explicit-any
  json: (arg0: { message: string; name?: string }) => any;
}) => {
  const { id } = c.req.valid("param");
  const user = await db
    .delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning({ name: usersTable.name })
    .execute();
  if (user.length === 0) {
    return c.json({ message: "User not found" });
  }
  return c.json({ message: "User deleted successfully", name: user[0].name });
};
