<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import { ASSETS } from "../../../../packages/scaffold/generated/assets";
import { AGENT_TOOLS_DEFAULTS, type AgentToolsStrings } from "../agent-tools";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import { useHashParamRef } from "../composables/usePickerHelpers";
import { GET_STARTED_TABS_DEFAULTS, type GetStartedTabsStrings } from "../get-started";
import { useShikiHighlight } from "../composables/useShikiHighlight";
import AgentAssetEmbed from "./AgentAssetEmbed.vue";
import { AI_OPTIONS } from "./ai-options";
import type { CommandCycleOption } from "./useCommandCycle";

type TabKey = "bootstrap" | "install" | "docs";
type AssetFilter = "all" | "agents" | "skills";

type ProviderOption = CommandCycleOption & {
  kind: "cli" | "web" | "copy";
  url?: (prompt: string) => string;
};

interface LinkInfo {
  id: string;
  title: string;
  href?: string;
  value: string;
  links?: { href: string; value: string }[];
  description: string;
}

type AssetKey =
  | "agents"
  | "cursor"
  | "copilot"
  | "windsurf"
  | "initSkill"
  | "createAppSkill"
  | "createMockupSkill";

interface InstallAsset {
  id: string;
  title: string;
  description: string;
  paths: string[];
  content: string;
  publicHref?: string;
}

interface AssetTarget {
  file: string;
  asset: AssetKey;
}

const { theme } = useData<{
  agentTools?: AgentToolsStrings;
  getStartedTabs?: GetStartedTabsStrings;
}>();
const t = computed(() => ({ ...AGENT_TOOLS_DEFAULTS, ...theme.value.agentTools }));
const getStartedTabs = computed<GetStartedTabsStrings>(
  () => theme.value.getStartedTabs ?? GET_STARTED_TABS_DEFAULTS,
);

const cliProviders: ProviderOption[] = AI_OPTIONS.map((option) => ({
  ...option,
  kind: "cli",
  url: option.id === "claude" ? agentWebUrl("https://claude.ai/new?q=") : undefined,
}));
const providers: ProviderOption[] = [
  ...cliProviders,
  {
    id: "chatgpt",
    label: "ChatGPT",
    launcher: "",
    color: "#0A7A5F",
    darkColor: "#10A37F",
    icon: "openai",
    kind: "web",
    url: (prompt: string) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "vscode",
    label: "VS Code",
    launcher: "",
    color: "#007ACC",
    icon: "vscode",
    kind: "web",
    url: (prompt: string) => {
      const payload = JSON.stringify({ query: prompt, isPartialQuery: true });
      return `vscode://command/workbench.action.chat.open?${encodeURIComponent(payload)}`;
    },
  },
];

const assetFilters: { id: AssetFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "agents", label: "Agents" },
  { id: "skills", label: "Skills" },
];

const assetTitles: Record<AssetKey, string> = {
  agents: "AGENTS.md",
  cursor: "Cursor rules",
  copilot: "Copilot instructions",
  windsurf: "Windsurf rules",
  initSkill: "init-pantoken skill",
  createAppSkill: "create-pantoken-app skill",
  createMockupSkill: "create-pantoken-mockup skill",
};

const publicAssetHrefs: Partial<Record<AssetKey, string>> = {
  createAppSkill: "/create-pantoken-app.md",
};

const assetTargets: Record<Exclude<AssetFilter, "all">, AssetTarget[]> = {
  agents: [
    { file: "AGENTS.md", asset: "agents" },
    { file: ".cursor/rules/pantoken.mdc", asset: "cursor" },
    { file: ".github/copilot-instructions.md", asset: "copilot" },
    { file: ".windsurf/rules/pantoken.md", asset: "windsurf" },
  ],
  skills: [
    { file: ".claude/skills/init-pantoken/SKILL.md", asset: "initSkill" },
    { file: ".claude/skills/create-pantoken-app/SKILL.md", asset: "createAppSkill" },
    { file: ".claude/skills/create-pantoken-mockup/SKILL.md", asset: "createMockupSkill" },
  ],
};

const docsLinks = computed<LinkInfo[]>(() => [
  {
    id: "create-domain",
    title: t.value.createDomainTitle,
    href: "https://create.pantoken.app/SKILL.md",
    value: "https://create.pantoken.app/SKILL.md",
    description: t.value.createDomainDescription,
  },
  {
    id: "llms",
    title: t.value.llmsTitle,
    href: "/llms.txt",
    value: "/llms.txt",
    description: t.value.llmsDescription,
  },
  {
    id: "llms-full",
    title: t.value.llmsFullTitle,
    href: "/llms-full.txt",
    value: "/llms-full.txt",
    description: t.value.llmsFullDescription,
  },
  {
    id: "page-md",
    title: t.value.pageMdTitle,
    href: "/guide/agent-tools.md",
    value: "/guide/<page>.md",
    description: t.value.pageMdDescription,
  },
  {
    id: "capabilities",
    title: t.value.capabilitiesTitle,
    href: "/component-capabilities.json",
    value: "/component-capabilities.json",
    description: t.value.capabilitiesDescription,
  },
  {
    id: "plugins",
    title: t.value.pluginsTitle,
    href: "/cdn-plugin-manifest.json",
    value: "/cdn-plugin-manifest.json",
    description: t.value.pluginsDescription,
  },
  {
    id: "api-catalog",
    title: t.value.apiCatalogTitle,
    href: "/.well-known/api-catalog",
    value: "/.well-known/api-catalog",
    description: t.value.apiCatalogDescription,
  },
  {
    id: "vscode-custom-data",
    title: t.value.vscodeCustomDataTitle,
    value: "VS Code custom data",
    links: [
      {
        href: "/html-custom-data.json",
        value: "/html-custom-data.json",
      },
      {
        href: "/css-custom-data.json",
        value: "/css-custom-data.json",
      },
    ],
    description: t.value.vscodeCustomDataDescription,
  },
]);

const initialTab = readHashParam("agent_tab");
const activeTab = ref<TabKey>(
  initialTab === "install" || initialTab === "docs" ? initialTab : "bootstrap",
);
watch(activeTab, (tab) => writeHashParam("agent_tab", tab, "bootstrap"));

const providerId = useHashParamRef("agent_provider", "claude");
const assetFilterParam = useHashParamRef("agent_asset_filter", "all");
const copied = ref<string | null>(null);

const provider = computed(
  () => providers.find(({ id }) => id === providerId.value) ?? providers[0],
);

const assetFilter = computed<AssetFilter>(() =>
  isAssetFilter(assetFilterParam.value) ? assetFilterParam.value : "all",
);
const installAssets = computed(() => assetsForFilter(assetFilter.value));
const bootstrapPromptText = computed(() => unquoteShellPrompt(getStartedTabs.value.agentPrompt));
const promptHighlightLang = ref("bash");
const highlightedBootstrapPrompt = useShikiHighlight(bootstrapPromptText, promptHighlightLang);
const openText = computed(
  () => provider.value.url?.(bootstrapPromptText.value) ?? t.value.openUnavailable,
);
const cliText = computed(() =>
  provider.value.launcher
    ? `${provider.value.launcher}${getStartedTabs.value.agentPrompt}`
    : shellQuote(bootstrapPromptText.value),
);
const canOpenOutput = computed(() => provider.value.url !== undefined);
const openLabel = computed(() => template(t.value.openInAgent, { agent: provider.value.label }));

function agentWebUrl(prefix: string): (prompt: string) => string {
  return (prompt: string) => `${prefix}${encodeURIComponent(prompt)}`;
}

function assetsForFilter(filter: AssetFilter): InstallAsset[] {
  const targets = filter === "all" ? Object.values(assetTargets).flat() : assetTargets[filter];
  const byAsset = new Map<AssetKey, InstallAsset>();
  for (const target of targets) {
    const asset = byAsset.get(target.asset);
    if (asset) {
      if (!asset.paths.includes(target.file)) asset.paths.push(target.file);
      continue;
    }
    byAsset.set(target.asset, {
      id: target.asset,
      title: assetTitles[target.asset],
      description: `Saved as ${target.file}`,
      paths: [target.file],
      content: ASSETS[target.asset],
      publicHref: publicAssetHrefs[target.asset],
    });
  }
  return [...byAsset.values()].map((asset) => ({
    ...asset,
    description: `Saved as ${asset.paths.join(", ")}`,
  }));
}

function isAssetFilter(value: string): value is AssetFilter {
  return value === "all" || value === "agents" || value === "skills";
}

function shellQuote(value: string): string {
  return JSON.stringify(value);
}

function unquoteShellPrompt(value: string): string {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
}

function template(value: string, replacements: Record<string, string>): string {
  return Object.entries(replacements).reduce(
    (text, [key, replacement]) => text.replaceAll(`{{${key}}}`, replacement),
    value,
  );
}

function downloadName(asset: InstallAsset): string {
  return asset.paths[0].split("/").at(-1) ?? `${asset.id}.md`;
}

function downloadAsset(asset: InstallAsset): void {
  const url = URL.createObjectURL(
    new Blob([asset.content], { type: "text/markdown;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = downloadName(asset);
  link.click();
  URL.revokeObjectURL(url);
}

async function copy(value: string, key: string): Promise<void> {
  if (!navigator.clipboard?.writeText) return;
  try {
    await navigator.clipboard.writeText(value);
    copied.value = key;
    setTimeout(() => {
      if (copied.value === key) copied.value = null;
    }, 2000);
  } catch {
    copied.value = null;
  }
}
</script>

<template>
  <div class="agent-tools-page instui-view">
    <header class="agent-tools-page__hero --display-flex --gap-sm --mb-lg">
      <h1 class="instui-heading -level-h1 -variant-title-page agent-tools-page__title --m-0">
        {{ t.title }}
      </h1>
      <p class="instui-text -color-secondary agent-tools-page__subtitle --m-0">{{ t.subtitle }}</p>
    </header>

    <div class="instui-tabs --mb-xl">
      <div class="list" role="tablist">
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'bootstrap'"
          @click="activeTab = 'bootstrap'"
        >
          {{ t.tabBootstrap }}
        </button>
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'install'"
          @click="activeTab = 'install'"
        >
          {{ t.tabInstall }}
        </button>
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'docs'"
          @click="activeTab = 'docs'"
        >
          {{ t.tabDocs }}
        </button>
      </div>
      <div class="panel" role="tabpanel">
        <section
          v-if="activeTab === 'bootstrap'"
          class="agent-tools-page__panel --display-flex --gap-md"
        >
          <div class="agent-tools-page__intro --display-flex --gap-sm --mt-md">
            <h2 class="instui-heading -level-h2 --m-0">{{ t.bootstrapTitle }}</h2>
            <p class="instui-text -color-secondary --m-0">{{ t.bootstrapDescription }}</p>
          </div>
          <div
            class="agent-tools-page__prompt-wrapper instui-view --border-radius-lg --padding-xs --background-ai-horizontal"
          >
            <div class="language-prompt agent-tools-page__prompt-container instui-view">
              <select
                v-model="providerId"
                class="instui-simple-select agent-tools-page__provider-select"
                :aria-label="t.providerLabel"
              >
                <option v-for="option in providers" :key="option.id" :value="option.id">
                  {{ option.label }}
                </option>
              </select>
              <a
                v-if="canOpenOutput"
                class="agent-tools-page__open instui-button -size-sm -color-secondary -on-color -without-border --mt-xs"
                :class="provider.icon ? `-icon-${provider.icon}` : undefined"
                :href="openText"
                :title="openLabel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="instui-screen-reader-content">{{ openLabel }}</span>
              </a>
              <button
                class="copy agent-tools-page__copy instui-button -size-sm -color-secondary -on-color -without-border -icon-copy --mt-xs"
                type="button"
                :title="t.copy"
                :data-copied="copied === 'output' ? t.copied : undefined"
                @click="copy(cliText, 'output')"
              >
                <span class="instui-screen-reader-content">{{
                  copied === "output" ? t.copied : t.copy
                }}</span>
              </button>
              <div v-if="highlightedBootstrapPrompt" v-html="highlightedBootstrapPrompt" />
              <pre
                v-else
                class="agent-tools-page__prompt-text"
              ><code>{{ bootstrapPromptText }}</code></pre>
            </div>
          </div>
        </section>

        <section
          v-else-if="activeTab === 'install'"
          class="agent-tools-page__panel --display-flex --gap-md"
        >
          <div class="agent-tools-page__intro --display-flex --gap-sm --mt-md">
            <h2 class="instui-heading -level-h2 --m-0">{{ t.installTitle }}</h2>
            <p class="instui-text -color-secondary --m-0">{{ t.installDescription }}</p>
          </div>
          <fieldset class="instui-radio-input-group -variant-toggle agent-tools-page__asset-filter">
            <legend>{{ t.toolLabel }}</legend>
            <label
              v-for="option in assetFilters"
              :key="option.id"
              class="instui-radio -variant-toggle"
            >
              <input
                v-model="assetFilterParam"
                type="radio"
                name="agent-asset-filter"
                :value="option.id"
              />
              {{ option.label }}
            </label>
          </fieldset>
          <div
            class="agent-tools-page__asset-list --display-flex --gap-sm"
            :aria-label="t.writesLabel"
          >
            <details
              v-for="asset in installAssets"
              :key="asset.id"
              class="instui-toggle-group agent-tools-page__asset"
            >
              <summary class="agent-tools-page__asset-summary">
                <span class="agent-tools-page__asset-heading --display-flex --gap-2xs">
                  <span class="instui-text -weight-bold">{{ asset.title }}</span>
                  <span class="instui-text -size-small -color-secondary">{{
                    asset.description
                  }}</span>
                </span>
                <span class="agent-tools-page__asset-actions --gap-2xs --ms-auto">
                  <a
                    v-if="asset.publicHref"
                    class="agent-tools-page__asset-download instui-button -size-sm -color-secondary -icon-download"
                    :href="asset.publicHref"
                    :download="downloadName(asset)"
                    :title="t.download"
                    @click.stop
                  >
                    <span class="instui-screen-reader-content">{{ t.download }}</span>
                  </a>
                  <button
                    v-else
                    class="agent-tools-page__asset-download instui-button -size-sm -color-secondary -icon-download"
                    type="button"
                    :title="t.download"
                    @click.stop.prevent="downloadAsset(asset)"
                  >
                    <span class="instui-screen-reader-content">{{ t.download }}</span>
                  </button>
                  <button
                    class="copy agent-tools-page__asset-copy instui-button -size-sm -color-primary -icon-copy"
                    type="button"
                    :title="t.copy"
                    :data-copied="copied === `asset:${asset.id}` ? t.copied : undefined"
                    @click.stop.prevent="copy(asset.content, `asset:${asset.id}`)"
                  >
                    <span class="instui-screen-reader-content">{{
                      copied === `asset:${asset.id}` ? t.copied : t.copy
                    }}</span>
                  </button>
                </span>
              </summary>
              <AgentAssetEmbed :content="asset.content" />
            </details>
          </div>
        </section>

        <section v-else class="agent-tools-page__panel --display-flex --gap-md">
          <div class="agent-tools-page__intro --display-flex --gap-sm --mt-md">
            <h2 class="instui-heading -level-h2 --m-0">{{ t.docsTitle }}</h2>
            <p class="instui-text -color-secondary --m-0">{{ t.docsDescription }}</p>
          </div>
          <ul class="instui-list -unstyled -inline agent-tools-page__links --gap-md">
            <li v-for="link in docsLinks" :key="link.id">
              <article class="instui-card agent-tools-page__link-card --display-flex --gap-sm">
                <h3 class="instui-heading -level-h3 --m-0">{{ link.title }}</h3>
                <p class="instui-text -size-small -color-secondary --m-0">{{ link.description }}</p>
                <ul class="instui-list -unstyled agent-tools-page__asset-links">
                  <li v-if="link.href">
                    <a
                      class="instui-link -size-small agent-tools-page__link"
                      :href="link.href"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ link.value }}
                    </a>
                  </li>
                  <template v-else-if="link.links">
                    <li v-for="customDataLink in link.links" :key="customDataLink.href">
                      <a
                        class="instui-link -size-small agent-tools-page__link"
                        :href="customDataLink.href"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {{ customDataLink.value }}
                      </a>
                    </li>
                  </template>
                  <li v-else>
                    <code
                      class="instui-view -display-inline-block -background-secondary -border-radius-small agent-tools-page__path"
                      >{{ link.value }}</code
                    >
                  </li>
                </ul>
              </article>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
@import "@pantoken/plugin-custom-icons/icons/amazon-q.css";
@import "@pantoken/plugin-custom-icons/icons/openai.css";
@import "@pantoken/plugin-custom-icons/icons/vscode.css";
@import "@pantoken/plugin-simple-icons/icons/claudecode.css";
@import "@pantoken/plugin-simple-icons/icons/googlegemini.css";
@import "@pantoken/plugin-simple-icons/icons/cursor.css";
@import "@pantoken/plugin-simple-icons/icons/githubcopilot.css";
</style>

<style scoped>
.agent-tools-page {
  max-width: 1040px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.agent-tools-page__hero {
  flex-direction: column;
}

.agent-tools-page__intro {
  flex-direction: column;
}

.agent-tools-page__subtitle {
  max-width: 44rem;
  line-height: 1.55;
}

.agent-tools-page__link {
  color: var(--instui-color-text-interactive-navigation-primary-base, var(--vp-c-brand-1));
  overflow-wrap: anywhere;
}

.agent-tools-page__links,
.agent-tools-page__link-card,
.agent-tools-page__asset-list,
.agent-tools-page__asset {
  max-width: 100%;
  min-width: 0;
}

/* `-inline` centers items by default; cards should stretch to equal height instead. */
.agent-tools-page__links.-inline {
  align-items: stretch;
}

.agent-tools-page__prompt-container {
  position: relative;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}

.agent-tools-page__provider-select {
  max-width: max-content;
}

.agent-tools-page__prompt-text {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 3rem 1.5rem 1.25rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  background: transparent;
}

.agent-tools-page__prompt-container :deep(pre) {
  margin: 0.25rem 0 0;
  padding: 1.25rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  background: var(--vp-code-block-bg);
  border-radius: 0 0 var(--instui-border-radius-md) var(--instui-border-radius-md);
}

.agent-tools-page__prompt-container :deep(code) {
  white-space: pre-wrap;
}

.agent-tools-page__copy {
  position: absolute;
  top: 0.25rem;
  inset-block-start: 0;
  inset-inline-end: 0.5rem;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  opacity: 1 !important;
  visibility: visible !important;
}

.agent-tools-page__open {
  position: absolute;
  z-index: 3;
  inset-block-start: 0;
  inset-inline-end: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  opacity: 1;
}

.agent-tools-page__panel {
  flex-direction: column;
}

.agent-tools-page__asset-list {
  flex-direction: column;
}

.agent-tools-page__asset {
  overflow: hidden;
}

.agent-tools-page__asset-summary {
  align-items: center;
}

.agent-tools-page__asset-heading {
  flex-direction: column;
  min-width: 0;
}

.agent-tools-page__asset-actions {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
}

.agent-tools-page__asset-copy {
  flex: 0 0 auto;
}

/* No pantoken gap step matches this list's 0.375rem inter-item spacing exactly. */
.agent-tools-page__asset-links > li + li {
  margin-block-start: 0.375rem;
}

.agent-tools-page__path {
  min-width: 0;
  max-width: 100%;
  padding: 0.125rem 0.375rem;
  font-size: 0.75rem;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.agent-tools-page__links > li {
  display: flex;
  flex: 1 1 280px;
  min-width: min(100%, 280px);
}

.agent-tools-page__link-card {
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  min-width: 0;
}

.agent-tools-page__asset-links {
  min-width: 0;
}

@media (max-width: 640px) {
  .agent-tools-page {
    padding: 1.5rem 1rem;
  }
}
</style>
