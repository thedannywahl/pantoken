import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

const fixture = fileURLToPath(new URL("../tests/fixture/", import.meta.url));
const theme = fileURLToPath(new URL("../generated/theme.json", import.meta.url));
const evaluation =
  '$settings=wp_get_global_settings(); echo json_encode(array("version"=>get_bloginfo("version"),"palette"=>count($settings["color"]["palette"]["theme"]??[]),"spacing"=>count($settings["spacing"]["spacingSizes"]["theme"]??[]),"fonts"=>count($settings["typography"]["fontFamilies"]["theme"]??[])));';

function docker(args: string[]): string {
  const result = spawnSync("docker", args, { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    throw new Error(
      result.error?.message ?? (result.stderr.trim() || `docker exited ${result.status}`),
    );
  }
  return result.stdout.trim();
}

/** Ensure the current block theme exposes all three generated preset families. */
export function assertPresets(output: string, release: string): void {
  const report = JSON.parse(output) as {
    version: string;
    palette: number;
    spacing: number;
    fonts: number;
  };
  const normalized = release.replace(/\.0$/u, "");
  if (
    (report.version !== normalized && !report.version.startsWith(`${normalized}.`)) ||
    report.palette < 1 ||
    report.spacing < 1 ||
    report.fonts < 1
  ) {
    throw new Error(`WordPress ${release} did not load the generated presets: ${output}`);
  }
}

/** Install the generated theme on an ephemeral WordPress host for each supported release train. */
export async function checkHost(
  releases = commandTargetVersions("@pantoken/wordpress"),
): Promise<void> {
  if (releases.length === 0) throw new Error("No WordPress releases selected");
  const id = randomUUID().slice(0, 8);
  const network = `pantoken-wp-${id}`;
  const database = `${network}-db`;
  const host = `${network}-host`;
  const password = randomUUID().replaceAll("-", "");
  const dbEnv = [
    "-e",
    "WORDPRESS_DB_HOST=db",
    "-e",
    "WORDPRESS_DB_USER=wordpress",
    "-e",
    `WORDPRESS_DB_PASSWORD=${password}`,
    "-e",
    "WORDPRESS_DB_NAME=wordpress",
  ];
  const wp = (...args: string[]): string =>
    docker([
      "run",
      "--rm",
      "--user",
      "33:33",
      "--network",
      network,
      "--volumes-from",
      host,
      "-e",
      "HOME=/tmp",
      ...dbEnv,
      "wordpress:cli-php8.3",
      "wp",
      ...args,
    ]);

  try {
    docker(["network", "create", network]);
    docker([
      "run",
      "-d",
      "--name",
      database,
      "--network",
      network,
      "--network-alias",
      "db",
      "--health-cmd=mariadb-admin ping -h localhost --silent",
      "--health-interval=2s",
      "--health-retries=20",
      "-e",
      `MARIADB_ROOT_PASSWORD=${password}`,
      "-e",
      "MARIADB_DATABASE=wordpress",
      "-e",
      "MARIADB_USER=wordpress",
      "-e",
      `MARIADB_PASSWORD=${password}`,
      "mariadb:11.4",
    ]);
    docker([
      "run",
      "-d",
      "--name",
      host,
      "--network",
      network,
      ...dbEnv,
      "-v",
      `${fixture}:/tmp/pantoken-fixture:ro`,
      "-v",
      `${theme}:/tmp/pantoken-theme.json:ro`,
      "wordpress:6.6-php8.3-apache",
    ]);
    const deadline = Date.now() + 60_000;
    while (docker(["inspect", database, "--format", "{{.State.Health.Status}}"]) !== "healthy") {
      if (Date.now() > deadline) throw new Error("WordPress test database did not become healthy");
      await new Promise((resolve) => setTimeout(resolve, 1_000));
    }
    docker([
      "exec",
      host,
      "mkdir",
      "-p",
      "/var/www/html/wp-content/themes/pantoken-fixture/templates",
    ]);
    docker([
      "exec",
      host,
      "php",
      "-r",
      'file_put_contents("/var/www/html/wp-content/themes/pantoken-fixture/style.css", "/*\\nTheme Name: Pantoken Compatibility Fixture\\nVersion: 1.0.0\\n*/\\n");',
    ]);
    for (const [source, target] of [
      ["/tmp/pantoken-fixture/templates/index.html", "templates/index.html"],
      ["/tmp/pantoken-theme.json", "theme.json"],
    ]) {
      docker([
        "exec",
        host,
        "cp",
        source,
        `/var/www/html/wp-content/themes/pantoken-fixture/${target}`,
      ]);
    }
    wp(
      "core",
      "install",
      "--url=http://example.test",
      "--title=Pantoken",
      "--admin_user=admin",
      `--admin_password=${password}`,
      "--admin_email=admin@example.test",
      "--skip-email",
    );
    wp("theme", "activate", "pantoken-fixture");
    for (const release of releases) {
      if (release !== "6.6") {
        wp("core", "update", `--version=${release}`, "--force");
        wp("core", "update-db");
      }
      const output = wp("eval", evaluation);
      assertPresets(output, release);
      console.log(`✓ WordPress ${release}: color, spacing, and typography presets loaded`);
    }
  } finally {
    spawnSync("docker", ["rm", "-f", host, database], { stdio: "ignore" });
    spawnSync("docker", ["network", "rm", network], { stdio: "ignore" });
  }
}

if (process.argv[1] === import.meta.filename) await checkHost();
