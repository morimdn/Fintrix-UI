# Phase 3 validation and release readiness

Validated 2026-10-16 from main `1c07d46` (merged Phase 2 plus accessibility hotfix),
on `feat/phase-three-release-readiness`. No deployment, publication or merge.

## Delivered APIs and documentation

- Independent lazy Iconography tab: 36 named Lucide icons across all nine requested categories; name/category search, size/stroke/tone controls, Light/Dark and density previews, copyable React examples, accessible action demo and official catalog link.
- `FintrixIcon`: Lucide input, six semantic tones, size, stroke width, decorative default, optional meaningful image label. No runtime Lucide catalog import.
- Optional `iconTone` on IconButton, MetricCard, FinancialKPICard and WalletBalanceCard. Financial cards accept optional icon content. Existing inherited button/metric defaults remain intact; financial icons default neutral. Status components retain their established semantics.
- Typed `FintrixProvider.colorOverrides` by mode resolves both CSS variables and Ant tokens; stable token names and existing density APIs are preserved.
- README, public docs, customization guide, Storybook icon/customized-wallet examples, release checklist and design-to-code mapping updated. No breaking API migration is required; no editable Figma kit is claimed.

```tsx
import { Wallet } from "lucide-react";
import { FintrixIcon, WalletBalanceCard } from "fintrix-ui-preview";
<FintrixIcon icon={Wallet} tone="success" size={24} />;
<WalletBalanceCard value="12500.25" currency="EUR"
  icon={<Wallet size={24} />} iconTone="primary" />;
```

## Independent compatibility validation

Each combination installs a real npm tarball in a fresh temporary directory
outside the workspace, typechecks and builds with Vite, then serves the production
build for Chromium tests. No source aliases or workspace links are used.

| React / React DOM | Ant Design | Typecheck/build | Chromium consumer checks |
| --- | --- | --- | --- |
| 18.3.1 | 6.0.0 | Passed | 2 passed |
| 18.3.1 | 6.6.6 | Passed | 2 passed |
| 19.3.1 | 6.0.0 | Passed | 2 passed |
| 19.3.1 | 6.6.6 | Passed | 2 passed |

Checks cover imports/declarations, custom provider, CSS/local font loading,
decimal-string money, form validation, Light/Dark and Compact controls, grid
pagination, Modal Escape/focus restoration, Drawer Escape and axe. JSON files
`consumer-*-antd-*.json` record exact dependency versions and application sizes.
The matrix is now enforced in CI. Other React versions and Ant minors within
peer ranges are not individually validated. CommonJS and SSR hydration are not tested.

## Accessibility, browsers and screenshots

120 unit assertions pass, including icon semantics, override isolation and
semantic foreground contrast across five surfaces in both palettes. Existing
axe rules and thresholds remain unchanged. All 29 pre-existing Chromium tests pass; all four new gallery tests pass after
waiting for the slider tooltip to settle before measuring narrow-screen overflow.
The Chromium suite covers CRM,
keyboard column resizing, sorting, filtering, visibility, pagination, pinned
columns/responsive scrolling, dialogs, tooltips, focus indicators, density,
reduced motion and Light/Dark states. New gallery tests cover search, copy,
size/stroke keyboard controls, narrow layout and the dark hover foreground.

Firefox/WebKit binaries are unavailable locally: the browser download endpoint
returned HTTP 403 Domain forbidden under this environment's network policy.
A separate CI job installs both engines and runs gallery, CRM and shell tests.
The first CI run passed all four consumer combinations and full Chromium
validation. WebKit passed all 16 applicable engine tests; Firefox passed gallery
and CRM checks but reported native scrollbar-width as none despite the authored
thin rule. The engine test now keeps the visual-width assertion on Chromium/WebKit
and checks overflow plus real keyboard sidebar scrolling on every engine. Native
Firefox scrollbar appearance still needs manual review. Clipboard permissions
are tested in Chromium only (one explicitly skipped test per other engine).
Check the final CI result on the PR. Manual assistive-technology testing remains an owner release
checklist item; this is not WCAG certification.

Real Chromium captures: [Light](screenshots/iconography-light-chromium.png),
[Dark](screenshots/iconography-dark-chromium.png),
[Mobile](screenshots/iconography-mobile.png). Showcase and public documentation
captures are refreshed alongside them.

## Performance and artifact

The 10,000-record synthetic grid mounts in 824ms and sorts in 114ms in this
managed-cloud run, including Playwright action/wait overhead. It renders **25
rows per page**, not 10,000 simultaneous DOM rows. This single development-server
sample is not a performance guarantee or a basis for adding virtualization.
Existing Ant Table virtual support remains opt-in; no second framework was added.

Tree-shaking probes externalize React/React DOM/Ant Design:

| Import | Gzip bytes |
| --- | ---: |
| FintrixIcon only | 308 |
| FintrixIcon + Wallet | 2,135 |
| CurrencyAmount only | 485 |
| Tokens | 1,104 |

None of these probes retain Ant Design. The wrapper has no runtime icon catalog
import. The curated Showcase gallery is a separate approximately 12.2kB / 4.94kB
gzip lazy chunk, not part of the component package. Library JavaScript is about
23.6kB unminified across preserved modules; see package-metrics.json. Independent
consumer application bundles include React/Ant and are reported separately, not
represented by these library-only probes. Vite still warns about large application
chunks; code splitting the full Ant-heavy demo further is future optimization.

The inspected tarball contains 35 files, about 240kB packed / 335kB unpacked,
including ESM, declarations, CSS, optional Inter fonts/license, DTCG JSON, README,
MIT license and third-party notices. Lucide is now a declared dependency, including
its public icon type dependency. React/React DOM and Ant Design remain peers.
There are no tests, stories or gallery source in the artifact.

## npm and remaining owner decisions

The package remains `private: true` under provisional `fintrix-ui-preview@0.2.0`.
Recommend **0.3.0** as the first controlled public preview after owner approval.
Read-only npm checks returned E404 for `fintrix-ui` and `@fintrix/ui`; neither name
is reserved or proven claimable. See [release checklist](releases.md) for naming,
permissions, 2FA/trusted publishing, version/import changes, manual accessibility
review and protected publication safeguards. No publish workflow was introduced.

Build, Storybook and package inspection pass locally. CI has separate validation,
consumer-matrix and browser-engine jobs. The PR is the review point; no workflow
for Pages deployment or GitHub Release was invoked.
