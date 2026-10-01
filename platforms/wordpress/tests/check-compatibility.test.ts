import { afterEach, expect, test, vi } from "vite-plus/test";
import { checkCompatibility } from "../scripts/check-compatibility.ts";

afterEach(() => vi.unstubAllGlobals());

test("rejects an invalid release before requesting a schema", async () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  await expect(checkCompatibility("7.1/other")).rejects.toThrow("Invalid WordPress release");
  expect(fetchMock).not.toHaveBeenCalled();
});

test("reports missing schemas and unsupported dialects", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
  await expect(checkCompatibility("6.6")).rejects.toThrow("HTTP 404");

  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ $schema: "unknown" }) }),
  );
  await expect(checkCompatibility("6.6")).rejects.toThrow("Unsupported WordPress schema dialect");
});

test.each(["draft-04", "draft-07"])("validates a generated v3 theme against %s", async (draft) => {
  const log = vi.spyOn(console, "log").mockImplementation(() => {});
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        $schema: `http://json-schema.org/${draft}/schema#`,
        type: "object",
        properties: { version: { const: 3 } },
        required: ["version"],
      }),
    }),
  );
  await expect(checkCompatibility("6.6")).resolves.toBeUndefined();
  expect(log).toHaveBeenCalled();
  log.mockRestore();
});
