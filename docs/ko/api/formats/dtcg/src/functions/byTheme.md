[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# 함수: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Look up a theme's DTCG document by name.

## 매개변수

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## 반환값

`DtcgDoc`

## 예제

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
