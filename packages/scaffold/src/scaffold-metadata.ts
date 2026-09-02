/**
 * The optional per-template `scaffold.json` schema, and the shape it's compiled into at build
 * time (key names, not resolved text — resolved through the i18n bundle at print-time).
 *
 * @module
 * @alpha
 */

/**
 * Authored per-template metadata (`templates/<platform>/scaffold.json`). Each string may contain
 * `{{dir}}`, `{{pm}}`, `{{install}}`, `{{run}}`, `{{execute}}`, or `{{dev}}` placeholders,
 * substituted by the CLI at print-time. All fields are optional; a missing file (or one missing a
 * given field) falls back to the generic cd/install/run-script next steps.
 */
export interface ScaffoldMetadata {
  nextSteps?: string[];
  notes?: string;
  caveats?: string;
}

/** Compiled form of a platform's `scaffold.json`: i18n key names, not resolved text. */
export interface CompiledScaffoldMetadata {
  nextStepsKeys: string[];
  notesKey?: string;
  caveatsKey?: string;
}
