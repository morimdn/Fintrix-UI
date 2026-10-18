# Owner setup for @techosoul/ui

The target is **@techosoul/ui@0.3.0**. The library remains `private: true`, and
the monorepo root must remain private permanently. Registration of techosoul.com
does **not** prove npm organization control. No account, registry, DNS or hosting
configuration is changed by this rebrand.

1. Sign in to your own npm account, verify email, enable 2FA and retain recovery
   methods securely. Use your own interactive `npm login`; do not commit or share
   credentials. Check `npm whoami` and `npm org ls techosoul --json`. In npm's
   organization settings, confirm that you control `techosoul` and that the
   intended account/team can create and publish **@techosoul/ui**. Stop if this
   cannot be confirmed. E404, domain registration and GitHub ownership are not
   substitutes for scope authorization. Do not silently select another package.
2. Protect GitHub `main` with reviewed PRs and all CI checks. Protect the
   **npm-release** environment: restrict to main, require owner review, and
   prevent self-review/bypass where supported. If reviewers cannot be enforced,
   leave release enablement off until an equivalent owner-controlled process is
   agreed. Keep `NPM_RELEASE_ENABLED` unset/false during rebrand review.
3. Review and merge the rebrand only when explicitly approved. Close/supersede
   old release-authorization PR #8; it authorizes the previous package identity
   and must not be reused. After scope control is verified, create a fresh,
   separately reviewed authorization PR setting **only the library's** `private`
   field to false (plus lockfile metadata if required). Keep the root private,
   candidate version 0.3.0, and require full CI. Review the exact main SHA and
   packed artifact again before any release authorization.
4. Confirm npm's current bootstrap requirements. Trusted Publisher settings
   attach to an npm package; an absent package may need owner-controlled initial
   staging. Only after separate explicit authorization, from a clean reviewed
   checkout with Node 24 and npm 11.15.0+, run the release-guide checks. Any local
   staging from `packages/techosoul-ui` is a registry write and can create a public
   `0.0.0-stage` placeholder; it is not a dry run. Local staging does not supply
   GitHub OIDC provenance. Inspect any existing stage before retrying. If npm
   cannot bootstrap without an unwanted publication, stop and resolve with npm
   support; never publish a dummy version or fall back silently to stored tokens.
5. Configure npm package Settings → Trusted Publisher for the actual repository:

   | Field             | Value                                                   |
   | ----------------- | ------------------------------------------------------- |
   | Organization/user | `morimdn`                                               |
   | Repository        | `Fintrix-UI` (until separately renamed)                 |
   | Workflow filename | `npm-release.yml`                                       |
   | Environment       | `npm-release`                                           |
   | Allowed actions   | Stage only; direct publish and dist-tag writes disabled |

   Require 2FA and disallow traditional publishing tokens. The workflow retains
   `contents: read`, `actions: read`, and job-only `id-token: write`; no stored
   npm token is required. Reconfirm npm's current publisher setup/expiry rules
   before the first stage. After a repository rename, update this binding before
   enabling any workflow; see the [rename checklist](techosoul-rebrand.md).

6. Only after verification, set protected-environment
   `NPM_SCOPE_OWNER_CONFIRMED=techosoul`. This records the owner's attestation;
   it is not an automated npm permissions check. Set `NPM_RELEASE_ENABLED=true`
   only after all setup and approval requirements are met.
7. With separate authorization, dispatch **Stage npm release for owner approval**
   on current main with exact text `stage @techosoul/ui@0.3.0`. Approve the
   protected environment only after reviewing the SHA and successful CI. The
   workflow rejects a private library, a public workspace root, a wrong package
   or version, unconfirmed scope, stale main, duplicate versions and registry
   failures other than E404. It rechecks main immediately before staging with
   OIDC/provenance. It never approves a stage automatically.
8. Inspect the stage archive, name/version and provenance; approve through npm
   with 2FA only after final release authorization. Verify registry metadata and
   a fresh install before claiming publication. GitHub Releases, repository
   renaming, Pages deployment and DNS changes each remain separate decisions.

References: [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/),
[staged publishing](https://docs.npmjs.com/staged-publishing/),
[provenance](https://docs.npmjs.com/generating-provenance-statements/).
Historical registry checks in Phase 3/4 concerned the old Fintrix names and do
not provide evidence about the `techosoul` scope.
