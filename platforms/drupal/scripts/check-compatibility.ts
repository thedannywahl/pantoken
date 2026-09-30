import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { toDrupalTheme } from "../src/index.ts";

const releases = [
  { version: "10.6.18", image: "drupal:10.6.18-php8.3-apache" },
  { version: "11.3.2", image: "drupal:11.3.2-php8.3-apache" },
];

/** Parse generated theme metadata with Drupal core and Symfony YAML from official images. */
export async function checkCompatibility(version: string): Promise<void> {
  const release = releases.find((candidate) => candidate.version === version);
  if (!release) throw new Error(`Unsupported Drupal release: ${version}`);
  const directory = mkdtempSync(join(tmpdir(), "pantoken-drupal-"));
  try {
    const themeRoot = join(directory, "theme");
    const themeFiles = toDrupalTheme({ name: "Pantoken Compatibility" });
    for (const file of themeFiles) {
      const path = join(themeRoot, file.path);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, file.content);
    }
    writeFileSync(
      join(directory, "check.php"),
      `<?php
require "/var/www/html/autoload.php";
    $root = "/var/www/html/themes/custom/pantoken_compatibility";
\\Drupal\\Component\\FileCache\\FileCacheFactory::setPrefix("pantoken-compat-check");
$parser = new \\Drupal\\Core\\Extension\\InfoParser("/var/www/html");
$info = $parser->parse($root . "/pantoken_compatibility.info.yml");
$libraries = \\Symfony\\Component\\Yaml\\Yaml::parseFile($root . "/pantoken_compatibility.libraries.yml");
if (($info["type"] ?? null) !== "theme" || ($info["core_version_requirement"] ?? null) !== "^10 || ^11") {
  throw new \\RuntimeException("Drupal rejected generated theme metadata");
}
if (!isset($libraries["tokens"]["css"]["theme"]["css/tokens.css"]) || !isset($libraries["tokens"]["css"]["theme"]["css/pantoken-prose.css"])) {
  throw new \\RuntimeException("Drupal rejected generated theme library definitions");
}
foreach (["css/tokens.css", "css/pantoken-prose.css"] as $asset) {
  if (!is_file($root . "/" . $asset)) throw new \\RuntimeException("Missing theme asset: " . $asset);
}
$discovery = new \\Drupal\\Core\\Extension\\ExtensionDiscovery("/var/www/html", TRUE, [], "sites/default");
$themes = $discovery->scan("theme", FALSE);
if (!isset($themes["pantoken_compatibility"])) throw new \\RuntimeException("Drupal did not discover the generated theme");
echo json_encode(["type" => $info["type"], "library" => "tokens", "discovered" => $themes["pantoken_compatibility"]->getName()]);
`,
    );
    const result = spawnSync(
      "docker",
      [
        "run",
        "--rm",
        "--volume",
        `${themeRoot}:/var/www/html/themes/custom/pantoken_compatibility:ro`,
        "--volume",
        `${join(directory, "check.php")}:/tmp/pantoken-check.php:ro`,
        "--entrypoint",
        "php",
        release.image,
        "/tmp/pantoken-check.php",
      ],
      { encoding: "utf8" },
    );
    if (result.error || result.status !== 0) {
      throw new Error(
        (result.error?.message ?? [result.stderr, result.stdout].filter(Boolean).join("\n")) ||
          `Drupal ${version} check exited ${result.status}`,
      );
    }
    console.log(
      `✓ Drupal ${version}: core discovered the generated theme and accepted its library`,
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release.version);
}
