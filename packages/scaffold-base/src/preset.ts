/**
 * Factory for creating scaffold Presets with proper type inference for `--isolatedDeclarations`.
 *
 * @module
 * @alpha
 */
import type { Base, Preset } from "bingo-stratum";

interface PresetInput {
  name: string;
  base: Base<any>;
  blocks?: any[];
}

/**
 * Create a scaffold Preset with explicit return type for TypeScript `--isolatedDeclarations`.
 *
 * @param input Preset configuration with name, base, and optional blocks
 * @returns Properly typed Bingo Preset
 */
export function createPreset(input: PresetInput): Preset {
  return {
    about: { name: input.name },
    base: input.base,
    blocks: input.blocks ?? [],
  } as unknown as Preset;
}
