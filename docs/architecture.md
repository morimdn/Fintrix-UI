# Package architecture

Techosoul uses npm workspaces. `packages/techosoul-ui` owns reusable React components,
semantic tokens, the provider and package CSS. `apps/showcase` owns public examples
and the synthetic brokerage CRM. `examples/consumer-app` is deliberately outside
the workspace so validation cannot silently resolve a source alias.

The proposed public preview is `@techosoul/ui@0.3.0`, still guarded by `private: true`. No registry name or
organization ownership is assumed. No package has been published.

`npm run build:library` emits native ESM modules and TypeScript declarations with
explicit `.js` specifiers. It does not bundle React, React DOM or Ant Design.
They remain peers (React 18.3/19 and Ant Design 6); independent tarball validation covers React 18.3.1/19.3.1 with
Ant Design 6.0.0/6.6.6. Other versions within the ranges are not individually tested. CSS is opt-in and marked as side-effectful.

Exports: root components/types, `/tokens`, `/tokens.json`, `/styles.css`, and
`/fonts.css`. The last entry self-hosts Inter and includes its OFL notice.
Importing the token subpath avoids loading the component graph. The showcase
imports the workspace package's **built output**, never a Vite source alias.

Build order: `npm ci`, `npm run build`, `npm run validate:consumer`, `npm test`,
`npm run build-storybook`, `npm run test:e2e`, then
`npx playwright test --config playwright.consumer.config.ts`.

The consumer validation script packs the library, copies the example to a fresh
OS temporary directory, installs the tarball and peers, and runs TypeScript and
Vite production builds there. `.consumer-path` records that temporary directory
for browser verification and is ignored by Git. No source-directory imports are
allowed in the example. Temporary outputs can be deleted after verification.

The legacy CRM behavior remains in the showcase: sorting, search, filters,
pagination, selection, controlled column visibility/reordering, fixed identity
column, pointer/keyboard resizing, density and client forms. The library's generic
`DataGrid<T>` adds controlled widths and visibility to Ant Table; consumers own
business filtering and persistence. Pass Ant `TableProps<T>` for selection,
sorting, pagination, scrolling and virtualization. Grouped column definitions
are currently supported by `DataTable`, not the convenience `DataGrid` API.

Documentation examples live in examples/documentation. The public guide imports
them as raw text; validate:consumer copies the same files into its independent
installation for typechecking and browser exercise. docs:check verifies that the
Markdown onboarding example matches its TypeScript source. No source alias is used.
