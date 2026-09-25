/**
 * Scope instances — the "manual config to avoid collision" half of multi-instance support.
 *
 * A scope owns one element and writes the `data-pantoken-*` attributes onto it. Everything below
 * that element resolves to it; siblings are independent. State is persisted under a key namespaced
 * by instance id, and child frames are messaged individually after opting in via
 * {@link PantokenScope.attachFrame} — never by sweeping the whole document for iframes.
 *
 * @module
 */
import {
  BOUNDARY_ATTR,
  COLOR_ATTR,
  DEFAULT_INSTANCE,
  INSTANCE_ATTR,
  SCHEME_ATTR,
  THEME_ATTR,
  isScheme,
} from "./contract.ts";
import { resolveScope } from "./resolve.ts";
import type { ResolvedScope, Scheme, ScopeConfig } from "./contract.ts";

/** The message envelope exchanged between a scope and its attached frames. */
export interface ScopeMessage extends ScopeConfig {
  type: "pantoken-scope" | "pantoken-scope-request";
  instanceId: string;
}

/** Options for {@link createScope}. */
export interface CreateScopeOptions extends ScopeConfig {
  /**
   * Identifier distinguishing this pantoken instance from others on the page. Scopes, storage keys,
   * and frame messages are all keyed by it.
   */
  instanceId?: string;
  /**
   * Stop ancestor resolution at this element, so nothing outside can theme what is inside. Use for
   * a preview pane that must not inherit the surrounding app's theme.
   */
  boundary?: boolean;
  /** Persist and restore state. Pass `false` to keep the scope in-memory only (default `true`). */
  persist?: boolean;
  /** Storage backend (default `localStorage`, silently skipped when unavailable). */
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
}

/** A live scope bound to one element. */
export interface PantokenScope {
  /** The element carrying the scope attributes. */
  readonly element: HTMLElement;
  /** The instance this scope belongs to. */
  readonly instanceId: string;
  /** The scope's own configuration — what it declares, not what it inherits. */
  get(): ScopeConfig;
  /** Merge a partial configuration in. Pass `null` for a field to clear it and inherit again. */
  set(patch: Partial<Record<keyof ScopeConfig, string | null | undefined>>): void;
  /** Resolve the effective scope for a descendant (defaults to this scope's own element). */
  resolve(el?: Element): ResolvedScope;
  /** Send this scope's state to `frame` and keep it in sync. Returns a detach function. */
  attachFrame(frame: HTMLIFrameElement): () => void;
  /** Observe changes. Returns an unsubscribe function. */
  subscribe(listener: (config: ScopeConfig) => void): () => void;
  /** Remove the attributes, detach frames, and unregister. */
  destroy(): void;
}

const registries = new WeakMap<Document, Map<string, PantokenScope>>();

function registryFor(doc: Document): Map<string, PantokenScope> {
  let registry = registries.get(doc);
  if (!registry) {
    registry = new Map();
    registries.set(doc, registry);
  }
  return registry;
}

/** The scope registered for `instanceId` in `doc`, if any. */
export function getScope(
  instanceId: string = DEFAULT_INSTANCE,
  doc: Document = document,
): PantokenScope | undefined {
  return registryFor(doc).get(instanceId);
}

const storageKey = (instanceId: string, field: string): string => `pantoken:${instanceId}:${field}`;

function defaultStorage(): CreateScopeOptions["storage"] {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    // Storage access can throw outright under a restrictive privacy setting.
    return null;
  }
}

/**
 * The origin to post to for `frame`. A `srcdoc` frame has an opaque origin that can only be
 * addressed as `"*"`; anything with a real `src` gets its concrete origin so the message cannot
 * leak to a navigated-away document.
 */
function frameOrigin(frame: HTMLIFrameElement): string {
  if (!frame.hasAttribute("src")) return "*";
  try {
    return new URL(frame.src, frame.ownerDocument.location.href).origin;
  } catch {
    return frame.ownerDocument.location.origin;
  }
}

const FIELDS = {
  theme: THEME_ATTR,
  scheme: SCHEME_ATTR,
  color: COLOR_ATTR,
} as const;

/**
 * Create a scope rooted at `element`.
 *
 * @example Two independent themes on one page
 * ```ts
 * import { createScope } from "@pantoken/scope";
 *
 * createScope(document.querySelector("#app")!, { theme: "rebrand", scheme: "dark" });
 * createScope(document.querySelector("#preview")!, {
 *   instanceId: "preview",
 *   theme: "canvas",
 *   scheme: "light",
 *   boundary: true,
 * });
 * ```
 */
export function createScope(element: HTMLElement, options: CreateScopeOptions = {}): PantokenScope {
  const {
    instanceId = DEFAULT_INSTANCE,
    boundary = false,
    persist = true,
    storage = defaultStorage(),
    ...initial
  } = options;

  const doc = element.ownerDocument;
  const registry = registryFor(doc);
  registry.get(instanceId)?.destroy();

  const read = (field: keyof typeof FIELDS): string | undefined => {
    if (!persist || !storage) return undefined;
    try {
      return storage.getItem(storageKey(instanceId, field)) ?? undefined;
    } catch {
      return undefined;
    }
  };

  const config: ScopeConfig = {
    theme: initial.theme ?? read("theme"),
    scheme: initial.scheme ?? (isScheme(read("scheme")) ? (read("scheme") as Scheme) : undefined),
    color: initial.color ?? read("color"),
    instanceId,
  };

  const listeners = new Set<(config: ScopeConfig) => void>();
  const frames = new Set<HTMLIFrameElement>();
  let destroyed = false;

  const write = (): void => {
    element.setAttribute(INSTANCE_ATTR, instanceId);
    if (boundary) element.setAttribute(BOUNDARY_ATTR, "");
    for (const [field, attribute] of Object.entries(FIELDS) as [keyof typeof FIELDS, string][]) {
      const value = config[field];
      if (value === undefined) element.removeAttribute(attribute);
      else element.setAttribute(attribute, value);
    }
    // `color-scheme` is what actually resolves `light-dark()` for this subtree; the attribute above
    // only selects the forcing block in the sheet.
    element.style.colorScheme = config.scheme ?? "";
  };

  const persistConfig = (): void => {
    if (!persist || !storage) return;
    for (const field of Object.keys(FIELDS) as (keyof typeof FIELDS)[]) {
      try {
        storage.setItem(storageKey(instanceId, field), config[field] ?? "");
      } catch {
        // A full or blocked quota must not break theming.
      }
    }
  };

  const post = (frame: HTMLIFrameElement): void => {
    const message: ScopeMessage = { type: "pantoken-scope", instanceId, ...config };
    frame.contentWindow?.postMessage(message, frameOrigin(frame));
  };

  const broadcast = (): void => {
    for (const frame of frames) post(frame);
    for (const listener of listeners) listener({ ...config });
  };

  const onFrameRequest = (event: MessageEvent): void => {
    const data = event.data as Partial<ScopeMessage> | null;
    if (data?.type !== "pantoken-scope-request") return;
    // Only answer our own instance, and only frames that opted in.
    if (data.instanceId !== instanceId) return;
    for (const frame of frames) {
      if (frame.contentWindow === event.source) post(frame);
    }
  };

  doc.defaultView?.addEventListener("message", onFrameRequest);
  write();
  persistConfig();

  const scope: PantokenScope = {
    element,
    instanceId,
    get: () => ({ ...config }),
    set(patch) {
      if (destroyed) return;
      for (const field of Object.keys(FIELDS) as (keyof typeof FIELDS)[]) {
        if (!(field in patch)) continue;
        const value = patch[field];
        if (value === null || value === undefined) delete config[field];
        else if (field === "scheme") config.scheme = isScheme(value) ? value : undefined;
        else config[field] = value;
      }
      write();
      persistConfig();
      broadcast();
    },
    resolve: (el = element) => resolveScope(el),
    attachFrame(frame) {
      frames.add(frame);
      post(frame);
      return () => {
        frames.delete(frame);
      };
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      doc.defaultView?.removeEventListener("message", onFrameRequest);
      frames.clear();
      listeners.clear();
      for (const attribute of [...Object.values(FIELDS), INSTANCE_ATTR, BOUNDARY_ATTR]) {
        element.removeAttribute(attribute);
      }
      element.style.colorScheme = "";
      if (registry.get(instanceId) === scope) registry.delete(instanceId);
    },
  };

  registry.set(instanceId, scope);
  return scope;
}

/** Options for {@link connectScope}. */
export interface ConnectScopeOptions {
  /** The instance to accept messages for (default {@link DEFAULT_INSTANCE}). */
  instanceId?: string;
  /** The element to apply received state to (default `document.documentElement`). */
  element?: HTMLElement;
  /** The window to talk to (default `window.parent`). */
  host?: Window | null;
  /** The origin the host must have. Pass `"*"` only for an opaque-origin `srcdoc` document. */
  hostOrigin?: string;
  /** Called after each applied update. */
  onChange?: (config: ScopeConfig) => void;
}

/**
 * Run inside a frame: ask the host page's scope for its state and follow it.
 *
 * The frame gets its own scope element, so it can be told to render a different theme or scheme than
 * the host — it is not inheriting ambiently.
 *
 * @returns A disconnect function.
 */
export function connectScope(options: ConnectScopeOptions = {}): () => void {
  const {
    instanceId = DEFAULT_INSTANCE,
    element = document.documentElement,
    host = window.parent,
    hostOrigin,
    onChange,
  } = options;

  const local = createScope(element, { instanceId, persist: false });

  const onMessage = (event: MessageEvent): void => {
    if (host && event.source !== host) return;
    if (hostOrigin && hostOrigin !== "*" && event.origin !== hostOrigin) return;
    const data = event.data as Partial<ScopeMessage> | null;
    if (data?.type !== "pantoken-scope" || data.instanceId !== instanceId) return;
    local.set({ theme: data.theme, scheme: data.scheme, color: data.color });
    onChange?.(local.get());
  };

  window.addEventListener("message", onMessage);
  const request: ScopeMessage = { type: "pantoken-scope-request", instanceId };
  host?.postMessage(request, hostOrigin ?? "*");

  return () => {
    window.removeEventListener("message", onMessage);
    local.destroy();
  };
}
