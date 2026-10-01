import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateRust } from "../dist/index.mjs";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

const projects = [
  { format: "egui", package: "egui", crate: "egui", version: "0.36.2" },
  { format: "iced", package: "iced", crate: "iced_core", version: "0.14.0" },
] as const;

/** Compile generated modules against the current native GUI crate releases. */
export function checkCompatibility(version: string): void {
  if (!/^\d+\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Rust release: ${version}`);
  const directory = mkdtempSync(join(tmpdir(), "pantoken-rust-"));
  try {
    writeFileSync(
      join(directory, "Cargo.toml"),
      '[workspace]\nmembers = ["egui", "iced"]\nresolver = "2"\n',
    );
    for (const project of projects) {
      const projectDirectory = join(directory, project.package);
      mkdirSync(join(projectDirectory, "src"), { recursive: true });
      writeFileSync(
        join(projectDirectory, "Cargo.toml"),
        `[package]\nname = "pantoken-${project.package}-check"\nversion = "0.0.0"\nedition = "2024"\n\n[dependencies]\n${project.package} = { package = "${project.crate}", version = "=${project.version}", default-features = false }\n`,
      );
      writeFileSync(
        join(projectDirectory, "src", "lib.rs"),
        generateRust({ format: project.format }),
      );
    }
    const result = spawnSync(
      "docker",
      [
        "run",
        "--rm",
        "--volume",
        `${directory}:/workspace`,
        "--workdir",
        "/workspace",
        `rust:${version}`,
        "cargo",
        "check",
        "--workspace",
      ],
      { encoding: "utf8" },
    );
    if (result.error || result.status !== 0) {
      const message =
        result.error?.message ||
        [result.stderr, result.stdout].filter(Boolean).join("\n") ||
        `cargo check exited ${result.status}`;
      throw new Error(message);
    }
    console.log(`✓ Rust ${version}: generated egui 0.36.2 and iced 0.14.0 modules compile`);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const version of commandTargetVersions("@pantoken/rust")) checkCompatibility(version);
}
