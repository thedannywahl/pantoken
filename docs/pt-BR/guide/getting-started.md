# Começando

Pantoken pega os tokens de design e ícones do [Instructure UI](https://instructure.design), resolve-os uma vez e remodela esse único
modelo em pacotes para muitas plataformas: folhas de estilo simples, SCSS e Less, React e Vue e Svelte,
Tailwind e Panda, nativo Swift e Kotlin, WordPress e Drupal, Figma, e mais.

Instale o menor pacote que se encaixa na sua tarefa. Tudo também é reexportado pelo pacote unificado
`pantoken`, então você pode começar por ele e depois refinar.

## Criar um projeto inicial

A maneira mais rápida de experimentar o pantoken: criar um projeto inicial com ele já instalado e configurado.

```sh
npx create-pantoken-app
```

Plataformas: `components` (HTML/CSS puro), `react`, `vue`, `svelte`, `web-components`, `angular`. Veja
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) para `--dir <path>` e
uso programático.

Usando um agente de codificação com IA? Nenhuma instalação necessária — aponte-o para a skill diretamente:

```prompt
Busque create.pantoken.app/SKILL.md e siga-o para configurar o pantoken neste projeto.
```

Se preferir integrar permanentemente as regras do agente do pantoken no repositório (AGENTS.md, regras do editor, uma cópia local desta skill), execute `npx @pantoken/ai init` em vez disso.

## O modelo de tokens

Tokens são propriedades customizadas CSS nomeadas `--instui-<group>-<name>`, por exemplo
`--instui-color-background-brand` ou `--instui-spacing-space-md`. Três temas são fornecidos: `rebrand`
(o padrão, com `light-dark()` onde claro e escuro divergem), `canvas`, e `canvasHighContrast`.
Ícones são tokens `<image>` (`--instui-icon-<name>`) derivados do Lucide mais os glifos personalizados da Instructure.

## Estilizar um app web

Instale a folha de estilo e importe-a uma vez. Ela define cada propriedade `--instui-*`, então você as referencia diretamente do seu próprio CSS.

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

O web component funciona em qualquer framework, sem porting.

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

Ícones são propriedades customizadas CSS (`--instui-icon-<name>`). Carregue a folha de estilo uma vez e referencie qualquer
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

Ambas as exportações carregam a IR completa na inicialização do módulo — não há tree-shaking por ícone nesse
nível. Para carregamento enxuto apenas com CSS, use o [CDN picker](/guide/cdn-picker) para gerar uma URL combinada
somente com os ícones que você precisa.

## Gerar para uma plataforma nativa

A CLI grava a fonte dos tokens em um repositório alvo. Nenhuma instalação além do runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Veja [a CLI do pantoken](/guide/cli) para todos os alvos.

## Dicas de autoria no VS Code

`@pantoken/pantoken` agora fornece arquivos de custom-data para VS Code para que projetos consumidores possam obter conclusão de classes e tokens em HTML/CSS sem instalar uma extensão específica do pantoken.

1. Instale o pacote unificado:

```sh
npm i @pantoken/pantoken
```

1. Aponte o VS Code para o JSON de custom-data fornecido a partir do seu workspace consumidor:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Recarregue o VS Code (ou execute "Developer: Reload Window") para aplicar os novos dados.

Isto habilita sugestões para tokens de classe `instui-*` (e tokens de classe `-modifier`) além de
propriedades customizadas `--instui-*`.

## Para onde ir em seguida

- [O mapa de pacotes](/guide/packages) — qual pacote alcançar, por tarefa.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — instale ativos e regras do agente em um repositório consumidor.
- [Arquitetura](/guide/architecture) — como o modelo de tokens, core e saídas se encaixam.
- [Referência da API](/api/) — cada símbolo exportado, gerado a partir da fonte.
