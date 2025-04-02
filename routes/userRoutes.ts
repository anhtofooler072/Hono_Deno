import { createRoute } from "npm:@hono/zod-openapi";
import { ParamSchema, UserSchema } from "./schemas.ts";

export const createUserRoute = createRoute({
  method: "post",
  path: "/users",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          // deno-lint-ignore ban-ts-comment
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
          // deno-lint-ignore ban-ts-comment
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
