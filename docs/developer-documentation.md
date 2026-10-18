# Developer documentation

The release candidate is `@techosoul/ui@0.3.0`. It is not on npm yet; use the
[tarball instructions](getting-started.md). After publication, install
`@techosoul/ui antd` in an existing React app, with matching `react` and `react-dom`
18.3 or 19 peers and corresponding TypeScript type packages.

Import components/types from `@techosoul/ui`, token helpers from `@techosoul/ui/tokens`,
DTCG data from `@techosoul/ui/tokens.json`, and CSS from `@techosoul/ui/styles.css`.
Optional `@techosoul/ui/fonts.css` self-hosts Inter. ESM modules preserve tree shaking;
CSS is intentionally marked as a side effect. Lucide is a runtime dependency;
if your app imports Lucide icons directly, declare `lucide-react` in your app.

See [complete compiled examples](../examples/documentation/App.tsx),
[component guidance](components.md), [iconography](customization.md#icons),
[architecture](architecture.md), [release controls](releases.md) and
[owner setup](npm-owner-setup.md). Node 24 is required for repository tooling.
The consumer validator uses a fresh OS temporary directory without aliases or
workspace links, and the actual npm tarball. CI covers React 18/19 and both tested
Ant 6 endpoints. No CommonJS or SSR hydration support is claimed.
