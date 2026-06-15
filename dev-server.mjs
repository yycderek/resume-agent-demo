// ESM-based Next.js dev server launcher
// Solves the .bin/next CJS + package.json type:module conflict
import { createServer } from "node:http";
import next from "next";

const app = next({ dev: true, port: 3000 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handle).listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
