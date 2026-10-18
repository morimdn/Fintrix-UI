# npm release-readiness audit

Target: **@techosoul/ui@0.3.0** in **morimdn/Techosoul-UI**.
Audited from main `a137068168c69c89be2f61ea17e883b8b8209efa` on 2026-10-18.
This is preparation, not release authorization. Root and library remain private.

## Findings and changes

- Scoped package/version, repository metadata, authorization text and publishing
  instructions already use the intended identity. Historical reports and negative
  tests retain old names intentionally. No package/dependency/version change is needed.
- Retain manual dispatch, protected `npm-release` environment, scope attestation,
  explicit authorization, private-manifest blocking, serial staging, OIDC,
  provenance and no automatic npm approval. GitHub-hosted Ubuntu remains the runner.
- Pin release Node/npm to **24.22.0 / 11.19.1**, already exercised by portability
  CI. These satisfy npm's staged-publishing runtime requirements.
- Recheck both current main and latest exact-commit push CI immediately before
  staging; a new failed/pending CI attempt now blocks the upload too.
- Require explicit owner queue-review input. The new authenticated, read-only
  helper fails on any pending stage, authentication/registry error or malformed
  response. OIDC publishing tokens cannot list stages; no token is added to CI.
- Stage the exact archive that passed inspection and publish dry-run, using an
  explicit registry and disabled lifecycle scripts. Keep the archive's integrity
  in logs. A strict file allowlist rejects unexpected files even under `dist/`.
- Expand regression coverage for registry/auth failures, queue ambiguity, changed
  main/CI, retained manifest protections and archive contents.

## Read-only registry observation

Both commands returned E404 on the audit date:

```sh
npm view @techosoul/ui@0.3.0 version --json --registry=https://registry.npmjs.org/
npm view @techosoul/ui versions --json --registry=https://registry.npmjs.org/
```

This says only that metadata was not visible to the querying client. It does not
prove availability, organization control, account rights or an empty staging
queue. No owner npm credentials were available, so authenticated queue/account
checks were not performed. No placeholder was created.

## Artifact and validation evidence

The expected archive has 36 files: nine ESM modules and their declarations, two
CSS files and their declarations, seven Inter WOFF2 subsets, semantic token JSON,
package metadata, README, MIT license, third-party notices and Inter/Lucide
licenses. Source, tests, Storybook files, maps, credentials and workspace files
are excluded. Existing export/peer/CSS-side-effect and token checks remain intact.

Local checks passed with npm 11.19.1 on Node 24.19.0: 61 script regressions,
library build, documentation checks and archive inspection/publication dry-run.
The archive is 241,359 bytes, with integrity
`sha512-tLpbuAcJN5LHyI/ocTr1iAOmLDJS4L2kI16qS3stONr7z6eGOrV6jpUP2GVqefB3CcufU/HSMZqsFtCGsCgWKw==`.
The release's exact Node 24.22.0/npm 11.19.1 pair is covered by the portability
matrix. Independent consumer results and final-commit CI links are recorded in
the preparation PR. CI runs builds/typechecking, unit and script regressions, Storybook, docs and
package checks, independent tarball consumers across React 18/19 and Ant Design
6.0/6.6, browser/accessibility suites and Windows/macOS/Linux packaging. The release
workflow itself is not dispatched as a test. Its gates execute against mocked
GitHub/npm responses; publication validation uses only `npm publish --dry-run`.

## Owner-only completion

Follow [the owner setup checklist](npm-owner-setup.md). Ownership/2FA, environment
protections, trusted-publisher configuration and expiry, first-package bootstrap,
a new private-field authorization PR and final npm approval remain unverified
owner actions. A first stage creates a public `0.0.0-stage` placeholder; local
bootstrap lacks GitHub provenance and must not be approved as the final release.

No merge, npm stage/publish/approval/rejection, account/settings change, Pages
deployment or GitHub Release is part of this audit.
