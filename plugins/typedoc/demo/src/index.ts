/**
 * `@pantoken/typedoc-plugin-demo` — a TypeDoc plugin for the `@demo` block tag.
 *
 * Authors attach a live, embeddable demo to any symbol with `@demo <spec>`, where `<spec>` is either
 * a bare URL or a `<provider>:<ref>` pair (for example `stackblitz:abc123`, `codesandbox:xy12z`,
 * `wp-playground:https://…/blueprint.json`, or `self:button`). This plugin registers nothing about
 * providers itself — it stays deliberately dumb and reusable: it moves each `@demo` tag's spec into
 * a fenced ```demo``` block appended to the symbol's summary, and your docs renderer decides how to
 * turn a spec into an iframe. (See `@pantoken/demo` for a renderer that resolves the providers.)
 *
 * The fence rides through markdown untouched — including any translation pipeline that preserves
 * code blocks — so the demo survives localization.
 *
 * **Setup:** add `"@demo"` to TypeDoc's `blockTags` option. The comment parser reads that list before
 * plugins load, so a plugin can't register the tag late enough to suppress the "unknown block tag"
 * warning; it must be in your `typedoc.json`.
 *
 * @example
 * ```jsonc
 * // typedoc.json
 * {
 *   "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
 *   "blockTags": ["@param", "@returns", "@example", "@demo"]
 * }
 * ```
 *
 * @module
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Converter, RendererEvent } from "typedoc";
import type {
  Application,
  Comment,
  CommentDisplayPart,
  Context,
  DeclarationReflection,
  Reflection,
} from "typedoc";

interface SidebarItem {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
}

interface ModuleTarget {
  link: string;
  title: string;
}

/** The block tag this plugin consumes. Register it in TypeDoc's `blockTags` so it won't warn. */
export const DEMO_TAG = "@demo";

/** The fenced-code language the demo spec is emitted under — target it in your renderer. */
export const DEMO_FENCE = "demo";

/**
 * Wrap one demo spec in a fenced ```demo``` block.
 *
 * @param spec - A demo spec: a bare URL or a `<provider>:<ref>` pair.
 * @returns The fenced code block as a string.
 *
 * @example
 * ```ts
 * import { toDemoFence } from "@pantoken/typedoc-plugin-demo";
 *
 * toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
 * ```
 */
export function toDemoFence(spec: string): string {
  return `\`\`\`${DEMO_FENCE}\n${spec}\n\`\`\``;
}

/** Yield every comment attached to a reflection (its own, plus signature/accessor comments). */
function* commentsOf(reflection: Reflection): Generator<Comment> {
  if (reflection.comment) yield reflection.comment;
  const declaration = reflection as DeclarationReflection;
  for (const signature of declaration.signatures ?? []) {
    if (signature.comment) yield signature.comment;
  }
  if (declaration.getSignature?.comment) yield declaration.getSignature.comment;
  if (declaration.setSignature?.comment) yield declaration.setSignature.comment;
}

/**
 * Move every `@demo` block tag on a comment into ```demo``` fences appended to its summary, in order.
 * Block-tag content gets re-fenced by the markdown theme, so the fence must live in the summary
 * prose, which is emitted verbatim.
 *
 * @param comment - The comment to rewrite in place.
 *
 * @example
 * ```ts
 * import { rewriteComment } from "@pantoken/typedoc-plugin-demo";
 *
 * // Given a comment with `@demo self:button`, appends a ```demo``` fence and drops the tag.
 * rewriteComment(comment);
 * ```
 */
export function rewriteComment(comment: Comment): void {
  const demos = comment.blockTags.filter((tag) => tag.tag === DEMO_TAG);
  if (demos.length === 0) return;

  comment.blockTags = comment.blockTags.filter((tag) => tag.tag !== DEMO_TAG);
  for (const demo of demos) {
    const spec = demo.content
      .map((part) => part.text)
      .join("")
      .trim();
    if (!spec) continue;
    const fence: CommentDisplayPart = { kind: "text", text: `\n\n${toDemoFence(spec)}\n` };
    comment.summary.push(fence);
  }
}

function normalizeModuleLink(link: string): string {
  return link
    .replace(/^\/api\//, "")
    .replace(/^\//, "")
    .replace(/\/+$/, "");
}

function flattenSrcNodes(items: SidebarItem[], targets: ModuleTarget[]): SidebarItem[] {
  return items.map((item) => {
    if (item.items) {
      item.items = flattenSrcNodes(item.items, targets);
      const srcIndex = item.items.findIndex((child) => child.text === "src" && child.link);
      if (srcIndex >= 0) {
        const srcNode = item.items[srcIndex];
        const relativeLink = normalizeModuleLink(srcNode.link!);
        if (relativeLink.endsWith("/src")) {
          targets.push({
            link: relativeLink,
            title: item.text,
          });
        }

        item.link = srcNode.link;
        const remaining = item.items.filter((_, index) => index !== srcIndex);
        item.items = [...(srcNode.items ?? []), ...remaining];
      }
    }
    return item;
  });
}

function replaceFirstLine(content: string, oldText: string, newText: string): string {
  const lines = content.split("\n");
  if (lines.length > 0 && lines[0].includes(oldText)) {
    lines[0] = lines[0].replace(oldText, newText);
  }
  return lines.join("\n");
}

function rewriteModuleHeading(indexPath: string, title: string, modulePath: string): void {
  if (!existsSync(indexPath)) return;

  const original = readFileSync(indexPath, "utf8");
  const withHeading = original.replace(/^#\s+.+$/m, `# ${title}`);
  const final = replaceFirstLine(withHeading, ` / ${modulePath}`, ` / ${title}`);
  if (final !== original) {
    writeFileSync(indexPath, final, "utf8");
  }
}

function normalizeDocsOutput(outputDirectory: string): void {
  const sidebarPath = join(outputDirectory, "typedoc-sidebar.json");
  if (!existsSync(sidebarPath)) return;

  const sidebar = JSON.parse(readFileSync(sidebarPath, "utf8")) as SidebarItem[];
  const moduleTargets: ModuleTarget[] = [];
  const normalized = flattenSrcNodes(sidebar, moduleTargets);

  writeFileSync(sidebarPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");

  for (const target of moduleTargets) {
    const moduleIndexPath = join(outputDirectory, target.link, "index.md");
    rewriteModuleHeading(moduleIndexPath, target.title, target.link);
  }
}

/**
 * TypeDoc entry point. Registers a resolve-time pass that rewrites `@demo` tags into demo fences.
 *
 * @param app - The TypeDoc application.
 */
export function load(app: Application): void {
  app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context: Context) => {
    for (const reflection of Object.values(context.project.reflections)) {
      for (const comment of commentsOf(reflection)) {
        rewriteComment(comment);
      }
    }
  });

  app.renderer.on(RendererEvent.END, (event) => {
    normalizeDocsOutput(event.outputDirectory);
  });
}
