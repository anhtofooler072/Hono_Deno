import { OpenAPIHono } from "npm:@hono/zod-openapi";
import { notFound, onError } from "npm:stoker/middlewares";
// import { pinoLogger } from "../middlewares/pino-logger.ts";
import {
  deleteUserRoute,
  getUserRoute,
  createUserRoute,
} from "../routes/userRoutes.ts";
import {
  deleteUserHandler,
  getUserHandler,
  createUserHandler,
} from "../routes/routeHandlers.ts";
import { apiReference } from "npm:@scalar/hono-api-reference";

export function createApp() {
  const app = new OpenAPIHono();

  app.onError((c, err) => onError(c, err));

  app.notFound((c) => notFound(c));

  // app.use(pinoLogger());

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  app.openapi(getUserRoute, getUserHandler);
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  app.openapi(deleteUserRoute, deleteUserHandler);
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  app.openapi(createUserRoute, createUserHandler);

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
    })
  );

  return app;
}
