/**
 * `@pantoken/web-components` — framework-agnostic custom elements for Instructure UI.
 *
 * Registers `<instui-icon>` (glyphs from `@pantoken/icons`) plus a set of token-styled elements that
 * wrap the `@pantoken/components` CSS: `<instui-button>`, `<instui-alert>`, `<instui-badge>`,
 * `<instui-pill>`, `<instui-tag>`, `<instui-avatar>`, `<instui-spinner>`, `<instui-progress>`,
 * `<instui-progress-circle>`, `<instui-metric>`, `<instui-rating>`, `<instui-icon-button>`,
 * `<instui-toggle-button>`, and `<instui-truncate>`. Each renders the matching `.instui-*` markup into its
 * shadow root with the component stylesheet inlined, so the look is exactly `@pantoken/components`
 * with nothing to import but this module. Tokens are inherited custom properties, so they pierce the
 * shadow boundary — load `@pantoken/css` (or any pantoken token sheet) in the document to color them.
 *
 * The module is Node-safe: element classes are defined inside {@link register}, a no-op when there
 * is no DOM, so importing this package during SSR or a build never touches `HTMLElement`.
 *
 * @module
 */
import {
  alertCss,
  avatarCss,
  badgeCss,
  buttonCss,
  metricCss,
  pillCss,
  progressCircleCss,
  progressCss,
  ratingCss,
  spinnerCss,
  tagCss,
  truncateCss,
} from "@pantoken/components";
import { resolve as pantokenResolve } from "@pantoken/icons";
import type { IconResolver } from "@pantoken/model";

/** The custom-element tag names this package registers. */
export const ELEMENTS = [
  "instui-icon",
  "instui-button",
  "instui-alert",
  "instui-badge",
  "instui-pill",
  "instui-tag",
  "instui-avatar",
  "instui-spinner",
  "instui-progress",
  "instui-metric",
  "instui-rating",
  "instui-progress-circle",
  "instui-icon-button",
  "instui-toggle-button",
  "instui-truncate",
] as const;

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

/** Escape text destined for shadow-root HTML. */
const esc = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Sanitize an attribute value used as a class-name fragment (modifiers, sizes). */
const frag = (value: string | null): string => (value ?? "").replace(/[^a-z0-9-]/giu, "");

/** A minimal structural type for a custom-element registry (the DOM's `customElements`). */
interface ElementRegistry {
  get(name: string): unknown;
  define(name: string, ctor: CustomElementConstructor): void;
}

/**
 * Register the pantoken custom elements. No-op when there is no DOM (SSR / build), so this module
 * is safe to import anywhere.
 *
 * @param registry - The registry to define into (defaults to `globalThis.customElements`).
 *
 * @example
 * ```ts
 * import { register } from "@pantoken/web-components";
 * import "@pantoken/css"; // defines the --instui-* custom properties the elements read
 *
 * register(); // now <instui-button>, <instui-icon>, … work in the document
 * ```
 */
export function register(registry: ElementRegistry | undefined = globalThis.customElements): void {
  if (!registry || typeof HTMLElement === "undefined") return;

  /**
   * Define a shadow-DOM element: `<style>:host{display}css</style>` + markup from `render(host)`.
   * The `:host` display is explicit because a custom element defaults to `display: inline`, which
   * would collapse internal `width: 100%` (e.g. the progress bar).
   */
  const wrapper = (
    tag: string,
    css: string,
    render: (host: HTMLElement) => string,
    display = "inline-block",
  ): void => {
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
        ];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          this.paint();
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        paint(): void {
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `<style>:host{display:${display}}${css}</style>${render(this)}`;
          }
        }
      },
    );
  };

  // Icon renders inline SVG into its own light DOM (sized/colored via CSS on the host).
  if (!registry.get("instui-icon")) {
    registry.define(
      "instui-icon",
      class extends HTMLElement {
        static observedAttributes = ["name", "size", "color"];
        connectedCallback(): void {
          this.render();
        }
        attributeChangedCallback(): void {
          this.render();
        }
        render(): void {
          const size = this.getAttribute("size") ?? "1em";
          this.style.display = "inline-flex";
          this.style.width = size;
          this.style.height = size;
          const color = this.getAttribute("color");
          if (color) this.style.color = color;
          this.innerHTML = iconSvg(this.getAttribute("name") ?? "");
        }
      },
    );
  }

  // The shadow-DOM CSS is built with the default `instui` prefix so it matches the `instui-*` markup
  // below (the builders drop the prefix on a falsy value).
  const I = { prefix: "instui" } as const;

  /** A `.instui-<name>` class with a single `-color-<variant>` key-value modifier from `variant`. */
  const variantClass = (name: string, host: HTMLElement): string => {
    const variant = frag(host.getAttribute("variant"));
    return variant ? `instui-${name} -color-${variant}` : `instui-${name}`;
  };

  wrapper(
    "instui-button",
    buttonCss(I),
    (host) =>
      `<button class="${variantClass("button", host)}" part="button"><slot></slot></button>`,
  );
  wrapper(
    "instui-alert",
    alertCss(I),
    (host) =>
      `<div class="${variantClass("alert", host)}" role="alert" part="alert"><slot></slot></div>`,
    "block",
  );
  wrapper(
    "instui-badge",
    badgeCss(I),
    (host) => `<span class="${variantClass("badge", host)}" part="badge"><slot></slot></span>`,
  );
  wrapper(
    "instui-pill",
    pillCss(I),
    (host) => `<span class="${variantClass("pill", host)}" part="pill"><slot></slot></span>`,
  );
  wrapper(
    "instui-tag",
    tagCss(I),
    () => `<span class="instui-tag" part="tag"><slot></slot></span>`,
  );

  wrapper("instui-avatar", avatarCss(I), (host) => {
    const parts = ["instui-avatar"];
    const variant = frag(host.getAttribute("variant"));
    const size = frag(host.getAttribute("size"));
    if (variant) parts.push(`-color-${variant}`);
    if (size) parts.push(`-size-${size}`);
    if (host.getAttribute("shape") === "rectangle") parts.push("-shape-rectangle");
    return `<span class="${parts.join(" ")}" part="avatar"><slot></slot></span>`;
  });

  wrapper(
    "instui-spinner",
    spinnerCss(I),
    () => `<span class="instui-spinner" role="status" part="spinner"></span>`,
  );

  wrapper(
    "instui-progress",
    progressCss(I),
    (host) => {
      const value = Math.max(0, Math.min(100, Number(host.getAttribute("value") ?? "0")));
      const variant = frag(host.getAttribute("variant"));
      const bar = variant ? `instui-progress__bar -color-${variant}` : "instui-progress__bar";
      return `<div class="instui-progress" role="progressbar" part="progress"><div class="${bar}" style="width:${String(value)}%"></div></div>`;
    },
    "block",
  );

  wrapper("instui-metric", metricCss(I), (host) => {
    const value = esc(host.getAttribute("value") ?? "");
    const label = esc(host.getAttribute("label") ?? "");
    return `<div class="instui-metric" part="metric"><span class="instui-metric__value">${value}</span><span class="instui-metric__label">${label}</span></div>`;
  });

  wrapper("instui-rating", ratingCss(I), (host) => {
    const value = Math.max(0, Number(host.getAttribute("value") ?? "0"));
    const max = Math.max(1, Number(host.getAttribute("max") ?? "5"));
    const stars = Array.from({ length: max }, (_, i) => {
      const filled = i < value ? " -filled" : "";
      return `<span class="instui-rating__star${filled}">★</span>`;
    }).join("");
    return `<span class="instui-rating" part="rating">${stars}</span>`;
  });

  wrapper("instui-progress-circle", progressCircleCss(I), (host) => {
    const value = Math.max(0, Math.min(100, Number(host.getAttribute("value") ?? "0")));
    const label = esc(host.getAttribute("label") ?? `${String(value)}%`);
    return `<span class="instui-progress-circle" role="img" aria-label="${label}" part="progress-circle" style="--value:${String(value)}"></span>`;
  });

  wrapper("instui-icon-button", buttonCss(I), (host) => {
    const label = esc(host.getAttribute("label") ?? "");
    const aria = label ? ` aria-label="${label}"` : "";
    return `<button class="instui-button -shape-square" part="button"${aria}><slot></slot></button>`;
  });

  wrapper("instui-toggle-button", buttonCss(I), (host) => {
    const pressed = host.getAttribute("pressed") === "true" ? "true" : "false";
    return `<button class="instui-button -toggle" aria-pressed="${pressed}" part="button"><slot></slot></button>`;
  });

  wrapper(
    "instui-truncate",
    truncateCss(I),
    (host) => {
      const lines = frag(host.getAttribute("lines"));
      const style = lines ? ` style="--lines:${lines}"` : "";
      return `<span class="instui-truncate" part="truncate"${style}><slot></slot></span>`;
    },
    "block",
  );
}

// Auto-register in the browser; a no-op everywhere else.
register();
