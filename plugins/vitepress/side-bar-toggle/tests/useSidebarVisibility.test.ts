// @vitest-environment happy-dom
import { beforeAll, beforeEach, describe, expect, it } from "vite-plus/test";

import { DEFAULT_HIDDEN_CLASS, DEFAULT_STORAGE_KEY } from "../src/inline-script.ts";
import { useSidebarVisibility } from "../src/useSidebarVisibility.ts";

const values = new Map<string, string>();
const storage: Storage = {
  get length() {
    return values.size;
  },
  clear: () => values.clear(),
  getItem: (key) => values.get(key) ?? null,
  key: (index) => [...values.keys()][index] ?? null,
  removeItem: (key) => values.delete(key),
  setItem: (key, value) => values.set(key, value),
};

describe("useSidebarVisibility", () => {
  beforeAll(() => Object.defineProperty(window, "localStorage", { value: storage }));

  beforeEach(() => {
    document.documentElement.className = "";
    storage.clear();
  });

  it("defaults to visible when the bootstrap script never applied the hidden class", () => {
    const { isHidden } = useSidebarVisibility();
    expect(isHidden.value).toBe(false);
  });

  it("picks up the class the inline bootstrap script already applied", () => {
    document.documentElement.classList.add(DEFAULT_HIDDEN_CLASS);
    const { isHidden } = useSidebarVisibility();
    expect(isHidden.value).toBe(true);
  });

  it("toggle() flips state, updates the class, and persists to localStorage", () => {
    const { isHidden, toggle } = useSidebarVisibility();

    toggle();
    expect(isHidden.value).toBe(true);
    expect(document.documentElement.classList.contains(DEFAULT_HIDDEN_CLASS)).toBe(true);
    expect(storage.getItem(DEFAULT_STORAGE_KEY)).toBe("true");

    toggle();
    expect(isHidden.value).toBe(false);
    expect(document.documentElement.classList.contains(DEFAULT_HIDDEN_CLASS)).toBe(false);
    expect(storage.getItem(DEFAULT_STORAGE_KEY)).toBe("false");
  });

  it("show() synchronizes a hidden sidebar back to visible", () => {
    document.documentElement.classList.add(DEFAULT_HIDDEN_CLASS);
    storage.setItem(DEFAULT_STORAGE_KEY, "true");
    const { isHidden, show } = useSidebarVisibility();

    show();

    expect(isHidden.value).toBe(false);
    expect(document.documentElement.classList.contains(DEFAULT_HIDDEN_CLASS)).toBe(false);
    expect(storage.getItem(DEFAULT_STORAGE_KEY)).toBe("false");
  });

  it("honors a custom storage key and hidden class", () => {
    const { toggle } = useSidebarVisibility({ storageKey: "k", hiddenClass: "c" });
    toggle();
    expect(document.documentElement.classList.contains("c")).toBe(true);
    expect(storage.getItem("k")).toBe("true");
  });
});
