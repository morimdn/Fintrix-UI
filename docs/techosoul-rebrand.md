# Techosoul UI migration and owner checklist

Techosoul is the umbrella brand; Techosoul UI is the React design system. The merged pre-release library rename keeps version 0.3.0 and both package manifests private. The owner subsequently renamed the repository to `Techosoul-UI`. The repository URL migration does not publish, stage, deploy, create a GitHub Release, or change DNS.

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
4. The owner has renamed the repository to `morimdn/Techosoul-UI`. Update existing clones with `git remote set-url origin https://github.com/morimdn/Techosoul-UI.git`. Current URLs and the project Pages base now use `Techosoul-UI`; historical reports keep the names used at the time.
5. Before any future npm staging, verify the Trusted Publisher repository binding is `Techosoul-UI`. GitHub redirects do not update that binding or establish scope ownership.
6. After the repository/Pages migration PR merges, follow [Pages deployment](pages.md) to manually run **Publish web demo** from `main`. Future `ui.techosoul.com` setup requires separate DNS/custom-domain authorization. Keep `techosoul.com` reserved for the umbrella-brand site.

## Historical evidence

Existing phase reports, benchmark JSON and screenshots describe Fintrix UI at their original commits and are intentionally unchanged. New test screenshots and metrics are written under ignored `artifacts/screenshots` and `artifacts/validation` and uploaded by CI. The changelog retains past entries and adds an unreleased migration entry. License and third-party attribution remain intact.

See [rebrand validation](techosoul-validation.md) for actual checks and limitations.
