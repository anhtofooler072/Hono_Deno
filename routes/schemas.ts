// deno-lint-ignore-file ban-ts-comment
import { z } from "npm:@hono/zod-openapi";

export const ParamSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: { name: "id", in: "path" },
      example: "8b001a1f-4299-41c9-9640-19afb86f1d93",
    }),
});

export const QuerySchema = z.object({
  //@ts-ignore
  name: z.string().openapi({ example: "John Doe" }),
  //@ts-ignore
  email: z.string().email().openapi({ example: "tsda@gmail.com" }),
});

export const UserSchema = z
  .object({
    //@ts-ignore
    id: z.string().openapi({ example: "123" }),
    //@ts-ignore
    name: z.string().openapi({ example: "John Doe" }),
    dob: z.string().openapi({
      example: "Wed Sep 30 1998 or 2003-05-16",
      //@ts-ignore
      description: "Date of Birth",
    }),
    //@ts-ignore
    email: z.string().email().openapi({ example: "tqa@gmail.com" }),
    password: z.string().openapi({
      example: "password123",
      //@ts-ignore
      description: "Password",
    }),
  })
  .openapi("User");
