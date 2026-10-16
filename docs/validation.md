# Phase 1 validation — visual refinement

Validated on 2026-10-16 with Node 24.19.0, npm 11.9.0 and system Chromium in the managed development environment.

| Check                              | Result                                                            |
| ---------------------------------- | ----------------------------------------------------------------- |
| TypeScript + Vite production build | Pass                                                              |
| Vitest / React Testing Library     | 48 tests pass (44 contrast targets + 4 foundation/workflow tests) |
| Playwright Chromium                | 10 scenarios pass (original workflows + 8 quality scenarios)      |
| Storybook production build         | Pass                                                              |
| Git whitespace check               | Pass                                                              |

## Coverage

- All four desktop light/dark × comfortable/compact combinations, with real font loading asserted through the browser FontFaceSet API.
- Text/status/action/selected-navigation contrast targets at 4.5:1; control-border targets at 3:1 against each semantic surface. These are unit checks of token pairings, not an audit of every possible composition.
- Axe scans with WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags across the four CRM combinations, client modal, three showcase tabs in both themes, showcase form/popover, mobile drawer and validation state. No violations remain in those scanned states. Overlay scans wait for finite animations to finish so contrast is measured in the settled UI.
- Search, edit/save, creation validation, status/KYC filters, resettable empty state, column visibility/order, native sorting, pagination, keyboard resizing limits, pointer resizing without accidental sorting, fixed client headers/body during mobile horizontal scroll, and modal/drawer focus return.
- Desktop 1536×1120, tablet 1024×900 and mobile 390×844. Page overflow checks cover tablet/mobile; table overflow is intentional and signposted. Mobile uses 44px controls and a labeled navigation drawer.

## Real screenshots

Playwright regenerates the assets in `docs/screenshots` from the running Vite app. The README presents light CRM, dark CRM, compact grid, token/color showcase, component gallery and mobile/drawer views. Other captures show financial patterns, all theme/density combinations, tablet and the validated client modal. PNGs are approximately 55–250 KB each; full-page heights vary with content. No screenshots are fabricated.

Visual review corrected narrow-screen balance overflow, a sortable header position override that interfered with pinning, and capture artifacts caused by transient focus/overlay states.

## Acceptance status

AC-01 through AC-16 are addressed within this POC's tested scope: actual Inter, readable type, differentiated themes, consistent icons/tokens, working grid/resizing/forms/navigation, all theme/density combinations, expanded showcase, real README captures, and passing build/unit/browser/Storybook checks. Ant Design remains the only complete UI framework; no proprietary assets are introduced.

This does **not** establish full WCAG compliance. Untested areas include real assistive-technology sessions, Firefox/WebKit, physical touch-only hardware, extreme zoom, RTL/localization and large-data performance. Column reordering uses explicit controls; drag reordering and a researched optional card view remain Phase 2 items. No backend or real financial operations are present. Remote GitHub CI completion is not claimed here.

## Performance observation

The app now uses lazy CRM/showcase boundaries and a separate light icon-button entry. The shell and shared runtime are about 185 KB gzip, with a deferred table/form chunk about 162 KB gzip and CRM about 13 KB gzip. Loading the initial CRM still needs that shared chunk. The expanded showcase is deferred until navigation. The original POC emitted one roughly 355 KB gzip application chunk.

Vite still warns about two roughly 520 KB minified shared chunks; Storybook includes its larger documentation runtime. No browser execution or network-speed improvement is claimed without measurement. Phase 2 should define bundle and loading budgets, validate consumer tree shaking, and profile real workflows.
