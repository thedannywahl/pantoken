/**
 * Static file-serving middleware for {@link workspaceOrchestrator}.
 *
 * @module
 */
import { readFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { isAbsolute, relative, resolve } from "node:path";
import type { FileServerEntry } from "./types.ts";

interface Middlewares {
  use(
    mountPath: string,
    handler: (req: IncomingMessage, res: ServerResponse, next: () => void) => void,
  ): void;
}

/** Simple LRU cache for file contents to reduce filesystem reads. */
class FileCache {
  private cache = new Map<string, string>();
  private maxSize = 50; // Max 50 files
  private maxAge = 5 * 60 * 1000; // 5 minutes
  private timestamps = new Map<string, number>();

  get(path: string): string | undefined {
    const cached = this.cache.get(path);
    const timestamp = this.timestamps.get(path);

    if (!cached || !timestamp || Date.now() - timestamp > this.maxAge) {
      this.cache.delete(path);
      this.timestamps.delete(path);
      return undefined;
    }

    return cached;
  }

  set(path: string, content: string): void {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value as string | undefined;
      if (firstKey) {
        this.cache.delete(firstKey);
        this.timestamps.delete(firstKey);
      }
    }

    this.cache.set(path, content);
    this.timestamps.set(path, Date.now());
  }
}

/** Simple rate limiter using token bucket algorithm per IP. */
class RateLimiter {
  private buckets = new Map<string, { tokens: number; lastRefill: number }>();
  private readonly capacity = 100; // Max 100 tokens
  private readonly refillRate = 50; // Refill 50 tokens per second
  private readonly refillInterval = 1000; // Refill every 1 second

  isAllowed(ip: string, now: number = Date.now()): boolean {
    let bucket = this.buckets.get(ip);

    if (!bucket) {
      // Initialize bucket with capacity - 1 (since we're about to consume 1 token)
      bucket = { tokens: this.capacity - 1, lastRefill: now };
      this.buckets.set(ip, bucket);
      return true;
    }

    // Refill tokens based on time elapsed
    const elapsed = now - bucket.lastRefill;
    const refills = Math.floor(elapsed / this.refillInterval);

    if (refills > 0) {
      bucket.tokens = Math.min(this.capacity, bucket.tokens + refills * this.refillRate);
      bucket.lastRefill = now;
    }

    if (bucket.tokens > 0) {
      bucket.tokens--;
      return true;
    }

    return false;
  }
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
  const fileCache = new FileCache();
  const rateLimiter = new RateLimiter();

  for (const entry of fileServers) {
    middlewares.use(entry.mountPath, (req, res, next) => {
      const filePath = req.url?.split("?")[0];
      if (!filePath?.endsWith(entry.extension)) {
        next();
        return;
      }

      // Rate limit by client IP to prevent resource exhaustion
      const clientIp =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0] ??
        req.socket.remoteAddress ??
        "unknown";
      if (!rateLimiter.isAllowed(clientIp)) {
        res.statusCode = 429; // Too Many Requests
        res.end("Rate limit exceeded");
        return;
      }

      const resolved = entry.pathTransform ? entry.pathTransform(filePath) : filePath;
      const serveRoot = resolve(entry.serveDir);
      const fullPath = resolve(serveRoot, resolved.slice(1));
      // Contain the resolved path inside serveDir — a `../` in the URL would otherwise escape it and
      // read arbitrary files off disk (path traversal).
      const rel = relative(serveRoot, fullPath);
      if (rel.startsWith("..") || isAbsolute(rel)) {
        next();
        return;
      }

      try {
        // Check cache first to reduce filesystem operations
        let content = fileCache.get(fullPath);

        if (!content) {
          content = readFileSync(fullPath, "utf8");
          fileCache.set(fullPath, content);
        }

        res.setHeader("Content-Type", entry.contentType);
        res.end(content);
      } catch {
        next();
      }
    });
  }
}
