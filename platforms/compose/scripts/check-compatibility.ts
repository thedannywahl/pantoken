import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateCompose } from "../dist/index.mjs";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

const gradleVersion = "8.14.2";
const androidPluginVersion = "8.9.2";
const kotlinVersion = "2.1.10";
const composeVersion = "1.8.2";

function environment(label: string): string {
  const expected = `Kotlin ${kotlinVersion} / Compose UI ${composeVersion} / Android API 35`;
  if (label !== expected)
    throw new Error(`Unsupported Compose compatibility environment: ${label}`);
  return expected;
}

/** Compile generated Color and Dp values with the Kotlin Android plugin and Compose UI. */
export async function checkCompatibility(label: string): Promise<void> {
  environment(label);
  const image = "ghcr.io/cirruslabs/android-sdk:35";
  const directory = mkdtempSync(join(tmpdir(), "pantoken-compose-"));
  try {
    const generated = await generateCompose({
      outDir: join(directory, "app", "src", "main", "kotlin"),
      theme: "rebrand",
    });
    const source = readFileSync(generated, "utf8");
    if (
      !source.includes("import androidx.compose.ui.graphics.Color") ||
      !source.includes("import androidx.compose.ui.unit.*")
    ) {
      throw new Error("Generated Kotlin is missing Compose Color or unit imports");
    }
    writeFileSync(
      join(directory, "settings.gradle.kts"),
      `pluginManagement { repositories { google(); mavenCentral(); gradlePluginPortal() } }\ndependencyResolutionManagement { repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS); repositories { google(); mavenCentral() } }\nrootProject.name = "pantoken-compose-check"\ninclude(":app")\n`,
    );
    writeFileSync(
      join(directory, "build.gradle.kts"),
      `plugins { id("com.android.library") version "${androidPluginVersion}" apply false; id("org.jetbrains.kotlin.android") version "${kotlinVersion}" apply false }\n`,
    );
    writeFileSync(join(directory, "gradle.properties"), "android.useAndroidX=true\n");
    mkdirSync(join(directory, "app"), { recursive: true });
    writeFileSync(
      join(directory, "app", "build.gradle.kts"),
      `plugins { id("com.android.library"); id("org.jetbrains.kotlin.android") }\nandroid { namespace = "com.pantoken.compatibility"; compileSdk = 35; defaultConfig { minSdk = 23 }; compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }; kotlinOptions { jvmTarget = "17" } }\ndependencies { implementation("androidx.compose.ui:ui-graphics:${composeVersion}"); implementation("androidx.compose.ui:ui-unit:${composeVersion}") }\n`,
    );

    const command = `set -eu; curl -fsSL https://downloads.gradle.org/distributions/gradle-${gradleVersion}-bin.zip -o /tmp/gradle-${gradleVersion}.zip; unzip -oq /tmp/gradle-${gradleVersion}.zip -d /tmp; /tmp/gradle-${gradleVersion}/bin/gradle --no-daemon :app:compileDebugKotlin`;
    const result = spawnSync(
      "docker",
      [
        "run",
        "--rm",
        "--platform",
        "linux/amd64",
        "--volume",
        `${directory}:/workspace`,
        "--workdir",
        "/workspace",
        image,
        "bash",
        "-lc",
        command,
      ],
      { encoding: "utf8" },
    );
    if (result.error || result.status !== 0) {
      const message =
        result.error?.message ||
        [result.stderr, result.stdout].filter(Boolean).join("\n") ||
        `Gradle compileDebugKotlin exited ${result.status}`;
      throw new Error(message);
    }
    console.log(`✓ ${label}: generated Color and Dp tokens compile`);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const version of commandTargetVersions("@pantoken/compose"))
    await checkCompatibility(version);
}
