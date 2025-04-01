import { Hono } from "npm:hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

Deno.serve({ port: 8080 }, app.fetch);
