// deno-lint-ignore-file ban-ts-comment
import { createRoute } from "npm:@hono/zod-openapi";
import { z } from "npm:@hono/zod-openapi";
import { ParamSchema, UserSchema } from "./schemas.ts";

export const createUserRoute = createRoute({
  method: "post",
  path: "/users/register",
  request: {
    body: {
      content: {
        "application/json": {
          //@ts-ignore
          schema: z.object({
            //@ts-ignore
            name: z.string().openapi({ example: "John Doe" }),
            //@ts-ignore
            dob:z.string().openapi({example: "Wed Sep 30 1998 or 2003-05-16", description: "Date of Birth"}),
            //@ts-ignore
            email: z.string().email().openapi({example: "tqa@gmail.com"}),
            //@ts-ignore
            password: z.string().openapi({example: "password123", description: "Password"}),  
          }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          // @ts-ignore
          schema: UserSchema,
        },
      },
      description: "User created successfully",
    },
    400: {
      description: "Invalid request body",
    },
    500: {
      description: "Internal server error",
    },
  },
});

export const getUserRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          // @ts-ignore
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});

export const deleteUserRoute = createRoute({
  method: "delete",
  path: "/users/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      description: "User deleted successfully",
    },
    404: {
      description: "User not found",
    },
    500: {
      description: "Internal server error",
    },
  },
});
