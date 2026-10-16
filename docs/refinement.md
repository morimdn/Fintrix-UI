# Visual quality refinement

The approved Phase 1 architecture is retained: Ant Design remains the only complete UI framework; the provider, tokens and reusable component contracts remain separate from demo client logic.

## Changes

- Self-hosted Inter Variable, 12px minimum captions/statuses, 13px table text, 14px body/form labels, 20px sections and 28px page titles. Compact mode keeps the same readable text sizes.
- Separate canvas/sidebar/card/header/elevated surfaces, stronger secondary text and control boundaries in both themes. Solid action colors are distinct from link/selected text colors. Status/financial roles are explicit.
- Consistent Lucide strokes and aligned neutral icons, blue selected navigation, semantic financial direction, accessible icon-button names and focus rings.
- Column-edge pointer resizing uses pointer capture, bounded widths and event isolation from sorting. Arrow keys change width by 10px (Shift: 20px), Home/End jump to bounds. The column popover also exposes numeric width inputs. At phone widths (up to 760px), edge handles are hidden: pinned columns can otherwise partially obscure these targets during horizontal scrolling. Phone users resize through the 44px numeric controls instead. Client width is constrained to 220–320px on desktop, 220–240px below 768px; other columns use 120–380px.
- Fixed identity and selection columns, explicit table width, hover/selected states, visible horizontal-scroll guidance and a useful resettable empty state.
- Mobile uses an Ant Design navigation drawer with text labels, Escape dismissal and focus return. KPI cards reflow, filters wrap, touch controls expand and forms become one column. The professional table remains horizontally scrollable; an optional card view is deferred until user research establishes which fields can be omitted safely.
- Showcase now has Foundations, Core components and Financial UI tabs. It covers semantic palettes, actual font specimens, spacing/radius/elevation/layout/density/motion, interactive variants, table/overlay/navigation/empty/loading patterns, wallet/KYC/financial direction and a link into the CRM composition.

## Accessibility fixes found by testing

Progress bars now have names; dark avatars and selected tabs/pagination have contrasting colors; showcase form labels are associated with their fields. Ant Design 6 duplicates selection controls inside an `aria-hidden` table measurement row. The DataTable wrapper marks only that measurement row `inert`, keeping it out of keyboard navigation while allowing layout measurement. Resize handles live in the header-cell adapter rather than duplicated column titles. This small version-specific compatibility fix needs rechecking on Ant Design upgrades.

## Performance

CRM and showcase are lazy-loaded with a skeleton fallback. The small icon-button primitive is independent of the heavier table/form module, allowing the bundler to separate shell and pattern code without a custom vendor chunk map. The shell is roughly 185 KB gzip; the shared table/form chunk is roughly 162 KB gzip and CRM code roughly 13 KB gzip. The initial CRM still needs those shared components: this is not a claim that total first-screen transfer was reduced. The expanded showcase loads on navigation. The original application was one approximately 355 KB gzip chunk.

Remaining work: measure real loading performance; establish transfer and execution budgets; validate consumer tree shaking after library extraction; benchmark 10k+ rows; audit with assistive technology and additional browsers; investigate sticky-column behavior at extreme zoom, RTL and touch-only devices. No backend, real trading, publishing or deployment is added.
