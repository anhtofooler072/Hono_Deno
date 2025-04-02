import { createRoute } from "npm:@hono/zod-openapi";
import { ParamSchema, UserSchema } from "./schemas.ts";

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
