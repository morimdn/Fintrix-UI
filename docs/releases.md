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

Expected future URL: https://morimdn.github.io/Fintrix-UI/ . This phase does not
establish that the live site contains Phase 2. `npm run build:demo` sets the Vite
base for project Pages. Native anchors and relative bundled assets need no SPA
server rewrite.
