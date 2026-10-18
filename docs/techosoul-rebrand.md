# Techosoul UI migration and owner checklist

Techosoul is the umbrella brand; Techosoul UI is the React design system. This pre-release rename keeps version 0.3.0 and both package manifests private. No publication, staging, deployment, GitHub Release, DNS change, or repository rename is part of this change.

## Consumer migration

| Before                                                           | Now                                              |
| ---------------------------------------------------------------- | ------------------------------------------------ |
| `fintrix-ui`                                                     | `@techosoul/ui`                                  |
| `fintrix-ui/tokens`, `/tokens.json`, `/styles.css`, `/fonts.css` | Same subpaths under `@techosoul/ui`              |
| `packages/fintrix-ui`                                            | `packages/techosoul-ui`                          |
| `FintrixProvider`                                                | `TechosoulProvider`                              |
| `useFintrixTheme`                                                | `useTechosoulTheme`                              |
| `FintrixIcon`, `FintrixIconProps`                                | `TechosoulIcon`, `TechosoulIconProps`            |
| `--fx-*` CSS custom properties                                   | `--techosoul-*`, retaining each suffix and value |
| `.fx-*` wrapper classes                                          | `.techosoul-*`                                   |
| `fintrix-ui-0.3.0.tgz`                                           | `techosoul-ui-0.3.0.tgz`                         |

There are no legacy aliases: this migration precedes public release. Update imports, custom CSS selectors, variable overrides and test selectors together. Generic components, token functions and types retain their names. Ant Design 6, React 18/19 support, financial components, DataGrid, theme modes, densities and keyboard tooltip behavior are retained. See [tokens](tokens.md) and the compiled [examples](../examples/documentation).

The package is independently packable while private; install the local tarball using [getting started](getting-started.md). A future registry install is `npm install @techosoul/ui`, only after separate publication authorization. Registration of techosoul.com does not demonstrate control of the npm scope.

## Required owner actions after merge

1. Confirm control of npm organization `techosoul` and publishing rights for `@techosoul/ui` through npm account/organization settings. Follow [npm owner setup](npm-owner-setup.md). Scope control has **not** been verified by this PR.
2. Close or supersede release-authorization PR #8, which targets the old package. Do not merge its old `private: false` authorization into the renamed candidate. Review a separate release-authorization PR only when ownership, protected environment reviewers, Trusted Publisher and all release prerequisites are confirmed. The monorepo root must always remain private.
3. Keep `NPM_RELEASE_ENABLED` off until release setup is complete. The workflow additionally requires the owner's `NPM_SCOPE_OWNER_CONFIRMED=techosoul` attestation, exact version authorization, successful CI for current main, a separately authorized non-private library manifest, and protected environment approval. Staging and final npm approval remain separate manual actions.
4. If renaming the GitHub repository, choose and authorize its new name separately. Then update the local remote (`git remote set-url origin https://github.com/morimdn/NEW-REPOSITORY.git`) and audit URLs in README, package metadata (`repository`, `homepage`, `bugs`), generated package README links, Storybook branding, Showcase documentation, current developer guides, and link assertions. Do not rewrite historical reports to pretend they used the new URL.
5. After an authorized repository rename, change the `build:demo` base from `/Fintrix-UI/` to the actual project Pages path, update public demo links, and verify asset loading and SPA navigation at that path. Update npm Trusted Publisher's repository binding before any later npm workflow. Repository redirects are not a substitute for that binding.
6. Decide separately whether to host on techosoul.com or a subdomain. Custom-domain/CNAME/DNS/TLS and Pages deployment require explicit owner authorization and validation; this PR does not configure them. The current GitHub repository URLs and Pages base remain accurate today.

## Historical evidence

Existing phase reports, benchmark JSON and screenshots describe Fintrix UI at their original commits and are intentionally unchanged. New test screenshots and metrics are written under ignored `artifacts/screenshots` and `artifacts/validation` and uploaded by CI. The changelog retains past entries and adds an unreleased migration entry. License and third-party attribution remain intact.

See [rebrand validation](techosoul-validation.md) for actual checks and limitations.
