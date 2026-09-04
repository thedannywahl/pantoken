/**
 * Script fonts for the social-card renderer (`docs/scripts/gen-og.ts`).
 *
 * The card's brand face — Atkinson Hyperlegible Next — is vendored under `docs/assets/fonts`, but it
 * only covers Latin. Rendering a card for every locale needs a face per non-Latin script, and the
 * Noto family that covers them all is far too large to commit (~53 MB of variable TTFs). So they're
 * fetched once into a git-ignored cache under `docs/assets/fonts/noto/`, from a pinned `google/fonts`
 * commit, and each download is checked against a recorded SHA-256 before it's used. A cached file is
 * reused as-is, so only the first `docs:assets` run on a machine (or a cold CI runner) pays for it.
 *
 * `resvg` reads TTF/OTF, and `google/fonts` now ships Noto only as variable TTFs. `resvg` renders the
 * default instance of a variable font rather than instancing the `wght` axis, so non-Latin cards come
 * out at regular weight — acceptable for a social card, and the alternative (static instances) is no
 * longer published upstream.
 *
 * @module
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** The `google/fonts` commit every font below is pinned to. */
const PIN = "205859f680703e449fe05dce0f792cc041d6dc89";

/** A downloadable script font: where to get it, what it's called, and what it must hash to. */
interface NotoFont {
  /** The path under `ofl/` in `google/fonts`, URL-encoded. */
  path: string;
  /** The `font-family` name to reference it by in the SVG. */
  family: string;
  /** SHA-256 of the file at {@link PIN}. */
  sha256: string;
  /** Han, kana, and Hangul advance about one em per glyph rather than the Latin half-em. */
  ideographic?: boolean;
  /** Han and kana run without spaces, so lines have to break between characters. */
  wrapByCharacter?: boolean;
  /**
   * Whether the card should thicken this face's strokes. `resvg` renders a variable font's default
   * instance and ignores `font-weight`, and a few scripts come out too light against the navy field
   * at that weight, so their text is stroked in its own fill colour to fake the missing weight.
   */
  syntheticBold?: boolean;
}

const NOTO_FONTS = {
  sans: {
    path: "notosans/NotoSans%5Bwdth,wght%5D.ttf",
    family: "Noto Sans",
    sha256: "bfb7bb691513f12e734dc346c03a03f784912432d7e3fa8e56efcf906fe86b3d",
    syntheticBold: true,
  },
  arabic: {
    path: "notosansarabic/NotoSansArabic%5Bwdth,wght%5D.ttf",
    family: "Noto Sans Arabic",
    sha256: "63111b5b2e074dd48cc67692e0a2726d86ee94c1c37fe8598257b7b4e87e869e",
  },
  hebrew: {
    path: "notosanshebrew/NotoSansHebrew%5Bwdth,wght%5D.ttf",
    family: "Noto Sans Hebrew",
    sha256: "7ef36a2c3593758cdb622e1bdef4f84523e92fbc3ccc667438dd80ff54c2de88",
    syntheticBold: true,
  },
  devanagari: {
    path: "notosansdevanagari/NotoSansDevanagari%5Bwdth,wght%5D.ttf",
    family: "Noto Sans Devanagari",
    sha256: "9ce7b04f60e363d8870e5997744cf85cf69d38a4d7d129d364d92a3b14b461d7",
  },
  armenian: {
    path: "notosansarmenian/NotoSansArmenian%5Bwdth,wght%5D.ttf",
    family: "Noto Sans Armenian",
    sha256: "0870908d8318435a5daf1cd280ae15063f990cd9ad60f3e94c734ce9e1ffef71",
  },
  thai: {
    path: "notosansthai/NotoSansThai%5Bwdth,wght%5D.ttf",
    family: "Noto Sans Thai",
    sha256: "5a1c559bb539583c8a1fd99d1c5b9491e5e14478c9cd2bd0970d5c3096cc9ef8",
  },
  japanese: {
    path: "notosansjp/NotoSansJP%5Bwght%5D.ttf",
    family: "Noto Sans JP",
    sha256: "c2f3b4d463500a2ddcd3849cded1fceeb9fd6d1c32e6cbecd568453ba50fc68f",
    ideographic: true,
    wrapByCharacter: true,
    syntheticBold: true,
  },
  korean: {
    path: "notosanskr/NotoSansKR%5Bwght%5D.ttf",
    family: "Noto Sans KR",
    sha256: "194018e6b2b293a7964f037b25c0249ce1418bc9ab3c971060a03aa57861e252",
    ideographic: true,
    syntheticBold: true,
  },
  simplifiedChinese: {
    path: "notosanssc/NotoSansSC%5Bwght%5D.ttf",
    family: "Noto Sans SC",
    sha256: "a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da",
    ideographic: true,
    wrapByCharacter: true,
    syntheticBold: true,
  },
  traditionalChinese: {
    path: "notosanstc/NotoSansTC%5Bwght%5D.ttf",
    family: "Noto Sans TC",
    sha256: "864727d210d54f2537bbe23b3a839436c3992af72de9322af5270897246bd44f",
    ideographic: true,
    wrapByCharacter: true,
    syntheticBold: true,
  },
} as const satisfies Record<string, NotoFont>;

type NotoKey = keyof typeof NOTO_FONTS;

/**
 * The script font each locale's card renders in. Atkinson Hyperlegible Next covers core Latin only,
 * so Greek, Cyrillic, Vietnamese tone stacks, and Māori macrons take Noto Sans for the whole card
 * rather than mixing two faces mid-line. Locales absent from this map are fully covered by the brand
 * face. Re-check this list when a hero string changes: an unmapped character falls through to
 * {@link FALLBACK}, which renders correctly but in a second face.
 */
const LOCALE_FONTS: Record<string, NotoKey> = {
  ar: "arabic",
  fa: "arabic",
  he: "hebrew",
  hi: "devanagari",
  hy: "armenian",
  th: "thai",
  el: "sans",
  mi: "sans",
  ru: "sans",
  uk: "sans",
  vi: "sans",
  ja: "japanese",
  ko: "korean",
  "zh-Hans": "simplifiedChinese",
  "zh-Hant": "traditionalChinese",
};

/** Loaded last on every card so a character no mapped face carries still renders instead of tofu. */
const FALLBACK: NotoKey = "sans";

const cacheDir = fileURLToPath(new URL("../../assets/fonts/noto/", import.meta.url));
const cachePath = (key: NotoKey): string => `${cacheDir}${key}.ttf`;

const sha256 = (bytes: Uint8Array): string => createHash("sha256").update(bytes).digest("hex");

/** Read the cached file for `key`, or `undefined` if it's absent or doesn't match its pinned hash. */
function readCached(key: NotoKey): Uint8Array | undefined {
  try {
    const bytes = readFileSync(cachePath(key));
    return sha256(bytes) === NOTO_FONTS[key].sha256 ? bytes : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Resolve a script font to a local file path, downloading and caching it on first use.
 *
 * @returns The path, or `undefined` when the font is neither cached nor reachable — the caller then
 *   falls back to the Latin card text rather than rendering a page of tofu.
 */
async function resolveFont(key: NotoKey): Promise<string | undefined> {
  if (readCached(key)) return cachePath(key);

  const url = `https://raw.githubusercontent.com/google/fonts/${PIN}/ofl/${NOTO_FONTS[key].path}`;
  let bytes: Uint8Array;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    bytes = new Uint8Array(await response.arrayBuffer());
  } catch (error) {
    console.warn(`gen-og: could not fetch ${NOTO_FONTS[key].family} (${String(error)})`);
    return undefined;
  }

  const digest = sha256(bytes);
  if (digest !== NOTO_FONTS[key].sha256) {
    // A mismatch means the pinned URL served something other than the vetted file; never cache it.
    console.warn(
      `gen-og: ${NOTO_FONTS[key].family} failed its integrity check (got ${digest}) — skipping`,
    );
    return undefined;
  }

  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cachePath(key), bytes);
  return cachePath(key);
}

/** The font resources a locale's card renders with. */
export interface LocaleFonts {
  /** Every TTF `resvg` should load, the locale's script font first. */
  files: string[];
  /** The SVG `font-family` list for the card's text. */
  family: string;
  /** Whether glyphs advance a full em rather than the Latin half-em. */
  ideographic: boolean;
  /** Whether lines break between characters rather than between words. */
  wrapByCharacter: boolean;
  /** Whether the card should stroke the text to make up for the face's unavailable heavier weights. */
  syntheticBold: boolean;
  /** Whether the locale's own script font resolved; `false` means fall back to the English text. */
  localized: boolean;
}

/**
 * Resolve the fonts for one locale's card.
 *
 * @param locale - The docs locale key (`root` for English).
 * @param latinFamily - The vendored brand family name.
 * @param latinFiles - The vendored brand face files.
 * @returns The {@link LocaleFonts} to render with.
 */
export async function localeFonts(
  locale: string,
  latinFamily: string,
  latinFiles: readonly string[],
): Promise<LocaleFonts> {
  const fallbackFile = await resolveFont(FALLBACK);
  const base = {
    files: [...latinFiles, ...(fallbackFile ? [fallbackFile] : [])],
    family: fallbackFile ? `${latinFamily}, ${NOTO_FONTS[FALLBACK].family}` : latinFamily,
    ideographic: false,
    wrapByCharacter: false,
    syntheticBold: false,
  };
  const key = LOCALE_FONTS[locale];
  if (!key) return { ...base, localized: true };

  const file = await resolveFont(key);
  if (!file) return { ...base, localized: false };

  const font: NotoFont = NOTO_FONTS[key];
  return {
    ...base,
    files: key === FALLBACK ? [file, ...latinFiles] : [file, ...base.files],
    family: key === FALLBACK ? `${font.family}, ${latinFamily}` : `${font.family}, ${base.family}`,
    ideographic: font.ideographic === true,
    wrapByCharacter: font.wrapByCharacter === true,
    syntheticBold: font.syntheticBold === true,
    localized: true,
  };
}
