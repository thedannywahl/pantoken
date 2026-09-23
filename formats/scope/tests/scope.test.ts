// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { createScope, getScope } from "../src/scope.ts";
import { resolveScope } from "../src/resolve.ts";
import { ensureProperties, hasProperties } from "../src/inject.ts";
import { observeScope } from "../src/observe.ts";

function fresh(): HTMLElement {
  document.body.innerHTML = `<div id="host"><span id="child"></span></div>`;
  return document.querySelector("#host") as HTMLElement;
}

const memoryStorage = (): Pick<Storage, "getItem" | "setItem"> & { map: Map<string, string> } => {
  const map = new Map<string, string>();
  return {
    map,
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
  };
};

test("a scope writes its attributes and pins color-scheme", () => {
  const host = fresh();
  const scope = createScope(host, { theme: "canvas", scheme: "dark", persist: false });

  expect(host.getAttribute("data-pantoken-theme")).toBe("canvas");
  expect(host.getAttribute("data-pantoken-scheme")).toBe("dark");
  expect(host.style.colorScheme).toBe("dark");
  expect(resolveScope(document.querySelector("#child")).theme).toBe("canvas");
  scope.destroy();
});

test("clearing a field removes the attribute so the subtree inherits again", () => {
  const host = fresh();
  const scope = createScope(host, { theme: "canvas", scheme: "dark", persist: false });
  scope.set({ scheme: null });

  expect(host.hasAttribute("data-pantoken-scheme")).toBe(false);
  expect(host.style.colorScheme).toBe("");
  expect(scope.get().scheme).toBeUndefined();
  scope.destroy();
});

test("two instances on one page keep separate registrations and separate state", () => {
  document.body.innerHTML = `<div id="a"></div><div id="b"></div>`;
  const a = createScope(document.querySelector("#a") as HTMLElement, {
    theme: "rebrand",
    scheme: "dark",
    persist: false,
  });
  const b = createScope(document.querySelector("#b") as HTMLElement, {
    instanceId: "preview",
    theme: "canvas",
    scheme: "light",
    persist: false,
  });

  expect(getScope()).toBe(a);
  expect(getScope("preview")).toBe(b);

  a.set({ theme: "canvasHighContrast" });
  expect(b.get().theme).toBe("canvas");
  expect(document.querySelector("#b")?.getAttribute("data-pantoken-theme")).toBe("canvas");

  a.destroy();
  b.destroy();
});

test("storage keys are namespaced per instance", () => {
  document.body.innerHTML = `<div id="a"></div><div id="b"></div>`;
  const storage = memoryStorage();
  const a = createScope(document.querySelector("#a") as HTMLElement, { theme: "rebrand", storage });
  const b = createScope(document.querySelector("#b") as HTMLElement, {
    instanceId: "preview",
    theme: "canvas",
    storage,
  });

  expect(storage.map.get("pantoken:pantoken:theme")).toBe("rebrand");
  expect(storage.map.get("pantoken:preview:theme")).toBe("canvas");

  a.destroy();
  b.destroy();
});

test("a scope restores its own persisted state, not another instance's", () => {
  const storage = memoryStorage();
  storage.map.set("pantoken:preview:theme", "canvas");
  storage.map.set("pantoken:pantoken:theme", "rebrand");

  document.body.innerHTML = `<div id="a"></div>`;
  const scope = createScope(document.querySelector("#a") as HTMLElement, {
    instanceId: "preview",
    storage,
  });
  expect(scope.get().theme).toBe("canvas");
  scope.destroy();
});

test("registering the same instance twice replaces the first scope", () => {
  document.body.innerHTML = `<div id="a"></div><div id="b"></div>`;
  const first = createScope(document.querySelector("#a") as HTMLElement, {
    theme: "rebrand",
    persist: false,
  });
  const second = createScope(document.querySelector("#b") as HTMLElement, {
    theme: "canvas",
    persist: false,
  });

  expect(getScope()).toBe(second);
  expect(document.querySelector("#a")?.hasAttribute("data-pantoken-theme")).toBe(false);
  void first;
  second.destroy();
});

test("a boundary scope marks itself so ancestors cannot theme through it", () => {
  document.body.innerHTML = `<div data-pantoken-theme="rebrand"><div id="p"><span id="x"></span></div></div>`;
  const scope = createScope(document.querySelector("#p") as HTMLElement, {
    instanceId: "preview",
    theme: "canvas",
    boundary: true,
    persist: false,
  });

  const resolved = resolveScope(document.querySelector("#x"));
  expect(resolved.theme).toBe("canvas");
  expect(resolved.bounded).toBe(true);
  scope.destroy();
});

test("subscribers see each change and stop after unsubscribing", () => {
  const host = fresh();
  const scope = createScope(host, { theme: "rebrand", persist: false });
  const seen: (string | undefined)[] = [];
  const stop = scope.subscribe((config) => seen.push(config.theme));

  scope.set({ theme: "canvas" });
  stop();
  scope.set({ theme: "canvasHighContrast" });

  expect(seen).toEqual(["canvas"]);
  scope.destroy();
});

test("destroy removes every attribute and unregisters", () => {
  const host = fresh();
  const scope = createScope(host, { theme: "canvas", scheme: "dark", boundary: true });
  scope.destroy();

  expect(host.hasAttribute("data-pantoken-theme")).toBe(false);
  expect(host.hasAttribute("data-pantoken-boundary")).toBe(false);
  expect(host.hasAttribute("data-pantoken-instance")).toBe(false);
  expect(host.style.colorScheme).toBe("");
  expect(getScope()).toBeUndefined();
});

test("set after destroy is a no-op", () => {
  const host = fresh();
  const scope = createScope(host, { theme: "canvas", persist: false });
  scope.destroy();
  scope.set({ theme: "rebrand" });
  expect(host.hasAttribute("data-pantoken-theme")).toBe(false);
});

test("attached frames are messaged; detached ones are not", () => {
  const host = fresh();
  const scope = createScope(host, { theme: "canvas", persist: false });

  const frame = document.createElement("iframe");
  document.body.append(frame);
  const posted: unknown[] = [];
  Object.defineProperty(frame, "contentWindow", {
    value: { postMessage: (message: unknown) => posted.push(message) },
  });

  const detach = scope.attachFrame(frame);
  expect(posted).toHaveLength(1);

  scope.set({ theme: "rebrand" });
  expect(posted).toHaveLength(2);
  expect(posted[1]).toMatchObject({
    type: "pantoken-scope",
    instanceId: "pantoken",
    theme: "rebrand",
  });

  detach();
  scope.set({ theme: "canvas" });
  expect(posted).toHaveLength(2);
  scope.destroy();
});

test("the registrations sheet is injected once, whichever instance asks", () => {
  document.head.innerHTML = "";
  expect(hasProperties()).toBe(false);
  expect(ensureProperties("@property --a { syntax: '*'; inherits: true; initial-value: 1; }")).toBe(
    true,
  );
  expect(ensureProperties("@property --a { syntax: '*'; inherits: true; initial-value: 2; }")).toBe(
    false,
  );
  expect(document.head.querySelectorAll("style[data-pantoken-properties]")).toHaveLength(1);
  expect(hasProperties()).toBe(true);
});

test("unrelated registration sheets can coexist under different ids", () => {
  document.head.innerHTML = "";
  ensureProperties(":root{}", { id: "a" });
  ensureProperties(":root{}", { id: "b" });
  expect(document.head.querySelectorAll("style[data-pantoken-properties]")).toHaveLength(2);
});

test("observeScope reports an ancestor retheming and stops on demand", async () => {
  document.body.innerHTML = `<div id="outer"><span id="x"></span></div>`;
  const outer = document.querySelector("#outer") as HTMLElement;
  const target = document.querySelector("#x") as HTMLElement;

  const seen: (string | undefined)[] = [];
  const stop = observeScope(target, (scope) => seen.push(scope.theme));

  outer.setAttribute("data-pantoken-theme", "canvas");
  await Promise.resolve();
  stop();
  outer.setAttribute("data-pantoken-theme", "rebrand");
  await Promise.resolve();

  expect(seen).toEqual(["canvas"]);
});
