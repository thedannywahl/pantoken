// Minimal type declarations for the (untyped) font-build dependencies.

declare module "points-on-path" {
  /** Flatten an SVG path `d` to arrays of `[x, y]` points, one array per subpath. */
  export function pointsOnPath(path: string, tolerance?: number, distance?: number): number[][][];
}

declare module "clipper-lib" {
  interface ClipperPoint {
    X: number;
    Y: number;
  }
  const ClipperLib: {
    ClipperOffset: new (
      miterLimit?: number,
      roundPrecision?: number,
    ) => {
      AddPath(path: ClipperPoint[], joinType: number, endType: number): void;
      Execute(solution: ClipperPoint[][], delta: number): void;
    };
    Paths: new () => ClipperPoint[][];
    JoinType: { jtRound: number; jtSquare: number; jtMiter: number };
    EndType: {
      etOpenRound: number;
      etOpenButt: number;
      etOpenSquare: number;
      etClosedLine: number;
    };
  };
  export default ClipperLib;
}

declare module "svg2ttf" {
  export default function svg2ttf(
    svg: string,
    options?: Record<string, unknown>,
  ): { buffer: Uint8Array };
}

declare module "ttf2woff2" {
  export default function ttf2woff2(ttf: Uint8Array): Uint8Array;
}
