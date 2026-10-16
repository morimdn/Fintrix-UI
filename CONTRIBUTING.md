# Contributing

Use Node 24 and npm. Run `npm ci` then `npm run build` before starting the
showcase (`npm run dev`). The library must be rebuilt after package source edits.

Run `npm test`, `npm run build-storybook`, `npm run validate:consumer`,
`npx playwright install --with-deps chromium`, `npm run test:e2e` and
`npx playwright test --config playwright.consumer.config.ts` before a PR.
Consumer validation must follow the final library build. Do not replace tarball
validation with workspace aliases. Include meaningful behavior coverage for new
APIs and capture real screenshots for visual changes.

Use synthetic data only. Keep tokens centralized and preserve Phase 1 CRM
behavior. Prefer Ant Design controls to redundant wrappers. Document prop
contracts, accessibility implications and breaking changes. See
[release guidance](docs/releases.md). Contributions are MIT licensed.

## Documentation changes

Keep runnable examples in `examples/documentation`; the public guide displays
those exact files. After editing the onboarding App, run `npm run docs:sync`
and `npm run docs:check`. Consumer validation compiles them against an installed
tarball. Use stable repository main links in public documentation, and clearly
label features that exist only in a pending PR. Open a focused PR targeting main
with a short explanation and validation evidence; do not publish from a PR.

Phase 2 is deployed; Phase 3 remains in PR #5 until separately approved.
See docs/releases.md for the current status and publication boundary.
