/**
 * `@pantoken/web-components` — framework-agnostic custom elements for Instructure UI.
 *
 * Registers `<instui-icon>` (glyphs from `@pantoken/icons`) plus a set of token-styled elements that
 * wrap the `@pantoken/components` CSS: `<instui-button>`, `<instui-alert>`, `<instui-badge>`,
 * `<instui-pill>`, `<instui-tag>`, `<instui-avatar>`, `<instui-spinner>`, `<instui-progress>`,
 * `<instui-progress-circle>`, `<instui-metric>`, `<instui-rating>`, `<instui-icon-button>`,
 * `<instui-toggle-button>`, `<instui-truncate>`, `<instui-img>`, `<instui-side-nav-bar>`,
 * `<instui-tree-browser>`, and `<instui-tooltip>`, plus the behavioral elements
 * `<instui-modal>` (a real `<dialog>` driven by its `open` attribute), the native popovers
 * `<instui-context-view>`, `<instui-popover>`, and `<instui-tray>`, `<instui-in-place-edit>` (a
 * click-to-edit field that commits on Enter/blur and reverts on Escape), `<instui-drilldown>` (a
 * stateful multi-level menu), `<instui-pages>` (one-panel-at-a-time nav via the View Transitions API),
 * `<instui-drawer-layout>` (a collapsible, drag-resizable side panel), the interactive
 * `<instui-calendar>` (a month grid navigated with the Invoker Commands API), and the pickers
 * `<instui-date-input>` and `<instui-date-time-input>` (a field plus a calendar-dropdown popover).
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
  menuCss,
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
  textInputCss,
  tooltipCss,
  trayCss,
  treeBrowserCss,
  truncateCss,
} from "@pantoken/components";
import { resolve as pantokenResolve } from "@pantoken/icons";
import type { IconResolver } from "@pantoken/model";

/** The default tag prefix, mirroring the CSS layer — `<instui-icon>`, `.instui-button`, etc. */
export const DEFAULT_PREFIX = "instui";

/**
 * The base (unprefixed) element names this package registers. {@link register} mints a tag per name
 * under its `prefix` option — `icon` → `<instui-icon>` by default, or `<x-icon>` for `{ prefix: "x" }`.
 * A prefix is always applied (a custom-element name must contain a hyphen), so an empty or nullish prefix
 * falls back to the default `instui`.
 */
export const ELEMENTS = [
  "icon",
  "button",
  "alert",
  "badge",
  "pill",
  "tag",
  "avatar",
  "spinner",
  "progress",
  "metric",
  "rating",
  "progress-circle",
  "icon-button",
  "toggle-button",
  "truncate",
  "img",
  "side-nav-bar",
  "tree-browser",
  "calendar",
  "tooltip",
  "modal",
  "context-view",
  "popover",
  "tray",
  "in-place-edit",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
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

/** Weekday column headers, Sunday-first. */
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/** Local-date ISO (`yyyy-mm-dd`) — sidesteps the UTC shift of `Date.prototype.toISOString`. */
const isoDate = (date: Date): string =>
  `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** Parse a `yyyy-mm-dd` string to a local `Date`, or `null` when malformed. */
const parseIsoDate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value.trim());
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};

/** A minimal structural type for a custom-element registry (the DOM's `customElements`). */
interface ElementRegistry {
  get(name: string): unknown;
  define(name: string, ctor: CustomElementConstructor): void;
}

/** The `command`/`source` shape of an Invoker Commands `CommandEvent` (not yet in the DOM lib types). */
interface CommandEventish extends Event {
  command: string;
  source: Element | null;
}

/**
 * Register the pantoken custom elements. No-op when there is no DOM (SSR / build), so this module
 * is safe to import anywhere.
 *
 * @param target - The registry to define into (defaults to `globalThis.customElements`).
 * @param options - `prefix` sets the tag prefix, mirroring the CSS layer: pass a non-empty string like
 *   `x` for `<x-icon>`. A prefix is always applied (a custom-element name must contain a hyphen), so an
 *   omitted, empty, or nullish prefix falls back to the default `instui` (`<instui-icon>`).
 *
 * @example
 * ```ts
 * import { register } from "@pantoken/web-components";
 * import "@pantoken/css"; // defines the --instui-* custom properties the elements read
 *
 * register(); // <instui-button>, <instui-icon>, …
 * register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
 * ```
 */
export function register(
  target: ElementRegistry | undefined = globalThis.customElements,
  options: { prefix?: string | null } = {},
): void {
  if (!target || typeof HTMLElement === "undefined") return;

  // Tag prefix: a valid non-empty string overrides the default; anything else (empty, whitespace, null,
  // omitted) falls back to `instui`. A prefix is always applied because a custom-element name MUST contain
  // a hyphen — `<icon>` is invalid, `<instui-icon>`/`<x-icon>` are not. The inlined `.instui-*` CSS classes
  // are an internal detail and are NOT affected by this — only the custom-element tag name.
  const prefix =
    typeof options.prefix === "string" && options.prefix.trim() !== ""
      ? options.prefix
      : DEFAULT_PREFIX;
  const tag = (base: string): string => `${prefix}-${base}`;
  // Route every internal `registry.get`/`define` (all keyed on the canonical `instui-<base>` names)
  // through the active prefix.
  const host = target;
  const registry: ElementRegistry = {
    get: (name) => host.get(tag(name.replace(/^instui-/u, ""))),
    define: (name, ctor) => {
      const resolved = tag(name.replace(/^instui-/u, ""));
      if (!host.get(resolved)) host.define(resolved, ctor);
    },
  };

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

  // The calendar and date picker drive navigation with the Invoker Commands API. `onCommand` routes a
  // target's `command` events to a handler; where the API is unavailable it delegates clicks on the
  // target's own `command`/`commandfor` buttons instead, so the buttons keep working everywhere.
  const INVOKER_SUPPORTED =
    typeof HTMLButtonElement !== "undefined" && "command" in HTMLButtonElement.prototype;
  const onCommand = (
    target: HTMLElement,
    handler: (command: string, source: Element | null) => void,
  ): void => {
    target.addEventListener("command", (event) => {
      const ce = event as CommandEventish;
      handler(ce.command, ce.source);
    });
    if (!INVOKER_SUPPORTED) {
      // Fallback for browsers without the API: delegate clicks across the target's tree — its shadow root
      // for an internal grid, or the document for a light-DOM host — to the same handler, matching on
      // `commandfor`, so `command` buttons keep working wherever they live.
      const scope = target.getRootNode() as Document | ShadowRoot;
      scope.addEventListener("click", (event) => {
        const el = event.target instanceof Element ? event.target : null;
        const button = el?.closest<HTMLButtonElement>("button[command][commandfor]");
        if (button?.getAttribute("commandfor") === target.id) {
          handler(button.getAttribute("command") ?? "", button);
        }
      });
    }
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

  // SideNavBar / TreeBrowser are containers: the consumer slots the items/tree, the element supplies
  // the styled shell.
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

  // Calendar: an interactive month grid. `value` (yyyy-mm-dd) is the selected day; `view` (yyyy-mm-dd,
  // optional) the visible month. Prev/next and every day are <button>s that fire Invoker Commands
  // (`--calendar-prev`/`--calendar-next`/`--calendar-select`) at the grid; the grid navigates or selects
  // and emits a composed `change`. It renders its own grid (no slot) so it works standalone or nested.
  if (!registry.get("instui-calendar")) {
    registry.define(
      "instui-calendar",
      class extends HTMLElement {
        static observedAttributes = ["value", "view"];
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
        #shiftMonth(delta: number): void {
          const base =
            parseIsoDate(this.getAttribute("view") ?? "") ??
            parseIsoDate(this.getAttribute("value") ?? "") ??
            new Date();
          this.setAttribute(
            "view",
            isoDate(new Date(base.getFullYear(), base.getMonth() + delta, 1)),
          );
        }
        #select(value: string): void {
          this.setAttribute("value", value);
          this.setAttribute("view", value);
          this.dispatchEvent(
            new CustomEvent("change", { detail: { value }, bubbles: true, composed: true }),
          );
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const selected = this.getAttribute("value") ?? "";
          const view =
            parseIsoDate(this.getAttribute("view") ?? "") ?? parseIsoDate(selected) ?? new Date();
          const year = view.getFullYear();
          const month = view.getMonth();
          const label = view.toLocaleDateString(undefined, { month: "long", year: "numeric" });
          const today = isoDate(new Date());
          // Leading days of the previous month, this month, then trailing days to fill the last week.
          const lead = new Date(year, month, 1).getDay();
          const total = new Date(year, month + 1, 0).getDate();
          const cells: Date[] = [];
          for (let i = 0; i < lead; i++) cells.push(new Date(year, month, 1 - (lead - i)));
          for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d));
          for (let d = 1; cells.length % 7 !== 0; d++) cells.push(new Date(year, month + 1, d));
          const dayHtml = cells
            .map((date) => {
              const iso = isoDate(date);
              const classes = ["day"];
              if (date.getMonth() !== month) classes.push("-outside-month");
              if (iso === today) classes.push("-today");
              if (iso === selected) classes.push("-selected");
              const current = iso === selected ? ' aria-current="date"' : "";
              return `<button type="button" class="${classes.join(" ")}" data-value="${iso}" command="--calendar-select" commandfor="cal"${current}>${String(date.getDate())}</button>`;
            })
            .join("");
          const reset =
            ".instui-calendar button.day{appearance:none;-webkit-appearance:none;border:0;font:inherit}" +
            ".instui-calendar .instui-button{padding:0}" +
            ".instui-calendar .instui-button svg{inline-size:1em;block-size:1em}";
          const weekdays = WEEKDAYS.map((w) => `<span class="weekday">${w}</span>`).join("");
          root.innerHTML =
            `<style>:host{display:inline-block}${calendarCss(I)}${buttonCss(I)}${reset}</style>` +
            `<div class="instui-calendar" id="cal" role="group" aria-label="${esc(label)}" part="calendar">` +
            `<div class="nav">` +
            `<button type="button" class="instui-button -color-tertiary -shape-square" command="--calendar-prev" commandfor="cal" aria-label="Previous month">${iconSvg("chevron-left")}</button>` +
            `<strong>${esc(label)}</strong>` +
            `<button type="button" class="instui-button -color-tertiary -shape-square" command="--calendar-next" commandfor="cal" aria-label="Next month">${iconSvg("chevron-right")}</button>` +
            `</div>` +
            `<div class="grid">${weekdays}${dayHtml}</div>` +
            `</div>`;
          const cal = root.getElementById("cal");
          if (cal) {
            onCommand(cal, (command, source) => {
              if (command === "--calendar-prev") this.#shiftMonth(-1);
              else if (command === "--calendar-next") this.#shiftMonth(1);
              else if (command === "--calendar-select") {
                const value = source?.getAttribute("data-value");
                if (value) this.#select(value);
              }
            });
          }
        }
      },
    );
  }

  // Tooltip: the slotted trigger plus a `.tip` bubble (from the `tip` attribute), shown on hover/focus
  // after a `show-delay` and hidden after a `hide-delay` (both ms, default 0), dismissable with Escape.
  // Bespoke (not wrapper()) so JS owns the timing: a `.-show`-gated `!important` override neutralizes
  // tooltipCss's pure-CSS `:hover`/`:focus-within` auto-show so the delay actually applies.
  if (!registry.get("instui-tooltip")) {
    registry.define(
      "instui-tooltip",
      class extends HTMLElement {
        static observedAttributes = ["tip", "placement", "show-delay", "hide-delay"];
        #timer: ReturnType<typeof setTimeout> | undefined;
        #bubble: HTMLElement | null = null;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          // Escape dismisses; bound once on the host so it catches keydown bubbling from the slotted
          // (light-DOM) trigger, and never accumulates across repaints.
          this.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              clearTimeout(this.#timer);
              this.#bubble?.classList.remove("-show");
            }
          });
        }
        connectedCallback(): void {
          this.paint();
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        disconnectedCallback(): void {
          clearTimeout(this.#timer);
        }
        #delay(attr: string): number {
          const n = Number(this.getAttribute(attr));
          return Number.isFinite(n) && n >= 0 ? n : 0;
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const tip = esc(this.getAttribute("tip") ?? "");
          const placement = frag(this.getAttribute("placement"));
          const tipCls = placement ? `tip -placement-${placement}` : "tip";
          const gate =
            ".instui-tooltip > .tip:not(.-show){opacity:0!important;visibility:hidden!important}" +
            ".instui-tooltip > .tip.-show{opacity:1;visibility:visible}";
          root.innerHTML =
            `<style>:host{display:inline-flex}${tooltipCss(I)}${gate}</style>` +
            `<span class="instui-tooltip" part="tooltip"><slot></slot>` +
            `<span class="${tipCls}" role="tooltip">${tip}</span></span>`;
          const wrap = root.querySelector<HTMLElement>(".instui-tooltip");
          this.#bubble = root.querySelector<HTMLElement>(".tip");
          if (!wrap || !this.#bubble) return;
          const show = (): void => {
            clearTimeout(this.#timer);
            this.#timer = setTimeout(
              () => this.#bubble?.classList.add("-show"),
              this.#delay("show-delay"),
            );
          };
          const hide = (): void => {
            clearTimeout(this.#timer);
            this.#timer = setTimeout(
              () => this.#bubble?.classList.remove("-show"),
              this.#delay("hide-delay"),
            );
          };
          // Listeners sit on the fresh shadow wrapper rebuilt each paint, so they never accumulate.
          wrap.addEventListener("pointerenter", show);
          wrap.addEventListener("pointerleave", hide);
          wrap.addEventListener("focusin", show);
          wrap.addEventListener("focusout", hide);
        }
      },
    );
  }

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
            // Drivable from light DOM via Invoker Commands (the shadow <dialog> can't be a `commandfor`
            // target itself): `<button command="--show|--close|--toggle" commandfor="modal-id">`.
            onCommand(this, (command) => {
              if (command === "--show") this.setAttribute("open", "");
              else if (command === "--close") this.removeAttribute("open");
              else if (command === "--toggle") this.toggleAttribute("open");
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

  // Drilldown: a stateful multi-level menu over menuCss. Each level is a light-DOM `[data-page="id"]`
  // whose inner `.item`s are cloned into a shadow `.instui-menu`; an item with `data-goto="id"` descends
  // to that page and a synthesized Back row (or any `[data-back]` item) returns. The light DOM is the
  // data source only — with no `<slot>` it never renders, so shadow CSS fully styles each panel. A
  // `navigate` event fires on every move with the new page id.
  if (!registry.get("instui-drilldown")) {
    registry.define(
      "instui-drilldown",
      class extends HTMLElement {
        static observedAttributes = ["active"];
        #stack: string[] = [];
        #wired = false;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const first =
            this.getAttribute("active") ??
            this.querySelector("[data-page]")?.getAttribute("data-page") ??
            "";
          this.#stack = first ? [first] : [];
          // Drivable from light DOM via Invoker Commands: `<button command="--goto" commandfor="dd-id"
          // data-page="…">` descends and `command="--back" commandfor="dd-id">` returns. (In-panel item
          // navigation stays click/keydown-delegated, since those items are your own markup.)
          if (!this.#wired) {
            this.#wired = true;
            onCommand(this, (command, source) => {
              if (command === "--back") this.back();
              else if (command === "--goto") {
                const page = source?.getAttribute("data-page");
                if (page) this.push(page);
              }
            });
          }
          this.paint();
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          // An external `active` change reseeds the stack; ignored when it already matches the top
          // (which is the case for our own push/back writes, so they don't recurse).
          if (name === "active" && value && value !== this.#stack[this.#stack.length - 1]) {
            this.#stack = [value];
            this.paint();
          }
        }
        #pages(): Map<string, string> {
          const pages = new Map<string, string>();
          for (const el of this.querySelectorAll("[data-page]")) {
            pages.set(el.getAttribute("data-page") ?? "", el.innerHTML);
          }
          return pages;
        }
        push(id: string): void {
          if (!this.#pages().has(id)) return;
          this.#stack.push(id);
          this.setAttribute("active", id);
          this.paint();
          this.dispatchEvent(new CustomEvent("navigate", { detail: { page: id }, bubbles: true }));
        }
        back(): void {
          if (this.#stack.length <= 1) return;
          this.#stack.pop();
          const to = this.#stack[this.#stack.length - 1] ?? "";
          this.setAttribute("active", to);
          this.paint();
          this.dispatchEvent(new CustomEvent("navigate", { detail: { page: to }, bubbles: true }));
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root || !this.isConnected) return;
          const current = this.#stack[this.#stack.length - 1] ?? "";
          const body = this.#pages().get(current) ?? "";
          const backRow =
            this.#stack.length > 1
              ? `<div class="item -drilldown-back" role="menuitem" tabindex="0">${iconSvg("arrow-left")}<span>Back</span></div><div class="separator"></div>`
              : "";
          const extra =
            ".instui-menu .-drilldown-back{display:flex;align-items:center;gap:var(--instui-spacing-space-xs)}" +
            ".instui-menu .-drilldown-back svg{inline-size:1em;block-size:1em}";
          root.innerHTML =
            `<style>:host{display:inline-block}${menuCss(I)}${extra}</style>` +
            `<div class="instui-menu" part="drilldown" role="menu">${backRow}${body}</div>`;
          const menu = root.querySelector<HTMLElement>(".instui-menu");
          const hit = (target: EventTarget | null): HTMLElement | null =>
            (target as HTMLElement | null)?.closest<HTMLElement>(
              "[data-goto],[data-back],.-drilldown-back",
            ) ?? null;
          menu?.addEventListener("click", (event) => {
            const item = hit(event.target);
            if (!item) return;
            if (item.hasAttribute("data-back") || item.classList.contains("-drilldown-back")) {
              this.back();
            } else {
              const to = item.getAttribute("data-goto");
              if (to) this.push(to);
            }
          });
          menu?.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              const item = hit(event.target);
              if (item) {
                event.preventDefault();
                item.click();
              }
            } else if (event.key === "Escape" || event.key === "ArrowLeft") {
              this.back();
            }
          });
        }
      },
    );
  }

  // Pages: shows one slotted `[data-page]` panel at a time, swapping with the View Transitions API when
  // available (a plain toggle otherwise). `push(id)`/`back()` keep a history stack; the `active`
  // attribute reflects the current page and can be set to navigate. A `change` event fires per swap.
  if (!registry.get("instui-pages")) {
    registry.define(
      "instui-pages",
      class extends HTMLElement {
        static observedAttributes = ["active"];
        #stack: string[] = [];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (root && !root.querySelector("slot")) {
            root.innerHTML =
              "<style>:host{display:block}::slotted([data-page]){display:block}" +
              "::slotted([data-page][hidden]){display:none}</style><slot></slot>";
            // Drivable from light DOM via Invoker Commands: `<button command="--push" commandfor="pages-id"
            // data-page="…">` and `command="--back" commandfor="pages-id">`.
            onCommand(this, (command, source) => {
              if (command === "--push") {
                const page = source?.getAttribute("data-page");
                if (page) this.push(page);
              } else if (command === "--back") this.back();
            });
          }
          const first =
            this.getAttribute("active") ??
            this.querySelector("[data-page]")?.getAttribute("data-page") ??
            "";
          this.#stack = first ? [first] : [];
          this.#apply();
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          if (name === "active" && value && value !== this.#stack[this.#stack.length - 1]) {
            this.#stack = [value];
            this.#apply();
          }
        }
        #panels(): HTMLElement[] {
          return [...this.querySelectorAll<HTMLElement>("[data-page]")];
        }
        #apply(): void {
          if (!this.isConnected) return;
          const current = this.#stack[this.#stack.length - 1] ?? "";
          const swap = (): void => {
            for (const panel of this.#panels()) {
              panel.hidden = panel.getAttribute("data-page") !== current;
            }
          };
          const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
          if (typeof doc.startViewTransition === "function") doc.startViewTransition(swap);
          else swap();
          this.dispatchEvent(
            new CustomEvent("change", { detail: { page: current }, bubbles: true }),
          );
        }
        push(id: string): void {
          if (!this.#panels().some((panel) => panel.getAttribute("data-page") === id)) return;
          this.#stack.push(id);
          this.setAttribute("active", id);
          this.#apply();
        }
        back(): void {
          if (this.#stack.length <= 1) return;
          this.#stack.pop();
          this.setAttribute("active", this.#stack[this.#stack.length - 1] ?? "");
          this.#apply();
        }
      },
    );
  }

  // DrawerLayout: a side tray + main content in a resizable row. The `open` attribute reveals the tray;
  // `placement` (start|end) picks the side; a drag handle resizes `--drawer-width` (clamped 8–40rem)
  // via pointer capture. Content goes in the default slot; the tray in `slot="tray"`.
  if (!registry.get("instui-drawer-layout")) {
    const DRAWER_CSS =
      ":host{display:block;block-size:100%}" +
      ".layout{display:flex;block-size:100%}" +
      ':host([placement="end"]) .layout{flex-direction:row-reverse}' +
      ".tray{flex:0 0 var(--drawer-width,16rem);inline-size:var(--drawer-width,16rem);overflow:auto;" +
      "background:var(--instui-color-background-elevated-surface-base);" +
      "border-inline:var(--instui-border-width-sm) solid var(--instui-color-stroke-base)}" +
      ":host(:not([open])) .tray,:host(:not([open])) .handle{display:none}" +
      ".handle{flex:0 0 0.375rem;cursor:col-resize;background:var(--instui-color-stroke-base);" +
      "opacity:0;transition:opacity 0.15s ease}" +
      ".handle:hover,.handle.-dragging{opacity:0.4}" +
      ".content{flex:1 1 auto;overflow:auto;min-inline-size:0}";
    registry.define(
      "instui-drawer-layout",
      class extends HTMLElement {
        static observedAttributes = ["open", "placement"];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root || root.querySelector(".layout")) return;
          root.innerHTML =
            `<style>${DRAWER_CSS}</style>` +
            `<div class="layout"><aside class="tray" part="tray"><slot name="tray"></slot></aside>` +
            `<div class="handle" part="handle" role="separator" aria-orientation="vertical"></div>` +
            `<main class="content" part="content"><slot></slot></main></div>`;
          const handle = root.querySelector<HTMLElement>(".handle");
          if (handle) this.#wireResize(handle);
          // Drivable from light DOM via Invoker Commands: `<button command="--toggle|--open|--close"
          // commandfor="drawer-id">`.
          onCommand(this, (command) => {
            if (command === "--toggle") this.toggle();
            else if (command === "--open") this.toggle(true);
            else if (command === "--close") this.toggle(false);
          });
        }
        toggle(force?: boolean): void {
          if (force ?? !this.hasAttribute("open")) this.setAttribute("open", "");
          else this.removeAttribute("open");
        }
        #wireResize(handle: HTMLElement): void {
          const rem = (): number =>
            parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
          let startX = 0;
          let startW = 0;
          const onMove = (event: PointerEvent): void => {
            const dir = this.getAttribute("placement") === "end" ? -1 : 1;
            const next = startW + dir * (event.clientX - startX);
            const px = Math.max(8 * rem(), Math.min(40 * rem(), next));
            this.style.setProperty("--drawer-width", `${String(px)}px`);
          };
          const onUp = (event: PointerEvent): void => {
            handle.classList.remove("-dragging");
            handle.releasePointerCapture(event.pointerId);
            handle.removeEventListener("pointermove", onMove);
            handle.removeEventListener("pointerup", onUp);
          };
          handle.addEventListener("pointerdown", (event) => {
            startX = event.clientX;
            const tray = this.shadowRoot?.querySelector<HTMLElement>(".tray");
            startW = tray?.getBoundingClientRect().width ?? 0;
            handle.classList.add("-dragging");
            handle.setPointerCapture(event.pointerId);
            handle.addEventListener("pointermove", onMove);
            handle.addEventListener("pointerup", onUp);
          });
        }
      },
    );
  }

  // DateInput: a text field plus a calendar dropdown. The trigger toggles a `[popover]` through the
  // built-in `toggle-popover` Invoker Command (a click fallback covers browsers without the API); picking
  // a day in the nested <instui-calendar> fills the field (ISO yyyy-mm-dd), closes the popover, and emits
  // a composed `change`. Typing a valid yyyy-mm-dd and committing (change/Enter) works too.
  if (!registry.get("instui-date-input")) {
    registry.define(
      "instui-date-input",
      class extends HTMLElement {
        static observedAttributes = ["value"];
        #input: HTMLInputElement | null = null;
        #calendar: HTMLElement | null = null;
        #popover: (HTMLElement & { togglePopover?: () => void; hidePopover?: () => void }) | null =
          null;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root || root.querySelector(".field")) return;
          const value = esc(this.getAttribute("value") ?? "");
          const label = esc(this.getAttribute("label") ?? "Date");
          const placeholder = esc(this.getAttribute("placeholder") ?? "yyyy-mm-dd");
          const styles =
            ":host{display:inline-block}" +
            ".field{position:relative;display:inline-flex}" +
            ".field{anchor-name:--datefield}" +
            ".field .instui-text-input{padding-inline-end:2.25rem}" +
            ".trigger{position:absolute;inset-inline-end:0.25rem;inset-block:50%;translate:0 -50%}" +
            ".trigger svg{inline-size:1em;block-size:1em}" +
            ".dropdown{position-anchor:--datefield;position-area:bottom span-inline-end;" +
            "margin-block:0.25rem 0;border:var(--instui-border-width-sm) solid var(--instui-color-stroke-base);" +
            "border-radius:var(--instui-border-radius-md);padding:var(--instui-spacing-space-sm);" +
            "background:var(--instui-color-background-elevated-surface-base)}";
          root.innerHTML =
            `<style>${textInputCss(I)}${buttonCss(I)}${styles}</style>` +
            `<div class="field">` +
            `<input class="instui-text-input" type="text" part="input" aria-label="${label}" placeholder="${placeholder}" value="${value}" />` +
            `<button type="button" class="instui-button -color-tertiary -shape-square trigger" command="toggle-popover" commandfor="datepop" aria-label="Open calendar">${iconSvg("calendar")}</button>` +
            `</div>` +
            `<div popover id="datepop" class="dropdown" part="dropdown"><${tag("calendar")} value="${value}"></${tag("calendar")}></div>`;
          this.#input = root.querySelector("input");
          this.#calendar = root.querySelector(tag("calendar"));
          this.#popover = root.getElementById("datepop");
          if (!INVOKER_SUPPORTED) {
            root
              .querySelector(".trigger")
              ?.addEventListener("click", () => this.#popover?.togglePopover?.());
          }
          // A day picked in the nested calendar commits and closes the popover.
          const calendarTag = tag("calendar").toUpperCase();
          root.addEventListener("change", (event) => {
            if ((event.target as HTMLElement).tagName !== calendarTag) return;
            event.stopPropagation();
            this.#commit((event as CustomEvent<{ value: string }>).detail.value);
            this.#popover?.hidePopover?.();
          });
          // Manual typing: commit an empty or valid yyyy-mm-dd on change.
          this.#input?.addEventListener("change", () => {
            const typed = this.#input?.value.trim() ?? "";
            if (typed === "" || parseIsoDate(typed)) this.#commit(typed);
          });
        }
        #commit(value: string): void {
          if (this.#input) this.#input.value = value;
          if (value) this.#calendar?.setAttribute("value", value);
          else this.#calendar?.removeAttribute("value");
          if (this.getAttribute("value") !== value) this.setAttribute("value", value);
          this.dispatchEvent(
            new CustomEvent("change", { detail: { value }, bubbles: true, composed: true }),
          );
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          if (name !== "value" || !this.#input) return;
          const next = value ?? "";
          if (this.#input.value !== next && this.shadowRoot?.activeElement !== this.#input) {
            this.#input.value = next;
            if (next) this.#calendar?.setAttribute("value", next);
          }
        }
      },
    );
  }

  // DateTimeInput: a DateInput plus a native time field. A change to either recomputes a combined
  // `yyyy-mm-ddThh:mm` value and emits a composed `change`.
  if (!registry.get("instui-date-time-input")) {
    registry.define(
      "instui-date-time-input",
      class extends HTMLElement {
        static observedAttributes = ["value"];
        #date: HTMLElement | null = null;
        #time: HTMLInputElement | null = null;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root || root.querySelector(".dt")) return;
          const [datePart = "", timePart = ""] = (this.getAttribute("value") ?? "").split("T");
          const styles =
            ":host{display:inline-block}" +
            ".dt{display:inline-flex;gap:var(--instui-spacing-space-sm);align-items:center}";
          root.innerHTML =
            `<style>${textInputCss(I)}${styles}</style>` +
            `<div class="dt">` +
            `<${tag("date-input")} value="${esc(datePart)}"></${tag("date-input")}>` +
            `<input class="instui-text-input" type="time" part="time" aria-label="Time" value="${esc(timePart)}" />` +
            `</div>`;
          this.#date = root.querySelector(tag("date-input"));
          this.#time = root.querySelector('input[type="time"]');
          root.addEventListener("change", (event) => {
            if (event.target === this.#date || event.target === this.#time) {
              event.stopPropagation();
              this.#recompute();
            }
          });
        }
        #recompute(): void {
          const date = this.#date?.getAttribute("value") ?? "";
          const time = this.#time?.value ?? "";
          const value = date && time ? `${date}T${time}` : date;
          if (this.getAttribute("value") !== value) this.setAttribute("value", value);
          this.dispatchEvent(
            new CustomEvent("change", { detail: { value }, bubbles: true, composed: true }),
          );
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          if (name !== "value" || !this.#date || !this.#time) return;
          const [datePart = "", timePart = ""] = (value ?? "").split("T");
          if (this.#date.getAttribute("value") !== datePart)
            this.#date.setAttribute("value", datePart);
          if (this.#time.value !== timePart) this.#time.value = timePart;
        }
      },
    );
  }
}

// Auto-register in the browser; a no-op everywhere else.
register();
