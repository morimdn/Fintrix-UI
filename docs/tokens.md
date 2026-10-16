# Semantic tokens

The source of truth is `src/system/tokens.ts`. `getTokens(mode, density)` returns the typed theme; `cssVariables(mode, density)` produces scoped custom properties on `.fintrix-root`. Both palettes have identical keys. Use semantic meaning rather than raw colors in component styles.

| Group          | Tokens / purpose                                                                              | CSS example                                      |
| -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Color surfaces | canvas, surface, subtle                                                                       | `--fx-surface`                                   |
| Content        | text, muted, border                                                                           | `--fx-text`                                      |
| Interactive    | primary, primaryHover, primarySoft, focus                                                     | `--fx-primary`                                   |
| States         | success, warning, danger, info + Soft variants; neutral                                       | `--fx-warningSoft`                               |
| Financial      | positive, negative, neutral (independent semantic aliases)                                    | `--fx-positive`                                  |
| Typography     | family, mono, caption 12, body 14, title 28, display 36, lineHeight 1.55, weights 400/500/650 | `--fx-font`, `--fx-typography-body`              |
| Space          | xs 4, sm 8, md 12, lg 16, xl 24, xxl 32, section 40                                           | `--fx-space-xl`                                  |
| Radius         | small 6, control 8, card 12, pill 999                                                         | `--fx-radius-card`                               |
| Elevation      | mode-aware shadow                                                                             | `--fx-shadow`                                    |
| Layout         | sidebar 224, contentMax 1600, modal 760, tableMin 1040, mobile 760                            | `--fx-layout-sidebar`                            |
| Density        | comfortable control 38 / cell 16; compact control 30 / cell 9                                 | `--fx-control`, `--fx-cell`                      |
| Motion         | fast 120ms, normal 200ms, easing                                                              | `--fx-motion`, `--fx-motion-fast`, `--fx-easing` |

The provider maps these to Ant Design seed tokens and Table/Button/Modal overrides. Dark and compact algorithms compose. Responsive layout breakpoints remain static CSS media queries because CSS custom properties cannot be used in media conditions. Demo chart dimensions and decorative details are local geometry; palette, surfaces and semantic states are centralized.

Positive/negative are financial direction, not a recommendation or profit guarantee. Compliance labels use success/warning/danger. Always pair color with text or an icon. Reduced-motion users receive shortened transitions. Full WCAG contrast/keyboard/screen-reader certification is a Phase 2 gate, not a claim of this POC.
