import { buttonCss, tabsCss, tooltipCss } from "@pantoken/components";
import { initTooltip, type TooltipHandle } from "@pantoken/interactions";
import { Catalog, type ComponentApi } from "@a2ui/web_core/catalog";
import {
  html,
  nothing,
  unsafeCSS,
  css,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import {
  A2uiLitElement,
  registerUniversalElement,
  sanitizeMediaUrl,
  type A2uiChildRef,
  type WebComponentImplementation,
} from "@a2ui/web_core/universal";
import catalogDocument from "./generated/a2ui-catalog.json" with { type: "json" };
import {
  A2UI_COMPONENTS,
  a2uiNameForElement,
  type A2uiComponentContract,
  type A2uiPropertyContract,
} from "./a2ui-contracts.ts";
import { DEFINITIONS } from "./elements/index.ts";
import { buildRegisterContext, iconSvg } from "./lib/register-context.ts";
import { ELEMENTS } from "./lib/elements-meta.ts";

/** The versioned A2UI v1.0 catalog identifier shared with the public catalog JSON. */
export const PANTOKEN_A2UI_CATALOG_ID = "https://pantoken.app/a2ui/catalog/v1/catalog.json";

const schemaCatalog = Catalog.fromJson(catalogDocument, "1.0");

function getApi(name: string): ComponentApi {
  const api = schemaCatalog.components.get(name);
  if (!api) throw new Error(`Missing ${name} in the Pantoken A2UI catalog.`);
  return api;
}

function toTemplateStrings(strings: string[]): TemplateStringsArray {
  Object.defineProperty(strings, "raw", { value: [...strings] });
  return strings as unknown as TemplateStringsArray;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isChildRef(value: unknown): value is A2uiChildRef {
  return (
    typeof value === "string" ||
    (isRecord(value) && typeof value.id === "string" && typeof value.basePath === "string")
  );
}

function childRefs(value: unknown): A2uiChildRef[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || !value.every(isChildRef)) {
    throw new Error("Pantoken A2UI children must be valid A2UI child references.");
  }
  return value;
}

function childId(child: A2uiChildRef): string {
  return typeof child === "string" ? child : child.id;
}

function propertyValue(
  props: Record<string, unknown>,
  name: string,
  definition: A2uiPropertyContract,
): unknown {
  return props[name] ?? definition.schema.default;
}

function attributeValue(
  value: unknown,
  definition: A2uiPropertyContract,
): string | number | boolean | null | undefined {
  if (value === null || value === undefined) return value;
  if (definition.mode === "media-url") return sanitizeMediaUrl(value);
  if (definition.mode === "boolean") return value === true;
  if (definition.mode === "boolean-string") return String(value === true);
  if (typeof value === "number") {
    const minimum = definition.minimum ?? Number.NEGATIVE_INFINITY;
    const maximum = definition.maximum ?? Number.POSITIVE_INFINITY;
    return Math.max(minimum, Math.min(maximum, value));
  }
  if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
    return value;
  }
  return undefined;
}

function renderChildNodes(
  renderNode: (child?: A2uiChildRef) => unknown,
  children: A2uiChildRef[],
): unknown[] {
  return children.map((child) => renderNode(child));
}

type A2uiElementConstructor = new () => A2uiLitElement<ComponentApi, Record<string, unknown>>;
type PantokenA2uiImplementation = Omit<WebComponentImplementation, "element"> & {
  element: A2uiElementConstructor;
};

function actionFor(value: unknown): (() => void) | undefined {
  return typeof value === "function" ? () => value() : undefined;
}

function setterFor(
  props: Record<string, unknown>,
  property: string,
): ((value: unknown) => void) | undefined {
  const setter = props[`set${property.slice(0, 1).toUpperCase()}${property.slice(1)}`];
  return typeof setter === "function" ? (value: unknown) => setter(value) : undefined;
}

function compileGenericTemplate(
  element: string,
  contract: A2uiComponentContract,
): {
  strings: TemplateStringsArray;
  attributes: Array<[string, A2uiPropertyContract]>;
} {
  const strings = [`<instui-${element} id="`, '"'];
  const attributes: Array<[string, A2uiPropertyContract]> = [];
  for (const [name, definition] of Object.entries(contract.properties ?? {})) {
    if (!definition.attribute || definition.mode === "popover-open") continue;
    attributes.push([name, definition]);
    if (definition.mode === "boolean") {
      strings[strings.length - 1] += ` ?${definition.attribute}=`;
      strings.push("");
    } else {
      strings[strings.length - 1] += ` ${definition.attribute}="`;
      strings.push('"');
    }
  }
  strings[strings.length - 1] += ">";
  strings.push(`</instui-${element}>`);
  return { strings: toTemplateStrings(strings), attributes };
}

function drilldownPages(value: unknown): Array<{
  id: string;
  items: Array<{ back?: boolean; label: string; target?: string }>;
}> {
  if (!Array.isArray(value)) throw new Error("PantokenDrilldown.pages must be an array.");
  return value.map((page, pageIndex) => {
    if (!isRecord(page) || typeof page.id !== "string" || !Array.isArray(page.items)) {
      throw new Error(`PantokenDrilldown.pages[${pageIndex}] is invalid.`);
    }
    return {
      id: page.id,
      items: page.items.map((item, itemIndex) => {
        if (!isRecord(item) || typeof item.label !== "string") {
          throw new Error(`PantokenDrilldown.pages[${pageIndex}].items[${itemIndex}] is invalid.`);
        }
        if (item.target !== undefined && typeof item.target !== "string") {
          throw new Error(
            `PantokenDrilldown.pages[${pageIndex}].items[${itemIndex}].target is invalid.`,
          );
        }
        return {
          label: item.label,
          ...(typeof item.target === "string" ? { target: item.target } : {}),
          ...(typeof item.back === "boolean" ? { back: item.back } : {}),
        };
      }),
    };
  });
}

function createA2uiElement(
  element: (typeof ELEMENTS)[number],
  api: ComponentApi,
): A2uiElementConstructor {
  const contract = A2UI_COMPONENTS[element];
  const genericTemplate = compileGenericTemplate(element, contract);
  const styles: CSSResultGroup =
    element === "tabs"
      ? css`
          ${unsafeCSS(tabsCss({ prefix: "instui" }))}
        `
      : element === "tooltip"
        ? css`
            ${unsafeCSS(buttonCss({ prefix: "instui" }))}
            ${unsafeCSS(tooltipCss({ prefix: "instui" }))}
          `
        : [];

  class PantokenA2uiElement extends A2uiLitElement<ComponentApi, Record<string, unknown>> {
    static override styles = styles;

    protected override readonly api = api;
    #component: HTMLElement | null = null;
    #observer: MutationObserver | undefined;
    #popoverOpen: boolean | undefined;
    #tooltipHandle: TooltipHandle | undefined;
    #tooltipOptions: { showDelay: number; hideDelay: number } | undefined;
    #onComponentEvent = (event: Event): void => {
      const props = this.controller.props;
      const target = event.target instanceof Element ? event.target : undefined;
      if (
        contract.special === "tabs" &&
        event.type === "click" &&
        !target?.closest('[role="tab"]')
      ) {
        return;
      }
      if (
        contract.special === "tree" &&
        event.type === "click" &&
        !target?.closest('[role="treeitem"]')
      ) {
        return;
      }

      const valueChange = contract.valueChange;
      if (valueChange?.event === event.type) {
        let value: unknown;
        if (valueChange.kind === "toggle") {
          value = !props[valueChange.property];
        } else if (valueChange.kind === "tab-index") {
          const tab = target?.closest<HTMLElement>('[role="tab"]');
          const index = Number(tab?.dataset.index);
          if (Number.isInteger(index)) value = index;
        } else if (valueChange.kind === "close") {
          value = false;
        } else if (valueChange.kind === "popover-state") {
          const toggleEvent = event as Event & { newState?: string };
          const open = toggleEvent.newState === "open";
          value = open;
          this.#popoverOpen = open;
        } else if (valueChange.detailProperty) {
          const detail = (event as CustomEvent<Record<string, unknown>>).detail;
          value = detail?.[valueChange.detailProperty];
        }
        if (value !== undefined) setterFor(props, valueChange.property)?.(value);
      }

      if (contract.actionEvents?.includes(event.type)) actionFor(props.action)?.();
    };

    override render(): TemplateResult {
      const props = this.controller.props;
      const id = this.context?.componentModel?.id;

      if (contract.special === "icon-button") {
        return html`<instui-icon-button id=${id} label=${props.label ?? nothing}>
          <instui-icon name=${props.iconName ?? nothing}></instui-icon>
        </instui-icon-button>`;
      }

      if (contract.special === "tooltip") {
        const children = childRefs(props.children);
        const content = contract.contentProperty
          ? (props[contract.contentProperty] ?? nothing)
          : nothing;
        const tooltipId = `${id ?? "pantoken"}-tooltip`;
        return html`<span class="instui-tooltip"
          ><button class="instui-button -color-primary" type="button" aria-describedby=${tooltipId}>
            ${renderChildNodes(this.renderNode.bind(this), children)}${content}</button
          ><span class="tip -placement-${props.placement ?? "top"}" id=${tooltipId} role="tooltip"
            >${props.tip ?? nothing}</span
          ></span
        >`;
      }

      if (contract.special === "tree") {
        const children = childRefs(props.children);
        return html`<instui-tree-browser id=${id} aria-label=${props.label ?? nothing}>
          ${children.map(
            (child) =>
              html`<div class="item" role="treeitem" tabindex="0">${this.renderNode(child)}</div>`,
          )}
        </instui-tree-browser>`;
      }

      if (contract.special === "pages") {
        const children = childRefs(props.children);
        return html`<instui-pages id=${id} active=${props.active ?? nothing}>
          ${children.map(
            (child) =>
              html`<section data-page=${childId(child)}>${this.renderNode(child)}</section>`,
          )}
        </instui-pages>`;
      }

      if (contract.special === "tabs") {
        const children = childRefs(props.children);
        const labels = props.tabLabels;
        if (!Array.isArray(labels) || !labels.every((label) => typeof label === "string")) {
          throw new Error("PantokenTabs.tabLabels must be an array of strings.");
        }
        if (children.length !== labels.length) {
          throw new Error("PantokenTabs requires one child component for each tab label.");
        }
        const rawIndex = Number(props.activeIndex ?? 0);
        const activeIndex = Number.isFinite(rawIndex)
          ? Math.max(0, Math.min(labels.length - 1, Math.trunc(rawIndex)))
          : 0;
        const panelId = (index: number): string => `${id ?? "pantoken"}-panel-${String(index)}`;
        return html`<instui-tabs id=${id}>
          <div class="list" role="tablist" aria-label=${props.label ?? "Tabs"}>
            ${labels.map(
              (label, index) =>
                html`<button
                  type="button"
                  role="tab"
                  data-index=${index}
                  aria-controls=${panelId(index)}
                  aria-selected=${String(index === activeIndex)}
                  tabindex=${index === activeIndex ? "0" : "-1"}
                  class=${index === activeIndex ? "-selected" : ""}
                >
                  ${label}
                </button>`,
            )}
          </div>
          ${children.map(
            (child, index) =>
              html`<div id=${panelId(index)} role="tabpanel" ?hidden=${index !== activeIndex}>
                ${this.renderNode(child)}
              </div>`,
          )}
        </instui-tabs>`;
      }

      if (contract.special === "drilldown") {
        const pages = drilldownPages(props.pages);
        return html`<instui-drilldown id=${id} active=${props.active ?? nothing}>
          ${pages.map(
            (page) =>
              html`<div data-page=${page.id}>
                ${page.items.map(
                  (item) =>
                    html`<div
                      class=${item.back ? "item -drilldown-back" : "item"}
                      role="menuitem"
                      tabindex="0"
                      ?data-back=${item.back ?? false}
                      data-goto=${item.target ?? nothing}
                    >
                      ${item.label}
                    </div>`,
                )}
              </div>`,
          )}
        </instui-drilldown>`;
      }

      if (contract.special === "drawer") {
        const children = childRefs(props.children);
        const trayChildren = childRefs(props.trayChildren);
        const contentChildren = renderChildNodes(this.renderNode.bind(this), children);
        const trayContent = renderChildNodes(this.renderNode.bind(this), trayChildren);
        return html`<instui-drawer-layout
          id=${id}
          ?open=${props.open === true}
          placement=${props.placement ?? "start"}
          ?should-overlay-tray=${props.shouldOverlayTray === true}
          tray-label=${props.trayLabel ?? nothing}
          content-label=${props.contentLabel ?? nothing}
        >
          <div slot="tray">${trayContent}</div>
          ${contentChildren}
        </instui-drawer-layout>`;
      }

      const values: unknown[] = [id];
      for (const [name, definition] of genericTemplate.attributes) {
        const value = propertyValue(props, name, definition);
        values.push(attributeValue(value, definition));
      }
      if (element === "tooltip") {
        const children = childRefs(props.children);
        const content = contract.contentProperty
          ? (props[contract.contentProperty] ?? nothing)
          : nothing;
        values.push(
          html`<instui-button variant="secondary"
            >${renderChildNodes(this.renderNode.bind(this), children)}${content}</instui-button
          >`,
        );
      } else {
        const children = contract.children === "slot" ? childRefs(props.children) : [];
        const renderedChildren = renderChildNodes(this.renderNode.bind(this), children);
        const content = contract.contentProperty
          ? (props[contract.contentProperty] ?? nothing)
          : nothing;
        values.push(html`${renderedChildren}${content}`);
      }
      return html(genericTemplate.strings, ...values);
    }

    protected override updated(changed: PropertyValues): void {
      super.updated(changed);
      const host =
        contract.special === "tooltip"
          ? this.renderRoot.querySelector<HTMLElement>("button")
          : this.renderRoot.querySelector<HTMLElement>(`instui-${element}`);
      if (host !== this.#component) {
        this.#observer?.disconnect();
        this.#component?.removeEventListener("click", this.#onComponentEvent);
        for (const event of new Set([
          ...(contract.actionEvents ?? []),
          ...(contract.valueChange ? [contract.valueChange.event] : []),
        ])) {
          this.#component?.removeEventListener(event, this.#onComponentEvent);
        }
        this.#component = host;
        if (host) {
          for (const event of new Set([
            ...(contract.actionEvents ?? []),
            ...(contract.valueChange ? [contract.valueChange.event] : []),
          ])) {
            host.addEventListener(event, this.#onComponentEvent);
          }
          if (contract.attributeChange) {
            this.#observer = new MutationObserver(() => {
              const props = this.controller.props;
              const setter = setterFor(props, contract.attributeChange!.property);
              const value = host.hasAttribute(contract.attributeChange!.attribute);
              if (value !== props[contract.attributeChange!.property]) setter?.(value);
            });
            this.#observer.observe(host, {
              attributes: true,
              attributeFilter: [contract.attributeChange.attribute],
            });
          }
        }
      }
      if (contract.special === "tooltip") {
        const wrapper = this.renderRoot.querySelector<HTMLElement>(".instui-tooltip");
        const tip = wrapper?.querySelector<HTMLElement>('[role="tooltip"]');
        const props = this.controller.props;
        const options = {
          showDelay: typeof props.showDelay === "number" ? props.showDelay : 0,
          hideDelay: typeof props.hideDelay === "number" ? props.hideDelay : 0,
        };
        if (
          wrapper &&
          tip &&
          (this.#tooltipOptions?.showDelay !== options.showDelay ||
            this.#tooltipOptions?.hideDelay !== options.hideDelay)
        ) {
          this.#tooltipHandle?.cleanup();
          this.#tooltipHandle = initTooltip(wrapper, tip, options);
          this.#tooltipOptions = options;
        }
      }
      this.#syncPopover(host);
    }

    #syncPopover(host: HTMLElement | null): void {
      const openProperty = Object.entries(contract.properties ?? {}).find(
        ([, definition]) => definition.mode === "popover-open",
      );
      if (!host || !openProperty) return;
      const [propertyName] = openProperty;
      const requested = this.controller.props[propertyName];
      if (typeof requested !== "boolean") return;
      if (this.#popoverOpen === undefined) {
        if (requested) this.#setPopoverState(host, true);
        this.#popoverOpen = requested;
      } else if (requested !== this.#popoverOpen) {
        this.#setPopoverState(host, requested);
        this.#popoverOpen = requested;
      }
    }

    #setPopoverState(host: HTMLElement, open: boolean): void {
      const popover = host as HTMLElement & {
        showPopover?: () => void;
        hidePopover?: () => void;
      };
      const change = open ? popover.showPopover : popover.hidePopover;
      if (typeof change !== "function") {
        throw new Error(
          `Pantoken ${element} requires the browser Popover API to bind its open state.`,
        );
      }
      change.call(host);
    }

    override disconnectedCallback(): void {
      super.disconnectedCallback();
      this.#observer?.disconnect();
      this.#observer = undefined;
      this.#tooltipHandle?.cleanup();
      this.#tooltipHandle = undefined;
      this.#tooltipOptions = undefined;
      for (const event of new Set([
        ...(contract.actionEvents ?? []),
        ...(contract.valueChange ? [contract.valueChange.event] : []),
      ])) {
        this.#component?.removeEventListener(event, this.#onComponentEvent);
      }
      this.#component = null;
    }
  }

  Object.defineProperty(PantokenA2uiElement, "name", {
    value: `PantokenA2ui${a2uiNameForElement(element).slice("Pantoken".length)}Element`,
  });
  return PantokenA2uiElement;
}

/** A Universal A2UI implementation for every exported Pantoken web component. */
export const pantokenA2uiComponents: PantokenA2uiImplementation[] = ELEMENTS.map((element) => {
  const name = a2uiNameForElement(element);
  const api = getApi(name);
  return {
    ...api,
    tagName: `pantoken-a2ui-${element}`,
    element: createA2uiElement(element, api),
  };
});

/** The runtime A2UI catalog containing all Pantoken v1 web-component implementations. */
export const pantokenA2uiCatalog: Catalog<ComponentApi> = new Catalog(
  PANTOKEN_A2UI_CATALOG_ID,
  "1.0",
  pantokenA2uiComponents,
  [],
  {
    schemaUri: "https://json-schema.org/draft/2020-12/schema",
    schemaId: PANTOKEN_A2UI_CATALOG_ID,
    title: "Pantoken A2UI Catalog",
    description: "A constrained set of Pantoken-styled components for A2UI v1.0 web clients.",
    declaredProtocolVersion: "1.0",
  },
);

/** Register all Pantoken web components and their A2UI Universal adapters on demand. */
export function registerPantokenA2uiComponents(): void {
  if (!globalThis.customElements || typeof HTMLElement === "undefined") return;
  const context = buildRegisterContext({}, globalThis.customElements, iconSvg);
  for (const definition of DEFINITIONS) definition.define(context);
  for (const component of pantokenA2uiComponents) registerUniversalElement(component);
}
