// @vitest-environment happy-dom
import { expect, test, vi } from "vite-plus/test";
import { connectScope, createScope } from "../src/scope.ts";
import { resolveScheme } from "../src/resolve.ts";

test("a connected frame follows its host and ignores everyone else", () => {
  document.body.innerHTML = "";
  const postMessage = vi.fn();
  const host = { postMessage } as unknown as Window;
  const changes: (string | undefined)[] = [];
  const disconnect = connectScope({
    instanceId: "preview",
    host,
    onChange: (config) => changes.push(config.theme),
  });

  // On boot it asks its host for state rather than guessing from the surrounding document.
  expect(postMessage).toHaveBeenCalledWith(
    { type: "pantoken-scope-request", instanceId: "preview" },
    "*",
  );

  const send = (data: unknown, source: Window | null = host): void => {
    window.dispatchEvent(new MessageEvent("message", { data, source, origin: "https://host" }));
  };

  send({ type: "pantoken-scope", instanceId: "preview", theme: "canvas", scheme: "dark" });
  expect(document.documentElement.getAttribute("data-pantoken-theme")).toBe("canvas");
  expect(document.documentElement.style.colorScheme).toBe("dark");

  // Another instance's message on the same channel must not retheme us.
  send({ type: "pantoken-scope", instanceId: "docs", theme: "rebrand" });
  expect(document.documentElement.getAttribute("data-pantoken-theme")).toBe("canvas");

  // Nor may a window that isn't our host.
  send({ type: "pantoken-scope", instanceId: "preview", theme: "rebrand" }, null);
  expect(document.documentElement.getAttribute("data-pantoken-theme")).toBe("canvas");

  expect(changes).toEqual(["canvas"]);

  disconnect();
  send({ type: "pantoken-scope", instanceId: "preview", theme: "rebrand" });
  expect(document.documentElement.hasAttribute("data-pantoken-theme")).toBe(false);
});

test("a connected frame enforces its host origin when one is given", () => {
  document.body.innerHTML = "";
  const host = { postMessage: vi.fn() } as unknown as Window;
  const disconnect = connectScope({ instanceId: "p", host, hostOrigin: "https://trusted" });

  window.dispatchEvent(
    new MessageEvent("message", {
      data: { type: "pantoken-scope", instanceId: "p", theme: "canvas" },
      source: host,
      origin: "https://evil",
    }),
  );
  expect(document.documentElement.hasAttribute("data-pantoken-theme")).toBe(false);

  window.dispatchEvent(
    new MessageEvent("message", {
      data: { type: "pantoken-scope", instanceId: "p", theme: "canvas" },
      source: host,
      origin: "https://trusted",
    }),
  );
  expect(document.documentElement.getAttribute("data-pantoken-theme")).toBe("canvas");
  disconnect();
});

test("a scope answers a request only from a frame it owns", () => {
  document.body.innerHTML = `<div id="a"></div>`;
  const scope = createScope(document.querySelector("#a") as HTMLElement, {
    theme: "canvas",
    persist: false,
  });

  const posted: unknown[] = [];
  const frame = document.createElement("iframe");
  const contentWindow = { postMessage: (m: unknown) => posted.push(m) };
  Object.defineProperty(frame, "contentWindow", { value: contentWindow });
  document.body.append(frame);
  scope.attachFrame(frame);
  posted.length = 0;

  const request = (source: unknown, instanceId: string): void => {
    window.dispatchEvent(
      new MessageEvent("message", {
        data: { type: "pantoken-scope-request", instanceId },
        source: source as Window,
      }),
    );
  };

  request({ postMessage: () => {} }, "pantoken");
  expect(posted).toHaveLength(0);

  request(contentWindow, "other-instance");
  expect(posted).toHaveLength(0);

  request(contentWindow, "pantoken");
  expect(posted).toHaveLength(1);

  scope.destroy();
});

test("a throwing storage backend never breaks theming", () => {
  document.body.innerHTML = `<div id="a"></div>`;
  const hostile = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("quota");
    },
  };

  const scope = createScope(document.querySelector("#a") as HTMLElement, {
    theme: "canvas",
    storage: hostile,
  });
  expect(scope.get().theme).toBe("canvas");
  scope.set({ theme: "rebrand" });
  expect(document.querySelector("#a")?.getAttribute("data-pantoken-theme")).toBe("rebrand");
  scope.destroy();
});

test("a stored scheme is restored only when it is a real scheme", () => {
  document.body.innerHTML = `<div id="a"></div>`;
  const map = new Map<string, string>([["pantoken:pantoken:scheme", "sepia"]]);
  const scope = createScope(document.querySelector("#a") as HTMLElement, {
    storage: { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => void map.set(k, v) },
  });
  expect(scope.get().scheme).toBeUndefined();
  scope.destroy();
});

test("an invalid scheme passed to set clears the pin rather than sticking", () => {
  document.body.innerHTML = `<div id="a"></div>`;
  const el = document.querySelector("#a") as HTMLElement;
  const scope = createScope(el, { scheme: "dark", persist: false });
  scope.set({ scheme: "sepia" });
  expect(scope.get().scheme).toBeUndefined();
  expect(el.hasAttribute("data-pantoken-scheme")).toBe(false);
  scope.destroy();
});

test("resolveScheme falls back to the computed color-scheme, then to the OS preference", () => {
  document.body.innerHTML = `<div id="a"><span id="x"></span></div>`;
  const target = document.querySelector("#x") as HTMLElement;

  // Set on the target itself: `color-scheme` inherits in a browser, but happy-dom's
  // getComputedStyle doesn't model that, and the branch under test is the same either way.
  target.style.colorScheme = "dark";
  expect(resolveScheme(target)).toBe("dark");

  target.style.colorScheme = "light";
  expect(resolveScheme(target)).toBe("light");

  // `light dark` is a preference list, not a pin, so it must fall through to the OS.
  target.style.colorScheme = "light dark";
  vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
  expect(resolveScheme(target)).toBe("dark");
  vi.restoreAllMocks();
});

test("resolveScheme on a detached element still answers", () => {
  expect(["light", "dark"]).toContain(resolveScheme(null));
});
