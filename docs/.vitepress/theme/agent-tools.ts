/**
 * Localized strings for the Agent Tools utility page (`<AgentToolsPage />`), supplied per locale via
 * `themeConfig.agentTools` (see `.vitepress/i18n.ts`) and read at runtime with `useData().theme`,
 * with the English values here as the fallback when a locale omits the block.
 */
export interface AgentToolsStrings {
  /** Page title. */
  title: string;
  /** Lead sentence under the title. */
  subtitle: string;
  /** Label before the provider selector. */
  providerLabel: string;
  /** Label before the package-manager selector. */
  packageManagerLabel: string;
  /** Copy button text. */
  copy: string;
  /** Download button text. */
  download: string;
  /** Copied button feedback. */
  copied: string;
  /** Open generated URL button text. */
  open: string;
  /** Open button label for provider-specific URL launch. */
  openInAgent: string;
  /** Text shown when the selected provider has no stable URL launch. */
  openUnavailable: string;
  /** New-project workflow tab label. */
  tabBootstrap: string;
  /** Existing-repo workflow tab label. */
  tabInstall: string;
  /** Registry workflow tab label. */
  tabRegistry: string;
  /** Agent-readable docs tab label. */
  tabDocs: string;
  /** New-project workflow heading. */
  bootstrapTitle: string;
  /** New-project workflow description. */
  bootstrapDescription: string;
  /** Platform selector label. */
  platformLabel: string;
  /** Target directory label. */
  directoryLabel: string;
  /** Existing-repo workflow heading. */
  installTitle: string;
  /** Existing-repo workflow description. */
  installDescription: string;
  /** Tool asset selector label. */
  toolLabel: string;
  /** Installed paths heading. */
  writesLabel: string;
  /** Registry workflow heading. */
  registryTitle: string;
  /** Registry workflow description. */
  registryDescription: string;
  /** Registry action selector label. */
  registryActionLabel: string;
  /** Registry item label. */
  registryItemLabel: string;
  /** Agent-readable docs heading. */
  docsTitle: string;
  /** Agent-readable docs description. */
  docsDescription: string;
  /** Existing-repo workflow agent prompt. */
  installPrompt: string;
  /** Registry workflow agent prompt. */
  registryPrompt: string;
  /** Agent-readable docs workflow prompt. */
  docsPrompt: string;
  /** Fallback docs command text. */
  docsCommand: string;
  /** Bootstrap skill URL card title. */
  createDomainTitle: string;
  /** Bootstrap skill URL card description. */
  createDomainDescription: string;
  /** Site LLM index card title. */
  llmsTitle: string;
  /** Site LLM index card description. */
  llmsDescription: string;
  /** Full site LLM context card title. */
  llmsFullTitle: string;
  /** Full site LLM context card description. */
  llmsFullDescription: string;
  /** Raw Markdown page card title. */
  pageMdTitle: string;
  /** Raw Markdown page card description. */
  pageMdDescription: string;
  /** Registry manifest card title. */
  registryManifestTitle: string;
  /** Registry manifest card description. */
  registryManifestDescription: string;
  /** Component capabilities manifest card title. */
  capabilitiesTitle: string;
  /** Component capabilities manifest card description. */
  capabilitiesDescription: string;
  /** CDN plugin manifest card title. */
  pluginsTitle: string;
  /** CDN plugin manifest card description. */
  pluginsDescription: string;
  /** API catalog card title. */
  apiCatalogTitle: string;
  /** API catalog card description. */
  apiCatalogDescription: string;
  /** VS Code custom data card title. */
  vscodeCustomDataTitle: string;
  /** VS Code custom data card description. */
  vscodeCustomDataDescription: string;
}

/** English defaults, also the fallback when a locale doesn't localize the Agent Tools utility. */
export const AGENT_TOOLS_DEFAULTS: AgentToolsStrings = {
  title: "Agent Tools",
  subtitle:
    "Pick a Pantoken agent workflow, generate the command or launch URL, and give your assistant the files it needs to stop guessing.",
  providerLabel: "Agent",
  packageManagerLabel: "Runner",
  copy: "Copy",
  download: "Download",
  copied: "Copied",
  open: "Open",
  openInAgent: "Open in {{agent}}",
  openUnavailable: "This agent does not publish a stable launch URL. Use Copy for the CLI prompt.",
  tabBootstrap: "Bootstrap",
  tabInstall: "Install assets",
  tabRegistry: "Registry",
  tabDocs: "Agent docs",
  bootstrapTitle: "Bootstrap a project",
  bootstrapDescription:
    "Scaffold a starter with Pantoken wired in and install the repo-local agent assets in the same pass.",
  platformLabel: "Platform",
  directoryLabel: "Directory",
  installTitle: "Add agent guidance to a repo",
  installDescription:
    "Install AGENTS.md, llms.txt, editor rules, and Claude skills into an existing project that already uses or is about to use Pantoken.",
  toolLabel: "Asset set",
  writesLabel: "Writes",
  registryTitle: "Work with the shadcn/ui registry",
  registryDescription:
    "Point an agent at Pantoken's indexed registry so it can search, inspect, and add CSS-backed registry items instead of inventing package names.",
  registryActionLabel: "Action",
  registryItemLabel: "Registry item",
  docsTitle: "Agent-readable documentation",
  docsDescription:
    "Pantoken publishes fetchable documentation and manifests for assistants that can browse URLs or read raw Markdown.",
  installPrompt:
    "Install Pantoken agent guidance in this repository. Use {{command}}, then summarize the files written and when future agents should read them.",
  registryPrompt:
    "Use the Pantoken shadcn registry for this project. Fetch https://pantoken.app/r/registry.json, then run {{command}} if the project uses shadcn or has components.json. Registry items install CSS and metadata, not React components.",
  docsPrompt:
    "Fetch https://pantoken.app/llms.txt first. When a page is needed, prefer its raw Markdown URL by adding .md to the clean docs path, and use Pantoken manifests for component capabilities, CDN plugins, demos, and registry items.",
  docsCommand:
    "Fetch https://pantoken.app/llms.txt, then follow links to the pages and manifests relevant to this task.",
  createDomainTitle: "Bootstrap skill URL",
  createDomainDescription:
    "The short public URL any URL-capable agent can fetch to set up Pantoken.",
  llmsTitle: "Site index",
  llmsDescription: "Canonical English documentation index for agents and LLM-aware clients.",
  llmsFullTitle: "Full site context",
  llmsFullDescription: "Expanded LLM context for agents that need the complete documentation set.",
  pageMdTitle: "Raw Markdown pages",
  pageMdDescription: "Every docs HTML page advertises a raw Markdown alternate link.",
  registryManifestTitle: "Registry manifest",
  registryManifestDescription: "shadcn-compatible index of Pantoken CSS registry items.",
  capabilitiesTitle: "Component capabilities",
  capabilitiesDescription:
    "Machine-readable map of component CSS, JavaScript, icon, and dependency needs.",
  pluginsTitle: "CDN plugin manifest",
  pluginsDescription: "Plugin styles available to CDN and standalone mockup workflows.",
  apiCatalogTitle: "API catalog",
  apiCatalogDescription: "Machine-readable linkset for Pantoken's agent-readable resources.",
  vscodeCustomDataTitle: "VS Code custom data",
  vscodeCustomDataDescription: "HTML classes and CSS custom properties for VS Code IntelliSense.",
};
