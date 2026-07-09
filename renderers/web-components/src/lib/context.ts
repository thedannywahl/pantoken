/**
 * Shared types for the web-components registry: the structural registry adapter, the Invoker
 * Commands event shape, and the {@link RegisterContext}/{@link ElementDefinition} contract that lets
 * every element live in its own file yet register through one shared, prefix-aware pipeline.
 *
 * @module
 */

/** A minimal structural type for a custom-element registry (the DOM's `customElements`). */
export interface ElementRegistry {
  get(name: string): unknown;
  define(name: string, ctor: CustomElementConstructor): void;
}

/** The `command`/`source` shape of an Invoker Commands `CommandEvent` (not yet in the DOM lib types). */
export interface CommandEventish extends Event {
  command: string;
  source: Element | null;
}

/**
 * The shared state a `register()` call builds once and threads to every {@link ElementDefinition}.
 * It carries the prefix-aware registry adapter, the `tag()` helper for nested markup, the CSS-class
 * prefix `I`, the Invoker Commands support flag + router, and the `wrapper`/`variantClass`/`iconSvg`
 * factories the simple elements share.
 */
export interface RegisterContext {
  /** The scoped registry: rewrites `instui-<base>` → the active-prefix tag on `get`/`define`. */
  registry: ElementRegistry;
  /** Map a base name to the active-prefix tag (for nested markup, `querySelector`, `tagName`). */
  tag: (base: string) => string;
  /** The CSS-class prefix for the inlined component sheets — always `instui`, separate from the tag prefix. */
  I: { readonly prefix: "instui" };
  /** Whether the browser supports the Invoker Commands API (`command`/`commandfor`). */
  invokerSupported: boolean;
  /** Route a target's `command` events (or a click fallback) to a handler. */
  onCommand: (
    target: HTMLElement,
    handler: (command: string, source: Element | null) => void,
  ) => void;
  /** Define a shadow-DOM element: `<style>:host{display}css</style>` + markup from `render(host)`.
   * `invoker: true` forwards the host's `popovertarget`/`command` to the inner `<button>` (IDL). */
  wrapper: (
    tag: string,
    css: string,
    render: (host: HTMLElement) => string,
    options?: { display?: string; invoker?: boolean },
  ) => void;
  /** Build a `.instui-<name>` class with an optional `-color-<variant>` modifier from `variant`. */
  variantClass: (name: string, host: HTMLElement) => string;
  /** Resolve an icon name to inline SVG (empty string when unknown). */
  iconSvg: (name: string) => string;
}

/** One registered custom element: its base tag name plus a `define` that registers it via the context. */
export interface ElementDefinition {
  /** The base tag name, e.g. `button` (minted to `<instui-button>`/`<x-button>` by the active prefix). */
  readonly name: string;
  /** Register the element into `ctx.registry`, using only the shared, prefix-aware helpers. */
  define(ctx: RegisterContext): void;
}
