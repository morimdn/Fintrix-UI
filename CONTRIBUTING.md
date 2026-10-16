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
