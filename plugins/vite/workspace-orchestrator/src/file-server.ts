/**
 * Static file-serving middleware for {@link workspaceOrchestrator}.
 *
 * @module
 */
import { readFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { resolve } from "node:path";
import type { FileServerEntry } from "./types.ts";

interface Middlewares {
  use(
    mountPath: string,
    handler: (req: IncomingMessage, res: ServerResponse, next: () => void) => void,
  ): void;
}

/**
 * Register static file-serving middleware for each entry. Only files whose URL ends with the
 * configured extension are served; everything else falls through to the next handler.
 *
 * @param fileServers - The entries to mount.
 * @param middlewares - The connect-style middleware stack (e.g. `server.middlewares`).
 */
export function mountFileServers(
  fileServers: readonly FileServerEntry[],
  middlewares: Middlewares,
): void {
  for (const entry of fileServers) {
    middlewares.use(entry.mountPath, (req, res, next) => {
      const filePath = req.url?.split("?")[0];
      if (!filePath?.endsWith(entry.extension)) {
        next();
        return;
      }
      const resolved = entry.pathTransform ? entry.pathTransform(filePath) : filePath;
      const fullPath = resolve(entry.serveDir, resolved.slice(1));
      try {
        const content = readFileSync(fullPath, "utf8");
        res.setHeader("Content-Type", entry.contentType);
        res.end(content);
      } catch {
        next();
      }
    });
  }
}
