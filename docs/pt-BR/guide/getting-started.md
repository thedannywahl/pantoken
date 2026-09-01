# Começando

pantoken pega os design tokens e ícones do Instructure UI, resolve-os uma vez e remodela esse único
modelo em pacotes para muitas plataformas: folhas de estilo simples, SCSS e Less, React e Vue e Svelte,
Tailwind e Panda, nativo Swift e Kotlin, WordPress e Drupal, Figma e mais.

Instale o menor pacote que atenda sua tarefa. Tudo também é re-exportado pelo pacote unificado
`pantoken`, então você pode começar por ele e restringir depois.

## Gerar um projeto inicial

A forma mais rápida de experimentar o pantoken: gerar um projeto inicial com ele já instalado e integrado.

```sh
npx create-pantoken-app react
```

Plataformas: `components` (HTML/CSS puro), `react`, `vue`, `svelte`, `web-components`, `angular`. Veja
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) para `--dir <path>` e
uso programático.

Usando um agente de codificação por IA? Nenhuma instalação necessária — aponte-o diretamente para a skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Funciona da mesma forma para Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI e Amazon Q
Developer CLI — troque `claude` por `gemini`, `agent`, `codex`, `copilot -p` ou `q chat`. Se preferir integrar permanentemente as regras do agente do pantoken no repositório (AGENTS.md, regras do editor, uma cópia local
desta skill), execute `npx @pantoken/ai init` em vez disso.

## O modelo de tokens

Tokens são propriedades personalizadas CSS nomeadas `--instui-<group>-<name>`, por exemplo
`--instui-color-background-brand` ou `--instui-spacing-space-md`. Três temas são fornecidos: `rebrand`
(o padrão, com `light-dark()` onde claro e escuro diferem), `canvas` e `canvasHighContrast`.
Ícones são tokens `<image>` (`--instui-icon-<name>`) derivados do Lucide além dos glifos personalizados da Instructure.

## Estilizar um app web

Instale a folha de estilo e importe-a uma vez. Ela define toda propriedade `--instui-*`, então você a referencia diretamente do seu próprio CSS.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Usar ícones em qualquer lugar

O web component funciona em qualquer framework, sem necessidade de portar.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokens CSS

Ícones são propriedades personalizadas CSS (`--instui-icon-<name>`). Carregue a folha de estilo uma vez e referencie qualquer
ícone como um `mask-image` ou `background-image` — sem necessidade de import por ícone.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ícone único vs. conjunto completo

`@pantoken/icons` expõe duas exportações nomeadas. Use `iconsByName` para puxar um ícone sem iterar
o array completo:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Use `icons` quando precisar do conjunto inteiro (por exemplo, para construir um seletor):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Ambas as exportações carregam o IR completo na inicialização do módulo — não há tree-shaking por ícone neste
nível. Para carregamento enxuto apenas com CSS, use o [CDN picker](/guide/cdn-picker) para gerar uma URL combinada
somente com os ícones que você precisa.

## Gerar para uma plataforma nativa

A CLI escreve a origem dos tokens em um repositório de destino. Nenhuma instalação além do executor:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Veja [a CLI do pantoken](/guide/cli) para cada alvo.

## Dicas de autoria no VS Code

`@pantoken/pantoken` agora fornece arquivos custom-data para VS Code para que projetos consumidores possam obter conclusão de classes e tokens em HTML/CSS sem instalar uma extensão específica do pantoken.

1. Instale o pacote unificado:

```sh
npm i @pantoken/pantoken
```

1. Aponte o VS Code para o JSON custom-data fornecido a partir do workspace consumidor:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Recarregue o VS Code (ou execute "Developer: Reload Window") para aplicar os novos dados.

Isso habilita sugestões para tokens de classe `instui-*` (e tokens de classe `-modifier`) além de
propriedades customizadas `--instui-*`.

## Para onde ir em seguida

- [O mapa de pacotes](/guide/packages) — qual pacote alcançar, por tarefa.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — instale ativos e regras do agente em um repositório consumidor.
- [Arquitetura](/guide/architecture) — como o modelo de tokens, o core e as saídas se encaixam.
- [Referência da API](/api/) — todo símbolo exportado, gerado a partir da fonte.
