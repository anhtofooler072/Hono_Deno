import { createApp } from "../lib/createApp.ts";

const app = createApp();

app.get(
  "/",
  // deno-lint-ignore no-explicit-any
  (c: { text: (arg0: string) => any }) =>
    Promise.resolve(c.text("Hello World!")),
);

export default app;
