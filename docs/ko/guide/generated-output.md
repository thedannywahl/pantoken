# 생성된 출력

여러 pantoken 패키지는 빌드 시 파일을 생성합니다 — 스타일시트, `theme.json`, 임베디드 토큰
모듈 등. 레포를 깔끔하게 유지하고 출력의 정합성을 보장하기 위해, 모든 패키지는 한 가지 규약을 따르며
워크스페이스 작업이 전체를 검증합니다.

## `generated/` 규약

빌드 산출물을 생성하는 모든 패키지는 산출물을 패키리별 `generated/` 디렉터리에 기록하며,
그 외의 파일은 그곳에 존재하지 않습니다. `.gitignore`의 한 규칙이 모두를 포괄합니다:

```txt
**/generated/
```

따라서 생성된 파일은 커밋되지 않습니다 — 빌드로 재생성됩니다. 그곳에는 두 종류의 출력이 위치합니다:

- **배포 가능한 정적 파일** — 소비자가 임포트하는 파일들로, 예를 들어 `@pantoken/css`의 `style.css`나
  `@pantoken/scss`의 `tokens.scss` 같은 것들입니다. 패키지의 `exports` 맵은 공개 키
  (`"./style.css"`)를 보유하지만 이를 `generated/`을 가리키도록 하여 소비자 API가 결코 변경되지 않게 합니다.
- **빌드 중간물** — 패키지 자체 소스가 임포트하여 `dist`에 번들되는 파일들로, 예를 들면
  `@pantoken/tokens`의 벤더된 JSON입니다. 이들은 단독으로 퍼블리시되지 않으며 컴파일되어 포함됩니다.

## 출력 검증

`@pantoken/validate-generated`(비공개 도구)가 빌드 후 실행되어 세 가지를 검증합니다:

1. 모든 생성기 패키지가 비어 있지 않은 `generated/` 디렉터리를 실제로 작성했는가,
2. `pantoken` CLI가 지원되는 모든 대상에 대해 적어도 하나의 파일을 출력하는가, 그리고
3. 생성된 스타일시트가 토큰 IR에서 벗어나지 않았는가 — 자체 포함된 시트에는 `danglingReferences`,
   다른 곳에서 정의된 토큰만 참조하는 브리지에는 `unknownReferences`.

## 명령

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

검증기는 또한 `pnpm run ready`에 연결되어 있어 표준 게이트에서 드리프트를 포착합니다.
