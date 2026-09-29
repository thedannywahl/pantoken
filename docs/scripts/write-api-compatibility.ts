import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildCompatibility, type ConsumerEntry } from "../../scripts/release/compatibility.ts";

const docsRoot = join(import.meta.dirname, "..");

/** Render a package's target support claim on its TypeDoc landing page. */
export function withCompatibility(markdown: string, consumer: ConsumerEntry): string {
  const support = consumer.targetSupport;
  const format = support.format ? ` Current format: \`${support.format}\`.` : "";
  const versions =
    support.status === "verified"
      ? `Minimum host version: \`${support.minimum}\`. Tested through \`${support.testedThrough}\`. Newer releases require review.`
      : support.status === "not-applicable"
        ? `Host version: not applicable (${support.reason}).`
        : "Host compatibility has not yet been verified.";
  const section = `\n## Compatibility\n\nTarget: ${support.target}.${format} ${versions}\n\n[Full compatibility matrix](../../../../compatibility)\n`;
  const heading = /^# [^\n]+\n/mu;
  if (!heading.test(markdown)) throw new Error(`Missing API title: ${consumer.package}`);
  const withoutOldSections = markdown.replace(
    /^## Compatibility\n\nTarget: [^\n]+\n\n\[Full compatibility matrix\]\([^\n]+\)\n\n/gmu,
    "",
  );
  return withoutOldSections.replace(heading, (title) => `${title}${section}`);
}

/** Populate every adapter's generated API page from the compatibility registry. */
export async function writeApiCompatibility(): Promise<void> {
  const compatibility = await buildCompatibility();
  for (const consumer of compatibility.consumers) {
    const file = join(docsRoot, "api", consumer.path, "src/index.md");
    writeFileSync(file, withCompatibility(readFileSync(file, "utf8"), consumer));
  }
  console.log(`✓ API compatibility: updated ${compatibility.consumers.length} package pages`);
}
