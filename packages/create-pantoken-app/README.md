# create-pantoken-app

Flat-name alias for [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold), so
`npm create pantoken-app` (or `npm init pantoken-app`) works the way npm's `create-*` convention
expects. Same CLI, same platforms — just published under the name npm's `create` command looks for.

## Usage

```sh
npm create pantoken-app@latest -- react
npm create pantoken-app@latest -- vue --dir ./my-app
```

`npm create <name>` resolves and runs `create-<name>`, forwarding anything after `--` as CLI args.
`pnpm create`/`yarn create` work the same way. You can also run it directly:

```sh
npx create-pantoken-app@latest react
```

If you don't need the flat alias, [`npx @pantoken/scaffold <platform>`](https://www.npmjs.com/package/@pantoken/scaffold)
is the canonical package this wraps — see its README for the full platform list and API.

## License

MIT
