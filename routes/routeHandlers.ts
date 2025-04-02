// deno-lint-ignore-file ban-ts-comment
import { db } from "../database/drizzle/db.ts";
import { usersTable } from "../database/drizzle/schemas.ts";
import { eq } from "drizzle-orm";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";

// @ts-expect-error
export const loginHandler = async (c) => {
  const { email, password } = await c.req.json();
  const user = await db
    .select({ password: usersTable.password, name: usersTable.name })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .execute();

  if (user.length === 0 || password === undefined) {
    return c.json({ message: "incorrect credential" }, 401);
  }

  const verifyPassword = await verify(password, user[0].password);

  return c.json({
    message: "Login successfully",
    user: user,
    // using_password: password,
    verify_status: verifyPassword,
  });
};

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
    .returning({ id: usersTable.id, name: usersTable.name })
    .execute();
  return c.json({
    user: user,
    message: "User created successfully",
  });
};

// @ts-expect-error
export const getUserHandler = async (c) => {
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

// @ts-expect-error
export const deleteUserHandler = async (c) => {
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
