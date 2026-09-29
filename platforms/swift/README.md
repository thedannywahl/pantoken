# @pantoken/swift

Emit Instructure design tokens as Swift, via Style Dictionary. This is pantoken's native proof: it
flattens the token IR to concrete, single-mode values, keeps the natively-typed tokens (colours,
dimensions, numbers), and hands them to `@pantoken/sd-config`.

## Install

```sh
npm i @pantoken/swift
```

## Usage

```ts
import { generateSwift } from "@pantoken/swift";

const file = await generateSwift({
  outDir: "./Sources/Tokens",
  theme: "rebrand",
  className: "PanTokens", // the generated Swift class name (default)
  icons: ["add", "check"], // optional: also emit an Icons.xcassets asset catalog
});
// writes Tokens.swift (class PanTokens { … })
```

Or via the CLI:

```sh
pantoken generate swift --out ./MyTokens
```

## Output

- A Swift file declaring a class (named after `className`) of `Color`, `CGFloat`, and numeric
  constants.
- With `icons` set: an `Icons.xcassets` asset catalog of vector-preserving imagesets for the
  requested glyphs.

The CLI wraps the same output in a Swift Package: it writes the source under
`<out>/Sources/<className>/` and a `Package.swift` SwiftPM manifest stub at `<out>/`, so the
directory is publishable to SwiftPM as-is. This emitter uses UIKit and targets iOS, not macOS.
Swapping the platform (Flutter, Compose) reuses the same path through `@pantoken/sd-config`.

For repository contributors, `mise run verify:swift:syntax` parses a disposable generated package
with Command Line Tools. `mise run verify:swift:host` checks it against the iOS Simulator SDK and
requires full Xcode; syntax alone does not establish iOS compatibility. To generate a package in a
chosen location, set `SWIFT_PACKAGE_OUT` and run `mise run scaffold:swift`.

## Compatibility

The generated UIKit module typechecks with Xcode 27.0 (Swift 6.4) against iOS Simulator SDK 27.0
for an arm64 iOS 15 deployment target. This is **compiler-only evidence**, not an iOS 15 runtime
guarantee. Simulator execution, optional `Icons.xcassets`, watchOS, and tvOS aren't verified. See
the [compatibility matrix](https://pantoken.app/compatibility) for the tested environment.

## API

- **`generateSwift(options): Promise<string>`** — emit Swift for a named theme (from the vendored
  `@pantoken/tokens` IR). Returns the written file path.
- **`toSwift(tokens, options): Promise<string>`** — same, but for an explicit token IR. Returns the
  written file path.
- **`GenerateSwiftOptions`** — the `outDir`, `theme`, `mode`, `className`, and `icons` options both
  take.

## Related

- Uses `@pantoken/tokens` for the vendored token IR and `@pantoken/sd-config` for the Style
  Dictionary platforms.
- Pairs with `@pantoken/compose` and `@pantoken/flutter`, the same shape for other native targets.

## License

MIT
