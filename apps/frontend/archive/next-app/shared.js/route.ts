import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const js = await readFile(
    path.join(/* turbopackIgnore: true */ process.cwd(), "public", "shared.js"),
    "utf8"
  );
  return new Response(js, {
    headers: {
      "content-type": "application/javascript; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
