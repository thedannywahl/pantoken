# プラグイン

pantoken プラグインはパッケージをフォークせずにトークンや CSS 出力を拡張します。`definePlugin` を `@pantoken/plugin-kit` から使って作成し、それを `buildTokens` または `toCss` に渡します。

## プラグインの作成

実装するフックを `definePlugin` に渡します。これは通常のプラグインを返し、渡したフックから推論された能力でブランディングされます。プラグインは IR を拡張することができ（`tokens`, `icons`）、CSS 出力を拡張することができ（`css`）、またはその両方を行えます。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 能力を考慮した登録

`buildTokens` と `toCss` は、渡されたプラグインに対して `checkPlugins` を実行します。プラグインが登録された段階に対応するフックを持たない場合は例外を投げずに警告を出すため、トークン専用のプラグインを `toCss` に渡すと、何もせずに静かにスキップされるのではなく、注記付きでスキップされます。

## プラグインの合成

`extendPlugin` で別のプラグインの上に構築するか、`mergePlugin` で同等のプラグインを結合します：

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同じ段階のフックは合成されます: `tokens` はベースを実行してから追加を実行し、`css` は両方の寄与をマージし、`icons` は両方を実行します。

## プラグインの出力を検証する

プラグイン自身の出力に対してテスト内で共有のドリフトチェック（`@pantoken/utils`）を実行し、タイプミスや名前変更されたトークンがあれば速やかにローカルで失敗するようにします：

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## バンドルされたプラグイン

- `@pantoken/plugin-simple-icons` — simple-icons からのブランドアイコンをアイコン・トークンとして登録します。
- `@pantoken/plugin-lucide-lab` — Lucide Lab のアイコンを `--instui-icon-*` の画像トークンとして登録します。
- `@pantoken/plugin-logos` — Instructure 製品ロゴを SVG、データ URI、および `--instui-logo-*` の画像トークンとして提供します。
- `@pantoken/plugin-prune-custom-props` — スタイルシートから未使用のカスタムプロパティを除去する PostCSS プラグイン（pantoken プラグインではありません）。

Lucide Lab のレジストリは遅延ローディング可能で、その後同期的なトークンフックに渡せます:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

かつてプラグインだったもののうちいくつかは、現在多くのコンポーネントが標準で必要とするため `@pantoken/components` に同梱されています: エレベーションシャドウ（`--instui-elevation-*`、`components.css` 内）、フォーカスアウトラインのリング（`base.css` 内 — pantoken がページを制御している場合、すべてのフォーカス可能要素に適用されます）、および Instructure ブランドフォント（Atkinson Hyperlegible Next: `base.css` は `--instui-font-family-base` を適用します；オプトインの `@pantoken/components/fonts.css` は `@font-face` の woff2 を読み込みます）。

各プラグインのエクスポートについては [API reference](/api/) を参照してください。
