# Versioning and releases

Use SemVer. Document breaking props/token names as major changes, additive APIs
as minor changes, and compatible fixes as patches. Keep preview status explicit
until consumer/browser support and accessibility are reviewed.

Before publication: verify ownership/availability of the chosen npm name, replace
the provisional name consistently, review package contents (`npm pack --dry-run`),
confirm peer compatibility, licenses, changelog and clean installation. The
package is currently `private: true` to prevent accidental registry publication.

Maintainer approval is required before npm publication, production release,
merging this phase or deploying Pages. There is no npm publishing workflow.
Pages has only `workflow_dispatch`; running the reviewed workflow on main is the
explicit publication action. The deployment job holds pages/id-token write
permissions; build jobs have only contents read. Pull requests do not deploy.

## Current delivery status

Phase 2 is merged and publicly deployed at
[the Live Showcase](https://morimdn.github.io/Fintrix-UI/).
Phase 3 is implemented in [PR #5](https://github.com/morimdn/Fintrix-UI/pull/5)
but is not yet merged or deployed. The library can be independently installed
from its generated tarball. The npm package is not published, no GitHub Release
has been created, and no editable Figma UI Kit exists.

The existing Pages workflow is manual-only; nothing in this PR triggers a
new deployment. Historical validation reports retain their original observations
and must not be read as current release status. `npm run build:demo` prepares the
project base path without publishing anything.

## Phase 3 controlled first release checklist

Recommended first public version: **0.3.0**, for additive preview APIs after the
local 0.2.0 artifact. The artifact stays private at 0.2.0 during this PR. Do not
call this 1.0 until the owner approves stability and support commitments.

Read-only npm registry checks on 2026-10-16 returned E404 for `fintrix-ui` and
`@fintrix/ui`. No public metadata was returned; this is not a reservation or
proof that either name can be registered. Prefer `fintrix-ui` if the owner can
claim it; use `@fintrix/ui` only with confirmed organization/scope access.

Before publication the owner must:

- [ ] Approve final name, npm account/scope ownership and public access.
- [ ] Rename imports/manifests/examples together and set version 0.3.0.
- [ ] Review this PR, changelog, API boundaries, MIT and third-party notices.
- [ ] Review React 18.3.1/19.3.1 × Ant 6.0.0/6.6.6 CI and browser engine results.
- [ ] Complete manual keyboard and screen-reader review; no WCAG certification is claimed.
- [ ] Run clean build, Storybook, tests and external tarball consumers.
- [ ] Inspect npm pack --dry-run --json: ESM/types, CSS, local fonts, Inter license, tokens JSON, README, LICENSE and third-party notices; no tests/gallery source.
- [ ] Approve removing private: true only in the reviewed publication change.
- [ ] Configure npm 2FA and least-privilege publishing or trusted publishing with an owner-protected GitHub environment and required reviewers.
- [ ] If adding automation, require manual dispatch, explicit version/name checks, protected environment, provenance and no publication from PRs.
- [ ] Separately approve npm publication, GitHub Release and Pages deployment.

No registry account, publication, Release, merge or deployment is performed by
Phase 3. Existing ESM-only exports remain unchanged. CommonJS, SSR hydration,
older React and every Ant 6 minor are not implied by the peer ranges.
