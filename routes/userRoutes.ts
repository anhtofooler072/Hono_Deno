// deno-lint-ignore-file ban-ts-comment
import { createRoute } from "npm:@hono/zod-openapi";
import { z } from "npm:@hono/zod-openapi";
import { ParamSchema, UserSchema } from "./schemas.ts";

export const getAllUsersRoute = createRoute({
  method: "get",
  path: "/users/all",
  request: {
    //@ts-ignore
    query: z.object({
      page: z.string().optional().openapi({
        example: "1",
        //@ts-ignore
        description: "Page number for pagination",
      }),
      //@ts-ignore
      limit: z.string().optional().openapi({
        example: "10",
        //@ts-ignore
        description: "Number of users per page",
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          // @ts-ignore
          schema: z.object({
            count: z.number(),
            //@ts-ignore
            users: z.array(UserSchema.omit({ password: true, id: true })),
          }),
        },
      },
      description: "Retrieve all users",
    },
  },
});

export const loginRoute = createRoute({
  method: "post",
  path: "/users/login",
  request: {
    body: {
      content: {
        "application/json": {
          //@ts-ignore
          schema: z.object({
            //@ts-ignore
            email: z.string().email().openapi({
              example: "tqa-test@gmail.com",
            }),
            //@ts-ignore
            password: z.string().openapi({
              example: "toquanganh",
              //@ts-ignore
              description: "Password",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          // @ts-ignore
          schema: UserSchema,
        },
      },
      description: "Login successfully",
    },
    401: {
      description: "Invalid email or password",
    },
    500: {
      description: "Internal server error",
    },
  },
});

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
            dob: z.string().openapi({
              example: "Wed Sep 30 1998 or 2003-05-16",
              //@ts-ignore
              description: "Date of Birth",
            }),
            //@ts-ignore
            email: z.string().email().openapi({ example: "tqa@gmail.com" }),
            //@ts-ignore
            password: z.string().openapi({
              example: "password123",
              //@ts-ignore
              description: "Password",
            }),
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
  path: "/users/getbyId/{id}",
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
