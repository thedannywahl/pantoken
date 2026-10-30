// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test, vi, type MockInstance } from "vite-plus/test";
import { initModal } from "../src/behaviors/modal.ts";
import { makeOnCommand } from "../src/shared/index.ts";

let modalDialogs: WeakSet<HTMLDialogElement>;
let showModal: MockInstance<HTMLDialogElement["showModal"]>;
let close: MockInstance<HTMLDialogElement["close"]>;

beforeEach(() => {
  modalDialogs = new WeakSet();
  vi.spyOn(HTMLDialogElement.prototype, "matches").mockImplementation(function (
    this: HTMLDialogElement,
    selector,
  ) {
    return selector === ":modal"
      ? modalDialogs.has(this)
      : Element.prototype.matches.call(this, selector);
  });
  showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal").mockImplementation(function (
    this: HTMLDialogElement,
  ) {
    if (this.open && !modalDialogs.has(this))
      throw new DOMException("Dialog is already open nonmodally", "InvalidStateError");
    this.setAttribute("open", "");
    modalDialogs.add(this);
  });
  close = vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(function (
    this: HTMLDialogElement,
    returnValue,
  ) {
    if (!this.open) return;
    modalDialogs.delete(this);
    this.removeAttribute("open");
    if (returnValue !== undefined) this.returnValue = returnValue;
    this.dispatchEvent(new Event("close"));
  });
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

function setup(separate: boolean, initiallyOpen = false) {
  document.body.innerHTML = `
    <button command="--show" commandfor="m">Open</button>
    <button command="--close" commandfor="m">Close</button>
    <button command="--toggle" commandfor="m">Toggle</button>
    ${
      separate
        ? `<div id="m"${initiallyOpen ? " open" : ""}><dialog><p>Content</p></dialog></div>`
        : `<dialog id="m"${initiallyOpen ? " open" : ""}><p>Content</p></dialog>`
    }`;
  const host = document.getElementById("m")!;
  const dialog = document.querySelector("dialog")!;
  initModal(host, dialog, makeOnCommand(false));
  const command = (name: string) => {
    document.querySelector<HTMLButtonElement>(`[command="${name}"]`)!.click();
  };
  return { host, dialog, command };
}

test.each([false, true])("native methods own commands (separate host: %s)", (separate) => {
  const { host, dialog, command } = setup(separate);
  expect(dialog.open).toBe(false);
  command("--show");
  expect(host.hasAttribute("open")).toBe(true);
  expect(dialog.matches(":modal")).toBe(true);
  expect(showModal).toHaveBeenCalledTimes(1);
  command("--show");
  expect(showModal).toHaveBeenCalledTimes(1);
  command("--close");
  expect(host.hasAttribute("open")).toBe(false);
  expect(dialog.open).toBe(false);
  expect(dialog.matches(":modal")).toBe(false);
  expect(close).toHaveBeenCalledTimes(1);
  command("--close");
  expect(close).toHaveBeenCalledTimes(1);
  command("--toggle");
  expect(dialog.matches(":modal")).toBe(true);
  command("--toggle");
  expect(dialog.matches(":modal")).toBe(false);
  expect(host.hasAttribute("open")).toBe(false);
});

test.each([false, true])("initial open enters the top layer (separate host: %s)", (separate) => {
  const { host, dialog } = setup(separate, true);
  expect(host.hasAttribute("open")).toBe(true);
  expect(dialog.open).toBe(true);
  expect(dialog.matches(":modal")).toBe(true);
  expect(showModal).toHaveBeenCalledTimes(1);
});

test.each([false, true])(
  "external attributes synchronize native modality without a loop (separate host: %s)",
  async (separate) => {
    const { host, dialog } = setup(separate);
    host.setAttribute("open", "");
    await vi.waitFor(() => expect(dialog.matches(":modal")).toBe(true));
    host.removeAttribute("open");
    await vi.waitFor(() => expect(dialog.matches(":modal")).toBe(false));
    expect(dialog.open).toBe(false);
    expect(host.hasAttribute("open")).toBe(false);
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
  },
);

test.each([false, true])(
  "native close reflects state and only wrapper hosts re-dispatch (separate host: %s)",
  async (separate) => {
    const { host, dialog } = setup(separate, true);
    const closed = vi.fn();
    host.addEventListener("close", closed);
    dialog.close();
    await vi.waitFor(() => expect(host.hasAttribute("open")).toBe(false));
    expect(dialog.matches(":modal")).toBe(false);
    expect(closed).toHaveBeenCalledTimes(1);
    expect(closed.mock.calls[0]![0].bubbles).toBe(separate);
    expect(close).toHaveBeenCalledTimes(1);
  },
);

test.each([false, true])(
  "stale close events don't close a reopened dialog (separate host: %s)",
  (separate) => {
    const { host, dialog, command } = setup(separate, true);
    command("--close");
    command("--show");
    dialog.dispatchEvent(new Event("close"));
    expect(host.hasAttribute("open")).toBe(true);
    expect(dialog.matches(":modal")).toBe(true);
  },
);

test("a removed CSS open attribute can be restored before observer delivery", () => {
  const { host, dialog, command } = setup(false, true);
  host.removeAttribute("open");
  expect(dialog.matches(":modal")).toBe(true);
  command("--show");
  expect(dialog.open).toBe(true);
  expect(showModal).toHaveBeenCalledTimes(1);
});

test("initialization preserves an existing native modal", () => {
  const dialog = document.createElement("dialog");
  document.body.append(dialog);
  dialog.showModal();
  initModal(dialog, dialog, makeOnCommand(false));
  expect(showModal).toHaveBeenCalledTimes(1);
  expect(dialog.matches(":modal")).toBe(true);
});

test("native command events route without changing state for unknown commands", () => {
  const { host, dialog } = setup(false);
  for (const command of ["--unknown", "--show", "--close"]) {
    const event = Object.assign(new Event("command"), { command, source: null });
    host.dispatchEvent(event);
    expect(dialog.matches(":modal")).toBe(command === "--show");
  }
});

test("cancel listeners retain ownership of native dismissal policy", () => {
  const { host, dialog } = setup(false, true);
  dialog.addEventListener("cancel", (event) => event.preventDefault());
  const event = new Event("cancel", { cancelable: true });
  dialog.dispatchEvent(event);
  expect(event.defaultPrevented).toBe(true);
  expect(host.hasAttribute("open")).toBe(true);
  expect(dialog.matches(":modal")).toBe(true);
});
