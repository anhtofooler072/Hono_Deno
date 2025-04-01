import { createApp } from "../lib/createApp.ts";

const app = createApp();

// deno-lint-ignore no-explicit-any
app.get("/", (c: { text: (arg0: string) => any; }) => Promise.resolve(c.text("Hello World!")));

export default app;
