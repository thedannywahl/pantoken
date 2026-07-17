/**
 * Types for {@link workspaceOrchestrator}.
 *
 * @module
 */

/** One upstream workspace package to watch and rebuild. */
export interface UpstreamNode {
  /** Display name for log messages. */
  name: string;
  /** Package root directory (the cwd for the build command). */
  dir: string;
  /** Paths (files or directories) to watch — directories are watched recursively. */
  watchPaths: string[];
  /** Build command: first element is the executable, the rest are arguments. */
  build: readonly [string, ...string[]];
  /** Names of other upstream nodes to rebuild after this one succeeds. */
  dependents: readonly string[];
  /**
   * Glob patterns for files to include. When set, only changes to files matching at least one
   * pattern trigger a rebuild. Omit to include everything.
   */
  include?: readonly string[];
  /**
   * Glob patterns for files to ignore. Changes to matching files are silently skipped. Omit to
   * ignore nothing.
   */
  ignore?: readonly string[];
}

/** One static file-serving middleware entry. */
export interface FileServerEntry {
  /** URL path prefix to mount the middleware at, e.g. `"/styles/apps"`. */
  mountPath: string;
  /** Local directory to serve files from. */
  serveDir: string;
  /** Only serve files whose URL path ends with this extension, e.g. `".css"`. */
  extension: string;
  /** Value for the `Content-Type` response header. */
  contentType: string;
  /**
   * Optional transform applied to the URL-relative path before resolving against `serveDir`, e.g.
   * `(p) => p.replace(/\/([^/]+)\.css$/, "/$1/app.css")`.
   */
  pathTransform?: (urlRelativePath: string) => string;
}

/** Options for {@link workspaceOrchestrator}. */
export interface OrchestratorOptions {
  /** The upstream workspace dependency graph. */
  upstream: readonly UpstreamNode[];
  /**
   * Paths to watch with native `fs.watch` so Vite picks up built output after an upstream rebuild
   * (e.g. a package's `dist` or `generated` directory). Uses native `fs.watch` rather than
   * chokidar's `add()`, which doesn't reliably detect changes in pnpm-symlinked or out-of-root
   * directories. On each change a synthetic `"change"` event is emitted on `server.watcher`: for
   * CSS files already in the module graph Vite triggers a targeted hot-update; for anything else
   * it falls back to a full page reload.
   */
  outputWatchPaths?: readonly string[];
  /** Debounce delay in milliseconds before triggering a rebuild (default: 200). */
  debounceMs?: number;
  /** Optional static file-serving middleware entries. */
  fileServers?: readonly FileServerEntry[];
}
