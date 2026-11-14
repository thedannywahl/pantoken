<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useData } from "vitepress";
import catalogData from "../generated/a2ui-catalog.json";
import type { A2uiCatalogStrings } from "../a2ui-catalog";
import { useShikiHighlight } from "../composables/useShikiHighlight";

type PropertySchema = {
  $ref?: string;
  enum?: string[];
  type?: string;
};

type CatalogComponent = {
  description?: string;
  properties: Record<string, PropertySchema>;
  required?: string[];
};

type CatalogDocument = {
  catalogId: string;
  components: Record<string, CatalogComponent>;
  protocolVersion: string;
};

type DocsThemeWithA2uiCatalog = {
  a2uiCatalog?: A2uiCatalogStrings;
  a2uiCatalogDescriptions?: Record<string, string>;
};

const MAX_ENUM_VALUES_IN_CARD = 12;

const { theme } = useData<DocsThemeWithA2uiCatalog>();
const t = computed(() => theme.value.a2uiCatalog);
const search = ref("");
const catalog = catalogData as CatalogDocument;
const componentEntries = Object.entries(catalog.components);
const originalDescriptions = new Map(
  componentEntries.map(([name, component]) => [name, component.description ?? ""]),
);
const localizedEntries = computed(() =>
  componentEntries.map(([name, component]) => ({
    name,
    ...component,
    description: theme.value.a2uiCatalogDescriptions?.[name] ?? component.description,
  })),
);
const searchableTextByComponent = computed(
  () =>
    new Map(
      localizedEntries.value.map((component) => {
        const props = Object.entries(component.properties)
          .filter(([property]) => property !== "component")
          .flatMap(([property, schema]) => [property, ...(schema.enum ?? [])]);
        return [
          component.name,
          `${component.name} ${component.description ?? ""} ${originalDescriptions.get(component.name)} ${props.join(" ")}`.toLowerCase(),
        ] as const;
      }),
    ),
);

const components = computed(() => {
  const query = search.value.trim().toLowerCase();
  return localizedEntries.value.filter(
    ({ name }) => !query || (searchableTextByComponent.value.get(name)?.includes(query) ?? false),
  );
});

function propertyDescription(schema: PropertySchema): string {
  const reference = schema.$ref?.split("/").at(-1);
  if (reference) return `A2UI v1.0 ${reference}`;
  if (schema.enum) {
    const values = schema.enum.slice(0, MAX_ENUM_VALUES_IN_CARD);
    return schema.enum.length > values.length ? `${values.join(", ")}, ...` : values.join(", ");
  }
  return schema.type ?? t.value?.value ?? "A2UI value";
}

function isRequired(component: CatalogComponent, property: string): boolean {
  return component.required?.includes(property) ?? false;
}

const integrationExample = ref(`import { basicCatalog } from "@a2ui/web_core/catalogs/basic/v1";
import { MessageProcessor } from "@a2ui/web_core";
import { pantokenA2uiCatalog, registerPantokenA2uiComponents } from "@pantoken/web-components/a2ui";

registerPantokenA2uiComponents();
const processor = new MessageProcessor([basicCatalog, pantokenA2uiCatalog]);`);
const componentReferenceExample = ref(
  JSON.stringify(
    {
      id: "save",
      "@catalogId": catalog.catalogId,
      component: "PantokenButton",
      label: "Save",
    },
    null,
    2,
  ),
);
const integrationLanguage = ref("ts");
const componentReferenceLanguage = ref("json");
const highlightedIntegrationExample = useShikiHighlight(integrationExample, integrationLanguage);
const highlightedComponentReference = useShikiHighlight(
  componentReferenceExample,
  componentReferenceLanguage,
);

onMounted(async () => {
  const [prettier, typescript, babel, estree] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/typescript"),
    import("prettier/plugins/babel"),
    import("prettier/plugins/estree"),
  ]);
  integrationExample.value = await prettier.format(integrationExample.value, {
    parser: "typescript",
    plugins: [typescript, estree],
  });
  componentReferenceExample.value = await prettier.format(componentReferenceExample.value, {
    parser: "json",
    plugins: [babel, estree],
  });
});
</script>

<template>
  <main class="vp-doc a2ui-catalog instui-view">
    <h1 class="instui-heading -level-h1 -variant-title-page a2ui-catalog__title">
      {{ t?.title }}
    </h1>

    <section class="instui-card --bg-secondary a2ui-catalog__hero">
      <div class="a2ui-catalog__hero-header">
        <span class="instui-pill -color-brand">
          {{ t?.protocolLabel }} {{ catalog.protocolVersion }}
        </span>
        <a
          class="instui-link -color-brand -size-small"
          href="/a2ui/catalog/v1/catalog.json"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t?.rawCatalog }}
          <span class="instui-icon -icon-arrow-up-right" aria-hidden="true" />
        </a>
      </div>
      <p class="instui-text -color-secondary a2ui-catalog__subtitle">{{ t?.subtitle }}</p>
      <dl class="a2ui-catalog__metadata">
        <div>
          <dt>{{ t?.catalogIdLabel }}</dt>
          <dd>
            <code>{{ catalog.catalogId }}</code>
          </dd>
        </div>
      </dl>
    </section>

    <section class="a2ui-catalog__support" aria-labelledby="a2ui-support-heading">
      <h2 id="a2ui-support-heading" class="instui-heading -level-h2">
        {{ t?.supportHeading }}
      </h2>
      <ul class="instui-list">
        <li>{{ t?.litSupport }}</li>
        <li>{{ t?.reactSupport }}</li>
        <li>{{ t?.angularSupport }}</li>
        <li>{{ t?.nativeSupport }}</li>
      </ul>
    </section>

    <section class="a2ui-catalog__functions" aria-labelledby="a2ui-functions-heading">
      <h2 id="a2ui-functions-heading" class="instui-heading -level-h2">
        {{ t?.functionsHeading }}
      </h2>
      <p class="instui-text -color-secondary">{{ t?.noFunctions }}</p>
      <div class="a2ui-catalog__integration">
        <h3 class="instui-heading -level-h3">{{ t?.integrationHeading }}</h3>
        <div v-if="highlightedIntegrationExample" v-html="highlightedIntegrationExample" />
        <pre v-else><code>{{ integrationExample }}</code></pre>
        <p class="instui-text -color-secondary">{{ t?.componentReference }}</p>
        <div v-if="highlightedComponentReference" v-html="highlightedComponentReference" />
        <pre v-else><code>{{ componentReferenceExample }}</code></pre>
      </div>
    </section>

    <section aria-labelledby="a2ui-components-heading">
      <h2 id="a2ui-components-heading" class="instui-heading -level-h2">
        {{ t?.componentsHeading }} ({{ components.length }})
      </h2>
      <label class="instui-input-group a2ui-catalog__search">
        <span class="before">
          <span class="instui-icon -icon-search" aria-hidden="true" />
        </span>
        <span class="instui-screen-reader-content">{{ t?.searchLabel }}</span>
        <input
          v-model="search"
          type="search"
          :aria-label="t?.searchLabel"
          :placeholder="t?.searchPlaceholder"
        />
      </label>

      <div v-if="components.length" class="a2ui-catalog__grid">
        <article
          v-for="component in components"
          :key="component.name"
          class="instui-card a2ui-catalog__card"
        >
          <div class="a2ui-catalog__card-header">
            <h3 class="instui-heading -level-h3">{{ component.name }}</h3>
          </div>
          <p class="instui-text -color-secondary a2ui-catalog__card-description">
            {{ component.description }}
          </p>
          <dl class="a2ui-catalog__properties">
            <template
              v-for="[name, schema] in Object.entries(component.properties).filter(
                ([property]) => property !== 'component',
              )"
              :key="name"
            >
              <dt>
                <code>{{ name }}</code>
                <span>{{ isRequired(component, name) ? t?.required : t?.optional }}</span>
              </dt>
              <dd>{{ propertyDescription(schema) }}</dd>
            </template>
          </dl>
        </article>
      </div>
      <p v-else class="a2ui-catalog__empty">{{ t?.empty }}</p>
    </section>

    <section class="a2ui-catalog__versioning" aria-labelledby="a2ui-versioning-heading">
      <h2 id="a2ui-versioning-heading" class="instui-heading -level-h2">
        {{ t?.versioningHeading }}
      </h2>
      <p class="instui-text -color-secondary">
        {{ t?.versioningDescription }}
      </p>
      <p class="instui-text -color-secondary">
        {{ t?.versioningActions }}
      </p>
    </section>
  </main>
</template>

<style scoped>
.a2ui-catalog {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.a2ui-catalog__title {
  margin: 0 0 1rem;
}

.a2ui-catalog__hero {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
}

.a2ui-catalog__hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.a2ui-catalog__subtitle {
  margin: 0 0 1rem;
  line-height: 1.5;
}

.a2ui-catalog__support,
.a2ui-catalog__functions,
.a2ui-catalog__versioning {
  margin-bottom: 2rem;
}

.a2ui-catalog__functions > .instui-text,
.a2ui-catalog__versioning > .instui-text {
  margin: 0.5rem 0;
  line-height: 1.5;
}

.a2ui-catalog__integration {
  margin-top: 1rem;
}

.a2ui-catalog__integration .instui-heading {
  margin: 0;
}

.a2ui-catalog__metadata {
  margin: 0;
}

.a2ui-catalog__metadata dt {
  font-weight: 600;
}

.a2ui-catalog__metadata dd {
  margin: 0.25rem 0 0;
}

.a2ui-catalog__properties dt {
  font-weight: 600;
}

.a2ui-catalog__properties dd {
  margin: 0.25rem 0 0;
}

.a2ui-catalog__search {
  width: 100%;
  max-width: 32rem;
  margin-bottom: 1.5rem;
}

.a2ui-catalog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: 1.25rem;
}

.a2ui-catalog__card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 28rem;
  overflow-y: auto;
  padding: 1.25rem;
}

.a2ui-catalog__card-header .instui-heading,
.a2ui-catalog__card-description {
  margin: 0;
}

.a2ui-catalog__properties {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 0.75rem;
  margin: 0;
}

.a2ui-catalog__properties dt span {
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--instui-color-text-secondary);
}

.a2ui-catalog__empty {
  padding: 1rem;
  border: 1px dashed var(--instui-color-stroke-base);
  text-align: center;
}

.a2ui-catalog__integration pre {
  overflow: auto;
  padding: 1rem;
  border-radius: var(--instui-border-radius-sm);
  background: var(--instui-color-background-secondary);
}

.a2ui-catalog__integration :deep(.shiki) {
  overflow: auto;
  padding: 1rem;
  border-radius: var(--instui-border-radius-sm);
}

.a2ui-catalog__integration code {
  white-space: pre;
}

:global(.dark) .a2ui-catalog__integration :deep(.shiki) {
  background-color: var(--shiki-dark-bg) !important;
  color: var(--shiki-dark) !important;
}

:global(.dark) .a2ui-catalog__integration :deep(.shiki span) {
  color: var(--shiki-dark) !important;
}

@media (max-width: 640px) {
  .a2ui-catalog__metadata dd {
    overflow-wrap: anywhere;
  }

  .a2ui-catalog__hero-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
