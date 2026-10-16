# App shell and sidebar refinement

The showcase fills the dynamic viewport (`100dvh`, with a `100vh` fallback).
The header and sidebar stay stationary. `.main-scroll` owns page-content scrolling;
the document no longer scrolls. The library and independent consumer are unaffected.

The sidebar has three sections: a nonshrinking brand/workspace header, a flexible
navigation region, and a nonshrinking profile footer. Only navigation uses
`overflow-y: auto`. Its scrollbar appears only when needed, uses a thin semantic
thumb, and keeps native forced-color behavior. A stable gutter prevents navigation
alignment shifting. Padding leaves room for visible focus rings.

Both scroll areas are keyboard-focusable. The skip link still focuses main
content. Short screens use less header/profile spacing, keeping navigation
scrollable without hiding controls. The mobile drawer retains its title, Escape
behavior, focus restoration and navigation actions; it uses the same three-section
layout. Its profile stays at the bottom wherever viewport height permits.

Header and sidebar use the same background token; the main area retains the canvas
token. Regression checks cover desktop 1536×960, tablet 1024×768, mobile 390×844,
short desktop 844×390 and mobile landscape 667×375 in light and dark. They verify
independent scrolling, no document overflow, aligned bounds, profile placement,
keyboard scroll/skip navigation, drawer behavior and targeted axe checks.

Responsive auditing exposed two documentation issues: overflowing code examples
needed keyboard focus, and the Ant overflow-menu button violated tablist child
roles on narrow screens. Examples now have accessible names and keyboard focus;
showcase tabs use native horizontal scrolling so every tab stays reachable.

Real screenshots from `tests/shell.spec.ts` live in `docs/screenshots`:
`shell-{desktop,tablet,mobile,short,mobile-landscape}-{light,dark}.png` and
`shell-drawer-{mobile,mobile-landscape}-{light,dark}.png`.
No proprietary assets or external layouts were used.

Existing library, CRM, showcase, Storybook and packed-consumer checks remain part
of validation. Pages remains manual-only; no merge or deployment is included.
