import { expect, test } from "@playwright/test";
import type {} from "./fixtures/harness.ts";

for (const framework of ["react", "angular"]) {
  test.describe(framework, () => {
    test.beforeEach(async ({ page }) => {
      const initializationError = new Promise<never>((_, reject) => {
        page.once("pageerror", reject);
      });
      await Promise.race([
        page
          .goto(`/?framework=${framework}`)
          .then(() => page.waitForFunction(() => Boolean(window.a2uiTest))),
        initializationError,
      ]);
    });

    test("mounts every exported catalog component through the framework renderer", async ({
      page,
    }) => {
      const failures: string[] = [];
      page.on("pageerror", (error) => failures.push(error.message));
      const cases = await page.evaluate(() => window.a2uiTest.cases);
      expect(cases.length).toBeGreaterThan(0);
      for (const { name, tagName, props } of cases) {
        await test.step(name, async () => {
          await page.evaluate(
            ({ name, props }) =>
              window.a2uiTest.show([
                { id: "root", component: name, ...props },
                { id: "leaf", component: "PantokenBadge", label: "Nested content" },
              ]),
            { name, props },
          );
          await expect(page.locator(tagName)).toHaveCount(1);
          await expect
            .poll(() =>
              page
                .locator(tagName)
                .evaluate((element) =>
                  Array.from(element.shadowRoot?.children ?? []).some(
                    (child) => child.localName !== "style",
                  ),
                ),
            )
            .toBe(true);
        });
      }
      expect(failures).toEqual([]);
    });

    test("preserves input identity, focus, bindings, and sibling state on streaming updates", async ({
      page,
    }) => {
      await page.evaluate(() =>
        window.a2uiTest.show(
          [
            { id: "root", component: "PantokenView", children: ["input", "sibling"] },
            {
              id: "input",
              component: "PantokenTextInput",
              label: "Name",
              value: { "@path": "/name" },
            },
            { id: "sibling", component: "PantokenBadge", label: "Unchanged" },
          ],
          { name: "Ada" },
        ),
      );
      const input = page.locator("instui-text-input input");
      await input.fill("Grace");
      await expect.poll(() => page.evaluate(() => window.a2uiTest.data("/name"))).toBe("Grace");
      await input.focus();
      const original = await input.elementHandle();
      await page.evaluate(() =>
        window.a2uiTest.send([
          {
            version: "1.0",
            updateDataModel: { surfaceId: "test", path: "/name", value: "Katherine" },
          },
        ]),
      );
      await expect(input).toHaveValue("Katherine");
      await expect(input).toBeFocused();
      expect(await original!.evaluate((node) => node.isConnected)).toBe(true);
      await expect(page.locator("instui-badge")).toHaveText("Unchanged");
      await input.fill("Grace");
      await expect.poll(() => page.evaluate(() => window.a2uiTest.data("/name"))).toBe("Grace");
    });

    test("dispatches keyboard actions once and tears down listeners before remount", async ({
      page,
    }) => {
      const show = () =>
        page.evaluate(() =>
          window.a2uiTest.show(
            [
              {
                id: "root",
                component: "PantokenButton",
                label: "Save",
                action: { event: { name: "save", context: { itemId: { "@path": "/itemId" } } } },
              },
            ],
            { itemId: "item1" },
          ),
        );
      await show();
      const button = page.getByRole("button", { name: "Save" });
      await button.focus();
      await page.keyboard.press("Enter");
      await expect.poll(() => page.evaluate(() => window.a2uiTest.actions.length)).toBe(1);
      expect(await page.evaluate(() => window.a2uiTest.actions[0])).toMatchObject({
        name: "save",
        context: { itemId: "item1" },
      });
      const stale = await page.locator("instui-button").elementHandle();
      await page.evaluate(() => window.a2uiTest.unmount());
      await expect(button).toHaveCount(0);
      await stale!.evaluate((node) => node.dispatchEvent(new MouseEvent("click")));
      expect(await page.evaluate(() => window.a2uiTest.actions.length)).toBe(1);
      await page.evaluate(() => window.a2uiTest.remount());
      await show();
      await page.getByRole("button", { name: "Save" }).click();
      await expect.poll(() => page.evaluate(() => window.a2uiTest.actions.length)).toBe(1);
    });

    test("renders Basic children in Pantoken containers", async ({ page }) => {
      await page.evaluate(() =>
        window.a2uiTest.show([
          { id: "root", component: "PantokenView", children: ["basic"] },
          {
            id: "basic",
            component: "Text",
            text: "Framework child",
            catalogId: window.a2uiTest.basicCatalogId,
          },
        ]),
      );
      await expect(page.getByText("Framework child", { exact: true })).toBeVisible();
    });

    test("keeps typed checkbox and numeric edits in the data model", async ({ page }) => {
      await page.evaluate(() =>
        window.a2uiTest.show(
          [
            { id: "root", component: "PantokenView", children: ["check", "amount"] },
            {
              id: "check",
              component: "PantokenCheckbox",
              label: "Agree",
              checked: { "@path": "/agreed" },
            },
            {
              id: "amount",
              component: "PantokenNumberInput",
              label: "Amount",
              value: { "@path": "/amount" },
            },
          ],
          { agreed: false, amount: 1 },
        ),
      );
      await page.getByRole("checkbox", { name: "Agree" }).check();
      await page.getByRole("spinbutton", { name: "Amount" }).fill("42");
      await expect
        .poll(() =>
          page.evaluate(() => [window.a2uiTest.data("/agreed"), window.a2uiTest.data("/amount")]),
        )
        .toEqual([true, 42]);
    });

    test("reflects native dialog and popover dismissal back into bindings", async ({ page }) => {
      for (const component of ["PantokenModal", "PantokenPopover"]) {
        await page.evaluate(
          (component) =>
            window.a2uiTest.show(
              [
                { id: "root", component, open: { "@path": "/open" }, children: ["dismiss"] },
                { id: "dismiss", component: "PantokenButton", label: "Content" },
              ],
              { open: false },
            ),
          component,
        );
        await page.evaluate(() =>
          window.a2uiTest.send([
            {
              version: "1.0",
              updateDataModel: { surfaceId: "test", path: "/open", value: true },
            },
          ]),
        );
        await expect(page.getByRole("button", { name: "Content" })).toBeVisible();
        await page.getByRole("button", { name: "Content" }).focus();
        await page.keyboard.press("Escape");
        await expect.poll(() => page.evaluate(() => window.a2uiTest.data("/open"))).toBe(false);
      }
    });

    test("keyboard tab selection updates panels and the bound active index", async ({ page }) => {
      await page.evaluate(() =>
        window.a2uiTest.show(
          [
            {
              id: "root",
              component: "PantokenTabs",
              label: "Sections",
              tabLabels: ["One", "Two"],
              children: ["one", "two"],
              activeIndex: { "@path": "/index" },
            },
            { id: "one", component: "PantokenBadge", label: "First panel" },
            { id: "two", component: "PantokenBadge", label: "Second panel" },
          ],
          { index: 0 },
        ),
      );
      await page.getByRole("tab", { name: "One", exact: true }).focus();
      await page.keyboard.press("ArrowRight");
      await expect(page.getByRole("tab", { name: "Two", exact: true })).toBeFocused();
      await expect(page.getByRole("tab", { name: "Two", exact: true })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(page.getByRole("tabpanel").filter({ hasText: "Second panel" })).toBeVisible();
      await expect.poll(() => page.evaluate(() => window.a2uiTest.data("/index"))).toBe(1);
    });

    test("renders themed controls at desktop and mobile widths with reduced motion", async ({
      page,
    }) => {
      for (const width of [1280, 375]) {
        await page.setViewportSize({ width, height: 800 });
        for (const colorScheme of ["light", "dark"] as const) {
          await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
          await page.evaluate(() =>
            window.a2uiTest.show([
              { id: "root", component: "PantokenButton", label: "Themed button" },
            ]),
          );
          const button = page.getByRole("button", { name: "Themed button" });
          await expect(button).toBeVisible();
          const styles = await button.evaluate((element) => {
            const computed = getComputedStyle(element);
            return {
              background: computed.backgroundColor,
              width: element.getBoundingClientRect().width,
            };
          });
          expect(styles.background).not.toBe("rgba(0, 0, 0, 0)");
          expect(styles.width).toBeLessThanOrEqual(width);
          await button.focus();
          await expect(button).toBeFocused();
        }
      }
    });
  });
}
