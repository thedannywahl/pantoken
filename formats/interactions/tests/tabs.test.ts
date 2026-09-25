// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initTabs } from "../src/behaviors/tabs.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

function setup() {
  document.body.innerHTML = `
    <div class="instui-tabs">
      <div role="tablist">
        <button role="tab" aria-selected="true" aria-controls="one">One</button>
        <button role="tab" aria-selected="false" aria-controls="two">Two</button>
      </div>
      <div id="one" role="tabpanel">First</div>
      <div id="two" role="tabpanel">Second</div>
    </div>`;
  const host = document.querySelector<HTMLElement>(".instui-tabs")!;
  const handle = initTabs(host);
  return { host, handle };
}

test("selects a tab and hides the other controlled panel", () => {
  const { host } = setup();
  const tabs = host.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  const panels = host.querySelectorAll<HTMLElement>('[role="tabpanel"]');

  tabs[1].click();

  expect(tabs[0].getAttribute("aria-selected")).toBe("false");
  expect(tabs[1].classList.contains("-selected")).toBe(true);
  expect(panels[0].hidden).toBe(true);
  expect(panels[1].hidden).toBe(false);
});

test("keyboard navigation selects and focuses the next enabled tab", () => {
  const { host } = setup();
  const tabs = host.querySelectorAll<HTMLButtonElement>('[role="tab"]');

  tabs[0].focus();
  tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));

  expect(document.activeElement).toBe(tabs[1]);
  expect(tabs[1].getAttribute("aria-selected")).toBe("true");
});

test("keyboard controls skip disabled tabs and activate the focused tab", () => {
  const { host } = setup();
  const tabs = host.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  tabs[1].disabled = true;
  const third = document.createElement("button");
  third.setAttribute("role", "tab");
  third.setAttribute("aria-controls", "missing");
  host.querySelector('[role="tablist"]')?.append(third);

  tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
  expect(document.activeElement).toBe(third);

  third.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
  expect(document.activeElement).toBe(tabs[0]);
  tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
  expect(document.activeElement).toBe(third);

  const activate = new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true });
  third.dispatchEvent(activate);
  expect(activate.defaultPrevented).toBe(true);
  expect(third.getAttribute("aria-selected")).toBe("true");
  expect(tabs[0].getAttribute("aria-selected")).toBe("false");
});

test("ignores disabled tabs and events outside its tablist", () => {
  const { host } = setup();
  const tabs = host.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  tabs[1].disabled = true;

  tabs[1].click();
  host.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));

  expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  expect(tabs[1].getAttribute("aria-selected")).toBe("false");
});

test("cleanup removes tab listeners", () => {
  const { host, handle } = setup();
  const tabs = host.querySelectorAll<HTMLButtonElement>('[role="tab"]');

  handle.cleanup();
  tabs[1].click();

  expect(tabs[0].getAttribute("aria-selected")).toBe("true");
});
