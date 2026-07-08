/**
 * `@pantoken/web-components` — framework-agnostic custom elements for Instructure UI.
 *
 * Registers `<instui-icon>` (glyphs from `@pantoken/icons`) plus a set of token-styled elements that
 * wrap the `@pantoken/components` CSS: `<instui-button>`, `<instui-alert>`, `<instui-badge>`,
 * `<instui-pill>`, `<instui-tag>`, `<instui-avatar>`, `<instui-spinner>`, `<instui-progress>`,
 * `<instui-progress-circle>`, `<instui-metric>`, `<instui-rating>`, `<instui-icon-button>`,
 * `<instui-toggle-button>`, `<instui-truncate>`, `<instui-img>`, `<instui-side-nav-bar>`,
 * `<instui-tree-browser>`, `<instui-calendar>`, and `<instui-tooltip>`, plus the behavioral elements
 * `<instui-modal>` (a real `<dialog>` driven by its `open` attribute), the native popovers
 * `<instui-context-view>`, `<instui-popover>`, and `<instui-tray>`, and `<instui-in-place-edit>` (a
 * click-to-edit field that commits on Enter/blur and reverts on Escape).
 * Each renders the matching `.instui-*` markup into its shadow root with the component stylesheet
 * inlined, so the look is exactly `@pantoken/components`
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
  calendarCss,
  contextViewCss,
  imgCss,
  inPlaceEditCss,
  metricCss,
  modalCss,
  pillCss,
  popoverCss,
  progressCircleCss,
  progressCss,
  ratingCss,
  sideNavBarCss,
  spinnerCss,
  tagCss,
  tooltipCss,
  trayCss,
  treeBrowserCss,
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
  "instui-img",
  "instui-side-nav-bar",
  "instui-tree-browser",
  "instui-calendar",
  "instui-tooltip",
  "instui-modal",
  "instui-context-view",
  "instui-popover",
  "instui-tray",
  "instui-in-place-edit",
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
          "placement",
          "minimized",
          "constrain",
          "src",
          "alt",
          "tip",
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
      const bar = variant ? `bar -color-${variant}` : "bar";
      return `<div class="instui-progress" role="progressbar" part="progress"><div class="${bar}" style="width:${String(value)}%"></div></div>`;
    },
    "block",
  );

  wrapper("instui-metric", metricCss(I), (host) => {
    const value = esc(host.getAttribute("value") ?? "");
    const label = esc(host.getAttribute("label") ?? "");
    return `<div class="instui-metric" part="metric"><span class="value">${value}</span><span class="label">${label}</span></div>`;
  });

  // Rating renders star glyphs as inline SVG (solid = filled, outline = empty); the rating CSS colours
  // the filled ones. A small appended rule sizes the SVGs to the text (1em), and a `.label` shows the
  // value. (The CSS glyph painter isn't inlined here, so we embed the SVG directly.)
  wrapper(
    "instui-rating",
    `${ratingCss(I)}\n.instui-rating svg{inline-size:1em;block-size:1em}`,
    (host) => {
      const value = Math.max(0, Number(host.getAttribute("value") ?? "0"));
      const max = Math.max(1, Number(host.getAttribute("max") ?? "5"));
      const label = esc(host.getAttribute("label") ?? `${String(value)}/${String(max)}`);
      const stars = Array.from({ length: max }, (_, i) => {
        const solid = i < value;
        const cls = solid ? "instui-icon -icon-star-solid" : "instui-icon -icon-star";
        return `<span class="${cls}" style="display:inline-flex">${iconSvg(solid ? "star-solid" : "star")}</span>`;
      }).join("");
      return `<span class="instui-rating" role="img" aria-label="${label}" part="rating">${stars}<span class="label">${label}</span></span>`;
    },
  );

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

  // Img renders a styled <img> from `src`/`alt`, with `-constrain-*` and `-display-block` modifiers.
  wrapper("instui-img", imgCss(I), (host) => {
    const parts = ["instui-img"];
    const constrain = frag(host.getAttribute("constrain"));
    if (constrain) parts.push(`-constrain-${constrain}`);
    if (host.getAttribute("display") === "block") parts.push("-display-block");
    const src = esc(host.getAttribute("src") ?? "");
    const alt = esc(host.getAttribute("alt") ?? "");
    return `<img class="${parts.join(" ")}" src="${src}" alt="${alt}" part="img" />`;
  });

  // SideNavBar / TreeBrowser / Calendar are containers: the consumer slots the items/tree/day cells,
  // the element supplies the styled shell.
  wrapper(
    "instui-side-nav-bar",
    sideNavBarCss(I),
    (host) => {
      const cls =
        host.getAttribute("minimized") === "true"
          ? "instui-side-nav-bar -minimized"
          : "instui-side-nav-bar";
      return `<nav class="${cls}" part="side-nav-bar"><slot></slot></nav>`;
    },
    "block",
  );
  wrapper(
    "instui-tree-browser",
    treeBrowserCss(I),
    () => `<div class="instui-tree-browser" role="tree" part="tree-browser"><slot></slot></div>`,
    "block",
  );
  wrapper(
    "instui-calendar",
    calendarCss(I),
    () => `<div class="instui-calendar" part="calendar"><slot></slot></div>`,
    "block",
  );

  // Tooltip: the slotted trigger plus a `.tip` bubble (from the `tip` attribute) shown on hover/focus.
  wrapper("instui-tooltip", tooltipCss(I), (host) => {
    const tip = esc(host.getAttribute("tip") ?? "");
    const placement = frag(host.getAttribute("placement"));
    const tipCls = placement ? `tip -placement-${placement}` : "tip";
    return `<span class="instui-tooltip" part="tooltip"><slot></slot><span class="${tipCls}" role="tooltip">${tip}</span></span>`;
  });

  // Modal: a real <dialog>, so it gets focus trapping, Esc-to-close, and a ::backdrop for free. The
  // `open` attribute drives showModal()/close(); a native dismissal (Esc / backdrop click) reflects
  // back to the attribute and re-fires as a bubbling `close` event. This is bespoke, not `wrapper()`,
  // because repainting innerHTML on every attribute change would tear down the dialog's open state.
  if (!registry.get("instui-modal")) {
    registry.define(
      "instui-modal",
      class extends HTMLElement {
        static observedAttributes = ["open"];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (root && !root.querySelector("dialog")) {
            root.innerHTML = `<style>:host{display:contents}${modalCss(I)}</style><dialog class="instui-modal" part="modal"><slot></slot></dialog>`;
            root.querySelector("dialog")?.addEventListener("close", () => {
              if (this.hasAttribute("open")) this.removeAttribute("open");
              this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
            });
          }
          this.syncOpen();
        }
        attributeChangedCallback(): void {
          this.syncOpen();
        }
        syncOpen(): void {
          const dialog = this.shadowRoot?.querySelector("dialog");
          if (!(dialog instanceof HTMLDialogElement)) return;
          const wantOpen = this.hasAttribute("open");
          if (wantOpen && !dialog.open) dialog.showModal();
          else if (!wantOpen && dialog.open) dialog.close();
        }
      },
    );
  }

  // Context view: the host itself is the popover (top layer + light-dismiss), so a light-DOM
  // `popovertarget`/`command` can toggle it by id. The shadow resets the UA popover box on :host and
  // renders the styled surface + caret inside. Position it near its trigger with CSS anchor
  // positioning where supported; otherwise it centres in the top layer.
  if (!registry.get("instui-context-view")) {
    registry.define(
      "instui-context-view",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          if (!this.hasAttribute("popover")) this.setAttribute("popover", "auto");
          const root = this.shadowRoot;
          if (root && !root.querySelector("span")) {
            root.innerHTML = `<style>:host{margin:0;border:0;padding:0;inset:auto;overflow:visible;background:transparent}${contextViewCss(I)}</style><span class="instui-context-view" part="context-view"><slot></slot></span>`;
          }
        }
      },
    );
  }

  // Popover: like context-view, the host is a native popover (top layer + light-dismiss) so a light-DOM
  // `popovertarget` can toggle it by id. The shadow resets the UA popover box and renders the styled
  // surface inside.
  if (!registry.get("instui-popover")) {
    registry.define(
      "instui-popover",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          if (!this.hasAttribute("popover")) this.setAttribute("popover", "auto");
          const root = this.shadowRoot;
          if (root && !root.querySelector("div")) {
            root.innerHTML = `<style>:host{margin:0;border:0;padding:0;inset:auto;background:transparent}${popoverCss(I)}</style><div class="instui-popover" part="popover"><slot></slot></div>`;
          }
        }
      },
    );
  }

  // Tray: a native popover docked to a viewport edge. `placement`/`size` set the inner surface class;
  // repainting the shadow doesn't disturb the host's popover open state, which lives on the host.
  if (!registry.get("instui-tray")) {
    registry.define(
      "instui-tray",
      class extends HTMLElement {
        static observedAttributes = ["placement", "size"];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          if (!this.hasAttribute("popover")) this.setAttribute("popover", "auto");
          this.paint();
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const parts = ["instui-tray"];
          const placement = (this.getAttribute("placement") ?? "").replace(/[^a-z-]/giu, "");
          const size = (this.getAttribute("size") ?? "").replace(/[^a-z]/giu, "");
          if (placement) parts.push(`-placement-${placement}`);
          if (size) parts.push(`-size-${size}`);
          root.innerHTML = `<style>:host{margin:0;border:0;padding:0;inset:auto;background:transparent}${trayCss(I)}</style><div class="${parts.join(" ")}" part="tray"><slot></slot></div>`;
        }
      },
    );
  }

  // InPlaceEdit: the stateful view→edit toggle over the CSS editable skin. The value shows as text; on
  // click/focus it becomes editable; Enter or blur commits (and fires a `change` event with the value),
  // Escape reverts. Bespoke (not `wrapper()`) because it holds the pre-edit value for cancel.
  if (!registry.get("instui-in-place-edit")) {
    registry.define(
      "instui-in-place-edit",
      class extends HTMLElement {
        static observedAttributes = ["value", "readonly"];
        #field: HTMLElement | null = null;
        #original = "";
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const readonly = this.hasAttribute("readonly");
          const value = esc(this.getAttribute("value") ?? this.textContent ?? "");
          root.innerHTML =
            `<style>:host{display:inline-block}${inPlaceEditCss(I)}</style>` +
            `<span class="instui-in-place-edit${readonly ? " -readonly" : ""}" part="field" role="textbox"` +
            ` contenteditable="${readonly ? "false" : "true"}">${value}</span>`;
          const field = root.querySelector<HTMLElement>(".instui-in-place-edit");
          this.#field = field;
          if (!field || readonly) return;
          field.addEventListener("focus", () => {
            this.#original = field.textContent ?? "";
          });
          field.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              field.blur();
            } else if (event.key === "Escape") {
              field.textContent = this.#original;
              field.blur();
            }
          });
          field.addEventListener("blur", () => {
            const next = field.textContent ?? "";
            this.setAttribute("value", next);
            if (next !== this.#original) {
              this.dispatchEvent(
                new CustomEvent("change", { detail: { value: next }, bubbles: true }),
              );
            }
          });
        }
        attributeChangedCallback(name: string): void {
          // Reflect an external value change into the field when it isn't being edited.
          if (name === "value" && this.#field && this.shadowRoot?.activeElement !== this.#field) {
            this.#field.textContent = this.getAttribute("value") ?? "";
          }
        }
      },
    );
  }
}

// Auto-register in the browser; a no-op everywhere else.
register();
