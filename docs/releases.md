# Versioning and releases

`@techosoul/ui@0.3.0` is the proposed first public preview, **not published**.
This rebrand prepares a private candidate. It does not merge, stage or publish npm,
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
checks exports, CSS/font files, tokens and notices, and runs **only**
`npm publish --dry-run`. A dry-run success does not establish registry ownership
or authorization. `validate:consumer` installs the actual tarball outside the
monorepo, compiles the documentation, builds a production app and checks tree
shaking against that installation. CI repeats consumer build/browser tests for
React 18.3.1/19.3.1 × Ant Design 6.0.0/6.6.6.

## Publication controls

The committed package retains `private: true`. The new `npm-release.yml` is
manual-only and deliberately blocked until a separately reviewed, explicitly
owner-authorized change sets the package to `private: false`. This PR does not
perform that change. The private workspace root remains private permanently.

The release job additionally requires:

- Current `main`, protected by required PR review and required CI checks.
- Latest push CI run successful for the exact dispatched commit, including all jobs.
- Protected `npm-release` environment and `NPM_RELEASE_ENABLED=true` environment variable.
- Owner confirmation of npm `techosoul` organization control and publishing rights,
  recorded as protected-environment variable `NPM_SCOPE_OWNER_CONFIRMED=techosoul`.
- Exact dispatch authorization `stage @techosoul/ui@0.3.0`.
- Verified package name/version, no existing registry version, and no registry errors other than E404.
- An npm Trusted Publisher bound to this repository, workflow and environment.

The job uses Node 24, npm 11.15.0, a GitHub-hosted runner, contents/actions read
and job-scoped OIDC permission. It stages with provenance and the `latest` tag.
No token is stored, no publish occurs on pushes/PRs, no staged version is approved
automatically, and one release job runs at a time. Main is rechecked before the
upload. If a stage already exists, review the queue before retrying; registry
version checks cannot detect a pending stage. The registry rejects duplicate
published versions. Failures stop the job and add guidance to its summary.

## Why staged publishing

[Current npm staged-publishing docs](https://docs.npmjs.com/staged-publishing/)
require npm 11.15.0+ and add a final owner review with 2FA. This is appropriate
for Techosoul's controlled preview. **Staging a new package creates a public
`0.0.0-stage` placeholder**, so initial staging is itself an owner-approved
registry write. It is not a harmless dry-run and is not performed by this rebrand.
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
