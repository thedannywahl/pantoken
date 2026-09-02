[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / UpstreamNode

# رابط: UpstreamNode

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

One upstream workspace package to watch and rebuild.

## خصوصیات

### name

> **name**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Display name for log messages.

***

### dir

> **dir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Package root directory (the cwd for the build command).

***

### watchPaths

> **watchPaths**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Paths (files or directories) to watch — directories are watched recursively.

***

### build

> **build**: readonly \[`string`, `string`\]

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Build command: first element is the executable, the rest are arguments.

***

### dependents

> **dependents**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Names of other upstream nodes to rebuild after this one succeeds.

***

### include?

> `optional` **include?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Glob patterns for files to include. When set, only changes to files matching at least one
pattern trigger a rebuild. Omit to include everything.

***

### ignore?

> `optional` **ignore?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Glob patterns for files to ignore. Changes to matching files are silently skipped. Omit to
ignore nothing.
