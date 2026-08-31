[pantoken](../../../index.md) / utils

# utils

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/utils` — مساعدات مشتركة خالية من المنبع المستخدمة في جميع حزم pantoken: محلل مرجع الرمز (مع معالجة `light-dark()`)، ونمط الرمز الثنائي (مكتوب عبر `arkregex`)، وحالة kebab→camel، وتحليل اللون السادس عشر، وتنظيف SVG، ومقياس التباعد pantoken، والتحقق من انجراف المرجع، ومرسلات رمز→فئة الأداة العامة التي `@pantoken/components` (طبقة دلالية) و `@pantoken/plugin-primitives` (طبقة لوحة خام) كلاهما يبني عليه. يعتمد فقط على `@pantoken/model` (الأنواع) + `arkregex`، لذا يمكن لأي حزمة استخدامها دون سحب المنبع الخاص بـ GitHub فقط.

مدقق بناء جملة الرمز المدعوم بـ css-tree يقيم في `@pantoken/utils/token-syntax` دخول منفصل، وليس هذا البرميل — `css-tree` يجمع تحميل JSON `createRequire()` في وقت التشغيل الذي ينقطع عند السحب إلى حزمة متصفح/SSR، وهذا البرميل يتم استيراده بواسطة حزم متجهة للمتصفح (على سبيل المثال `@pantoken/components`) للمساعدين الخالين من العقدة أعلاه.

برميل نقي — كل تنفيذ يعيش في وحدة منفصلة منفصلة؛ أضف مساعدين جدد هناك وأعد تصديرهم هنا، لا تنمي هذا الملف.

## Interfaces

- [Rgba](interfaces/Rgba.md)
- [ResolveOptions](interfaces/ResolveOptions.md)
- [SpacingStep](interfaces/SpacingStep.md)
- [UtilityOptions](interfaces/UtilityOptions.md)
- [ColorUtilityNames](interfaces/ColorUtilityNames.md)
- [TokenUtilityGroup](interfaces/TokenUtilityGroup.md)

## Type Aliases

- [Mode](type-aliases/Mode.md)
- [ColorUtilityEntry](type-aliases/ColorUtilityEntry.md)

## Variables

- [ELEVATION\_NAMES](variables/ELEVATION_NAMES.md)
- [FOCUSABLE\_SELECTOR](variables/FOCUSABLE_SELECTOR.md)
- [VAR\_RE](variables/VAR_RE.md)
- [LIGHT\_DARK\_RE](variables/LIGHT_DARK_RE.md)
- [SPACING\_STEPS](variables/SPACING_STEPS.md)
- [SPACING\_AUTO\_STEP](variables/SPACING_AUTO_STEP.md)

## Functions

- [camelCase](functions/camelCase.md)
- [parseHexColor](functions/parseHexColor.md)
- [elevationDeclarations](functions/elevationDeclarations.md)
- [focusOutlineDeclarations](functions/focusOutlineDeclarations.md)
- [focusOutlineRules](functions/focusOutlineRules.md)
- [extractInstuiRefs](functions/extractInstuiRefs.md)
- [tokenNames](functions/tokenNames.md)
- [unknownReferences](functions/unknownReferences.md)
- [danglingReferences](functions/danglingReferences.md)
- [makeResolver](functions/makeResolver.md)
- [resolveTokens](functions/resolveTokens.md)
- [sanitizeSvg](functions/sanitizeSvg.md)
- [globalModifierSelector](functions/globalModifierSelector.md)
- [colorUtilitiesCss](functions/colorUtilitiesCss.md)
- [tokenUtilitiesCss](functions/tokenUtilitiesCss.md)
