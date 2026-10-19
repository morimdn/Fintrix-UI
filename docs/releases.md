# Versioning and releases

`@techosoul/ui@0.3.0` is the proposed first public preview, **not published**.
The library manifest is prepared with `private: false`; the workspace root remains private. Release-readiness preparation does not stage or publish npm,
create a GitHub Release, deploy Pages, or change DNS. The registered techosoul.com
domain does not establish npm scope ownership.
Use SemVer; preview support remains limited to the tested environments.

## Candidate verification

```sh
npm ci
npm run build
npm run docs:check
npm run test:scripts
npm test
npm run build-storybook
npm run inspect:package
npm run measure:package
npm run validate:consumer
npm run test:consumer
npm run test:e2e
```

`inspect:package` compares pack dry-run with an actual archive, extracts it,
requires the exact reviewed file allowlist (including exports, CSS/font files,
tokens and notices), and runs **only**
`npm publish --dry-run`. A dry-run success does not establish registry ownership
or authorization. `validate:consumer` installs the actual tarball outside the
monorepo, compiles the documentation, builds a production app and checks tree
shaking against that installation. CI repeats consumer build/browser tests for
React 18.3.1/19.3.1 × Ant Design 6.0.0/6.6.6.

## First publication: owner-controlled manual release

After reviewing and merging the preparation PR, the owner must verify successful
CI on the exact current `main` commit, npm scope control, publishing rights and
2FA. Follow [identity and access checks](npm-owner-setup.md#1-confirm-identity-and-access).
Do not enable `NPM_RELEASE_ENABLED` or dispatch the staging workflow for this path.

From a clean checkout of that reviewed commit, run candidate verification above,
then retain and inspect the exact archive (the output path must not already exist):

```sh
node scripts/inspect-package.mjs ../techosoul-ui-0.3.0.tgz
node scripts/check-registry-version.mjs
node scripts/check-pending-stages.mjs
```

The inspection includes a publication dry-run, not a registry write. Resolve any
registry/authentication error or pending stage before proceeding; an E404 does
not establish scope ownership. If npm cannot list a new package's queue, resolve
the bootstrap procedure with npm rather than bypassing the safeguard.

**Future owner-only action, after final approval, using the owner's authenticated
npm account and interactive 2FA (not executed by this preparation):**

```sh
npm publish ../techosoul-ui-0.3.0.tgz --ignore-scripts --access public --tag latest --registry=https://registry.npmjs.org/
```

This direct local publication does not provide GitHub Actions OIDC provenance.
Do not claim that provenance; if it is required for the first release, stop and
separately authorize the staged trusted-publisher path below. No placeholder or
bootstrap stage is created by this manual preparation. After publication, verify
registry metadata and an independent registry installation before announcing it.

## Publication controls

The library manifest now sets `private: false` for owner review of the first
public release. This does not authorize a registry write. The workspace root
remains `private: true` permanently. Keep `NPM_RELEASE_ENABLED` unset/false; the
existing manual-only `npm-release.yml` is reserved for separately authorized
future staged releases. Its remaining gates are unchanged.

The release job additionally requires:

- Current `main`, protected by required PR review and required CI checks.
- Latest push CI run successful for the exact dispatched commit, including all jobs.
- Protected `npm-release` environment and `NPM_RELEASE_ENABLED=true` environment variable.
- Owner confirmation of npm `techosoul` organization control and publishing rights,
  recorded as protected-environment variable `NPM_SCOPE_OWNER_CONFIRMED=techosoul`.
- Exact dispatch authorization `stage @techosoul/ui@0.3.0`.
- A fresh authenticated owner queue check (`node scripts/check-pending-stages.mjs`)
  and exact `pending_stages` input `no pending stages for @techosoul/ui`.
- Verified package name/version, no existing registry version, and no registry errors other than E404.
- An npm Trusted Publisher bound to this repository, workflow and environment.

The job uses Node 24.22.0, npm 11.19.1, a GitHub-hosted runner, contents/actions read
and job-scoped OIDC permission. It stages with provenance and the `latest` tag.
No token is stored, no publish occurs on pushes/PRs, no staged version is approved
automatically, and one release job runs at a time. Both main and the latest exact-commit CI result are rechecked before the
upload. The archive retained by inspection is the archive staged, with lifecycle
scripts disabled and the npm registry explicitly selected. Inspection records its
integrity; the output file cannot overwrite an earlier archive. If a stage already
exists, stop and review the queue before retrying; public registry version checks
cannot detect a pending stage. OIDC publishing credentials cannot list that queue,
so the workflow requires owner review rather than storing an npm token. The registry rejects duplicate
published versions. Failures stop the job and add guidance to its summary.

## Why staged publishing

[Current npm staged-publishing docs](https://docs.npmjs.com/staged-publishing/)
require npm 11.15.0+ and add a final owner review with 2FA. This is appropriate
for Techosoul's controlled preview. **Staging a new package creates a public
`0.0.0-stage` placeholder**, so initial staging is itself an owner-approved
registry write. It is not a harmless dry-run and is not performed by this preparation.
Trusted publisher setup uses package settings; the owner must establish the
package first or confirm npm offers an applicable bootstrap path.

See [owner setup](npm-owner-setup.md) for bootstrap and exact configuration.
For subsequent automated stages use stage-only Trusted Publisher permission;
keep direct publication disabled. Review the staged archive and provenance before
2FA approval. `latest` is intentional so the documented unqualified installation command works
after approval; the version remains a 0.x public preview.

## Remaining release review

Confirm legal/name rights and npm publish access, approve the release diff and
CI evidence, inspect the artifact, and complete manual keyboard/screen-reader
review. Automated axe checks do not establish WCAG certification. CommonJS,
SSR hydration, React before 18.3 and every Ant Design 6 minor are not verified.
Pages retains its separate manual workflow; this workflow never deploys it.

## Repository and web deployment

The current repository is [morimdn/Techosoul-UI](https://github.com/morimdn/Techosoul-UI).
Verify that any npm Trusted Publisher binding reflects this name before separately
authorized staging. npm status and safeguards are unchanged by the URL migration.
See [Pages instructions](pages.md) for the independent, manual-only web workflow.

## Release-readiness audit

See [the preparation audit](npm-release-readiness.md) for findings, safe validation
evidence and remaining owner-only gates. The [owner checklist](npm-owner-setup.md)
contains the exact setup, bootstrap and dispatch sequence.
