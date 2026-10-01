import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndroid } from "../dist/index.mjs";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

type AndroidEnvironment = { api: string; buildTools: string };

function environment(label: string): AndroidEnvironment {
  const match = /^API (\d+) \/ build-tools (\d+\.\d+\.\d+)$/u.exec(label);
  if (!match) throw new Error(`Invalid Android compatibility environment: ${label}`);
  return { api: match[1], buildTools: match[2] };
}

/** Compile and link generated values, dimensions, and a VectorDrawable with Android build-tools. */
export async function checkCompatibility(label: string): Promise<void> {
  const { api, buildTools } = environment(label);
  const image = `ghcr.io/cirruslabs/android-sdk:${api}`;
  const aapt2 = `/opt/android-sdk-linux/build-tools/${buildTools}/aapt2`;
  const androidJar = `/opt/android-sdk-linux/platforms/android-${api}/android.jar`;
  const directory = mkdtempSync(join(tmpdir(), "pantoken-android-"));
  try {
    const main = join(directory, "app", "src", "main");
    const files = await generateAndroid({ outDir: main, icons: ["arrow-left"] });
    const colors = readFileSync(files[0], "utf8");
    if (!/<color name="instui_color_background_brand">#[\da-f]{8}<\/color>/iu.test(colors)) {
      throw new Error("Generated Android resources are missing the brand color token");
    }
    if (!existsSync(join(main, "res", "drawable", "ic_arrow_left.xml"))) {
      throw new Error("Generated Android resources are missing the arrow-left VectorDrawable");
    }
    mkdirSync(main, { recursive: true });
    writeFileSync(
      join(main, "AndroidManifest.xml"),
      '<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.pantoken.compatibility"><uses-sdk android:minSdkVersion="23" /></manifest>\n',
    );

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
        `${aapt2} compile --dir app/src/main/res -o /tmp/pantoken-resources.zip && ${aapt2} link --manifest app/src/main/AndroidManifest.xml --min-sdk-version 23 -I ${androidJar} --java /tmp/pantoken-r /tmp/pantoken-resources.zip -o /tmp/pantoken-resources.apk`,
      ],
      { encoding: "utf8" },
    );
    if (result.error || result.status !== 0) {
      const message =
        result.error?.message ||
        [result.stderr, result.stdout].filter(Boolean).join("\n") ||
        `aapt2 exited ${result.status}`;
      throw new Error(message);
    }
    console.log(
      `✓ Android API ${api}/build-tools ${buildTools}: values and arrow-left VectorDrawable compiled and linked`,
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const version of commandTargetVersions("@pantoken/android"))
    await checkCompatibility(version);
}
