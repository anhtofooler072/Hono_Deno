import { z } from "npm:@hono/zod-openapi";

export const ParamSchema = z.object({
  id: z.string().min(3).openapi({
    param: { name: "id", in: "path" },
    example: "8b001a1f-4299-41c9-9640-19afb86f1d93",
  }),
});

// @deno-lint-ignore ban-ts-comment
export const UserSchema = z.object({
  id: z.string().openapi({ example: "123" }),
  name: z.string().openapi({ example: "John Doe" }),
  dob: z.string().openapi({
    example: "Wed Sep 30 1998",
    description: "Date of Birth",
  }),
}).openapi("User");
