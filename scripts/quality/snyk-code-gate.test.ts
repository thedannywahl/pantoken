import { expect, test, vi, beforeEach } from "vite-plus/test";

// Mock process.exit to prevent the module from exiting during tests
vi.spyOn(process, "exit").mockImplementation((() => undefined) as never);

// Mock spawnSync to avoid actually running snyk
vi.mock("node:child_process", () => ({
  spawnSync: vi.fn(() => ({
    status: 0,
    stdout: '{"runs":[{"results":[]}]}',
    stderr: "",
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// Import after mocks are set up
const { locationOf, isAccepted, isMediumPlus, processResults, parseSarifOutput, runGate } =
  await import("./snyk-code-gate.ts");

test("locationOf extracts file path and line number from SARIF result", () => {
  const result = {
    locations: [
      {
        physicalLocation: {
          artifactLocation: { uri: "src/file.ts" },
          region: { startLine: 42 },
        },
      },
    ],
  };

  expect(locationOf(result)).toBe("src/file.ts:42");
});

test("locationOf returns unknown when location is missing", () => {
  const result = {
    locations: [],
  };

  expect(locationOf(result)).toBe("?");
});

test("isMediumPlus identifies error and warning level findings", () => {
  const error = { level: "error" };
  const warning = { level: "warning" };
  const note = { level: "note" };

  expect(isMediumPlus(error)).toBe(true);
  expect(isMediumPlus(warning)).toBe(true);
  expect(isMediumPlus(note)).toBe(false);
});

test("processResults separates blocking and advisory findings", () => {
  const findings = [
    { level: "error", ruleId: "rule1", locations: [] },
    { level: "warning", ruleId: "rule2", locations: [] },
    { level: "note", ruleId: "rule3", locations: [] },
  ];

  const { blocking, advisory } = processResults(findings);

  expect(blocking).toHaveLength(2); // error and warning
  expect(advisory).toHaveLength(1); // note
});

test("isAccepted returns false when finding is not on allowlist", () => {
  const result = {
    ruleId: "unknown/rule",
    locations: [
      {
        physicalLocation: {
          artifactLocation: { uri: "src/unknown.ts" },
        },
      },
    ],
  };

  expect(isAccepted(result)).toBe(false);
});

test("parseSarifOutput extracts results from valid SARIF JSON", () => {
  const sarifOutput = '{"runs":[{"results":[{"level":"error","message":{"text":"test"}}]}]}';
  const results = parseSarifOutput(sarifOutput);

  expect(results).toHaveLength(1);
  expect(results[0].level).toBe("error");
});

test("parseSarifOutput throws on invalid JSON", () => {
  expect(() => parseSarifOutput("invalid json")).toThrow("Failed to parse SARIF output");
});

test("runGate executes without error when snyk returns clean status", () => {
  const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  runGate();

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining("no findings at or above low severity"),
  );
  consoleSpy.mockRestore();
});
