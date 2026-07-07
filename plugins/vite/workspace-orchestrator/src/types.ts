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
   * Paths to add to Vite's `server.watcher` so HMR fires when built output is updated (e.g. a
   * package's `dist` or `generated` directory).
   */
  hmrWatchPaths?: readonly string[];
  /**
   * Paths to watch with native `fs.watch` for triggering module invalidation. Unlike
   * `hmrWatchPaths` (which relies on chokidar), these are monitored with Node's native `fs.watch` —
   * which reliably detects changes for pnpm-symlinked workspace `dist` directories. On a change, a
   * synthetic `"change"` event is emitted on `server.watcher` so the module graph is invalidated.
   */
  reloadWatchPaths?: readonly string[];
  /** Debounce delay in milliseconds before triggering a rebuild (default: 200). */
  debounceMs?: number;
  /** Optional static file-serving middleware entries. */
  fileServers?: readonly FileServerEntry[];
}
