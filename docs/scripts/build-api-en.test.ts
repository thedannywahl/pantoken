import { beforeEach, expect, test, vi } from "vite-plus/test";

const mocks = vi.hoisted(() => ({
  refreshApiPot: vi.fn(),
  spawnSync: vi.fn<() => { status: number }>(),
}));

vi.mock("node:child_process", () => ({ spawnSync: mocks.spawnSync }));
vi.mock("./refresh-api-pot.ts", () => ({ refreshApiPot: mocks.refreshApiPot }));
vi.mock("./style-api-badges.ts", () => ({}));
vi.mock("./write-api-overview.ts", () => ({}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  delete process.env.DOCS_API_REFRESH_CATALOG;
  mocks.spawnSync.mockReturnValue({ status: 0 });
});

test("generates the English API without refreshing the catalog by default", async () => {
  await import("./build-api-en.ts");

  expect(mocks.spawnSync).toHaveBeenCalledOnce();
  expect(mocks.refreshApiPot).not.toHaveBeenCalled();
});

test("refreshes the API catalog only in build mode", async () => {
  process.env.DOCS_API_REFRESH_CATALOG = "1";

  await import("./build-api-en.ts");

  expect(mocks.refreshApiPot).toHaveBeenCalledExactlyOnceWith({ force: true });
});
