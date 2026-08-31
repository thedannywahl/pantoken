<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useData } from "vitepress";
import { useCommandCycle, type CommandCycleOption } from "./useCommandCycle";
import CommandCycleRow from "./CommandCycleRow.vue";
import TerminalChrome from "./TerminalChrome.vue";
import { GET_STARTED_TABS_DEFAULTS, type GetStartedTabsStrings } from "../get-started";

const pmOptions: CommandCycleOption[] = [
  { id: "vpx", label: "vp", launcher: "vpx ", color: "#6b77f8", icon: "vite-plus" },
  { id: "pnpm", label: "pnpm", launcher: "pnpm dlx ", color: "#F69220", icon: "pnpm" },
  {
    id: "deno",
    label: "deno",
    launcher: "deno run npm:",
    color: "#00b84d",
    darkColor: "#70ffaf",
    icon: "deno",
  },
  { id: "bun", label: "bun", launcher: "bunx ", color: "#ff2e97", icon: "bun" },
  { id: "npm", label: "npm", launcher: "npx ", color: "#CB3837", icon: "npm" },
  { id: "yarn", label: "yarn", launcher: "yarn dlx ", color: "#2C8EBB", icon: "yarn" },
];

const aiProviderOptions: CommandCycleOption[] = [
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
  // No bundled icon: simple-icons (this repo's icon set) has no Amazon/AWS entry.
  {
    id: "q",
    label: "q",
    launcher: "q chat ",
    color: "#5921b8",
    darkColor: "#2fabff",
    icon: "amazon-q",
  },
];

const activeSurface = ref<"terminal" | "agent">("terminal");
const terminalHovered = ref(false);
const terminalTextHovered = ref(false);
const agentHovered = ref(false);
const agentTextHovered = ref(false);

const BASE_COMMAND = "create-pantoken-app";
// Quoted so the copied/typed line is one valid shell argument for every launcher above — unlike
// the old bare `/scaffold-pantoken` slash command, this prompt is a full sentence with spaces.
const AGENT_PROMPT =
  '"Fetch https://pantoken.app/create-pantoken-app.md and follow it to set up pantoken in this project."';

type DocsThemeWithGetStartedTabs = {
  getStartedTabs?: GetStartedTabsStrings;
};
const { theme } = useData<DocsThemeWithGetStartedTabs>();
const getStartedTabs = computed<GetStartedTabsStrings>(
  () => theme.value.getStartedTabs ?? GET_STARTED_TABS_DEFAULTS,
);

const isPaused = ref(false);
const reducedMotion = ref(false);
// User-toggled pause, independent of (and overriding) the hover/focus auto-pause below.
const manuallyPaused = ref(false);

const TYPE_MS = 70;
const DELETE_MS = 40;
const HOLD_MS = 1400;
// A touch longer than HOLD_MS so the new word's arrival reads as a deliberate beat, not a rebound.
const START_HOLD_MS = 1700;
const BLINK_MS = 600;

const timings = {
  typeMs: TYPE_MS,
  deleteMs: DELETE_MS,
  holdMs: HOLD_MS,
  startHoldMs: START_HOLD_MS,
  blinkMs: BLINK_MS,
};

// Agent prompts are longer than package-manager commands, so type/delete ~1.5x faster to keep
// the cycle feeling brisk.
const AGENT_SPEED_MULTIPLIER = 1.5;
const agentTimings = {
  ...timings,
  typeMs: TYPE_MS / AGENT_SPEED_MULTIPLIER,
  deleteMs: DELETE_MS / AGENT_SPEED_MULTIPLIER,
};

const terminalCycle = useCommandCycle({
  options: pmOptions,
  suffix: BASE_COMMAND,
  isPaused,
  reducedMotion,
  timings,
});

const agentCycle = useCommandCycle({
  options: aiProviderOptions,
  suffix: AGENT_PROMPT,
  isPaused,
  reducedMotion,
  timings: agentTimings,
});

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.location.hash === "#ai") activeSurface.value = "agent";
  terminalCycle.start();
  agentCycle.start();
});

onUnmounted(() => {
  terminalCycle.stop();
  agentCycle.stop();
});

// Hovering/focusing mid-type or mid-backspace jumps straight to the fully-typed line, not wherever
// the animation happened to be — pausing shouldn't leave a half-typed or half-erased command visible.
function pause() {
  isPaused.value = true;
  terminalCycle.pauseAtFull();
  agentCycle.pauseAtFull();
}
function resume() {
  // The manual toggle wins over a hover/focus-driven resume (e.g. mouseleave while paused).
  if (manuallyPaused.value) return;
  isPaused.value = false;
  terminalCycle.resume();
  agentCycle.resume();
}

function toggleManualPause() {
  manuallyPaused.value = !manuallyPaused.value;
  if (manuallyPaused.value) {
    pause();
  } else {
    resume();
  }
}

function enterTerminal() {
  terminalHovered.value = true;
  pause();
}

function leaveTerminal() {
  terminalHovered.value = false;
  terminalTextHovered.value = false;
  resume();
}

function enterAgent() {
  agentHovered.value = true;
  pause();
}

function leaveAgent() {
  agentHovered.value = false;
  agentTextHovered.value = false;
  resume();
}

function tone(option: CommandCycleOption): string {
  return option.darkColor ? `light-dark(${option.color}, ${option.darkColor})` : option.color;
}

// The active command's color, mapped to a CSS var so the stage can react to it.
const highlightColor = computed(() =>
  tone(
    activeSurface.value === "terminal"
      ? terminalCycle.activeOption.value
      : agentCycle.activeOption.value,
  ),
);
</script>

<template>
  <div class="gs-started">
    <div class="gs-started__mode" role="tablist" aria-label="Getting started mode">
      <button
        type="button"
        class="instui-button -shape-circle -icon-terminal -without-background -without-border gs-started__mode-btn"
        :class="{ 'is-active': activeSurface === 'terminal' }"
        :aria-selected="activeSurface === 'terminal'"
        aria-label="Terminal mode"
        @click="activeSurface = 'terminal'"
      >
        <span class="instui-screen-reader-content">{{ getStartedTabs.cliInstall }}</span>
      </button>
      <button
        type="button"
        class="instui-button -shape-circle -icon-igniteai-logo -without-background -without-border gs-started__mode-btn"
        :class="{ 'is-active': activeSurface === 'agent' }"
        :aria-selected="activeSurface === 'agent'"
        aria-label="Agent shell mode"
        @click="activeSurface = 'agent'"
      >
        <span class="instui-screen-reader-content">{{ getStartedTabs.aiInstall }}</span>
      </button>
    </div>

    <div
      class="gs-started__stage"
      :class="{ '-agent': activeSurface === 'agent' }"
      :style="{ '--gs-highlight': highlightColor }"
    >
      <div class="gs-started__flipper">
        <div class="gs-started__face gs-started__face--terminal">
          <div
            class="gs-terminal"
            @mouseenter="enterTerminal"
            @mouseleave="leaveTerminal"
            @focusin="pause"
            @focusout="resume"
          >
            <TerminalChrome
              :manually-paused="manuallyPaused"
              :play-label="getStartedTabs.playAnimation"
              :pause-label="getStartedTabs.pauseAnimation"
              @toggle="toggleManualPause"
            />

            <div class="gs-terminal__body">
              <div
                class="gs-terminal__command-zone"
                @mouseenter="terminalTextHovered = true"
                @mouseleave="terminalTextHovered = false"
              >
                <pre><code
                    ><CommandCycleRow
                      :cycle="terminalCycle"
                      :options="pmOptions"
                      copy-label="Copy command"
                      :copied-label="getStartedTabs.copied"
                      suffix-variant="terminal"
                      :copy-visible="terminalHovered"
                      :popover-visible="terminalHovered && terminalTextHovered"
                      :auto-open-on-row-hover="false"
                      popover-placement="below"
                    /></code
                  ></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="gs-started__face gs-started__face--agent">
          <div
            class="gs-terminal gs-agent-terminal"
            @mouseenter="enterAgent"
            @mouseleave="leaveAgent"
            @focusin="pause"
            @focusout="resume"
          >
            <TerminalChrome
              :manually-paused="manuallyPaused"
              :play-label="getStartedTabs.playAnimation"
              :pause-label="getStartedTabs.pauseAnimation"
              @toggle="toggleManualPause"
            />

            <div class="gs-terminal__body gs-agent-terminal__body">
              <div class="instui-agent-shell gs-agent-shell">
                <div class="gs-agent-shell__prompt-muted" aria-hidden="true">
                  <span class="instui-icon -icon-sparkles" aria-hidden="true"></span>
                  <span>What would you like to build today?</span>
                </div>
                <div class="gs-agent">
                  <div class="gs-agent__body" aria-hidden="true"></div>

                  <div
                    class="gs-agent__input-wrap"
                    @mouseenter="agentTextHovered = true"
                    @mouseleave="agentTextHovered = false"
                  >
                    <CommandCycleRow
                      :cycle="agentCycle"
                      :options="aiProviderOptions"
                      copy-label="Copy agent input"
                      :copied-label="getStartedTabs.copied"
                      suffix-variant="agent"
                      :copy-visible="agentHovered"
                      :popover-visible="agentHovered && agentTextHovered"
                      :auto-open-on-row-hover="false"
                      popover-placement="above"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "@pantoken/plugin-custom-icons/icons/vite-plus.css";
@import "@pantoken/plugin-custom-icons/icons/amazon-q.css";
@import "@pantoken/plugin-simple-icons/icons/npm.css";
@import "@pantoken/plugin-simple-icons/icons/pnpm.css";
@import "@pantoken/plugin-simple-icons/icons/deno.css";
@import "@pantoken/plugin-simple-icons/icons/bun.css";
@import "@pantoken/plugin-simple-icons/icons/yarn.css";
@import "@pantoken/plugin-simple-icons/icons/claudecode.css";
@import "@pantoken/plugin-simple-icons/icons/googlegemini.css";
@import "@pantoken/plugin-simple-icons/icons/cursor.css";
@import "@pantoken/plugin-custom-icons/icons/openai.css";
@import "@pantoken/plugin-simple-icons/icons/githubcopilot.css";
</style>

<style scoped>
.gs-started {
  margin-inline-end: 2rem;
}

.gs-started__mode {
  display: inline-flex;
  gap: 0.35rem;
  margin-block-end: 0.75rem;
}

.gs-started__mode-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 2rem;
  block-size: 2rem;
  min-inline-size: 0;
  min-block-size: 0;
  padding: 0;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 180ms ease;
  color-scheme: dark;
}

.gs-started__mode-btn.on-color {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 18%, transparent);
}

.gs-started__mode-btn:hover,
.gs-started__mode-btn:focus-visible {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 28%, transparent);
}

.gs-started__mode-btn.is-active {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 42%, transparent);
}

.gs-started__stage {
  position: relative;
  aspect-ratio: 4 / 3;
  perspective: 1100px;
}

/* A shadow beneath the card, outside the flipper's 3D transform (so it doesn't get its own
   backface-hidden face), but rotated in lockstep with the flipper so it reads as attached to
   whichever face is currently up rather than a shadow fixed to the terminal face alone. */
.gs-started__stage::after {
  content: "";
  position: absolute;
  z-index: 0;
  inset-inline: 4%;
  inset-block-end: -48px;
  block-size: 22px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  filter: blur(10px);
  pointer-events: none;
  transform: rotateY(-15deg);
  transition: transform 560ms cubic-bezier(0.22, 1, 0.36, 1);
}

.gs-started__stage.-agent::after {
  transform: rotateY(165deg);
}

.gs-started__flipper {
  position: absolute;
  z-index: 1;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateY(-15deg);
  transition: transform 560ms cubic-bezier(0.22, 1, 0.36, 1);
  /* Keeps the tilted bitmap on its own compositor layer so per-keystroke typewriter repaints
     don't force Firefox to re-rasterize it, which otherwise tears the tilted edges. */
  will-change: transform;
}

.gs-started__stage.-agent .gs-started__flipper {
  transform: rotateY(165deg);
}

.gs-started__face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  will-change: transform;
  background: light-dark(
    var(--instui-color-background-container),
    var(--instui-color-background-page)
  );
  border-radius: 8px;
}

.gs-started__face--agent {
  transform: rotateY(180deg);
}

.gs-terminal {
  block-size: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: light-dark(
    var(--instui-color-background-container),
    var(--instui-color-background-page)
  );
  /* Own compositor layer so interior repaints (copy button hover, popovers) don't re-rasterize
     the tilted face bitmap and tear its edges. */
  will-change: transform;
}

.gs-terminal__body {
  flex: 1;
  min-block-size: 0;
  padding: 1.5rem;
  /* Visible, not hidden: the copy button's "copied" popover sits above the command row and would
     otherwise get clipped right where it overlaps the chrome bar. */
  overflow: visible;
}

.gs-terminal__body pre {
  margin: 0;
  padding: 0;
  border: 0;
  box-shadow: none;
  background: transparent;
  overflow: visible;
}

.gs-terminal__body code {
  border: 0;
  background: transparent;
  color: var(--instui-component-text-primary-color);
  font-family: var(--vp-font-family-mono, monospace);
}

.gs-terminal__command-zone {
  inline-size: fit-content;
}

.gs-agent-terminal__body {
  padding: 0;
  /* Lets the AI-tool popover escape the chrome instead of being clipped by it. */
  overflow: visible;
}

.gs-agent-shell {
  position: relative;
  block-size: 100%;
  min-inline-size: 0;
  min-block-size: 0;
  border-radius: 0 0 8px 8px;
  overflow: visible;
}

.gs-agent-shell__prompt-muted {
  position: absolute;
  inset-block-start: 42%;
  inset-inline-start: 50%;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transform: translate(-50%, -50%);
  color: var(--vp-c-text-3);
  font-size: 0.78rem;
  letter-spacing: 0.01em;
  white-space: nowrap;
  opacity: 0.85;
  pointer-events: none;
  z-index: 0;
}

.gs-agent-shell__prompt-muted > .instui-icon.-icon-sparkles {
  font-size: 0.92rem;
}

.gs-agent {
  position: relative;
  z-index: 1;
  block-size: 100%;
  display: grid;
  grid-template-rows: minmax(2.5rem, 1fr) auto;
  overflow: visible;
}

.gs-agent__body {
  position: relative;
  padding: 0.5rem 1rem;
  /* Clips this gradient layer's own corners since ancestors no longer clip for us. */
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--vp-c-bg-soft) 45%, transparent),
    transparent
  );
}

.gs-agent__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  min-block-size: 0;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--vp-c-divider);
  background: light-dark(#ffffff, #11161c);
  border-radius: 0 0 8px 8px;
  font-family: var(--vp-font-family-mono, monospace);
}

.gs-agent__input-wrap :deep(.gs-command-row) {
  /* Plain inline flow, not flex: flex-wrap wraps whole items (icon/launcher/suffix/cursor), which
     breaks right at the tool-name boundary and can strand the cursor on its own near-empty flex
     line. Normal inline layout wraps within the text itself (word boundaries, or anywhere inside
     the long URL via the suffix's overflow-wrap below) and keeps the cursor glued to wherever the
     text currently ends. `inline-block` (not `inline`) keeps it a single fragment, so the
     copy/popover overlays' `position: absolute` stays anchored to one box even once this wraps
     across multiple lines. */
  display: inline-block;
  max-inline-size: 100%;
}

.gs-agent__input-wrap :deep(.gs-command-row__suffix.-agent) {
  overflow-wrap: anywhere;
  word-break: break-word;
}

@media (prefers-reduced-motion: reduce) {
  .gs-started__flipper,
  .gs-started__stage::after {
    transition: none;
  }
}

/* On narrow viewports there's no room to read the 3D tilt as depth, so square the flip up to a
   flat 0/180 and give the stage some breathing room instead. */
@media (max-width: 959px) {
  .gs-started {
    margin-block: 2rem;
  }

  .gs-started__flipper,
  .gs-started__stage::after {
    transform: rotateY(0deg);
  }

  .gs-started__stage.-agent .gs-started__flipper,
  .gs-started__stage.-agent::after {
    transform: rotateY(180deg);
  }
}
</style>
