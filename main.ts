import app from "./src/app.ts";

// deno-lint-ignore ban-ts-comment
//@ts-expect-error
Deno.serve(app.fetch);
