# Techosoul UI validation

This report covers the private `@techosoul/ui@0.3.0` rebrand from main
`4fbaccd7ba8f8d76220d13aa5bc9c990587da9a4`. Historical Fintrix reports are not
evidence for the new package name or npm scope ownership.

## Local evidence (2026-10-18)

- `npm ci`, `npm run build` (library, TypeScript, production Showcase),
  `npm run build-storybook` and `npm run docs:check` passed.
- `npm test`: 120 tests passed, preserving existing behavior coverage.
- `npm run test:scripts`: 23 tests passed. Coverage includes shim-free builds,
  literal npm arguments, new API/variable names in all four theme/density
  combinations, scoped registry queries and execution of the actual workflow
  authorization/manifest gates with mocked inputs. The private candidate,
  unconfirmed scope, stale main and failed/incomplete CI are rejected.
- `npm run inspect:package`: dry-run and actual tarball file lists match;
  `techosoul-ui-0.3.0.tgz` contains 36 files, valid exports/assets/notices and
  `private: true`. Built JS, declarations and CSS contain no legacy identifiers.
  The script's publish command is exclusively `--dry-run --ignore-scripts`;
  there was no registry write.
- `npm run validate:consumer`: actual tarball installed outside the workspace,
  no symlink, all documentation examples typechecked and production consumer
  built with React 19.3.1 and Ant Design 6.6.6.
- `npm run measure:package`: completed tree-shaking and archive measurements;
  current JSON is generated under `artifacts/validation`.
- Compared all 58 runtime exports to a pre-change build: the intended Fintrix
  → Techosoul substitutions preserve the complete export set. Compared all
  four `getTokens` outputs: values are identical to the pre-change build.
- Reviewed the rendered Showcase branding. Historical reports, JSON metrics,
  screenshots, license text and third-party license files remain unchanged.

## Browser and compatibility evidence

The PR checks are the authoritative result for its exact commit. The PR
validation summary records the completed local browser run and links the final
GitHub Actions runs. CI retains every existing job and assertion:

- Ubuntu full validation: build, typecheck, 120 unit tests, script regressions,
  Storybook, documentation sync, package inspection, independent consumer,
  Chromium Showcase/accessibility tests and consumer browser tests.
- Independent consumer builds/browser tests for React 18.3.1/19.3.1 ×
  Ant Design 6.0.0/6.6.6 (four jobs).
- Firefox and WebKit suites, including 20 repetitions each of the affected
  mobile-landscape dark shell case and both keyboard-focus tooltip cases
  (60 WebKit regression cases). Existing clipboard capability skips remain;
  no new skips or weaker assertions were introduced.
- Windows, macOS and Ubuntu packaging/consumer checks using Node 24.22.0,
  npm 11.19.1 and checkout paths containing spaces.

Local Chromium is available; local Firefox/WebKit downloads are blocked by the
managed environment's network policy. Those engines run on GitHub-hosted Linux.
New screenshots/metrics are CI artifacts, preserving historical source evidence.
Run script/build checks before browser tests because the library build recreates
`dist`, which the dev server consumes.

## Remaining boundaries

Both package manifests remain private. npm organization ownership and publishing
rights are unconfirmed and require owner verification. No merge, stage, publish,
deployment, GitHub Release, repository rename or DNS change is authorized by
this work. See [the migration and exact owner checklist](techosoul-rebrand.md).
Automated accessibility checks do not replace manual assistive-technology review;
CommonJS, SSR hydration and untested peer-version combinations are not certified.
