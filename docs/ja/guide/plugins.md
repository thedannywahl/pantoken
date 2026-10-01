# プラグイン

pantoken プラグインはパッケージをフォークせずにトークンや CSS 出力を拡張します。`definePlugin` を `@pantoken/plugin-kit` から使って作成し、それを `buildTokens` または `toCss` に渡します。

## プラグインの作成

実装するフックを `definePlugin` に渡してください。これにより、これらのフックから推論された機能でブランド化された通常のプラグインが返されます。プラグインは IR（`tokens`、`icons`）、CSS 出力（`css`）、またはその両方を拡張できます。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 機能認識登録

`buildTokens` と `toCss` は、渡したプラグインに対して `checkPlugins` を実行します。あるステージで登録されたプラグインに対応するフックがない場合は警告を出します（例外は投げません）。したがって、トークン専用プラグインが `toCss` に渡された場合、何もせずに黙ってスキップされるのではなく、注記付きでスキップされます。

## プラグインの合成

`extendPlugin` で別のプラグインの上に構築するか、`mergePlugin` でピア同士を結合します:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同じステージのフックは合成できます: `tokens` はベースを実行してから追加を実行し、`css` は二つの寄与をマージし、`icons` は両方を実行します。

## プラグイン出力の検証

プラグイン自身の出力に対してテスト内で共有のドリフトチェック（`@pantoken/utils`）を実行し、タイプミスや名前変更されたトークンがあればローカルですぐ失敗するようにします:

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
- `@pantoken/plugin-lucide-lab` — Lucide Lab アイコンを `--instui-icon-*` 画像トークンとして登録します。
- `@pantoken/plugin-logos` — Instructure 製品ロゴを SVG、データ URI、そして `--instui-logo-*` 画像トークンとして提供します。
- `@pantoken/plugin-prune-custom-props` — スタイルシートから未使用のカスタムプロパティを削除する PostCSS プラグイン（pantoken プラグインではありません）。
- `@pantoken/plugin-custom-theme-colors` — 1 つの属性（`data-pantoken-color`）を 13 のパレットのいずれか、または任意のブランドの hex の場合は `custom` に設定してページをリブランドします。詳しくは [Theme colors](#theme-colors) を参照してください。
- `@pantoken/plugin-custom-components` — SegmentedControl や SkeletonLoader を含むトークン駆動のカスタムコントロール。

### セグメントコントロール

セグメントコントロールは、2〜5 の関連ビューやフィルタに使用します。各オプションは同じ名前のグループ内のラベル付きネイティブラジオで、最初に 1 つを checked にします。オプションが収まらない場合はタブやドロップダウンを使い、選択ではなくアクションにはボタングループを使ってください。デフォルトは `-size-md` スタイルで、よりタイトなコンテキストや目立たせたい場合は `-size-sm` と `-size-lg` を用意しています。

コントロールとそのオーバーフローボタンには `@pantoken/plugin-custom-components/segmented-control.css` をインポートします。セグメントにグリフが必要な場合はセグメントラベルに `-icon-*` クラスを付けてください。インタラクションヘルパーはネイティブ入力からラベルペインタに `-icon-*` クラスをプロモートします。fieldset に説明的な `aria-label` または表示される legend を用意してください。ヘルパーはネイティブラジオのアナウンスを保持し、キーボードナビゲーションを追加し、オプションで矢印操作ごとに 1 つの切り詰められたセグメントを表示します。開始/終了コントロールの論理方向と、両方向でアクセシブルなボタンラベルを使用してください:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

DOM 準備ができた登録のために `@pantoken/interactions/segmented-control.iife.js` をインポートするか、`@pantoken/interactions` から `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` を呼び、削除時に `cleanup()` を呼んでください。CSS とネイティブラジオの選択は JS がなくても機能しますが、オーバーフロー矢印は振る舞いが必要です。選択されたアイテムはセマンティックなドロップシャドウ色による二層デザインシャドウを使用します; これは既存の `--instui-elevation-*` 合成ではなく、明確なアクティブアイテムシャドウです。オーバーフローボタンは `--pantoken-segmented-overflow-shadow` を通じて上流の elevation3 コンポーネントトークンを使用します。

### スケルトンローディング

`skeleton-loader.css` サブパスは装飾的な Text、Avatar、または Image 形状をスタイルします。Text は `-size-xxs` から `-size-xxl` を受け取り、Avatar と Image は中サイズです。各オプションの `.skeleton-row` はサイズを変えずに 1 行のテキストを追加します。CSS のシマーは 1.5 秒のスイープを 3 回繰り返した後停止し、ユーザーが減速を好む設定の場合は静止します。これは JavaScript が読み込まれる前から機能します。

クエリ依存のコンテンツが表示される場所にのみシェイプを配置し、サーバーで既知のナビゲーション、フィルタ、見出し、またはコントロールの上には置かないでください。スケルトンは進行メーターやアクションのビジー状態ではありません。バックグラウンド更新中は既存のコンテンツを見えるままにし、アクションにはスピナーやボタンのビジー状態を使ってください。

親アプリケーションが loading、loaded、empty、error のマークアップを所有します。ページごとに 1 つの empty ステータス領域と、サーバー HTML 内に別の empty アラートを、いずれもビジーコンテンツ領域の外側（**outside**）に用意してください:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

リクエスト状態が変わったら親レベルの振る舞いを呼び出してください。これは `aria-busy` と既存の 2 つのアナウンスを更新しますが、コンテンツを置き換えたりフォーカスを移動したりは決してしません:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

コンポーネント別の interactions バンドルを直接インポートする代わりに使う場合、`[data-skeleton-region]` 要素で `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }` を含む `pantoken:skeleton-state` イベントをディスパッチしてください。高速なリクエストの場合はプレースホルダ表示を 200–500ms 遅延させてください; 振る舞いはローディングアナウンスを 400ms 遅延させます。パッシブなページ読み込みではフォーカスはそのままにしてください。ユーザー自身のアクションで要求された場合にのみ、新しく読み込まれた結果にフォーカスを移動します。ステータスノードは結果や empty 状態をアナウンスし、アラートノードは失敗をアナウンスします。`aria-busy`、`role="status"`、および `role="alert"` を同一要素に組み合わせないでください。

Lucide Lab のレジストリは遅延読み込みでき、同期トークンフックに渡せます:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

かつてプラグインだったいくつかのものは `@pantoken/components` に同梱されるようになりました。多くのコンポーネントがデフォルトでそれらを必要とするためです: エレベーションシャドウ（`--instui-elevation-*`、`components.css` 内）、フォーカスアウトラインリング（`base.css` 内 — pantoken がページを所有する場合はすべてのフォーカス可能要素に適用）、および Instructure ブランドフォント（Atkinson Hyperlegible Next: `base.css` が `--instui-font-family-base` を適用; オプトインの `@pantoken/components/fonts.css` は `@font-face` woff2 を読み込みます）。

## テーマカラー {#theme-colors}

`@pantoken/plugin-custom-theme-colors` は各パレットごとに 1 つの `[data-pantoken-color="…"]` ブロックを出力します（`navy`、`blue`、`green`、`red`、`orange`、`grey`、`plum`、`violet`、`stone`、`sky`、`honey`、`sea`、`aurora`）。各ブロックは選択されたパレットにブランドプリミティブ（`--instui-primitive-color-navy-*` と `-blue-*`）を向けます。また、上流でリテラル hex にフラット化されていたブランドのサーフェスを再導出し、その焼き込まれたアルファを `color-mix()` を通じて保持します。セマンティックなステータスカラー、明示的な青のアクセント、およびエレベーションシャドウは維持されます。以下の [swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) で試してください。

```html
<html data-pantoken-color="sea"></html>
```

### カスタムブランドカラー

任意の hex（例: Canvas 管理者が Theme Editor に入力するプライマリカラー）からリブランドするには `data-pantoken-color="custom"` を設定します。pantoken はそこから完全な 10–200 の `--instui-primitive-color-custom-*` スケールを導出します:

1. **参照曲線。** 各ステップの目標明度は 13 個のパレットのそのステップでの OKLCH 明度の平均で、0 は白に固定、210 は黒に固定します。したがってカスタムスケールの間隔は出荷済みパレットの間隔と一致します。
2. **アンカー。** 入力色は、その明度が最も近いステップに配置され、その正確な明度にスナップします。`#cccccc` は `#c9c9c9` で `custom-40` になります: 入力に近いが常に同一ではありません。ここでの「最も近い」は曲線上の最寄りステップを指し、既存パレットの近傍色を意味するものではありません。
3. **充填。** 他のすべてのステップは入力の色相を保持します。彩度はアンカーに対するパレットの平均彩度曲線に従い、色が sRGB の範囲外になる場合にのみ減らされます。

受け入れられるのは `#rgb` と `#rrggbb` のみで、その他は `TypeError` を投げるため、フォームからの hex が CSS を注入することはできません。

ビルド時に、派生されたプリミティブが既に宣言された状態でルール全体を出力してください:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

トークンセットを出さずにランタイムで色を選ぶには、曲線とリマップルールをビルド時に事前計算します。次にブラウザでは依存性不要の `/scale` エントリを使い、20 個の派生プリミティブのみを設定してください:

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

ドキュメントサイトのテーマピッカー、Canvas のテーマエディタ、上のデモはすべてこの方法で動作します。

各プラグインのエクスポートについては [API reference](/api/) を参照してください。
