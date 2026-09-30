import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { byTheme } from "@pantoken/tokens";
import { resolveReferences } from "@pantoken/core";
import { generateSwift } from "../dist/index.mjs";
import { targetEnvironments } from "../../../scripts/release/target-versions.ts";

const runtime = "com.apple.CoreSimulator.SimRuntime.iOS-27-0";
const deviceType = "com.apple.CoreSimulator.SimDeviceType.iPhone-18-Pro";
const bundleId = "com.pantoken.compatibility.swift";

function run(command: string, args: string[]): string {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    throw new Error(
      (result.error?.message ?? [result.stderr, result.stdout].filter(Boolean).join("\n")) ||
        `${command} ${args.join(" ")} exited ${result.status}`,
    );
  }
  return result.stdout.trim();
}

function swiftNumber(value: number): string {
  return (Math.round(value * 1000) / 1000).toFixed(3);
}

/** Build and run a disposable UIKit app on an isolated iOS 27 simulator. */
export async function checkRuntime(): Promise<void> {
  const [environment] = targetEnvironments("@pantoken/swift");
  const xcode = run("xcodebuild", ["-version"]);
  const sdkVersion = run("xcrun", ["--sdk", "iphonesimulator", "--show-sdk-version"]);
  const expectedXcode = environment.match(/Xcode (\d+\.\d+)/u)?.[1];
  const expectedSdk = environment.match(/SDK\/runtime (\d+\.\d+)/u)?.[1];
  if (
    !expectedXcode ||
    !expectedSdk ||
    !xcode.includes(`Xcode ${expectedXcode}`) ||
    sdkVersion !== expectedSdk
  ) {
    throw new Error(`Expected ${environment}, got ${xcode} / iOS Simulator SDK ${sdkVersion}`);
  }

  const expectedHex = resolveReferences(byTheme("rebrand"), "light").get(
    "--instui-color-background-brand",
  );
  const hex = expectedHex?.match(/^#([\da-f]{6})$/iu)?.[1];
  if (!hex) throw new Error(`Expected a concrete brand hex token, got ${expectedHex}`);
  const channels = [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const simulatorId = run("xcrun", [
    "simctl",
    "create",
    "Pantoken iOS Runtime Check",
    deviceType,
    runtime,
  ]);
  const directory = mkdtempSync(join(tmpdir(), "pantoken-ios-runtime-"));
  const packageDirectory = join(directory, "DesignTokens");
  const appDirectory = join(directory, "PantokenRuntime.app");
  const swiftFile = await generateSwift({
    outDir: join(packageDirectory, "Sources", "PanTokens"),
    className: "PanTokens",
    icons: ["arrow-left"],
  });
  const assetCatalog = join(packageDirectory, "Sources", "PanTokens", "Icons.xcassets");
  const appSource = join(directory, "AppDelegate.swift");
  const executable = join(appDirectory, "PantokenRuntime");
  mkdirSync(appDirectory, { recursive: true });
  writeFileSync(
    appSource,
    `import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool { true }

    func application(_ application: UIApplication, configurationForConnecting session: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
      let configuration = UISceneConfiguration(name: "Default", sessionRole: session.role)
      configuration.delegateClass = SceneDelegate.self
      return configuration
    }
  }

  class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0
        let colorRead = PanTokens.instuiColorBackgroundBrand.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
        let colorMatches = colorRead
            && abs(red - ${swiftNumber(channels[0])}) < 0.002
            && abs(green - ${swiftNumber(channels[1])}) < 0.002
            && abs(blue - ${swiftNumber(channels[2])}) < 0.002
        let iconLoaded = UIImage(named: "arrow-left") != nil
        let result = colorMatches && iconLoaded ? "pass" : "fail;color=\\(colorMatches);icon=\\(iconLoaded)"
        let marker = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent("pantoken-runtime.txt")
        try? result.write(to: marker, atomically: true, encoding: .utf8)
        guard let windowScene = scene as? UIWindowScene else { return }
        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = UIViewController()
        window.makeKeyAndVisible()
        self.window = window
    }
}
`,
  );
  writeFileSync(
    join(appDirectory, "Info.plist"),
    `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>CFBundleExecutable</key><string>PantokenRuntime</string>
<key>CFBundleIdentifier</key><string>${bundleId}</string>
<key>CFBundleName</key><string>PantokenRuntime</string>
<key>CFBundlePackageType</key><string>APPL</string>
<key>CFBundleVersion</key><string>1</string>
<key>CFBundleShortVersionString</key><string>1.0</string>
<key>MinimumOSVersion</key><string>15.0</string>
<key>UIDeviceFamily</key><array><integer>1</integer><integer>2</integer></array>
<key>UILaunchScreen</key><dict/>
<key>UIApplicationSceneManifest</key><dict>
<key>UIApplicationSupportsMultipleScenes</key><false/>
<key>UISceneConfigurations</key><dict><key>UIWindowSceneSessionRoleApplication</key><array><dict>
<key>UISceneConfigurationName</key><string>Default</string>
<key>UISceneDelegateClassName</key><string>PantokenRuntime.SceneDelegate</string>
</dict></array></dict>
</dict>
</dict></plist>
`,
  );

  let installed = false;
  try {
    const sdk = run("xcrun", ["--sdk", "iphonesimulator", "--show-sdk-path"]);
    run("xcrun", [
      "swiftc",
      "-parse-as-library",
      "-target",
      "arm64-apple-ios15.0-simulator",
      "-sdk",
      sdk,
      "-framework",
      "UIKit",
      "-o",
      executable,
      swiftFile,
      appSource,
    ]);
    run("xcrun", [
      "actool",
      "--compile",
      appDirectory,
      "--platform",
      "iphonesimulator",
      "--minimum-deployment-target",
      "15.0",
      "--target-device",
      "iphone",
      "--target-device",
      "ipad",
      assetCatalog,
    ]);
    if (!existsSync(join(appDirectory, "Assets.car"))) {
      throw new Error("actool did not produce Assets.car from Icons.xcassets");
    }
    run("xcrun", ["simctl", "boot", simulatorId]);
    run("xcrun", ["simctl", "bootstatus", simulatorId, "-b"]);
    run("xcrun", ["simctl", "install", simulatorId, appDirectory]);
    const launchOutput = run("xcrun", ["simctl", "launch", simulatorId, bundleId]);
    installed = true;

    const container = run("xcrun", ["simctl", "get_app_container", simulatorId, bundleId, "data"]);
    const marker = join(container, "Documents", "pantoken-runtime.txt");
    const deadline = Date.now() + 30_000;
    while (!existsSync(marker) && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    let result = existsSync(marker) ? readFileSync(marker, "utf8") : "";
    if (!result) {
      const logs = spawnSync(
        "xcrun",
        [
          "simctl",
          "spawn",
          simulatorId,
          "log",
          "show",
          "--last",
          "2m",
          "--style",
          "compact",
          "--predicate",
          'process == "PantokenRuntime"',
        ],
        { encoding: "utf8" },
      );
      result = `no runtime result marker at ${marker}; launch: ${launchOutput}; logs: ${logs.stdout.slice(-6000)} ${logs.stderr}`;
    }
    if (result !== "pass") throw new Error(`iOS simulator runtime check failed: ${result}`);
    console.log(
      "✓ iOS 27.0 Simulator: generated UIColor matches token IR; arrow-left asset loaded",
    );
  } finally {
    if (installed)
      spawnSync("xcrun", ["simctl", "terminate", simulatorId, bundleId], { stdio: "ignore" });
    spawnSync("xcrun", ["simctl", "shutdown", simulatorId], { stdio: "ignore" });
    spawnSync("xcrun", ["simctl", "delete", simulatorId], { stdio: "ignore" });
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await checkRuntime();
