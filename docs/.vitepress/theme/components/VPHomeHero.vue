<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { useData } from "vitepress";
import { onBeforeUnmount, onMounted, ref } from "vue";
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
import VPImage from "vitepress/dist/client/theme-default/components/VPImage.vue";
import GetStartedTabs from "./GetStartedTabs.vue";

interface HeroAction {
  theme?: "brand" | "alt";
  text: string;
  link: string;
  target?: string;
  rel?: string;
}

const { frontmatter: fm } = useData();

// Cycles the hero tagline's `.platform` pill through the emitted platforms, renderers, and
// bundler formats, each with its own glyph (`icon` maps to an `--instui-icon-<name>` token from
// pantoken.css) and casing convention.
const PLATFORMS = [
  { name: "web", label: "web", icon: "html5" },
  { name: "react", label: "React", icon: "react" },
  { name: "vue", label: "Vue", icon: "vuedotjs" },
  { name: "swift", label: "Swift", icon: "swift" },
  { name: "android", label: "Android", icon: "android" },
  { name: "wordpress", label: "WordPress", icon: "wordpress" },
  { name: "angular", label: "Angular", icon: "angular" },
  { name: "svelte", label: "Svelte", icon: "svelte" },
  { name: "astro", label: "Astro", icon: "astro" },
  { name: "vite", label: "Vite", icon: "vite" },
  { name: "webpack", label: "Webpack", icon: "webpack" },
  { name: "tailwind", label: "Tailwind", icon: "tailwindcss" },
  { name: "postcss", label: "PostCSS", icon: "postcss" },
  { name: "next", label: "Next.js", icon: "nextdotjs" },
  { name: "compose", label: "Compose", icon: "jetpackcompose" },
  { name: "flutter", label: "Flutter", icon: "flutter" },
  { name: "rust", label: "Rust", icon: "rust" },
  { name: "drupal", label: "Drupal", icon: "drupal" },
  { name: "hugo", label: "Hugo", icon: "hugo" },
  { name: "jekyll", label: "Jekyll", icon: "jekyll" },
  { name: "sass", label: "Sass", icon: "sass" },
  { name: "stylus", label: "Stylus", icon: "stylus" },
  { name: "storybook", label: "Storybook", icon: "storybook" },
  { name: "bootstrap", label: "Bootstrap", icon: "bootstrap" },
  { name: "docusaurus", label: "Docusaurus", icon: "docusaurus" },
  { name: "mintlify", label: "Mintlify", icon: "mintlify" },
  { name: "shadcn", label: "shadcn/ui", icon: "shadcnui" },
  { name: "web-components", label: "Web Components", icon: "webcomponentsdotorg" },
  { name: "mui", label: "MUI", icon: "mui" },
  { name: "foundation", label: "Foundation", icon: "zurb" },
  { name: "tinymce", label: "TinyMCE", icon: "tiny" },
] as const;

const heroTextRef = ref<HTMLElement | null>(null);
let cycleIntervalId: number | undefined;
let swapTimeoutId: number | undefined;
let syncViewportWidth: (() => void) | undefined;

const TRANSITION_MS = 450;

onMounted(() => {
  const platformEl = heroTextRef.value?.querySelector<HTMLElement>(".platform");
  if (!platformEl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let index = PLATFORMS.findIndex((platform) => platformEl.classList.contains(platform.name));
  if (index < 0) index = 0;

  const iconViewport = document.createElement("span");
  iconViewport.className = "platform-glyph-viewport";

  let currentIcon = document.createElement("span");
  currentIcon.className = "platform-glyph";
  currentIcon.style.setProperty("--pantoken-glyph", `var(--instui-icon-${PLATFORMS[index].icon})`);
  iconViewport.append(currentIcon);

  const viewport = document.createElement("span");
  viewport.className = "platform-viewport";

  let currentLabel = document.createElement("span");
  currentLabel.className = "platform-label";
  currentLabel.textContent = platformEl.textContent;
  viewport.append(currentLabel);

  platformEl.textContent = "";
  platformEl.append(iconViewport, viewport);
  viewport.style.width = `${currentLabel.offsetWidth}px`;

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
    const textBottom = textRange.getBoundingClientRect().bottom;

    const labelRange = document.createRange();
    labelRange.selectNodeContents(currentLabel.firstChild);
    const labelBottom = labelRange.getBoundingClientRect().bottom;

    viewport.style.top = `${textBottom - labelBottom}px`;
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

  cycleIntervalId = window.setInterval(() => {
    index = (index + 1) % PLATFORMS.length;
    const next = PLATFORMS[index];

    const nextIcon = document.createElement("span");
    nextIcon.className = "platform-glyph";
    nextIcon.style.setProperty("--pantoken-glyph", `var(--instui-icon-${next.icon})`);
    nextIcon.style.transform = "translateY(100%)";
    iconViewport.append(nextIcon);

    const nextLabel = document.createElement("span");
    nextLabel.className = "platform-label";
    nextLabel.textContent = next.label;
    nextLabel.style.transform = "translateY(100%)";
    viewport.append(nextLabel);

    // Force layout so the entering icon/label start below the box before their transforms animate.
    void nextLabel.offsetWidth;

    viewport.style.width = `${nextLabel.offsetWidth}px`;
    for (const platform of PLATFORMS) platformEl.classList.remove(platform.name);
    platformEl.classList.add(next.name);

    currentIcon.style.transform = "translateY(100%)";
    nextIcon.style.transform = "translateY(0)";
    currentLabel.style.transform = "translateY(100%)";
    nextLabel.style.transform = "translateY(0)";

    const exitingIcon = currentIcon;
    const exitingLabel = currentLabel;
    currentIcon = nextIcon;
    currentLabel = nextLabel;

    swapTimeoutId = window.setTimeout(() => {
      exitingIcon.remove();
      exitingLabel.remove();
      syncBaseline();
    }, TRANSITION_MS);
  }, 5000);
});

onBeforeUnmount(() => {
  window.clearInterval(cycleIntervalId);
  window.clearTimeout(swapTimeoutId);
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
        <GetStartedTabs />
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
