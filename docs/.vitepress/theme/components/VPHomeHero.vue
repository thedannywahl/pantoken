<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { useData } from "vitepress";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
import VPImage from "vitepress/dist/client/theme-default/components/VPImage.vue";
import GetStartedTabs from "./GetStartedTabs.vue";
import {
  PLATFORM_CATEGORY_ORDER,
  PLATFORM_OPTIONS,
  type PlatformOption,
} from "./platform-options.ts";
import { usePlatformTerminalCycle } from "./usePlatformTerminalCycle.ts";

interface HeroAction {
  theme?: "brand" | "alt";
  text: string;
  link: string;
  target?: string;
  rel?: string;
}

type DocsThemeWithPlatformPicker = {
  platformPicker?: { label?: string };
  sidebar?: { apiGroups?: Partial<Record<PlatformOption["category"], string>> };
};

const { frontmatter: fm, theme } = useData<DocsThemeWithPlatformPicker>();

const pickerLabel = () => theme.value.platformPicker?.label ?? "Choose a platform";
const categoryLabel = (category: PlatformOption["category"]) =>
  theme.value.sidebar?.apiGroups?.[category] ?? category;

const heroTextRef = ref<HTMLElement | null>(null);
let syncViewportWidth: (() => void) | undefined;
let exitTimeoutId: number | undefined;
let enterTimeoutId: number | undefined;
let menuOpen = false;
let hovering = false;
let focused = false;

const reducedMotion = ref(false);

// Shared with GetStartedTabs.vue's mock terminal (a child of this component) — the pill's slide
// and the terminal's type/backspace are driven by the same phase machine so they stay in lockstep.
const platformCycle = usePlatformTerminalCycle({ reducedMotion });

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const platformEl = heroTextRef.value?.querySelector<HTMLElement>(".platform");
  if (!platformEl) {
    // No `.platform` pill in this page's hero text — still drive the terminal.
    platformCycle.start();
    return;
  }
  const platformElement: HTMLElement = platformEl;

  const initialIndex = PLATFORM_OPTIONS.findIndex((platform) =>
    platformElement.classList.contains(platform.name),
  );
  if (initialIndex >= 0) platformCycle.platformIndex.value = initialIndex;

  const iconViewport = document.createElement("span");
  iconViewport.className = "platform-glyph-viewport";

  let currentIcon = document.createElement("span");
  currentIcon.className = "platform-glyph";
  currentIcon.style.setProperty(
    "--pantoken-glyph",
    `var(--instui-icon-${platformCycle.activePlatform.value.icon})`,
  );
  iconViewport.append(currentIcon);

  const viewport = document.createElement("span");
  viewport.className = "platform-viewport";

  let currentLabel = document.createElement("span");
  currentLabel.className = "platform-label";
  currentLabel.textContent = platformElement.textContent;
  viewport.append(currentLabel);

  const srLabel = document.createElement("span");
  srLabel.className = "instui-screen-reader-content";
  srLabel.textContent = `${pickerLabel()}: `;

  const chevron = document.createElement("span");
  chevron.className = "platform-picker__chevron";
  chevron.setAttribute("aria-hidden", "true");

  platformElement.textContent = "";
  platformElement.append(srLabel, iconViewport, viewport, chevron);
  viewport.style.width = `${currentLabel.offsetWidth}px`;

  platformElement.setAttribute("role", "button");
  platformElement.setAttribute("tabindex", "0");
  platformElement.setAttribute("aria-haspopup", "true");
  platformElement.setAttribute("aria-expanded", "false");
  // Pantoken's own on-color focus ring (base.css's `-focus-color-inverse` modifier) — the hero's
  // colored background makes the default ring color too low-contrast to read.
  platformElement.classList.add("-focus-color-inverse");

  // .platform's flex centering positions the viewport geometrically, not by text baseline, so
  // measure and correct the gap against the surrounding "accessible" text — recomputed on resize
  // since the required offset isn't a fixed ratio of font-size across breakpoints.
  const syncBaseline = () => {
    const line = heroTextRef.value?.querySelector<HTMLElement>(".platform-line");
    const textNode = Array.from(line?.childNodes ?? []).find(
      (n): n is Text => n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim(),
    );
    if (!textNode || !currentLabel.firstChild) return;

    viewport.style.top = "0px";
    const textRange = document.createRange();
    textRange.selectNodeContents(textNode);
    const textRect = textRange.getBoundingClientRect();

    // The explicit hero line break puts the pill below this text; don't apply same-line baseline math.
    if (platformElement.getBoundingClientRect().top >= textRect.bottom) return;

    const labelRange = document.createRange();
    labelRange.selectNodeContents(currentLabel.firstChild);
    const labelBottom = labelRange.getBoundingClientRect().bottom;

    viewport.style.top = `${textRect.bottom - labelBottom}px`;
  };
  syncBaseline();

  // Keep the box width and baseline correct across breakpoint changes without waiting for the next cycle.
  syncViewportWidth = () => {
    viewport.style.transition = "none";
    viewport.style.width = `${currentLabel.offsetWidth}px`;
    void viewport.offsetWidth;
    viewport.style.transition = "";
    syncBaseline();
  };
  window.addEventListener("resize", syncViewportWidth);

  // `font-display: swap` paints the fallback face first, so the initial `syncBaseline()` above can
  // measure fallback-font metrics and go stale once the brand face finishes loading; resync once it has.
  void document.fonts?.ready.then(() => syncViewportWidth?.());

  const TRANSITION_MS = 450;

  /** Slide the current label/glyph out into `.platform-viewport`'s clipping window. */
  function slideOut() {
    // Captured here, not read from the shared `currentIcon`/`currentLabel` at removal time —
    // `slideIn` reassigns those to the *next* platform's elements well before this timeout fires.
    const outgoingIcon = currentIcon;
    const outgoingLabel = currentLabel;
    outgoingIcon.style.transform = "translateY(100%)";
    outgoingLabel.style.transform = "translateY(100%)";
    clearTimeout(exitTimeoutId);
    exitTimeoutId = window.setTimeout(() => {
      outgoingIcon.remove();
      outgoingLabel.remove();
    }, TRANSITION_MS);
  }

  /** Build and slide in the label/glyph for the (already current) `activePlatform`. */
  function slideIn(animate: boolean) {
    const next = platformCycle.activePlatform.value;

    const nextIcon = document.createElement("span");
    nextIcon.className = "platform-glyph";
    nextIcon.style.setProperty("--pantoken-glyph", `var(--instui-icon-${next.icon})`);
    if (animate) nextIcon.style.transform = "translateY(100%)";
    iconViewport.append(nextIcon);

    const nextLabel = document.createElement("span");
    nextLabel.className = "platform-label";
    nextLabel.textContent = next.label;
    if (animate) nextLabel.style.transform = "translateY(100%)";
    viewport.append(nextLabel);

    // Force layout so an entering icon/label starts below the box before its transform animates.
    void nextLabel.offsetWidth;

    viewport.style.width = `${nextLabel.offsetWidth}px`;
    for (const platform of PLATFORM_OPTIONS) platformElement.classList.remove(platform.name);
    platformElement.classList.add(next.name);
    srLabel.textContent = `${pickerLabel()}: `;

    if (animate) {
      nextIcon.style.transform = "translateY(0)";
      nextLabel.style.transform = "translateY(0)";
    }

    currentIcon = nextIcon;
    currentLabel = nextLabel;
    clearTimeout(enterTimeoutId);
    enterTimeoutId = window.setTimeout(syncBaseline, animate ? TRANSITION_MS : 0);
  }

  // Auto-cycle: the pill slides out at the end of `typing`/`deleting` (phase → "exiting") and back
  // in once the next platform is current (phase → "entering", which only ever follows "exiting").
  watch(platformCycle.phase, (phase) => {
    if (phase === "exiting") slideOut();
    else if (phase === "entering") slideIn(true);
  });

  // Manual pick (the dropdown below) sets `platformIndex` directly and forces `phase` to "paused"
  // in the same tick — that combination never happens during the auto-cycle (which only changes
  // `platformIndex` while transitioning into "entering"), so it's an unambiguous "snap instantly"
  // signal, distinct from the animated auto-cycle path above.
  watch(platformCycle.platformIndex, () => {
    if (platformCycle.phase.value === "paused") {
      slideOut();
      slideIn(false);
    }
  });

  // --- Categorized dropdown (opens on click, closes on Escape/outside click/blur) ---

  const menu = document.createElement("div");
  menu.className = "platform-picker__menu hero-popover";
  menu.setAttribute("role", "menu");

  for (const category of PLATFORM_CATEGORY_ORDER) {
    const items = PLATFORM_OPTIONS.filter((p) => p.category === category);
    if (items.length === 0) continue;

    const groupId = `platform-picker-group-${category}`;
    const group = document.createElement("div");
    group.setAttribute("role", "group");
    group.setAttribute("aria-labelledby", groupId);

    const title = document.createElement("div");
    title.className = "platform-picker__group-title";
    title.id = groupId;
    title.textContent = categoryLabel(category);
    group.append(title);

    for (const option of items) {
      const index = PLATFORM_OPTIONS.indexOf(option);
      const item = document.createElement("button");
      item.type = "button";
      item.setAttribute("role", "menuitem");
      // `light-dark()` so each icon still clears WCAG's 3:1 non-text contrast minimum against the
      // popover's background in both site themes (see platform-options.ts).
      item.style.color = option.darkColor
        ? `light-dark(${option.color}, ${option.darkColor})`
        : option.color;

      const glyph = document.createElement("span");
      glyph.className = "platform-picker__icon";
      glyph.style.setProperty("--pantoken-glyph", `var(--instui-icon-${option.icon})`);
      glyph.setAttribute("aria-hidden", "true");

      item.append(glyph, document.createTextNode(option.label));
      item.addEventListener("click", (event) => {
        event.stopPropagation();
        platformCycle.pickPlatform(index);
        closeMenu();
        platformElement.focus({ preventScroll: true });
      });
      group.append(item);
    }

    menu.append(group);
  }

  platformElement.append(menu);

  function menuItems(): HTMLButtonElement[] {
    return Array.from(menu.querySelectorAll("button"));
  }

  function openMenu() {
    if (menuOpen) return;
    menuOpen = true;
    menu.classList.add("-open");
    platformElement.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    menu.classList.remove("-open");
    platformElement.setAttribute("aria-expanded", "false");
  }

  // --- Pause on hover/focus/active; resume only once neither, the menu is closed, and the
  //     terminal isn't also being interacted with (see GetStartedTabs.vue's own pause/resume). ---

  function maybeResume() {
    if (!hovering && !focused && !menuOpen) platformCycle.resume();
  }

  platformElement.addEventListener("mouseenter", () => {
    hovering = true;
    platformCycle.pause();
    openMenu();
  });
  platformElement.addEventListener("mouseleave", () => {
    hovering = false;
    if (!focused) closeMenu();
    maybeResume();
  });
  platformElement.addEventListener("focusin", () => {
    focused = true;
    platformCycle.pause();
  });
  platformElement.addEventListener("focusout", (event) => {
    const next = event.relatedTarget as Node | null;
    if (next && platformElement.contains(next)) return;
    focused = false;
    if (!hovering) closeMenu();
    maybeResume();
  });

  platformElement.addEventListener("click", (event) => {
    if ((event.target as HTMLElement)?.closest(".platform-picker__menu")) return;
    // Mouse users always hover before they click, which has already opened the menu — a plain
    // toggle here would immediately close what hover just opened. Only a tap (no prior hover, e.g.
    // touch) toggles; a real mouse click while hovering is a no-op (mouseleave closes it instead).
    if (menuOpen && !hovering) closeMenu();
    else if (!menuOpen) {
      openMenu();
      menuItems()[0]?.focus({ preventScroll: true });
    }
  });

  platformElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
      menuItems()[0]?.focus({ preventScroll: true });
    } else if (event.key === "Escape" && menuOpen) {
      closeMenu();
    }
  });

  menu.addEventListener("keydown", (event) => {
    const items = menuItems();
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      platformElement.focus({ preventScroll: true });
    }
  });

  platformCycle.start();
});

onBeforeUnmount(() => {
  clearTimeout(exitTimeoutId);
  clearTimeout(enterTimeoutId);
  platformCycle.stop();
  if (syncViewportWidth) window.removeEventListener("resize", syncViewportWidth);
});
</script>

<template>
  <div v-if="fm.hero" class="VPHero VPHomeHero" :class="{ 'has-image': fm.hero.image }">
    <div class="container">
      <div class="main">
        <slot name="home-hero-info-before" />
        <slot name="home-hero-info">
          <h1 class="heading">
            <span v-if="fm.hero.name" v-html="fm.hero.name" class="name clip"></span>
            <span v-if="fm.hero.text" ref="heroTextRef" v-html="fm.hero.text" class="text"></span>
          </h1>
          <p v-if="fm.hero.tagline" v-html="fm.hero.tagline" class="tagline"></p>
        </slot>
        <slot name="home-hero-info-after" />

        <div v-if="fm.hero.actions" class="actions">
          <slot name="home-hero-actions-before-actions" />
          <div
            v-for="(action, index) in fm.hero.actions as HeroAction[]"
            :key="`${action.link}-${index}`"
            class="action"
          >
            <VPButton
              tag="a"
              size="medium"
              :theme="action.theme"
              :text="action.text"
              :href="action.link"
              :target="action.target"
              :rel="action.rel"
            />
          </div>
        </div>
        <slot name="home-hero-actions-after" />
      </div>

      <div class="home-started-terminal">
        <GetStartedTabs :cycle="platformCycle" />
      </div>

      <div v-if="fm.hero.image" class="image">
        <div class="image-container">
          <div class="image-bg" />
          <slot name="home-hero-image">
            <VPImage
              v-if="fm.hero.image"
              class="image-src"
              :image="fm.hero.image as DefaultTheme.ThemeableImage"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

@media (min-width: 640px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

.VPHero:not(.has-image) .container {
  align-items: flex-start;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.main {
  position: relative;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
}

.home-started-terminal {
  /* Higher than `.main`'s stacking context (z-index: 10) so a wide platform-pill label (e.g.
     "Web Components") overflows behind the terminal card instead of painting on top of it. */
  position: relative;
  z-index: 20;
  order: 3;
  width: min(100%, 400px);
  max-width: 400px;
  margin-top: 1rem;
}

.VPHero.has-image .container {
  text-align: center;
}

@media (min-width: 960px) {
  .VPHero.has-image .container {
    text-align: left;
  }
}

@media (min-width: 960px) {
  .VPHero:not(.has-image) .container {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 2rem;
    align-items: center;
  }

  .VPHero:not(.has-image) .main {
    order: 1;
    flex: 1 1 auto;
    width: auto;
    min-width: 0;
  }

  .VPHero:not(.has-image) .home-started-terminal {
    order: 2;
    flex: 0 0 400px;
    width: 400px;
    max-width: 400px;
    margin-top: 0;
    align-self: center;
  }

  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  .VPHero.has-image .main {
    max-width: 592px;
  }

  .home-started-terminal {
    margin-top: 1.5rem;
  }
}

.heading {
  display: flex;
  flex-direction: column;
}

.name,
.text {
  width: fit-content;
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.VPHero.has-image .name,
.VPHero.has-image .text {
  margin: 0 auto;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }

  .VPHero.has-image .name,
  .VPHero.has-image .text {
    margin: 0;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.VPHero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }

  .VPHero.has-image .tagline {
    margin: 0;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
}

.VPHero.has-image .actions {
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

@media (min-width: 960px) {
  .VPHero.has-image .actions {
    justify-content: flex-start;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}

.image {
  order: 1;
  margin: -76px -24px -48px;
}

@media (min-width: 640px) {
  .image {
    margin: -108px -24px -48px;
  }
}

@media (min-width: 960px) {
  .image {
    flex-grow: 1;
    order: 2;
    margin: 0;
    min-height: 100%;
  }
}

.image-container {
  position: relative;
  margin: 0 auto;
  width: 320px;
  height: 320px;
}

@media (min-width: 640px) {
  .image-container {
    width: 392px;
    height: 392px;
  }
}

@media (min-width: 960px) {
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transform: translate(-32px, -32px);
  }
}

.image-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  .image-bg {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  .image-bg {
    width: 320px;
    height: 320px;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 192px;
  max-height: 192px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  :deep(.image-src) {
    max-width: 256px;
    max-height: 256px;
  }
}

@media (min-width: 960px) {
  :deep(.image-src) {
    max-width: 320px;
    max-height: 320px;
  }
}
</style>
