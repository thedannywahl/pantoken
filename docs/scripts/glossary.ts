/**
 * The deterministic structural-term glossary: headings, badges, and table-column labels TypeDoc/cssdoc
 * emit verbatim in generated API docs. Each term is matched by shape (`kind`) — see `patternFor` in
 * `api-translation.ts` — and its per-locale translation lives in the `<locale>.glossary.json`
 * translation-memory cache (content-addressed by `term`, same convention as the chrome/guides/API
 * caches), filled by `translate-glossary.ts`. This file is only the English source of truth: the term
 * list and how each is matched, never a translation.
 *
 * @module
 */

/**
 * How a term is matched in generated markdown:
 * - `word` — anywhere, word-boundary (`\bTerm\b`) — inline phrases like "Parameters", "Returns".
 * - `heading` — a Markdown heading (`^(#{1,6} )Term$`) — cssdoc doc-block sections, overview pages.
 * - `line` — a whole isolated line/cell (`^Term$`) — table column headers, sidebar-style labels.
 * - `badge` — the stability-tier doc-tag pill (`pantoken-doc-tag">Term<`).
 */
export type GlossaryKind = "word" | "heading" | "line" | "badge";

/** One structural term: how it's matched, plus the exact (case-sensitive) English text to match. */
export interface GlossaryTerm {
  /** Stable id for iteration/readability; not itself matched against text. */
  id: string;
  kind: GlossaryKind;
  term: string;
}

/** The English source-of-truth term list; see the module doc comment above for what this covers. */
// prettier-ignore
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Word-boundary terms — TypeDoc's per-symbol section labels and inline phrases.
  { id: "typeParametersPlural", kind: "word", term: "Type Parameters" },
  { id: "typeParameterSentenceCase", kind: "word", term: "Type parameter" },
  { id: "parametersPlural", kind: "word", term: "Parameters" },
  { id: "parameterSingular", kind: "word", term: "Parameter" },
  { id: "returns", kind: "word", term: "Returns" },
  { id: "returnType", kind: "word", term: "Return type" },
  { id: "throws", kind: "word", term: "Throws" },
  { id: "definedIn", kind: "word", term: "Defined in" },
  { id: "inheritedFrom", kind: "word", term: "Inherited from" },
  { id: "implementedBy", kind: "word", term: "Implemented by" },
  { id: "implementationOf", kind: "word", term: "Implementation of" },
  { id: "overrides", kind: "word", term: "Overrides" },
  { id: "propertiesPlural", kind: "word", term: "Properties" },
  { id: "propertySingular", kind: "word", term: "Property" },
  { id: "methodsPlural", kind: "word", term: "Methods" },
  { id: "methodSingular", kind: "word", term: "Method" },
  { id: "functionsPlural", kind: "word", term: "Functions" },
  { id: "functionSingular", kind: "word", term: "Function" },
  { id: "variablesPlural", kind: "word", term: "Variables" },
  { id: "variableSingular", kind: "word", term: "Variable" },
  { id: "interfacesPlural", kind: "word", term: "Interfaces" },
  { id: "interfaceSingular", kind: "word", term: "Interface" },
  { id: "classesPlural", kind: "word", term: "Classes" },
  { id: "classSingular", kind: "word", term: "Class" },
  { id: "constructorsPlural", kind: "word", term: "Constructors" },
  { id: "constructorSingular", kind: "word", term: "Constructor" },
  { id: "enumerationsPlural", kind: "word", term: "Enumerations" },
  { id: "enumerationSingular", kind: "word", term: "Enumeration" },
  { id: "typeAliasesPlural", kind: "word", term: "Type Aliases" },
  { id: "typeAliasSingular", kind: "word", term: "Type Alias" },
  { id: "referencesPlural", kind: "word", term: "References" },
  { id: "referenceSingular", kind: "word", term: "Reference" },
  { id: "readonly", kind: "word", term: "Readonly" },
  { id: "optional", kind: "word", term: "Optional" },
  { id: "deprecated", kind: "word", term: "Deprecated" },
  { id: "exampleSingular", kind: "word", term: "Example" },
  { id: "examplesPlural", kind: "word", term: "Examples" },
  { id: "seeAlso", kind: "word", term: "See also" },
  { id: "hierarchy", kind: "word", term: "Hierarchy" },
  { id: "index", kind: "word", term: "Index" },
  { id: "packageWord", kind: "word", term: "Package" },
  { id: "moduleWord", kind: "word", term: "Module" },
  { id: "namespacesPlural", kind: "word", term: "Namespaces" },
  { id: "namespaceSingular", kind: "word", term: "Namespace" },
  { id: "callSignature", kind: "word", term: "Call Signature" },
  { id: "signaturesPlural", kind: "word", term: "Signatures" },
  { id: "signatureSingular", kind: "word", term: "Signature" },
  { id: "description", kind: "word", term: "Description" },
  { id: "defaultValue", kind: "word", term: "Default Value" },
  { id: "source", kind: "word", term: "Source" },
  { id: "generatedUsing", kind: "word", term: "Generated using" },
  { id: "apiReference", kind: "word", term: "API reference" },

  // Heading-anchored terms (`## Term`) — cssdoc doc-block sections and the API/CSS overview pages.
  { id: "accessibilityHeading", kind: "heading", term: "Accessibility" },
  { id: "usageHeading", kind: "heading", term: "Usage" },
  { id: "demoHeading", kind: "heading", term: "Demo" },
  { id: "structureHeading", kind: "heading", term: "Structure" },
  { id: "slotsHeading", kind: "heading", term: "Slots" },
  { id: "modifiersHeading", kind: "heading", term: "Modifiers" },
  { id: "partsHeading", kind: "heading", term: "Parts" },
  { id: "pseudoElementsHeading", kind: "heading", term: "Pseudo-elements" },
  { id: "statesHeading", kind: "heading", term: "States" },
  { id: "customPropertiesHeading", kind: "heading", term: "Custom properties" },
  { id: "conditionsHeading", kind: "heading", term: "Conditions" },
  { id: "animationsHeading", kind: "heading", term: "Animations" },
  { id: "tokensConsumedHeading", kind: "heading", term: "Tokens consumed" },
  { id: "browserSupportHeading", kind: "heading", term: "Browser support" },
  { id: "subcomponentsHeading", kind: "heading", term: "Subcomponents" },
  { id: "relatedHeading", kind: "heading", term: "Related" },
  { id: "extendsHeading", kind: "heading", term: "Extends" },
  { id: "startHereHeading", kind: "heading", term: "Start here" },
  { id: "browseByGroupHeading", kind: "heading", term: "Browse by group" },
  { id: "overviewHeading", kind: "heading", term: "Overview" },
  { id: "componentsHeading", kind: "heading", term: "Components" },
  { id: "utilitiesHeading", kind: "heading", term: "Utilities" },
  { id: "rulesHeading", kind: "heading", term: "Rules" },
  { id: "declarationsHeading", kind: "heading", term: "Declarations" },

  // Badge/doc-tag terms (`pantoken-doc-tag">Term<`) — the stability-tier pill.
  { id: "alphaBadge", kind: "badge", term: "Alpha" },
  { id: "betaBadge", kind: "badge", term: "Beta" },
  { id: "experimentalBadge", kind: "badge", term: "Experimental" },

  // Line-anchored terms (whole-string glossary units) — table column headers and isolated labels.
  { id: "modifierLine", kind: "line", term: "Modifier" },
  { id: "pseudoElementLine", kind: "line", term: "Pseudo-element" },
  { id: "partLine", kind: "line", term: "Part" },
  { id: "stateLine", kind: "line", term: "State" },
  { id: "slotLine", kind: "line", term: "Slot" },
  { id: "animationLine", kind: "line", term: "Animation" },
  { id: "tokenLine", kind: "line", term: "Token" },
  { id: "typeLine", kind: "line", term: "Type" },
  { id: "valueLine", kind: "line", term: "Value" },
  { id: "queryLine", kind: "line", term: "Query" },
  { id: "nameLine", kind: "line", term: "Name" },
  { id: "summaryLine", kind: "line", term: "Summary" },
  { id: "defaultLine", kind: "line", term: "Default" },
  { id: "areaLine", kind: "line", term: "Area" },
  { id: "groupLine", kind: "line", term: "Group" },
  { id: "jsRequirementLine", kind: "line", term: "JS Requirement" },
  { id: "jsEnhancementLine", kind: "line", term: "JS Enhancement" },
  { id: "overviewLine", kind: "line", term: "Overview" },
  { id: "componentsLine", kind: "line", term: "Components" },
  { id: "utilitiesLine", kind: "line", term: "Utilities" },
  { id: "rulesLine", kind: "line", term: "Rules" },
  { id: "declarationsLine", kind: "line", term: "Declarations" },
];
