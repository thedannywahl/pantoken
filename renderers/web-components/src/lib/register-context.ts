/**
 * Builds the shared {@link RegisterContext} a `register()`-style call threads to every element's
 * `define`. Deliberately has no top-level side effects (unlike `../index.ts`, which auto-invokes
 * `register()` on import) — the per-element CDN build imports {@link buildRegisterContext} directly
 * from here so that importing it never also runs the "register everything" auto-invoke, which would
 * itself reach {@link iconSvg} and drag `@pantoken/icons`/`@pantoken/tokens` into every bundle
 * regardless of which element the bundle is actually for.
 *
 * @module
 */
import { resolve as pantokenResolve } from "@pantoken/icons";
import { applySpacing, makeOnCommand, SPACING_ATTRS, syncInvoker } from "@pantoken/interactions";
import type { IconResolver } from "@pantoken/model";
import type { ElementRegistry, RegisterContext } from "./context.ts";
import { frag } from "./helpers.ts";
import {
  ENGLISH_STRINGS,
  makeStrings,
  resolveFirstDay,
  type WebComponentStrings,
} from "./strings.ts";

/** The default tag prefix, mirroring the CSS layer — `<instui-icon>`, `.instui-button`, etc. */
export const DEFAULT_PREFIX = "instui";

/**
 * Resolve an icon name to inline SVG (empty string when unknown). Pure — the element renders it.
 *
 * @param name - The icon name (e.g. `arrow-left`).
 * @param resolve - The resolver (defaults to the built-in pantoken icon set).
 *
 * @example
 * ```ts
 * import { iconSvg } from "@pantoken/web-components";
 *
 * const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
 * ```
 */
export function iconSvg(name: string, resolve: IconResolver = pantokenResolve): string {
  return resolve(name)?.svg ?? "";
}

/** An {@link iconSvg}-shaped resolver that never resolves anything — for elements that don't need it. */
export function noopIconSvg(): string {
  return "";
}

/** An element ctor with the optional custom-element lifecycle hooks the spacing mixin composes over. */
type LifecycleElementCtor = new (...args: never[]) => HTMLElement & {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
};

/**
 * Compose the universal spacing behaviour over an element constructor: after the element's own
 * `connectedCallback`, and on any later attribute change, apply the `margin`/`padding` shorthands and
 * per-side `margin-<side>`/`padding-<side>` attributes to the host ({@link applySpacing}). `register()`
 * wraps every element with this, so InstUI-/CSS-style spacing works on all of them with no per-element code.
 *
 * @param Ctor - The element constructor to wrap.
 * @returns A subclass that adds the spacing behaviour.
 */
function withSpacing(Ctor: LifecycleElementCtor): CustomElementConstructor {
  const Spaced = class extends Ctor {
    #spacingObserver: MutationObserver | undefined;
    connectedCallback(): void {
      super.connectedCallback?.();
      applySpacing(this);
      this.#spacingObserver = new MutationObserver(() => {
        applySpacing(this);
      });
      // Watch only the spacing attributes, never `style` — applySpacing writes `style`, so observing
      // all attributes would make the observer re-trigger itself on its own writes.
      this.#spacingObserver.observe(this, {
        attributes: true,
        attributeFilter: [...SPACING_ATTRS],
      });
    }
    disconnectedCallback(): void {
      super.disconnectedCallback?.();
      this.#spacingObserver?.disconnect();
    }
  };
  return Spaced as unknown as CustomElementConstructor;
}

/** Build a `.instui-<name>` class with an optional `-color-<variant>` key-value modifier from `variant`. */
function variantClass(name: string, host: HTMLElement): string {
  const variant = frag(host.getAttribute("variant"));
  return variant ? `instui-${name} -color-${variant}` : `instui-${name}`;
}

/** Resolve the tag prefix: a non-empty string wins; anything empty/nullish falls back to `instui`. */
function resolvePrefix(prefix: string | null | undefined): string {
  return typeof prefix === "string" && prefix.trim() !== "" ? prefix : DEFAULT_PREFIX;
}

/** Build the prefix-aware registry: rewrite every internal `instui-<base>` name to the active-prefix tag. */
function makeRegistry(host: ElementRegistry, tag: (base: string) => string): ElementRegistry {
  return {
    get: (name) => host.get(tag(name.replace(/^instui-/u, ""))),
    define: (name, ctor) => {
      const resolved = tag(name.replace(/^instui-/u, ""));
      // Wrap every element with the shared spacing mixin, so `margin`/`padding` (+ per-side) work
      // universally — no per-element code needed.
      if (!host.get(resolved)) host.define(resolved, withSpacing(ctor));
    },
  };
}

/**
 * Build the shadow-DOM element factory: define `<style>:host{display}css</style>` + `render(host)`
 * markup, wiring invoker forwarding when `invoker` is set. The `:host` display is explicit because a
 * custom element defaults to `display: inline`, which would collapse internal `width: 100%`.
 */
function makeWrapper(registry: ElementRegistry): RegisterContext["wrapper"] {
  return (tag, css, render, { display = "inline-block", invoker = false } = {}) => {
    if (registry.get(tag)) return;
    registry.define(
      tag,
      class extends HTMLElement {
        static observedAttributes = [
          "variant",
          "size",
          "shape",
          "value",
          "max",
          "label",
          "pressed",
          "lines",
          "placement",
          "minimized",
          "constrain",
          "src",
          "alt",
          "tip",
          "has-shadow",
          "popovertarget",
          "popovertargetaction",
          "command",
          "commandfor",
        ];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          this.paint();
          if (invoker) {
            // Re-resolve the target on each interaction: an id can point forward to an element parsed
            // after this button, and the target may be swapped at runtime. `requestAnimationFrame`
            // catches the initial forward reference once the document has finished parsing.
            const sync = (): void => syncInvoker(this);
            this.addEventListener("pointerdown", sync);
            this.addEventListener("keydown", sync);
            if (typeof requestAnimationFrame === "function") requestAnimationFrame(sync);
          }
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        paint(): void {
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `<style>:host{display:${display}}${css}</style>${render(this)}`;
            if (invoker) syncInvoker(this);
          }
        }
      },
    );
  };
}

/** The options `register()` and {@link buildRegisterContext} share (everything but `only`, which only
 * makes sense at the `register()` call site — `buildRegisterContext`'s callers decide their own
 * element subset directly). */
export interface RegisterContextOptions {
  prefix?: string | null;
  locale?: string;
  strings?: Partial<WebComponentStrings>;
  dir?: "ltr" | "rtl";
}

/**
 * Build the shared {@link RegisterContext} a `register()`-style call threads to every element's
 * `define`. The icon resolver is injectable: `register()` always passes the real,
 * `@pantoken/icons`-backed {@link iconSvg} (unchanged default behavior for every existing caller),
 * while the per-element CDN build passes {@link noopIconSvg} for elements that never call it —
 * `@pantoken/icons`/`@pantoken/tokens` is a multi-MB dependency, and since Rollup can't code-split
 * `iife`/`umd` output, anything statically reachable from a bundle's entry ends up in the whole
 * bundle, regardless of whether that specific element's code path ever invokes it. This module has no
 * top-level side effects for exactly that reason — importing it (unlike importing `../index.ts`, which
 * auto-registers everything on import) never reaches {@link iconSvg} unless the caller passes it in.
 *
 * @param options - Same shape as `register()`'s options, minus `only`.
 * @param target - The registry to define into.
 * @param resolveIconSvg - The resolver wired into `ctx.iconSvg` — pass {@link iconSvg} for real icons
 *   or {@link noopIconSvg} when the caller's element set provably never renders one (see
 *   `ICON_ELEMENTS` in `./elements-meta.ts`).
 */
export function buildRegisterContext(
  options: RegisterContextOptions,
  target: ElementRegistry,
  resolveIconSvg: (name: string) => string,
): RegisterContext {
  // Tag prefix: a valid non-empty string overrides the default; anything else (empty, whitespace, null,
  // omitted) falls back to `instui`. A prefix is always applied because a custom-element name MUST contain
  // a hyphen — `<icon>` is invalid, `<instui-icon>`/`<x-icon>` are not. The inlined `.instui-*` CSS classes
  // are an internal detail and are NOT affected by this — only the custom-element tag name.
  const prefix = resolvePrefix(options.prefix);
  const tag = (base: string): string => `${prefix}-${base}`;
  // Route every internal `registry.get`/`define` (all keyed on the canonical `instui-<base>` names)
  // through the active prefix.
  const registry = makeRegistry(target, tag);

  // The shadow-DOM CSS is built with the default `instui` prefix so it matches the `instui-*` markup
  // in each element (the builders drop the prefix on a falsy value).
  const I = { prefix: "instui" } as const;

  // The calendar and date picker drive navigation with the Invoker Commands API. `onCommand` routes a
  // target's `command` events to a handler; where the API is unavailable it delegates clicks on the
  // target's own `command`/`commandfor` buttons instead, so the buttons keep working everywhere.
  const INVOKER_SUPPORTED =
    typeof HTMLButtonElement !== "undefined" && "command" in HTMLButtonElement.prototype;
  const onCommand = makeOnCommand(INVOKER_SUPPORTED);
  const wrapper = makeWrapper(registry);

  const locale = options.locale ?? "en";
  const dir = options.dir ?? "ltr";
  const strings = options.strings
    ? makeStrings(locale, options.strings)
    : locale === "en"
      ? ENGLISH_STRINGS
      : makeStrings(locale);
  const firstDay = resolveFirstDay(locale);

  return {
    registry,
    tag,
    I,
    invokerSupported: INVOKER_SUPPORTED,
    onCommand,
    wrapper,
    variantClass,
    iconSvg: resolveIconSvg,
    locale,
    dir,
    firstDay,
    strings,
  };
}
