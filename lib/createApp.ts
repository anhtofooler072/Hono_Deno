// deno-lint-ignore-file ban-ts-comment
import { OpenAPIHono } from "npm:@hono/zod-openapi";
import { notFound, onError } from "npm:stoker/middlewares";
import { cors } from "hono/cors";
// import { pinoLogger } from "../middlewares/pino-logger.ts";
import {
  createUserRoute,
  deleteUserRoute,
  getUserRoute,
  loginRoute,
  getAllUsersRoute
} from "../routes/userRoutes.ts";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  loginHandler,
  getAllUsersHandler
} from "../routes/routeHandlers.ts";
import { apiReference } from "npm:@scalar/hono-api-reference";

export function createApp() {
  const app = new OpenAPIHono();

  app.onError((c, err) => onError(c, err));

  app.notFound((c) => notFound(c));

  
  app.openapi(loginRoute, loginHandler);
  // @ts-ignore
  app.openapi(getUserRoute, getUserHandler);
  // @ts-ignore
  app.openapi(deleteUserRoute, deleteUserHandler);
  // @ts-ignore
  app.openapi(createUserRoute, createUserHandler);
  // @ts-ignore
  app.openapi(getAllUsersRoute, getAllUsersHandler);
  
  app.use(cors({
    origin: ['http://localhost:3000'], // Specify allowed origins
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],          // Allowed HTTP methods
    allowHeaders: ['Content-Type', 'Authorization'],         // Allowed headers
    exposeHeaders: ['X-Custom-Header'],                      // Headers exposed to the client
    maxAge: 86400,                                           // Cache duration for preflight requests
    credentials: true                                        // Include credentials in requests
  }));

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
    },
  });

  app.get(
    "/scalar-docs",
    apiReference({
      theme: "saturn",
      url: "/doc", // URL of your OpenAPI documentation
    }),
  );

  return app;
}
