# Owner setup for @techosoul/ui@0.3.0

This preparation does not authorize any registry write or account change. Both
manifests remain `private: true`; the monorepo root must stay private permanently.
Domain registration, GitHub ownership and an npm E404 do not establish npm scope
control. The owner must complete the following checklist under separate approval.

## 1. Confirm identity and access

Use Node **24.22.0** and npm **11.19.1**, matching the release and portability jobs.
Sign in interactively with your own account; never share or commit credentials.
Verify email, enable 2FA, and store recovery methods securely. Read-only checks:

```sh
npm whoami --registry=https://registry.npmjs.org/
npm org ls techosoul --json --registry=https://registry.npmjs.org/
npm view @techosoul/ui versions --json --registry=https://registry.npmjs.org/
```

In npm organization/team settings, verify control of `techosoul` and the intended
account's rights to create and publish `@techosoul/ui`. Membership alone is not
sufficient. Stop on uncertain access; do not interpret E404 as ownership, rename
the package, or fall back to a different registry. Resolve authentication and
network errors before continuing. Version `0.3.0` must not already be published.

## 2. Protect GitHub and authorize the manifest separately

- Protect `main` with reviewed PRs and all CI checks.
- Create/protect environment **npm-release**, restrict it to `main`, require an
  owner-designated reviewer and prevent bypass/self-review where supported. Use
  a separate authorized dispatcher/reviewer if self-review is prohibited. If the
  required protections cannot be enforced, leave release enablement off.
- Leave `NPM_RELEASE_ENABLED` unset/false while preparing.
- Do not reuse old PR #8, which targets the former package identity. A fresh,
  separately authorized PR must change only the library's `private` field to
  false (and lockfile metadata if needed), retaining version **0.3.0** and a
  private root. Review and merge that PR only with separate owner authorization.
- Review the resulting exact `main` SHA, its full successful push CI, and the
  packed contents using [candidate verification](releases.md#candidate-verification).

## 3. Resolve first-package bootstrap deliberately

Trusted Publisher setup attaches to package settings. If the package is absent,
confirm the supported bootstrap procedure with npm before enabling CI staging.
An authenticated first stage can create the package, but npm also creates a
**public `0.0.0-stage` placeholder**. That is a real public registry change, not a
validation step. This repository does not create it automatically.

If the owner separately authorizes that bootstrap path, use a clean checkout of
the reviewed, CI-green commit after the library's private safeguard is explicitly
removed. Build and inspect it, writing an archive outside the repository:

```sh
npm ci
npm run build:library
node scripts/inspect-package.mjs ../techosoul-ui-0.3.0.tgz
node scripts/check-registry-version.mjs
node scripts/check-pending-stages.mjs
```

The output path must not already exist. The queue check uses your authenticated
npm session, makes only reads, and requires an empty array; even E404 is a blocker.
If npm cannot list an absent package's queue, resolve the bootstrap procedure with
npm support instead of bypassing the check.

**Future owner-only registry write, requiring explicit bootstrap authorization:**

```sh
npm stage publish ../techosoul-ui-0.3.0.tgz --ignore-scripts --access public --tag latest --registry=https://registry.npmjs.org/
```

This local bootstrap does **not** provide GitHub OIDC provenance. Record the stage
ID and inspect it; do not approve that bootstrap stage as the provenance-backed
release. Configure the Trusted Publisher on the resulting package, then separately
authorize rejecting the bootstrap stage with 2FA before staging `0.3.0` from CI.
Confirm the package/settings remain usable and the staging queue is empty. If npm
cannot support this sequence, stop and resolve it with npm support. Do not publish
a dummy release, approve a provenance-less bootstrap, or add a publishing token to
GitHub as a workaround.

## 4. Configure npm Trusted Publisher and account safeguards

In package Settings → Trusted Publisher, configure:

| Field             | Value                                                   |
| ----------------- | ------------------------------------------------------- |
| Provider          | GitHub Actions                                          |
| Organization/user | `morimdn`                                               |
| Repository        | `Techosoul-UI`                                          |
| Workflow filename | `npm-release.yml` (filename only)                       |
| Environment       | `npm-release`                                           |
| Allowed actions   | Stage only; direct publish and dist-tag writes disabled |

Verify the repository is public for provenance, and use GitHub-hosted runners.
The workflow has job-scoped `id-token: write`, `contents: read` and `actions: read`;
it needs no stored npm token. Choose npm's **Require two-factor authentication and
disallow tokens** publishing setting. GitHub repository redirects do not update
npm bindings. npm currently documents a two-day initial validation window for new
publisher configurations; confirm how this applies to stage-only validation before
creating the binding. Recreate an expired binding only with owner approval.

Set protected-environment `NPM_SCOPE_OWNER_CONFIRMED=techosoul` only after verifying
scope rights. This is an owner attestation, not an automated permission check.
Set `NPM_RELEASE_ENABLED=true` only after setup and separate release authorization.

## 5. Review the queue, then dispatch the approved commit

Before **each dispatch or retry**, using your authenticated npm session:

```sh
node scripts/check-pending-stages.mjs
```

It must succeed and print `no pending stages for @techosoul/ui`. If stages exist,
inspect them using the read-only commands below; do not silently overwrite,
auto-reject, approve, or retry. Errors are not evidence of an empty queue. npm's
short-lived OIDC publishing credentials cannot run queue-listing subcommands, so
CI deliberately requires your attestation instead of adding a long-lived token.
Avoid concurrent local staging/approval while a release run is preparing.

Dispatch **Stage npm release for owner approval** on current `main`:

| Input            | Exact value                           |
| ---------------- | ------------------------------------- |
| `authorization`  | `stage @techosoul/ui@0.3.0`           |
| `pending_stages` | `no pending stages for @techosoul/ui` |

Approve the protected environment only after reviewing those inputs, the exact
SHA, successful CI, scope rights and queue evidence. The workflow rechecks current
main and latest push CI immediately before uploading the inspected archive with
OIDC/provenance. A pending version shares npm's version-uniqueness constraint;
public `npm view` cannot discover that queue. A failed/ambiguous upload requires
queue inspection before retrying. The workflow never approves or rejects stages.

## 6. Inspect and approve only with final owner authorization

Read-only stage review (replace STAGE_ID with the returned ID):

```sh
npm stage list @techosoul/ui --json --registry=https://registry.npmjs.org/
npm stage view STAGE_ID --json --registry=https://registry.npmjs.org/
npm stage download STAGE_ID --registry=https://registry.npmjs.org/
```

Compare archive integrity to the workflow inspection output; check name/version,
files, licenses, the intended `latest` tag and provenance linking the reviewed
repository/workflow/commit. Use the npm UI with 2FA to approve **only** after final
publication authorization. Approval makes `@techosoul/ui@0.3.0` public. Rejection
also changes registry state and requires owner authorization and 2FA.

After approval, read registry metadata and verify a fresh consumer install before
claiming publication. Disable release enablement when no release is authorized.
GitHub Releases, Pages, DNS and other account changes remain separate decisions.

References checked for this preparation: [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/),
[staged publishing](https://docs.npmjs.com/staged-publishing/),
[npm stage command](https://docs.npmjs.com/cli/v11/commands/npm-stage/),
[provenance](https://docs.npmjs.com/generating-provenance-statements/).
Historical Fintrix registry checks do not establish ownership of the new scope.
