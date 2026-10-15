interface StyleSnapshot {
  authored: string;
  generated: string;
}

const INLINE_ID = "data-pantoken-inline-id";

/** Tracks generated declarations separately from authored HTML during provider changes. */
export class InlineDocument {
  private snapshots = new Map<string, StyleSnapshot>();
  private nextId = 0;

  /** Recover authored styles while preserving edits made to the rendered document. */
  canonical(html: string): string {
    const fragment = document.createElement("template");
    fragment.innerHTML = html;
    for (const element of fragment.content.querySelectorAll<HTMLElement>(`[${INLINE_ID}]`)) {
      const snapshot = this.snapshots.get(element.getAttribute(INLINE_ID)!);
      if (snapshot) {
        const authored = document.createElement("span").style;
        const generated = document.createElement("span").style;
        authored.cssText = snapshot.authored;
        generated.cssText = snapshot.generated;
        for (const property of Array.from(generated)) {
          if (
            element.style.getPropertyValue(property) !== generated.getPropertyValue(property) ||
            element.style.getPropertyPriority(property) !== generated.getPropertyPriority(property)
          )
            continue;
          if (authored.getPropertyValue(property)) {
            element.style.setProperty(
              property,
              authored.getPropertyValue(property),
              authored.getPropertyPriority(property),
            );
          } else element.style.removeProperty(property);
        }
        if (!element.style.cssText) element.removeAttribute("style");
        element.removeAttribute("data-mce-style");
      }
      element.removeAttribute(INLINE_ID);
    }
    return fragment.innerHTML;
  }

  /** Render canonical HTML using the shared inliner, recording only generated styles. */
  render(html: string, css: string, inline: (html: string, css: string) => string): string {
    const fragment = document.createElement("template");
    fragment.innerHTML = this.canonical(html);
    const snapshots = new Map(this.snapshots);
    for (const element of fragment.content.querySelectorAll<HTMLElement>("*")) {
      const id = String(++this.nextId);
      element.setAttribute(INLINE_ID, id);
      snapshots.set(id, { authored: element.getAttribute("style") ?? "", generated: "" });
    }
    const result = document.createElement("template");
    result.innerHTML = inline(fragment.innerHTML, css);
    for (const style of result.content.querySelectorAll("style")) style.remove();
    for (const element of result.content.querySelectorAll<HTMLElement>(`[${INLINE_ID}]`)) {
      const snapshot = snapshots.get(element.getAttribute(INLINE_ID)!);
      if (snapshot) snapshot.generated = element.getAttribute("style") ?? "";
    }
    this.snapshots = snapshots;
    return result.innerHTML;
  }

  /** Strip editor-only tracking attributes from copied or exported HTML. */
  export(html: string): string {
    const fragment = document.createElement("template");
    fragment.innerHTML = html;
    for (const element of fragment.content.querySelectorAll(`[${INLINE_ID}]`))
      element.removeAttribute(INLINE_ID);
    return fragment.innerHTML;
  }
}
