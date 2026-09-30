import { Window } from "happy-dom";
import { fileURLToPath } from "node:url";
import { targetEnvironments } from "../../../scripts/release/target-versions.ts";

/** Verify custom-element registration and shadow output in the declared DOM-emulation environment. */
export async function checkCompatibility(): Promise<void> {
  const [environment] = targetEnvironments("@pantoken/web-components");
  if (!environment.includes("happy-dom"))
    throw new Error(`Unsupported Web Components environment: ${environment}`);
  const dom = new Window({ url: "http://localhost/" });
  const globalNames = [
    "window",
    "document",
    "HTMLElement",
    "customElements",
    "MutationObserver",
    "navigator",
  ] as const;
  const original = new Map(
    globalNames.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]),
  );
  const globals = globalThis as unknown as Record<string, unknown>;
  Object.defineProperties(globals, {
    window: { value: dom, configurable: true, writable: true },
    document: { value: dom.document, configurable: true, writable: true },
    HTMLElement: { value: dom.HTMLElement, configurable: true, writable: true },
    customElements: { value: dom.customElements, configurable: true, writable: true },
    MutationObserver: { value: dom.MutationObserver, configurable: true, writable: true },
    navigator: { value: dom.navigator, configurable: true, writable: true },
  });
  try {
    const { register } = await import("../dist/index.mjs");
    register();
    const button = document.createElement("instui-button");
    button.textContent = "Save";
    document.body.append(button);
    if (!customElements.get("instui-button") || !button.shadowRoot?.querySelector("button")) {
      throw new Error("Web Components did not register or render the InstUI button");
    }
    console.log(
      "✓ Web Components: instui-button registered and shadow button rendered in Happy DOM",
    );
  } finally {
    await dom.happyDOM.abort();
    for (const [name, descriptor] of original) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await checkCompatibility();
