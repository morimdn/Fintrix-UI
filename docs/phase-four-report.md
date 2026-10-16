# Phase 4 release preparation — 2026-10-16

Proposed package: **fintrix-ui@0.3.0**, not published. Branch:
`feat/phase-four-npm-release`, based on fetched main `3b932f6` including Phase 3.
Both candidate registry names (`fintrix-ui`, `@fintrix/ui`) returned E404.
Neither legal rights, registration eligibility nor scope ownership is confirmed.

## Package and documentation

The MIT package preserves ESM modules, TypeScript declarations, component and
token exports, CSS, optional self-hosted Inter, React/React DOM 18.3/19 and Ant 6
peers, and a Lucide dependency. CSS remains side-effectful; JS supports tree
shaking. Full Inter OFL and Lucide ISC/Feather MIT notices ship in dist. The
allowlisted 36-file archive contains no Showcase, tests or workspace source.
`private: true` remains in both library and workspace manifests.

README and generated package README, Getting Started, component guidance,
iconography examples, in-app developer documentation, architecture, changelog,
release guide and new owner/developer guides use the new imports. Registry
commands are explicitly future-only; tarball installation remains documented.
Historical Phase 2/3 reports retain their original observations.

## Independent consumers

Each consumer installs an actual tarball into a fresh `/tmp/fintrix-consumer-*`
directory outside the monorepo; there are no source aliases or workspace imports.
The validator rejects a symlinked library and checks Node ESM token/JSON imports.
Exact documentation examples compile against the installed package.

| React / React DOM | Ant Design | TypeScript + production build | Chromium tests |
| --- | --- | --- | --- |
| 18.3.1 | 6.0.0 | Passed | 10 passed |
| 18.3.1 | 6.6.6 | Passed | 10 passed |
| 19.3.1 | 6.0.0 | Passed | 10 passed |
| 19.3.1 | 6.6.6 | Passed | 10 passed |

Coverage includes actual Inter loading and CSS, FintrixProvider, both themes and
densities, FintrixIcon and iconTone colors/actions, button/form validation,
DataGrid pagination/columns, financial formatting, modal/drawer keyboard behavior,
and axe checks. Corresponding `consumer-*-antd-*.json` files record installed
versions and production asset sizes. All four installed-artifact tree-shaking
probes pass; small component/icon imports do not retain Ant Design.

## Verification

- TypeScript, library and Showcase production builds: passed.
- Storybook build and documentation synchronization: passed.
- Unit tests: 120 passed; release registry failure/duplicate tests: 5 passed.
- Chromium Showcase regression suite: 49 passed on the final clean run.
- Package inspection, pack dry-run, actual extraction and publish **dry-run**: passed.
- Actionlint 1.7.7: CI and npm release workflows pass static validation.
- React/Ant consumer matrix: all four builds and 40 browser tests passed.
- Local Firefox/WebKit download was denied by network policy (HTTP 403). The
  existing GitHub `browser-engines` CI job provides those checks; no local pass is claimed.
- GitHub CI: review the latest PR checks for the committed revision. Release
  staging separately requires successful push CI on the exact reviewed main SHA.

An early Chromium run had one timeout while the library dist was rebuilt during
the watched test server. The final run uses a completed, stable build. Production
builds still emit large-chunk warnings; the financial consumer includes Ant Design
and React. These are not the small library-only tree-shaking probe sizes.

## Release safety and owner blockers

The manual-only `npm-release.yml` stages with OIDC/provenance after exact main/CI,
name/version, environment authorization and duplicate-version gates. It never
approves a stage. It cannot stage this candidate while `private: true` remains.
Ordinary pushes and PRs cannot publish. No credentials were added.

The owner must confirm naming rights/publish access, set up npm email verification
and 2FA, resolve first-package bootstrap, protect main and the `npm-release`
environment, configure a stage-only Trusted Publisher and explicitly authorize a
separate safeguard-removal change and release. New-package staging creates a
public placeholder and therefore also needs prior approval. See
[npm owner setup](npm-owner-setup.md) and [release guide](releases.md).

Manual screen-reader/keyboard accessibility review remains outstanding. Automated
axe results do not establish WCAG conformance. CommonJS, SSR hydration, older
React and every Ant 6 minor remain unverified. No npm publication/staging, GitHub
Release, merge, Pages deployment, account creation or Figma work occurred.
