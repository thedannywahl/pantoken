import type { Editor } from "tinymce";
import { A11Y_STRINGS, formatA11yString, type A11yStrings } from "./strings.js";

/** The plugin name used in TinyMCE's `plugins` option. */
export const A11Y_PLUGIN_NAME = "pantoken_a11y";
/** The control name used in TinyMCE's `toolbar` option. */
export const A11Y_TOOLBAR_NAME = "pantokenA11y";
/** The control name used in TinyMCE's statusbar. */
export const A11Y_STATUSBAR_NAME = "pantokenA11yStatus";
/** The command used to scan the current editor content. */
export const A11Y_COMMAND = "pantokenCheckAccessibility";

/** Locations where the checker UI can be registered. */
export type A11yDisplay = "toolbar" | "footer" | "both" | "none";

/** Supported contrast thresholds for the checker. */
export type A11yContrastThreshold = "3:1" | "4.5:1";

/** Persisted settings owned by the accessibility checker. */
export interface A11yPersistedSettings {
  highlightIssues?: boolean;
  contrastThreshold?: A11yContrastThreshold;
  enabledRules?: Record<string, boolean>;
}

/** Configuration passed to every accessibility rule. */
export interface A11yCheckConfig extends A11yPersistedSettings {
  /** Disable the contrast rules when the editor's content styles are unavailable. */
  disableContrastCheck?: boolean;
  readonly [key: string]: unknown;
}

/** Context available to a rule while checking an element. */
export interface A11yRuleContext {
  readonly root: Element;
  readonly config: Readonly<A11yCheckConfig>;
}

/** A rule that returns true when an element passes the check. */
export interface A11yRule {
  readonly id: string;
  readonly message: string;
  readonly why?: string;
  readonly link?: string;
  readonly enabledByDefault?: boolean;
  appliesTo(element: Element): boolean;
  test(element: Element, context: A11yRuleContext): boolean | Promise<boolean>;
  fix?(element: Element, context: A11yRuleContext): void | Promise<void>;
}

/** A failed rule and the editor element that caused it. */
export interface A11yIssue {
  readonly element: Element;
  readonly rule: A11yRule;
}

/** Options accepted by {@link scanAccessibility}. */
export interface A11yCheckOptions {
  readonly config?: A11yCheckConfig;
  readonly rules?: readonly A11yRule[];
  readonly batchSize?: number;
}

/** Options accepted by {@link createA11yPlugin}. */
export interface A11yPluginOptions extends A11yCheckOptions {
  /** Locations where checker controls are registered. Defaults to `"toolbar"`. */
  readonly display?: A11yDisplay;
  readonly strings?: Partial<A11yStrings>;
}

/** Public API returned when the plugin callback is invoked by TinyMCE. */
export interface A11yPluginApi {
  readonly check: (
    options?: A11yCheckOptions,
    done?: (issues: readonly A11yIssue[]) => void,
  ) => Promise<readonly A11yIssue[]>;
}

const DEFAULT_BATCH_SIZE = 25;
const STATUSBAR_SCAN_DELAY_MS = 400;
const A11Y_STORAGE_KEY = "pantoken-tinymce-a11y-settings";
const SHARED_EDITOR_PREFERENCES_KEY = "pantoken-canvas-theme-editor-preferences";
const A11Y_HIGHLIGHT_CLASS = "pantoken-a11y-highlight";
const A11Y_HIGHLIGHT_STYLE_ID = "pantoken-a11y-highlight-style";
const A11Y_HIGHLIGHT_CSS = `
  .${A11Y_HIGHLIGHT_CLASS} {
    outline: 0.125rem solid var(--pantoken-visual-debug-color, #d81b60) !important;
    box-shadow: 0 0 0 0.125rem rgba(216, 27, 96, 0.28) !important;
    background-color: rgba(216, 27, 96, 0.04) !important;
  }
`;
const A11Y_STATUSBAR_ICON_PATH =
  "M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm8 7h-5v12c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-5c0-.6-.4-1-1-1a1 1 0 0 0-1 1v5c0 .6-.4 1-1 1a1 1 0 0 1-1-1V9H4a1 1 0 1 1 0-2h16c.6 0 1 .4 1 1s-.4 1-1 1Z";
const DEFAULT_A11Y_PERSISTED_SETTINGS: Required<A11yPersistedSettings> = {
  highlightIssues: true,
  contrastThreshold: "4.5:1",
  enabledRules: {},
};

function parseColorChannel(value: string): number {
  const numeric = Number.parseInt(value, 10);
  return Number.isNaN(numeric) ? 0 : numeric;
}

function normalizeRgbInput(input: string): string {
  return input.trim().toLowerCase();
}

function parseCssColor(rawColor: string | null): [number, number, number] | null {
  if (!rawColor) return null;
  const value = normalizeRgbInput(rawColor);
  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/iu);
  if (hexMatch) {
    const hex = hexMatch[1];
    const expanded =
      hex.length === 3
        ? hex
            .split("")
            .map((digit) => digit + digit)
            .join("")
        : hex;
    return [
      parseColorChannel(`0x${expanded.slice(0, 2)}`),
      parseColorChannel(`0x${expanded.slice(2, 4)}`),
      parseColorChannel(`0x${expanded.slice(4, 6)}`),
    ];
  }

  const rgbMatch = value.match(/^rgba?\(([^)]+)\)$/iu);
  if (rgbMatch) {
    const channels = rgbMatch[1].split(",").map((part) => part.trim());
    if (channels.length < 3) return null;
    return [
      parseColorChannel(channels[0]),
      parseColorChannel(channels[1]),
      parseColorChannel(channels[2]),
    ];
  }

  return null;
}

function relativeLuminance(color: [number, number, number]): number {
  const [r, g, b] = color.map((channel) => {
    const adjusted = channel / 255;
    return adjusted <= 0.03928 ? adjusted / 12.92 : ((adjusted + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(colorA: string | null, colorB: string | null): number {
  const a = parseCssColor(colorA);
  const b = parseCssColor(colorB);
  if (!a || !b) return Number.POSITIVE_INFINITY;
  const luminanceA = relativeLuminance(a);
  const luminanceB = relativeLuminance(b);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Merge and persist accessibility settings to `localStorage`, mirroring them into the shared editor preferences key. */
export function savePersistedA11ySettings(settings: Partial<A11yPersistedSettings>): void {
  try {
    const current = loadPersistedA11ySettings();
    const merged = { ...current, ...settings };
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(merged));

    const sharedRaw = localStorage.getItem(SHARED_EDITOR_PREFERENCES_KEY);
    const shared = sharedRaw ? JSON.parse(sharedRaw) : {};
    if (shared && typeof shared === "object") {
      const nextShared = {
        ...shared,
        tinymceConfig: {
          ...(shared as { tinymceConfig?: Record<string, unknown> }).tinymceConfig,
          a11y: merged,
        },
      };
      localStorage.setItem(SHARED_EDITOR_PREFERENCES_KEY, JSON.stringify(nextShared));
    }
  } catch {
    // Storage may be unavailable in some browsers or private browsing mode.
  }
}

/** Read persisted accessibility settings, falling back to the shared editor preferences key. */
export function loadPersistedA11ySettings(): Partial<A11yPersistedSettings> {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) {
      const sharedRaw = localStorage.getItem(SHARED_EDITOR_PREFERENCES_KEY);
      if (!sharedRaw) return {};
      const shared = JSON.parse(sharedRaw) as {
        tinymceConfig?: { a11y?: Partial<A11yPersistedSettings> };
      };
      return shared.tinymceConfig?.a11y ?? {};
    }
    const parsed: unknown = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Partial<A11yPersistedSettings>)
      : {};
  } catch {
    return {};
  }
}

function isRuleEnabled(rule: A11yRule, config: Readonly<A11yCheckConfig> | undefined): boolean {
  const enabledRules = config?.enabledRules;
  if (enabledRules && Object.hasOwn(enabledRules, rule.id)) return Boolean(enabledRules[rule.id]);
  if (config?.disableContrastCheck && rule.id === "contrast") return false;
  return rule.enabledByDefault !== false;
}

function getContrastThreshold(config: Readonly<A11yCheckConfig> | undefined): number {
  return (config?.contrastThreshold ?? DEFAULT_A11Y_PERSISTED_SETTINGS.contrastThreshold) === "3:1"
    ? 3
    : 4.5;
}

function createA11yRules(strings: A11yStrings): readonly A11yRule[] {
  const contrastRule: A11yRule = {
    id: "contrast",
    message: "Text and interactive elements should meet the minimum contrast ratio.",
    why: "Low contrast makes text difficult to read for people with low vision and other visual impairments.",
    link: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    enabledByDefault: true,
    appliesTo: (element) => {
      if (!(element instanceof HTMLElement)) return false;
      if (element.closest("img, svg, canvas, video, object, embed")) return false;
      const text = element.textContent?.trim() ?? "";
      if (text.length === 0) return false;
      const style = window.getComputedStyle(element);
      const color = element.style.color || style.color;
      const bg = element.style.backgroundColor || style.backgroundColor;
      return color !== "" && bg !== "" && color !== "rgba(0, 0, 0, 0)" && bg !== "rgba(0, 0, 0, 0)";
    },
    test: (element, context) => {
      if (!(element instanceof HTMLElement)) return true;
      const threshold = getContrastThreshold(context.config);
      const style = window.getComputedStyle(element);
      const color = element.style.color || style.color;
      const bg = element.style.backgroundColor || style.backgroundColor;
      const ratio = contrastRatio(color, bg);
      return ratio >= threshold;
    },
  };

  const imageAltRule: A11yRule = {
    id: "img-alt",
    message: strings.a11yImageAltMessage,
    why: strings.a11yImageAltWhy,
    link: "https://www.w3.org/WAI/tutorials/images/",
    enabledByDefault: true,
    appliesTo: (element) => element.tagName.toLowerCase() === "img",
    test: (element) => element.hasAttribute("alt"),
    fix: (element) => {
      const src = element.getAttribute("src") ?? "image";
      const name = src.split("/").pop()?.split("?")[0] ?? "image";
      const alt = name.replace(/\.[a-z0-9]+$/iu, "") || "image";
      element.setAttribute("alt", alt);
    },
  };

  const imageAltFilenameRule: A11yRule = {
    id: "img-alt-filename",
    message: strings.a11yImageAltFilenameMessage,
    why: strings.a11yImageAltFilenameWhy,
    link: "https://www.w3.org/WAI/tutorials/images/informative/",
    enabledByDefault: true,
    appliesTo: (element) => element.tagName.toLowerCase() === "img",
    test: (element) => {
      const alt = element.getAttribute("alt")?.trim().toLowerCase();
      const source = element.getAttribute("src")?.split("/").pop()?.split("?")[0]?.toLowerCase();
      return !alt || !source || alt !== source.replace(/\.[a-z\d]+$/u, "");
    },
    fix: (element) => {
      const source = element.getAttribute("src")?.split("/").pop()?.split("?")[0] ?? "image";
      const alt = source.replace(/\.[a-z0-9]+$/iu, "") || "image";
      element.setAttribute("alt", alt);
    },
  };

  const imageAltLengthRule: A11yRule = {
    id: "img-alt-length",
    message: strings.a11yImageAltLengthMessage,
    why: strings.a11yImageAltLengthWhy,
    link: "https://www.w3.org/WAI/tutorials/images/informative/",
    enabledByDefault: true,
    appliesTo: (element) => element.tagName.toLowerCase() === "img",
    test: (element) => (element.getAttribute("alt")?.length ?? 0) <= 125,
  };

  const headingSequenceRule: A11yRule = {
    id: "headings-sequence",
    message: strings.a11yHeadingSequenceMessage,
    why: strings.a11yHeadingSequenceWhy,
    link: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
    enabledByDefault: true,
    appliesTo: (element) => /^H[1-6]$/u.test(element.tagName),
    test: (element, context) => {
      const headings = Array.from(context.root.querySelectorAll("h1, h2, h3, h4, h5, h6"));
      const index = headings.indexOf(element);
      if (index <= 0) return true;
      const previousLevel = Number(headings[index - 1]?.tagName.slice(1));
      const currentLevel = Number(element.tagName.slice(1));
      return currentLevel <= previousLevel + 1;
    },
  };

  const tableHeaderRule: A11yRule = {
    id: "table-header",
    message: strings.a11yTableHeaderMessage,
    why: strings.a11yTableHeaderWhy,
    link: "https://www.w3.org/WAI/tutorials/tables/one-header/",
    enabledByDefault: true,
    appliesTo: (element) => element.tagName.toLowerCase() === "table",
    test: (element) => element.querySelector("th") !== null,
  };

  const tableCaptionRule: A11yRule = {
    id: "table-caption",
    message: strings.a11yTableCaptionMessage,
    why: strings.a11yTableCaptionWhy,
    link: "https://www.w3.org/WAI/tutorials/tables/caption-summary/",
    appliesTo: (element) => element.tagName.toLowerCase() === "table",
    test: (element) => element.querySelector("caption") !== null,
  };

  const tableHeaderScopeRule: A11yRule = {
    id: "table-header-scope",
    message: strings.a11yTableHeaderScopeMessage,
    why: strings.a11yTableHeaderScopeWhy,
    link: "https://www.w3.org/WAI/tutorials/tables/two-headers/",
    appliesTo: (element) => element.tagName.toLowerCase() === "table",
    test: (element) =>
      Array.from(element.querySelectorAll("th")).every((header) => header.hasAttribute("scope")),
  };

  const adjacentLinksRule: A11yRule = {
    id: "adjacent-links",
    message: strings.a11yAdjacentLinksMessage,
    why: strings.a11yAdjacentLinksWhy,
    link: "https://www.w3.org/WAI/WCAG21/Techniques/general/G91",
    appliesTo: (element) => element.tagName.toLowerCase() === "a",
    test: (element) => {
      const next = element.nextElementSibling;
      return !(
        next?.tagName.toLowerCase() === "a" &&
        next.getAttribute("href") === element.getAttribute("href")
      );
    },
  };

  const headingStartRule: A11yRule = {
    id: "headings-start-at-h2",
    message: strings.a11yHeadingStartMessage,
    why: strings.a11yHeadingStartWhy,
    link: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
    appliesTo: (element) => /^H[1-6]$/u.test(element.tagName),
    test: (element, context) => {
      const firstHeading = context.root.querySelector("h1, h2, h3, h4, h5, h6");
      return firstHeading !== element || element.tagName === "H2";
    },
  };

  const listStructureRule: A11yRule = {
    id: "list-structure",
    message: strings.a11yListStructureMessage,
    why: strings.a11yListStructureWhy,
    link: "https://www.w3.org/WAI/tutorials/page-structure/content/",
    appliesTo: (element) => element.tagName.toLowerCase() === "li",
    test: (element) => {
      const parent = element.parentElement?.tagName.toLowerCase();
      return parent === "ol" || parent === "ul";
    },
  };

  return [
    contrastRule,
    imageAltRule,
    imageAltFilenameRule,
    imageAltLengthRule,
    headingSequenceRule,
    headingStartRule,
    tableHeaderRule,
    tableCaptionRule,
    tableHeaderScopeRule,
    adjacentLinksRule,
    listStructureRule,
  ];
}

/** The built-in rules shipped by the initial checker implementation. */
export const A11Y_RULES: readonly A11yRule[] = createA11yRules(A11Y_STRINGS);

function isIgnored(element: Element): boolean {
  return element.closest("[data-ignore-a11y-check]") !== null;
}

function elementsIn(root: Element): Element[] {
  return [root, ...Array.from(root.querySelectorAll("*"))];
}

function nextBatch(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/** Scan an editor body and return failed accessibility rules in document order. */
export async function scanAccessibility(
  root: Element,
  options: A11yCheckOptions = {},
): Promise<A11yIssue[]> {
  const rules = (options.rules ?? A11Y_RULES).filter((rule) => isRuleEnabled(rule, options.config));
  const config = {
    ...DEFAULT_A11Y_PERSISTED_SETTINGS,
    ...loadPersistedA11ySettings(),
    ...options.config,
  };
  const batchSize = Math.max(1, options.batchSize ?? DEFAULT_BATCH_SIZE);
  const issues: A11yIssue[] = [];
  const context: A11yRuleContext = { root, config };
  const elements = elementsIn(root);

  for (let index = 0; index < elements.length; index += batchSize) {
    const batch = elements.slice(index, index + batchSize);
    await Promise.all(
      batch.flatMap((element) => {
        if (isIgnored(element)) return [];
        return rules
          .filter((rule) => rule.appliesTo(element))
          .map(async (rule) => {
            if (!(await rule.test(element, context))) issues.push({ element, rule });
          });
      }),
    );
    if (index + batchSize < elements.length) await nextBatch();
  }

  return issues;
}

function focusIssue(issue: A11yIssue): void {
  issue.element.scrollIntoView({ block: "center" });
  issue.element.classList.add("pantoken-a11y-focus");
  setTimeout(() => issue.element.classList.remove("pantoken-a11y-focus"), 1500);
}

function ensureA11yHighlightStyles(): void {
  const doc = document;
  if (doc.getElementById(A11Y_HIGHLIGHT_STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = A11Y_HIGHLIGHT_STYLE_ID;
  style.textContent = A11Y_HIGHLIGHT_CSS;
  doc.head.append(style);
}

function applyIssueHighlights(issues: readonly A11yIssue[], enabled: boolean): void {
  const allHighlights = document.querySelectorAll(`.${A11Y_HIGHLIGHT_CLASS}`);
  allHighlights.forEach((element) => element.classList.remove(A11Y_HIGHLIGHT_CLASS));
  if (!enabled) return;
  ensureA11yHighlightStyles();
  issues.forEach((issue) => {
    issue.element.classList.add(A11Y_HIGHLIGHT_CLASS);
  });
}

function openResultsDialog(
  editor: Editor,
  issues: readonly A11yIssue[],
  strings: A11yStrings,
): void {
  if (issues.length === 0) {
    editor.windowManager.alert(strings.a11yNoIssues);
    return;
  }

  const items = issues.map((issue, index) => ({
    value: String(index),
    text: `${strings.a11yIssueLabel} ${index + 1}: ${issue.rule.message}`,
  }));
  const persisted = loadPersistedA11ySettings();
  const settings = {
    highlightIssues: persisted.highlightIssues ?? true,
    contrastThreshold: persisted.contrastThreshold ?? "4.5:1",
  };
  const runtimeConfig: A11yCheckConfig = {
    ...DEFAULT_A11Y_PERSISTED_SETTINGS,
    ...persisted,
    contrastThreshold: settings.contrastThreshold,
    highlightIssues: settings.highlightIssues,
  };
  const issueRuleState = A11Y_RULES.reduce<Record<string, boolean>>((accumulator, rule) => {
    accumulator[rule.id] = isRuleEnabled(rule, runtimeConfig);
    return accumulator;
  }, {});
  const fixIssue = async (selectedIssue: A11yIssue | undefined): Promise<void> => {
    if (!selectedIssue || !selectedIssue.rule.fix) return;
    await selectedIssue.rule.fix(selectedIssue.element, {
      root: editor.getBody(),
      config: runtimeConfig,
    });
    applyIssueHighlights(issues, settings.highlightIssues);
  };
  applyIssueHighlights(issues, settings.highlightIssues);
  editor.windowManager.open({
    title: strings.a11yDialogTitle,
    body: {
      type: "tabpanel",
      tabs: [
        {
          name: "findings",
          title: "Findings",
          items: [
            {
              type: "selectbox",
              name: "issue",
              label: formatA11yString(strings.a11yIssueCount, { count: issues.length }),
              items,
            },
            {
              type: "button",
              name: "fixIssue",
              text: "Fix issue",
              enabled: issues[0]?.rule.fix !== undefined,
            },
          ],
        },
        {
          name: "settings",
          title: "Settings",
          items: [
            {
              type: "checkbox",
              name: "highlightIssues",
              label: "Highlight accessibility issues",
            },
            {
              type: "selectbox",
              name: "contrastThreshold",
              label: "Minimum contrast ratio",
              items: [
                { value: "4.5:1", text: "4.5:1 (WCAG 2.2 default)" },
                { value: "3:1", text: "3:1 (large text / UI alternative)" },
              ],
            },
            ...A11Y_RULES.map((rule) => ({
              type: "checkbox" as const,
              name: rule.id,
              label: rule.message,
            })),
          ],
        },
      ],
    },
    initialData: {
      issue: "0",
      highlightIssues: settings.highlightIssues,
      contrastThreshold: settings.contrastThreshold,
      ...issueRuleState,
    },
    buttons: [{ type: "cancel", text: strings.a11yCloseButton }],
    onAction: (api, details) => {
      if (details.name === "fixIssue") {
        const index = Number(api.getData().issue);
        void fixIssue(issues[index]);
      }
    },
    onChange: (api, details) => {
      if (details.name === "issue") {
        const index = Number(api.getData().issue);
        const issue = issues[index];
        if (issue) focusIssue(issue);
      }
      if (details.name === "highlightIssues" || details.name === "contrastThreshold") {
        const nextSettings = {
          highlightIssues: api.getData().highlightIssues,
          contrastThreshold: api.getData().contrastThreshold,
        };
        savePersistedA11ySettings(nextSettings);
        applyIssueHighlights(issues, Boolean(nextSettings.highlightIssues));
      }
      if (A11Y_RULES.some((rule) => rule.id === details.name)) {
        const updatedValue = api.getData()[details.name];
        const nextState = {
          ...issueRuleState,
          [details.name]: Boolean(updatedValue),
        };
        Object.assign(issueRuleState, nextState);
        savePersistedA11ySettings({ enabledRules: nextState });
      }
    },
    onClose: () => {
      const allHighlights = document.querySelectorAll(`.${A11Y_HIGHLIGHT_CLASS}`);
      allHighlights.forEach((element) => element.classList.remove(A11Y_HIGHLIGHT_CLASS));
    },
  });
}

/** Build the TinyMCE plugin callback for the accessibility checker. */
export function createA11yPlugin(
  options: A11yPluginOptions = {},
): (editor: Editor) => A11yPluginApi {
  return function pantokenA11yPlugin(editor: Editor): A11yPluginApi {
    const strings: A11yStrings = { ...A11Y_STRINGS, ...options.strings };
    const storedSettings = loadPersistedA11ySettings();
    const rules = createA11yRules(strings);
    const display = options.display ?? "toolbar";
    const hasToolbar = display === "toolbar" || display === "both";
    const hasFooter = display === "footer" || display === "both";
    const runCheck = async (
      checkOptions: A11yCheckOptions = {},
      done?: (issues: readonly A11yIssue[]) => void,
    ): Promise<readonly A11yIssue[]> => {
      const config = {
        ...DEFAULT_A11Y_PERSISTED_SETTINGS,
        ...storedSettings,
        ...options.config,
        ...checkOptions.config,
      };
      const issues = await scanAccessibility(editor.getBody(), {
        ...options,
        ...checkOptions,
        rules: checkOptions.rules ?? rules,
        config,
      });
      done?.(issues);
      return issues;
    };
    const openDialog = (): void => {
      void runCheck().then((issues) => openResultsDialog(editor, issues, strings));
    };

    editor.addCommand(A11Y_COMMAND, (_ui, value?: unknown) => {
      const command = (value ?? {}) as A11yCheckOptions & {
        done?: (issues: readonly A11yIssue[]) => void;
      };
      void runCheck(command, command.done);
    });
    if (hasToolbar) {
      editor.ui.registry.addButton(A11Y_TOOLBAR_NAME, {
        icon: "accessibility-check",
        tooltip: strings.a11yToolbarTooltip,
        onAction: openDialog,
      });
      editor.ui.registry.addMenuItem(A11Y_TOOLBAR_NAME, {
        text: strings.a11yMenuText,
        icon: "accessibility-check",
        onAction: openDialog,
      });
    }
    if (hasFooter) {
      let button: HTMLButtonElement | undefined;
      let count: HTMLSpanElement | undefined;
      let scanTimer: ReturnType<typeof setTimeout> | undefined;
      let scanGeneration = 0;
      const scheduleScan = (): void => {
        if (scanTimer) clearTimeout(scanTimer);
        const generation = ++scanGeneration;
        scanTimer = setTimeout(() => {
          void runCheck().then((issues) => {
            if (generation !== scanGeneration || !button) return;
            button.hidden = false;
            const label = formatA11yString(strings.a11yStatusbarIssueCount, {
              count: issues.length,
            });
            button.setAttribute("aria-label", label);
            count!.textContent = String(issues.length);
            count!.style.backgroundColor = issues.length === 0 ? "#008000" : "#c00";
          });
        }, STATUSBAR_SCAN_DELAY_MS);
      };
      const attachFooter = (): void => {
        if (button) return;
        const footer = editor
          .getContainer()
          .querySelector<HTMLElement>(".tox-statusbar__text-container");
        if (!footer) return;

        button = document.createElement("button");
        button.id = A11Y_STATUSBAR_NAME;
        button.type = "button";
        button.className = "tox-statusbar__wordcount";
        button.title = strings.a11yToolbarTooltip;
        button.hidden = true;
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("width", "16");
        icon.setAttribute("height", "16");
        // Other toolbar/statusbar icons inherit the button's (scheme-aware) text color the same
        // way — without this the SVG default fill (black) stays black in dark mode while every
        // other icon swaps.
        icon.setAttribute("fill", "currentColor");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", A11Y_STATUSBAR_ICON_PATH);
        path.setAttribute("fill-rule", "nonzero");
        icon.append(path);
        count = document.createElement("span");
        count.className = "pantoken-a11y-statusbar-count";
        count.setAttribute("aria-hidden", "true");
        count.style.cssText =
          "align-items:center;background:#c00;border-radius:999px;color:#fff;display:inline-flex;font-size:10px;font-weight:700;justify-content:center;line-height:1;min-width:1.25em;padding:0.15em 0.35em;";
        button.append(icon, count);
        button.addEventListener("click", openDialog);
        // Prepended so a11y always leads the footer, ahead of the native wordcount item.
        footer.prepend(button);
        editor.on("SetContent change", scheduleScan);
        scheduleScan();
      };
      const detachFooter = (): void => {
        if (scanTimer) clearTimeout(scanTimer);
        scanGeneration += 1;
        editor.off("SetContent change", scheduleScan);
        editor.off("PostRender", attachFooter);
        button?.removeEventListener("click", openDialog);
        button?.remove();
        button = undefined;
        count = undefined;
      };

      editor.on("PostRender", attachFooter);
      editor.on("remove", detachFooter);
    }

    return { check: runCheck };
  };
}

export { A11Y_STRINGS, type A11yStrings } from "./strings.js";
