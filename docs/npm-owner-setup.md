# Owner setup for the npm preview

No account or registry changes were made during Phase 4. Follow these steps only
when you are ready to authorize the first public release.

1. Create or sign in to your own npm account, verify its email, enable 2FA and
   retain recovery methods securely. Use your own interactive `npm login`; never
   commit credentials or send them to an assistant.
2. Confirm rights to **fintrix-ui** and that your account can register/publish it.
   Read-only registry checks on 2026-10-16 returned E404 for both `fintrix-ui` and
   `@fintrix/ui`. This proves neither ownership nor that registration is allowed.
   No fallback is selected while the preferred name awaits confirmation. If a
   scope is necessary, first create/join the npm `fintrix` organization and obtain
   package publishing access; GitHub identity grants no npm scope rights. Rename
   all imports/manifests/docs and repeat CI before choosing a different name.
3. Protect GitHub `main`: require reviewed PRs and all CI checks, prevent direct
   unreviewed pushes. Create the **npm-release** environment, restrict it to main,
   require owner approval, prevent self-review/bypass where supported. If your
   plan cannot enforce required reviewers, leave the workflow disabled until an
   equivalent owner-controlled release process is agreed. Do not just create an
   unprotected environment with the same name.
4. Review and merge Phase 4 through the normal owner process. Publication is
   still blocked. A separate owner-approved PR must set **only the library's**
   `private` field to `false`, keep the workspace root private, update the lockfile
   and pass all CI. Review the exact main commit and artifact before authorization.
5. Bootstrap only after explicit approval: because Trusted Publisher settings
   attach to an npm package, an absent package may first need owner-controlled
   staging from a clean checkout of that reviewed main commit. Use Node 24 and
   npm 11.15.0+, run the release-guide checks, then use your authenticated local
   CLI from `packages/fintrix-ui`: `npm stage publish --access public --tag latest`.
   This is a registry write creating a public `0.0.0-stage` placeholder; it does
   not publish 0.3.0 until approval. Local staging does not provide GitHub OIDC
   provenance. Inspect the stage with `npm stage list fintrix-ui` and
   `npm stage view <stage-id>`. To get CI provenance for 0.3.0, reject that bootstrap
   stage with 2FA and verify the package remains available for configuration;
   then configure OIDC and stage through GitHub. If npm does not permit that
   bootstrap/configuration sequence, stop and resolve it with npm support; do
   not publish a dummy release or silently fall back to tokens.
6. In npm package Settings → Trusted Publisher, select GitHub Actions and enter:

   | Field | Value |
   | --- | --- |
   | Organization/user | `morimdn` |
   | Repository | `Fintrix-UI` |
   | Workflow filename | `npm-release.yml` |
   | Environment | `npm-release` |
   | Allowed actions | Stage only; direct publish and dist-tag writes disabled |

   Require 2FA and disallow traditional publishing tokens. The workflow grants
   `contents: read`, `actions: read` and `id-token: write` only to its release job.
   Enable Actions for the repository; no `NPM_TOKEN` or stored npm secret is
   required. Current npm docs give a new publisher two days to complete its
   first successful publish; recreate an expired publisher if necessary.
7. Set **environment variable** `NPM_RELEASE_ENABLED=true` only after setup is
   verified. Dispatch **Stage npm release for owner approval** on current main,
   entering `stage fintrix-ui@0.3.0`. Approve the protected environment after
   reviewing the SHA and successful CI. The workflow stops while private=true.
8. Inspect the resulting stage ID, downloaded tarball and provenance; verify
   name/version and the tested contents. Approve through npm with 2FA only after
   explicit final release authorization. Verify registry metadata and a fresh
   registry install before changing docs to say published. It uses `latest` so the documented install command resolves 0.3.0 after approval.
   A GitHub Release and Pages deployment remain separate decisions.

Sources checked 2026-10-16: [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/),
[staged publishing](https://docs.npmjs.com/staged-publishing/),
[provenance](https://docs.npmjs.com/generating-provenance-statements/).
Name ownership, npm bootstrap, environment protection and OIDC remain owner setup
blockers, not actions completed by this PR.
