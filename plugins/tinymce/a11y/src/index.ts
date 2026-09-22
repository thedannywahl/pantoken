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

/** Configuration passed to every accessibility rule. */
export interface A11yCheckConfig {
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
const A11Y_STATUSBAR_ICON_PATH =
  "M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm8 7h-5v12c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-5c0-.6-.4-1-1-1a1 1 0 0 0-1 1v5c0 .6-.4 1-1 1a1 1 0 0 1-1-1V9H4a1 1 0 1 1 0-2h16c.6 0 1 .4 1 1s-.4 1-1 1Z";

function createA11yRules(strings: A11yStrings): readonly A11yRule[] {
  const imageAltRule: A11yRule = {
    id: "img-alt",
    message: strings.a11yImageAltMessage,
    why: strings.a11yImageAltWhy,
    link: "https://www.w3.org/WAI/tutorials/images/",
    appliesTo: (element) => element.tagName.toLowerCase() === "img",
    test: (element) => element.hasAttribute("alt"),
  };

  const imageAltFilenameRule: A11yRule = {
    id: "img-alt-filename",
    message: strings.a11yImageAltFilenameMessage,
    why: strings.a11yImageAltFilenameWhy,
    link: "https://www.w3.org/WAI/tutorials/images/informative/",
    appliesTo: (element) => element.tagName.toLowerCase() === "img",
    test: (element) => {
      const alt = element.getAttribute("alt")?.trim().toLowerCase();
      const source = element.getAttribute("src")?.split("/").pop()?.split("?")[0]?.toLowerCase();
      return !alt || !source || alt !== source.replace(/\.[a-z\d]+$/u, "");
    },
  };

  const imageAltLengthRule: A11yRule = {
    id: "img-alt-length",
    message: strings.a11yImageAltLengthMessage,
    why: strings.a11yImageAltLengthWhy,
    link: "https://www.w3.org/WAI/tutorials/images/informative/",
    appliesTo: (element) => element.tagName.toLowerCase() === "img",
    test: (element) => (element.getAttribute("alt")?.length ?? 0) <= 125,
  };

  const headingSequenceRule: A11yRule = {
    id: "headings-sequence",
    message: strings.a11yHeadingSequenceMessage,
    why: strings.a11yHeadingSequenceWhy,
    link: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
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
  const rules = options.rules ?? A11Y_RULES;
  const config = options.config ?? {};
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
  editor.windowManager.open({
    title: strings.a11yDialogTitle,
    body: {
      type: "panel",
      items: [
        {
          type: "selectbox",
          name: "issue",
          label: formatA11yString(strings.a11yIssueCount, { count: issues.length }),
          items,
        },
      ],
    },
    initialData: { issue: "0" },
    buttons: [{ type: "cancel", text: strings.a11yCloseButton }],
    onChange: (api, details) => {
      if (details.name !== "issue") return;
      const index = Number(api.getData().issue);
      const issue = issues[index];
      if (issue) focusIssue(issue);
    },
  });
}

/** Build the TinyMCE plugin callback for the accessibility checker. */
export function createA11yPlugin(
  options: A11yPluginOptions = {},
): (editor: Editor) => A11yPluginApi {
  return function pantokenA11yPlugin(editor: Editor): A11yPluginApi {
    const strings: A11yStrings = { ...A11Y_STRINGS, ...options.strings };
    const rules = createA11yRules(strings);
    const display = options.display ?? "toolbar";
    const hasToolbar = display === "toolbar" || display === "both";
    const hasFooter = display === "footer" || display === "both";
    const runCheck = async (
      checkOptions: A11yCheckOptions = {},
      done?: (issues: readonly A11yIssue[]) => void,
    ): Promise<readonly A11yIssue[]> => {
      const issues = await scanAccessibility(editor.getBody(), {
        ...options,
        ...checkOptions,
        rules: checkOptions.rules ?? rules,
        config: { ...options.config, ...checkOptions.config },
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
