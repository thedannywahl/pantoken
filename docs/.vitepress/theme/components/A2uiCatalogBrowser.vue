<script setup lang="ts">
import { computed, ref } from "vue";
import { useData } from "vitepress";
import catalogData from "../generated/a2ui-catalog.json";
import type { A2uiCatalogStrings } from "../a2ui-catalog";

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
};

const { theme } = useData<DocsThemeWithA2uiCatalog>();
const t = computed(() => theme.value.a2uiCatalog);
const search = ref("");
const catalog = catalogData as CatalogDocument;

const components = computed(() => {
  const query = search.value.trim().toLowerCase();
  return Object.entries(catalog.components)
    .map(([name, component]) => ({ name, ...component }))
    .filter((component) => {
      if (!query) return true;
      const props = Object.entries(component.properties)
        .filter(([name]) => name !== "component")
        .flatMap(([name, schema]) => [name, ...(schema.enum ?? [])])
        .join(" ");
      return `${component.name} ${component.description ?? ""} ${props}`
        .toLowerCase()
        .includes(query);
    });
});

function propertyDescription(schema: PropertySchema): string {
  const reference = schema.$ref?.split("/").at(-1);
  if (reference) return `A2UI v1.0 ${reference}`;
  if (schema.enum) return schema.enum.join(", ");
  return schema.type ?? "A2UI value";
}

function isRequired(component: CatalogComponent, property: string): boolean {
  return component.required?.includes(property) ?? false;
}

const integrationExample = `import { basicCatalog } from "@a2ui/web_core/catalogs/basic/v1";
import { MessageProcessor } from "@a2ui/web_core";
import { pantokenA2uiCatalog, registerPantokenA2uiComponents } from "@pantoken/web-components/a2ui";

registerPantokenA2uiComponents();
const processor = new MessageProcessor([basicCatalog, pantokenA2uiCatalog]);`;
</script>

<template>
  <main class="a2ui-catalog instui-view">
    <header class="a2ui-catalog__header">
      <h1 class="instui-heading -level-h1 -variant-title-page">{{ t?.title }}</h1>
      <p class="instui-text -color-secondary">{{ t?.subtitle }}</p>
      <dl class="a2ui-catalog__metadata">
        <div>
          <dt>{{ t?.protocolLabel }}</dt>
          <dd>{{ catalog.protocolVersion }}</dd>
        </div>
        <div>
          <dt>{{ t?.catalogIdLabel }}</dt>
          <dd>
            <code>{{ catalog.catalogId }}</code>
          </dd>
        </div>
      </dl>
      <a class="instui-link -color-brand" href="/a2ui/catalog.json" target="_blank" rel="noopener">
        {{ t?.rawCatalog }}
      </a>
    </header>

    <section aria-labelledby="a2ui-components-heading">
      <div class="a2ui-catalog__section-heading">
        <h2 id="a2ui-components-heading" class="instui-heading -level-h2">
          {{ t?.componentsHeading }} ({{ components.length }})
        </h2>
        <label class="a2ui-catalog__search">
          <span>{{ t?.searchLabel }}</span>
          <input v-model="search" type="search" :placeholder="t?.searchPlaceholder" />
        </label>
      </div>

      <div v-if="components.length" class="a2ui-catalog__grid">
        <article
          v-for="component in components"
          :key="component.name"
          class="instui-card a2ui-catalog__card"
        >
          <h3 class="instui-heading -level-h3">{{ component.name }}</h3>
          <p class="instui-text -color-secondary">{{ component.description }}</p>
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

    <section class="a2ui-catalog__integration" aria-labelledby="a2ui-integration-heading">
      <h2 id="a2ui-integration-heading" class="instui-heading -level-h2">
        {{ t?.integrationHeading }}
      </h2>
      <pre><code>{{ integrationExample }}</code></pre>
      <p class="instui-text -color-secondary">{{ t?.componentReference }}</p>
      <pre><code>{"id":"save","@catalogId":"{{ catalog.catalogId }}","component":"PantokenButton","label":"Save"}</code></pre>
      <p class="instui-text -color-secondary">{{ t?.noFunctions }}</p>
    </section>
  </main>
</template>

<style scoped>
.a2ui-catalog {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.a2ui-catalog__header,
.a2ui-catalog__support,
.a2ui-catalog__integration {
  margin-bottom: 2rem;
}

.a2ui-catalog__metadata {
  display: grid;
  gap: 0.75rem;
  margin: 1.25rem 0;
}

.a2ui-catalog__metadata dt,
.a2ui-catalog__properties dt {
  font-weight: 600;
}

.a2ui-catalog__metadata dd,
.a2ui-catalog__properties dd {
  margin: 0.25rem 0 0;
}

.a2ui-catalog__section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.a2ui-catalog__search {
  display: grid;
  gap: 0.375rem;
  min-width: min(100%, 20rem);
}

.a2ui-catalog__search input {
  font: inherit;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--instui-color-stroke-base);
  border-radius: var(--instui-border-radius-sm);
  color: var(--instui-color-text-base);
  background: var(--instui-color-background-page);
}

.a2ui-catalog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: 1rem;
}

.a2ui-catalog__card {
  padding: 1.25rem;
}

.a2ui-catalog__properties {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 0.75rem;
  margin-top: 1rem;
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

.a2ui-catalog__integration code {
  white-space: pre;
}

@media (max-width: 640px) {
  .a2ui-catalog__metadata dd {
    overflow-wrap: anywhere;
  }
}
</style>
