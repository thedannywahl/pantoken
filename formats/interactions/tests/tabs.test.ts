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

test("cleanup removes tab listeners", () => {
  const { host, handle } = setup();
  const tabs = host.querySelectorAll<HTMLButtonElement>('[role="tab"]');

  handle.cleanup();
  tabs[1].click();

  expect(tabs[0].getAttribute("aria-selected")).toBe("true");
});
