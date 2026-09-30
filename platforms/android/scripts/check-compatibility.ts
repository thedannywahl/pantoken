import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndroid } from "../dist/index.mjs";

const image = "ghcr.io/cirruslabs/android-sdk:35";
const aapt2 = "/opt/android-sdk-linux/build-tools/35.0.0/aapt2";
const androidJar = "/opt/android-sdk-linux/platforms/android-35/android.jar";

/** Compile and link generated values, dimensions, and a VectorDrawable with Android build-tools. */
export async function checkCompatibility(): Promise<void> {
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
      "✓ Android API 35/build-tools 35.0.0: values and arrow-left VectorDrawable compiled and linked",
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await checkCompatibility();
