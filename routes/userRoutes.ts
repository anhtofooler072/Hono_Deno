import { createRoute } from "npm:@hono/zod-openapi";
import { ParamSchema, UserSchema } from "./schemas.ts";

export const userRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
  },
});
