# プラグイン

pantoken プラグインはパッケージをフォークせずにトークンや CSS 出力を拡張します。`@pantoken/plugin-kit` から `definePlugin` を使って作成し、それを `buildTokens` または `toCss` に渡します。

## プラグインの作成

実装するフックを `definePlugin` に渡します。これは通常のプラグインを返し、渡されたフックから推論された機能でブランド化されます。プラグインは IR を拡張する（`tokens`, `icons`）、CSS 出力を拡張する（`css`）、またはその両方を行えます。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 機能認識された登録

`buildTokens` と `toCss` は、渡したプラグイン群に対して `checkPlugins` を実行します。ステージに対して対応するフックがないプラグインがある場合、例外は投げずに警告を出す — つまり、トークン専用プラグインを `toCss` に渡すと、何も実行せずに黙殺されるのではなく、ノート付きでスキップされます。

## プラグインの合成

`extendPlugin` で既存のプラグインの上に構築するか、`mergePlugin` で同列のプラグインを組み合わせます：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同一ステージのフックは合成されます：`tokens` はベースを実行してから追加を実行し、`css` は二つの寄与をマージし、`icons` は両方を実行します。

## プラグイン出力の検証

プラグイン自身の出力に対してテスト内で共有のドリフトチェックを `@pantoken/utils` から実行し、タイプミスや名前変更されたトークンが局所的に速やかに失敗するようにします：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 同梱プラグイン

- `@pantoken/plugin-simple-icons` — simple-icons からブランドアイコンを取得し、アイコントークンとして登録します。
- `@pantoken/plugin-lucide-lab` — Lucide Lab アイコンを、`--instui-icon-*` 画像トークンとして登録します。
- `@pantoken/plugin-logos` — Instructure の製品ロゴを SVG、データ URI、および `--instui-logo-*` 画像トークンとして提供します。
- `@pantoken/plugin-prune-custom-props` — 未使用のカスタムプロパティをスタイルシートから削除する PostCSS プラグイン（pantoken プラグインではありません）。
- `@pantoken/plugin-custom-theme-colors` — ある属性（`data-pantoken-color`）を 13 のパレットのいずれか、または任意のブランド HEX 用に `custom` に設定してページをリブランドします。詳細は [Theme colors](#theme-colors) を参照してください。

Lucide Lab のレジストリは遅延読み込みでき、その後同期的なトークンフックに渡せます：

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

以前はプラグインだったもののうち、今では多くのコンポーネントが標準で必要とするため `@pantoken/components` に含まれるものがいくつかあります：エレベーションシャドウ（`--instui-elevation-*`、`components.css` 内）、フォーカスアウトラインリング（`base.css` 内 — pantoken がページを管理しているときはすべてのフォーカス可能要素に適用されます）、および Instructure ブランドフォント（Atkinson Hyperlegible Next: `base.css` が `--instui-font-family-base` を適用します；オプトインの `@pantoken/components/fonts.css` は `@font-face` の woff2 をロードします）。

## テーマカラー {#theme-colors}

`@pantoken/plugin-custom-theme-colors` はパレットごとに 1 つの `[data-pantoken-color="…"]` ブロックを出力します（`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`, `aurora`）。各ブロックはブランドのプリミティブ（`--instui-primitive-color-navy-*` と `-blue-*`）を選択したパレットに向けます。また、上流でリテラル HEX に平坦化されていたブランド表面を再派生し、`color-mix()` を通してベイク済みのアルファを保持します。セマンティックなステータスカラー、明示的な青アクセント、およびエレベーションシャドウはそのまま残ります。次の [スウォッチベースのテーマデモ](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) で試してみてください。

```html
<html data-pantoken-color="sea"></html>
```

### カスタムブランドカラー

任意の HEX からリブランドするには `data-pantoken-color="custom"` を設定します。例えば Canvas 管理者が Theme Editor に入力するプライマリカラーなどです。pantoken はそこから完全な 10–200 の `--instui-primitive-color-custom-*` スケールを導出します：

1. **参照カーブ。** 各ステップの目標明度は、13 のパレットそれぞれのそのステップでの OKLCH 明度の平均で、0 は白、210 は黒に固定されています。したがってカスタムスケールの間隔は出荷済みパレットの間隔と一致します。
2. **アンカー。** 入力色は自身の明度に最も近いターゲット明度を持つステップに割り当てられ、その正確な明度にスナップします。`#cccccc` は `#c9c9c9` で `custom-40` になります：入力色に近いが常に同一ではありません。「最も近い」は既存のパレット色に最も似ているという意味ではなく、カーブ上で最も近いステップを指します。
3. **塗り。** 他のすべてのステップは入力色の色相を維持します。彩度はアンカーに対するパレットの平均彩度カーブに従い、sRGB 範囲外となる箇所でのみ削減されます。

受け入れられるのは `#rgb` と `#rrggbb` のみで、その他は `TypeError` を投げるため、フォームからの HEX が CSS を注入することはできません。

ビルド時に、派生されたプリミティブが既に宣言された形でルール全体を出力します：

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

トークンセットを配布せずにランタイムで色を選ぶには、カーブと再マップルールをビルド時に事前計算します。その後ブラウザでは依存がない `/scale` エントリを使い、20 の派生プリミティブだけを設定します：

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

ドキュメントサイトのテーマピッカー、Canvas テーマエディタ、上記デモはすべてこの方法で動作します。

各プラグインのエクスポートについては [API reference](/api/) を参照してください。
