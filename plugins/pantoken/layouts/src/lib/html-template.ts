/**
 * Layout-to-HTML template transformation utility.
 * Parses layout CSS (with cssdoc annotations) and generates semantic HTML templates.
 */

/**
 * Metadata about a layout part extracted from cssdoc @part tags.
 */
export interface LayoutPart {
  name: string;
  selector: string;
  element: string; // Resolved element type (h2, nav, span, etc.)
  description: string;
}

/**
 * Metadata about a layout slot extracted from cssdoc @slot tags.
 */
export interface LayoutSlot {
  name: string;
  description: string;
}

/**
 * Full metadata extracted from a layout CSS string.
 */
export interface LayoutMetadata {
  name: string;
  summary: string;
  parts: LayoutPart[];
  slots: LayoutSlot[];
}

/**
 * Extract cssdoc @part and @slot definitions from a CSS string.
 * Returns arrays of parsed parts and slots.
 */
function extractPartsAndSlots(css: string): {
  parts: Array<{ name: string; selector: string; description: string }>;
  slots: Array<{ name: string; description: string }>;
} {
  const parts: Array<{ name: string; selector: string; description: string }> = [];
  const slots: Array<{ name: string; description: string }> = [];

  // Extract the cssdoc comment block (everything between /** and */)
  const docMatch = css.match(/\/\*\*([\s\S]*?)\*\//);
  if (!docMatch) return { parts, slots };

  const docBlock = docMatch[1];

  // Extract @part tags: @part .selector - Description
  const partRegex = /@part\s+([.\w-]+)\s+-\s+(.+?)(?=\n\s*\*\s*@|\n\s*\*\s*$)/g;
  let partMatch;
  while ((partMatch = partRegex.exec(docBlock)) !== null) {
    parts.push({
      name: partMatch[1].replace(/^\./, ""), // Remove leading dot
      selector: partMatch[1],
      description: partMatch[2].trim(),
    });
  }

  // Extract @slot tags: @slot name - Description
  const slotRegex = /@slot\s+([\w-]+)\s+-\s+(.+?)(?=\n\s*\*\s*@|\n\s*\*\s*$)/g;
  let slotMatch;
  while ((slotMatch = slotRegex.exec(docBlock)) !== null) {
    slots.push({
      name: slotMatch[1].trim(),
      description: slotMatch[2].trim(),
    });
  }

  return { parts, slots };
}

/**
 * Extract the layout name and summary from cssdoc comment.
 */
function extractMetadata(css: string): { name: string; summary: string } {
  const docMatch = css.match(/\/\*\*([\s\S]*?)\*\//);
  if (!docMatch) return { name: "", summary: "" };

  const docBlock = docMatch[1];

  // Extract @layout name
  const layoutMatch = docBlock.match(/@layout\s+([\w-]+)/);
  const name = layoutMatch ? layoutMatch[1] : "";

  // Extract @summary
  const summaryMatch = docBlock.match(/@summary\s+(.+?)(?=\n\s*\*|$)/);
  const summary = summaryMatch ? summaryMatch[1].trim() : "";

  return { name, summary };
}

/**
 * Extract the root selector from the CSS (the @selector tag in cssdoc).
 */
function extractRootSelector(css: string): string {
  const docMatch = css.match(/\/\*\*([\s\S]*?)\*\//);
  if (!docMatch) return "";

  const docBlock = docMatch[1];
  const selectorMatch = docBlock.match(/@selector\s+(.+?)(?=\n\s*\*|$)/);
  return selectorMatch ? selectorMatch[1].trim() : "";
}

/**
 * Resolve the HTML element type for a CSS selector.
 * Priority:
 * 1. Element specified in layout CSS selector (e.g., `h2.-color-secondary` → `h2`)
 * 2. First element in component cssdoc `@element` tag (if selector references a component)
 * 3. Element from component selector (if component has `@scope(nav.primary)`)
 * 4. Default to `span`
 */
function resolveElement(selector: string, componentModel?: Record<string, any>): string {
  // Priority 1: Extract element from selector (e.g., "h2.foo-bar" → "h2")
  const elementMatch = selector.match(/^([a-z0-9]+)/i);
  if (elementMatch && elementMatch[1] !== "div") {
    return elementMatch[1].toLowerCase();
  }

  // Priority 2-3: If selector is a class like ".pfx-button", look up component
  const classMatch = selector.match(/\.([a-z-]+)/i);
  if (classMatch && componentModel) {
    const componentName = classMatch[1].replace(/^pfx-/, "");
    const component = componentModel[componentName];
    if (component) {
      // Priority 2: Check @element tag
      if (component.element) {
        const elemMatch = component.element.match(/^([a-z0-9]+)/i);
        if (elemMatch) return elemMatch[1].toLowerCase();
      }
      // Priority 3: Check @scope tag
      if (component.scope) {
        const scopeMatch = component.scope.match(/([a-z0-9]+)\./i);
        if (scopeMatch) return scopeMatch[1].toLowerCase();
      }
    }
  }

  // Priority 4: Default to span
  return "span";
}

/**
 * Parse layout CSS and generate an HTML template.
 * @param layoutCss - The full layout CSS string with cssdoc comment
 * @param options - Configuration options
 * @returns The HTML template string
 */
export function htmlTemplate(
  layoutCss: string,
  options: {
    prefix?: string;
    layoutName?: string;
    componentModel?: Record<string, any>;
  } = {},
): string {
  const { prefix = "instui-", componentModel = {} } = options;

  // Extract metadata
  const { name } = extractMetadata(layoutCss);
  const { parts, slots } = extractPartsAndSlots(layoutCss);
  const rootSelector = extractRootSelector(layoutCss);

  // Generate the root element
  let html = `<!-- Layout: ${name} -->\n`;

  // Determine root element type and attributes
  let rootElement = "div";
  let rootAttrs = "";

  // Extract element and class from root selector
  const selectorMatch = rootSelector.match(/^([a-z0-9]+)?(?:\[class~="([^"]+)"\])?/i);
  if (selectorMatch) {
    if (selectorMatch[1]) rootElement = selectorMatch[1].toLowerCase();
    if (selectorMatch[2]) {
      const className = selectorMatch[2].replace(prefix, "");
      rootAttrs = ` class="${className}"`;
    }
  }

  html += `<${rootElement}${rootAttrs}>`;
  if (parts.length > 0 || slots.length > 0) html += "\n";

  // Generate part elements
  for (const part of parts) {
    const element = resolveElement(part.selector, componentModel);
    const className = part.name.startsWith(".") ? part.name.slice(1) : part.name;
    html += `  <${element} class="${className}">`;
    if (slots.length === 0 && part !== parts[parts.length - 1]) {
      html += "\n";
    }
    html += `</${element}>\n`;
  }

  // Generate slot elements
  for (const slot of slots) {
    html += `  <slot name="${slot.name}" /><!-- ${slot.description} -->\n`;
  }

  html += `</${rootElement}>\n`;

  return html;
}

/**
 * Parse layout CSS and extract full metadata.
 * Useful for docs generation and static analysis.
 */
export function layoutMetadata(
  layoutCss: string,
  options: { componentModel?: Record<string, any> } = {},
): LayoutMetadata {
  const { componentModel = {} } = options;
  const { name, summary } = extractMetadata(layoutCss);
  const partData = extractPartsAndSlots(layoutCss);

  const parts: LayoutPart[] = partData.parts.map((p) => ({
    ...p,
    element: resolveElement(p.selector, componentModel),
  }));

  return {
    name,
    summary,
    parts,
    slots: partData.slots,
  };
}
