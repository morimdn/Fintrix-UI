# Semantic tokens

`src/system/tokens.ts` is the source of truth. `getTokens(mode, density)` returns the typed theme; `cssVariables(mode, density)` exposes scoped properties on `.fintrix-root`. Light and dark share an identical semantic contract.

| Group       | Meaning                                                                                                                                              | CSS example                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Surface     | canvas, sidebar, surface (cards/table), elevated (modal/popover), subtle (headers/insets)                                                            | `--fx-elevated`                                  |
| Content     | text, muted                                                                                                                                          | `--fx-text`                                      |
| Borders     | border separates regions; controlBorder identifies interactive boundaries                                                                            | `--fx-controlBorder`                             |
| Interaction | primary / primaryHover for links and selected text; primarySoft for selection; action / actionHover / onAction for solid buttons; focus for outlines | `--fx-action`                                    |
| Status      | success, warning, danger, info, plus Soft backgrounds; neutral                                                                                       | `--fx-warningSoft`                               |
| Financial   | positive, negative, neutral express direction, independently of compliance state                                                                     | `--fx-negative`                                  |
| Typography  | Inter Variable; caption 12, table 13, body/label 14, section 20, title 28, display 36; line height 1.55; regular 400, medium 500, strong 650         | `--fx-typography-table`                          |
| Space       | xs 4, sm 8, md 12, lg 16, xl 24, xxl 32, section 40                                                                                                  | `--fx-space-xl`                                  |
| Radius      | small 6, control 8, card 12, pill 999                                                                                                                | `--fx-radius-card`                               |
| Elevation   | shadow for cards; elevatedShadow for overlays                                                                                                        | `--fx-elevatedShadow`                            |
| Layout      | sidebar 248 (224 at intermediate widths), contentMax 1600, modal 760, tableMin 1040, mobile 760                                                      | `--fx-layout-sidebar`                            |
| Density     | comfortable control 40 / cell 16; compact control 32 / cell 10                                                                                       | `--fx-control`, `--fx-cell`                      |
| Motion      | fast 120ms, normal 200ms, easing                                                                                                                     | `--fx-motion`, `--fx-motion-fast`, `--fx-easing` |

Inter is self-hosted through `@fontsource-variable/inter/wght.css` in both the app and Storybook. Unicode subsets load on demand, including extended Latin. The font is licensed under SIL OFL 1.1 (see the package LICENSE). No external font service is required. The actual family is **Inter Variable**, matching the token. Tabular numerals align balances; monetary cells are right-aligned. Captions never shrink below 12px in compact mode.

## Refinement decisions

Dark mode separates the navy canvas, sidebar, cards, inset regions and brighter elevated surfaces. Light mode gains stronger secondary text and control outlines while preserving calm neutral panels. Solid actions have their own blue/background and white/text pair so light blue link text in dark mode never becomes an inaccessible solid-button background.

Component overrides live in FintrixProvider: Table, Avatar, Button, Card, Form, Input, Select, Tabs, Pagination, Segmented, Modal, Drawer, Tooltip and Popover. Financial states remain labeled and use semantic colors; icons are neutral unless they communicate an action or state. Lucide icons use a consistent 1.75 stroke.

Compact mode reduces spacing, not text readability. At widths up to 760px, controls and icon buttons have at least 44px touch surfaces, regardless of density. This intentionally takes precedence over desktop compact control height. Phone data grids use the independent numeric width editor; edge handles remain available on desktop/tablet, where pinned columns do not crowd the touch surface.

Color tests enforce 4.5:1 for regular/secondary text on each surface, status labels, solid action labels and selected navigation; control outlines meet 3:1 against those surfaces. Subtle panel borders are structural separators, not control boundaries. Browser axe checks verify representative rendered states too. These targeted checks are not a full WCAG compliance claim.

CSS media-query breakpoints and local illustrative geometry remain static because custom properties cannot be used as media conditions. Reduced-motion preferences shorten transitions and animations.
