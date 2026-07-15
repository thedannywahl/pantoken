import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { CHEVRON_RIGHT_ICON } from "../lib/helpers.ts";

export const treeBrowser = defineComponent({
  name: "tree-browser",
  css: (p) => {
    const root = `.${p}tree-browser`;
    const t = (k: string): string => `var(--instui-component-tree-browser-${k})`;
    // prettier-ignore
    return css`
/**
 * @component tree-browser
 * @summary A disclosure tree of nested collections and leaf items, with rotating chevrons.
 * @remarks Each collection is a native \`<details>\`; nesting them inside one another builds the tree, and the browser handles opening and closing every branch.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .item — A leaf entry in the tree.
 * @pseudo ::before — Draws each collection's disclosure chevron, a masked glyph that rotates to point down when the branch is open.
 * @cssstate open
 * @a11y Mark the root with role="tree" and each nested list with role="group".
 * @example
 * <div class="${p}tree-browser" role="tree">
 *   <details open>
 *     <summary><span class="${p}icon -icon-folder"></span> Course files</summary>
 *     <ul role="group">
 *       <li>
 *         <a class="item" href="#"><span class="${p}icon -icon-file-text"></span> Syllabus.pdf</a>
 *       </li>
 *       <li>
 *         <details>
 *           <summary><span class="${p}icon -icon-folder"></span> Week 1</summary>
 *           <ul role="group">
 *             <li>
 *               <a class="item -selected" href="#"><span class="${p}icon -icon-file-text"></span> Reading.pdf</a>
 *             </li>
 *             <li>
 *               <a class="item" href="#"><span class="${p}icon -icon-file-text"></span> Slides.pptx</a>
 *             </li>
 *           </ul>
 *         </details>
 *       </li>
 *       <li>
 *         <a class="item" href="#"><span class="${p}icon -icon-file-text"></span> Rubric.docx</a>
 *       </li>
 *     </ul>
 *   </details>
 * </div>
 * @structure
 * .${p}tree-browser {
 *   details {
 *     summary {
 *       .${p}icon {}
 *     }
 *     ul {
 *       li {
 *         .item {
 *           .${p}icon {}
 *         }
 *       }
 *     }
 *   }
 * }
 * @related menu — Both present nested, selectable entries.
 */
${root} {
  border-radius: ${t("border-radius")};
  font-family: ${t("tree-collection-font-family")};
  color: ${t("tree-button-name-text-color")};
}
/* A collection node (a <details><summary>) and a leaf (.item) share the button chrome. */
${root} details > summary,
${root} .item {
  display: flex;
  align-items: center;
  gap: ${t("tree-button-icons-margin-right-medium")};
  padding: ${t("tree-button-base-spacing-medium")};
  font-size: ${t("tree-button-name-font-size-medium")};
  line-height: ${t("tree-button-text-line-height")};
  color: ${t("tree-button-name-text-color")};
  border-radius: ${t("tree-button-border-radius")};
  cursor: pointer;
  list-style: none;
}
${root} details > summary::-webkit-details-marker { display: none; }
/* The disclosure chevron rotates open (same technique as toggle-details). */
${root} details > summary::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_RIGHT_ICON};
  mask: ${CHEVRON_RIGHT_ICON};
  transition: transform 0.2s ease;
}
${root} details[open] > summary::before { transform: rotate(90deg); }
${root} details > summary:hover,
${root} .item:hover {
  background: ${t("tree-button-hover-background-color")};
  color: ${t("tree-button-hover-text-color")};
}
${root} details > summary.-selected,
${root} .item.-selected {
  background: ${t("tree-button-selected-background-color")};
  color: ${t("tree-button-selected-text-color")};
}
/* Nested lists indent; the leaf list carries no bullets. */
${root} ul { margin: 0; padding-inline-start: ${t("tree-collection-base-spacing-medium")}; list-style: none; }
${root}.-size-sm details > summary,
${root}.-size-sm .item { padding: ${t("tree-button-base-spacing-small")}; font-size: ${t("tree-button-name-font-size-small")}; }
${root}.-size-lg details > summary,
${root}.-size-lg .item { padding: ${t("tree-button-base-spacing-large")}; font-size: ${t("tree-button-name-font-size-large")}; }`;
  },
});

export const treeBrowserCss = treeBrowser.css;
