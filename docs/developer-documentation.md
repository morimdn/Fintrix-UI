# Developer documentation

The release candidate is `fintrix-ui@0.3.0`. It is not on npm yet; use the
[tarball instructions](getting-started.md). After publication, install
`fintrix-ui antd` in an existing React app, with matching `react` and `react-dom`
18.3 or 19 peers and corresponding TypeScript type packages.

Import components/types from `fintrix-ui`, token helpers from `fintrix-ui/tokens`,
DTCG data from `fintrix-ui/tokens.json`, and CSS from `fintrix-ui/styles.css`.
Optional `fintrix-ui/fonts.css` self-hosts Inter. ESM modules preserve tree shaking;
CSS is intentionally marked as a side effect. Lucide is a runtime dependency;
if your app imports Lucide icons directly, declare `lucide-react` in your app.

See [complete compiled examples](../examples/documentation/App.tsx),
[component guidance](components.md), [iconography](customization.md#icons),
[architecture](architecture.md), [release controls](releases.md) and
[owner setup](npm-owner-setup.md). Node 24 is required for repository tooling.
The consumer validator uses a fresh OS temporary directory without aliases or
workspace links, and the actual npm tarball. CI covers React 18/19 and both tested
Ant 6 endpoints. No CommonJS or SSR hydration support is claimed.
