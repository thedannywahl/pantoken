import { buttonCss, tooltipCss } from "@pantoken/components";
import { initTooltip, type TooltipHandle } from "@pantoken/interactions";
import { Catalog, type ComponentApi } from "@a2ui/web_core/catalog";
import {
  html,
  unsafeCSS,
  css,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import {
  A2uiLitElement,
  registerUniversalElement,
  type WebComponentImplementation,
} from "@a2ui/web_core/universal";
import catalogDocument from "./generated/a2ui-catalog.json" with { type: "json" };
import { button } from "./elements/button.ts";
import { buildRegisterContext, noopIconSvg } from "./lib/register-context.ts";

/** The versioned A2UI v1.0 catalog identifier shared with the public catalog JSON. */
export const PANTOKEN_A2UI_CATALOG_ID = "https://pantoken.app/a2ui/catalog/v1/catalog.json";

const schemaCatalog = Catalog.fromJson(catalogDocument, "1.0");

function getApi(name: string): ComponentApi {
  const api = schemaCatalog.components.get(name);
  if (!api) throw new Error(`Missing ${name} in the Pantoken A2UI catalog.`);
  return api;
}

const buttonApi = getApi("PantokenButton");
const tooltipApi = getApi("PantokenTooltip");

type PantokenAction = () => void;
type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "danger"
  | "ai"
  | "ai-secondary";
type TooltipPlacement = "top" | "bottom" | "start" | "end";

type PantokenButtonProps = {
  label: string;
  variant?: ButtonVariant;
  action?: PantokenAction;
};

type PantokenTooltipProps = {
  triggerLabel: string;
  tip: string;
  placement?: TooltipPlacement;
  action: PantokenAction;
};

/** A Universal A2UI button rendered with Pantoken's existing web-component button. */
export class PantokenA2uiButtonElement extends A2uiLitElement<ComponentApi, PantokenButtonProps> {
  protected override readonly api: ComponentApi = buttonApi;

  override render(): TemplateResult {
    const { label, variant = "primary", action } = this.controller.props;
    return html`<instui-button variant=${variant} @click=${() => action?.()}
      >${label}</instui-button
    >`;
  }
}

/** A Universal A2UI tooltip that reuses Pantoken's tooltip CSS and shared behavior. */
export class PantokenA2uiTooltipElement extends A2uiLitElement<ComponentApi, PantokenTooltipProps> {
  static override styles: CSSResultGroup = css`
    ${unsafeCSS(buttonCss({ prefix: "instui" }))}
    ${unsafeCSS(tooltipCss({ prefix: "instui" }))}
  `;

  protected override readonly api: ComponentApi = tooltipApi;
  #tooltipId = `pantoken-a2ui-tooltip-${++tooltipSequence}`;
  #tooltipHandle: TooltipHandle | undefined;

  override render(): TemplateResult {
    const { triggerLabel, tip, placement = "top", action } = this.controller.props;
    return html`
      <span class="instui-tooltip">
        <button
          class="instui-button -color-primary"
          type="button"
          aria-describedby=${this.#tooltipId}
          @click=${() => action()}
        >
          ${triggerLabel}
        </button>
        <span class="tip -placement-${placement}" id=${this.#tooltipId} role="tooltip">${tip}</span>
      </span>
    `;
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (this.#tooltipHandle) return;
    const wrapper = this.renderRoot.querySelector<HTMLElement>(".instui-tooltip");
    const tip = wrapper?.querySelector<HTMLElement>('[role="tooltip"]');
    if (wrapper && tip) this.#tooltipHandle = initTooltip(wrapper, tip);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#tooltipHandle?.cleanup();
    this.#tooltipHandle = undefined;
  }
}

let tooltipSequence = 0;

/** A2UI implementation entry for the Pantoken button. */
export const pantokenButtonComponent: WebComponentImplementation = {
  ...buttonApi,
  tagName: "pantoken-a2ui-button",
  element: PantokenA2uiButtonElement,
};

/** A2UI implementation entry for the Pantoken tooltip. */
export const pantokenTooltipComponent: WebComponentImplementation = {
  ...tooltipApi,
  tagName: "pantoken-a2ui-tooltip",
  element: PantokenA2uiTooltipElement,
};

/** The runtime A2UI catalog containing the Pantoken v1 component implementations. */
export const pantokenA2uiCatalog: Catalog<ComponentApi> = new Catalog(
  PANTOKEN_A2UI_CATALOG_ID,
  "1.0",
  [pantokenButtonComponent, pantokenTooltipComponent],
  [],
  {
    schemaUri: "https://json-schema.org/draft/2020-12/schema",
    schemaId: PANTOKEN_A2UI_CATALOG_ID,
    title: "Pantoken A2UI Catalog",
    description: "A constrained set of Pantoken-styled components for A2UI v1.0 web clients.",
    declaredProtocolVersion: "1.0",
  },
);

/** Register the A2UI components and their Pantoken custom-element dependencies on demand. */
export function registerPantokenA2uiComponents(): void {
  if (!globalThis.customElements || typeof HTMLElement === "undefined") return;
  const context = buildRegisterContext({}, globalThis.customElements, noopIconSvg);
  button.define(context);
  registerUniversalElement(pantokenButtonComponent);
  registerUniversalElement(pantokenTooltipComponent);
}
