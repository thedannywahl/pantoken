import type { CommandCycleOption } from "./useCommandCycle";

/**
 * AI assistant / agent CLI options shown on the agent face of `GetStartedTabs.vue`.
 *
 * Each option represents an AI CLI tool that can be invoked with the getting-started prompt.
 */
export const AI_OPTIONS: CommandCycleOption[] = [
  { id: "claude", label: "claude", launcher: "claude ", color: "#D97757", icon: "claudecode" },
  {
    id: "gemini",
    label: "gemini",
    launcher: "gemini ",
    color: "#0072e3",
    darkColor: "#ffddba",
    icon: "googlegemini",
  },
  {
    id: "cursor",
    label: "cursor",
    // The installed binary is `agent` (marketed as "Cursor CLI"/"cursor-agent" in its own docs).
    launcher: "agent ",
    // Cursor's brand mark is flat black — unreadable on a dark background, so light/dark instead
    // of the raw simple-icons hex.
    color: "#26251e",
    darkColor: "#edecec",
    icon: "cursor",
  },
  {
    id: "codex",
    label: "codex",
    launcher: "codex ",
    color: "#000",
    darkColor: "#fff",
    icon: "openai",
  },
  {
    id: "copilot",
    label: "copilot",
    // -p puts Copilot CLI in "programmatic mode" (its docs' term) for a plain prompt argument.
    launcher: "copilot -p ",
    color: "#8534F3",
    icon: "githubcopilot",
  },
  // Custom icon: simple-icons has no Amazon/AWS entry.
  {
    id: "q",
    label: "q",
    launcher: "q chat ",
    color: "#5921b8",
    darkColor: "#2fabff",
    icon: "amazon-q",
  },
];
