[pantoken](../../../index.md) / utils

# utils

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/utils` — أدوات مساعدة مشتركة وخالية من الاعتماد على المستودع العلوي تُستخدم عبر حزم pantoken: محلل مراجع الرموز (`light-dark()` يتولى المعالجة)، وتعابير رتبتي الرموز (مكتوبة بأنواع عبر `arkregex`), تحويل kebab→camel، تحليل ألوان hex، تنظيف SVG، مقياس التباعد الخاص بـ pantoken، تحقق انحراف المراجع، ومولّدات عامة من token→utility-class التي يبني عليها كل من `@pantoken/components` (الطبقة الدلالية) و`@pantoken/plugin-primitives` (طبقة اللوحة الخام). يعتمد فقط على `@pantoken/model` (الأنواع) + `arkregex`، لذا يمكن لأي حزمة استخدامه دون جلب المستودع العلوي الخاص بـ GitHub.

مدقق صياغة الرموز المعتمد على css-tree موجود في نقطة دخول منفصلة `@pantoken/utils/token-syntax`، وليس في هذا البرّال — يقوم `css-tree` بتجميع تحميل JSON وقت التشغيل عبر `createRequire()` والذي يتعطل عند ضمه إلى حزمة متصفح/SSR، وهذا البرّال مستورد من الحزم الموجهة للمتصفح (مثل `@pantoken/components`) من أجل الأدوات الخالية من الاعتماد على Node المذكورة أعلاه.

برّال نقي — كل تنفيذ يعيش في وحدة منفصلة خاصة به؛ أضف الأدوات المساعدة الجديدة هناك وأعد تصديرها هنا، لا توسع هذا الملف.

## واجهات

- [Rgba](interfaces/Rgba.md)
- [ResolveOptions](interfaces/ResolveOptions.md)
- [SpacingStep](interfaces/SpacingStep.md)
- [UtilityOptions](interfaces/UtilityOptions.md)
- [ColorUtilityNames](interfaces/ColorUtilityNames.md)
- [TokenUtilityGroup](interfaces/TokenUtilityGroup.md)

## أسماء أنواع مستعارة

- [Mode](type-aliases/Mode.md)
- [ColorUtilityEntry](type-aliases/ColorUtilityEntry.md)

## المتغيرات

- [ELEVATION\_NAMES](variables/ELEVATION_NAMES.md)
- [FOCUSABLE\_SELECTOR](variables/FOCUSABLE_SELECTOR.md)
- [VAR\_RE](variables/VAR_RE.md)
- [LIGHT\_DARK\_RE](variables/LIGHT_DARK_RE.md)
- [SPACING\_STEPS](variables/SPACING_STEPS.md)
- [SPACING\_AUTO\_STEP](variables/SPACING_AUTO_STEP.md)

## الدوال

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
