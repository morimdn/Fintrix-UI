# Token contract

`packages/techosoul-ui/src/tokens.ts` is the single typed source. `foundations`
defines typography, space, radius, layout, motion and density. `palettes` defines
matching light/dark semantic roles. `getTokens(mode, density, overrides?)` resolves both axes;
`cssVariables` maps them to scoped `--techosoul-*` variables. TechosoulProvider uses the
same resolved tokens to configure Ant Design. Nested providers scope variables
and popup ancestry, avoiding a global theme mutation.

Color roles include primary/action, surface/canvas/elevated, text/muted,
controlBorder/border, focus, rowHover/rowSelected, success/warning/danger/info,
and separate financial positive/negative/neutral roles. Secondary controls use
surface/controlBorder; there is no duplicate secondary palette.

Examples: `--techosoul-primary`, `--techosoul-positive`, `--techosoul-space-xl`, `--techosoul-radius-card`,
`--techosoul-typography-body`, `--techosoul-control`, `--techosoul-cell`, `--techosoul-motion`.

The build derives `/tokens.json` from the same TypeScript for all four combinations.
DTCG-style `$type`/`$value` groups encode sRGB color objects, px dimensions and ms
durations. Shadow CSS strings, font stacks and easing remain string tokens rather
than claiming full structured DTCG coverage. Generated JSON is a build artifact;
edit the TypeScript source, never a separately maintained JSON palette.

Comfortable: 40px controls / 16px cell padding. Compact: 32px / 10px. Typography
remains legible; touch target adaptations belong to each application's responsive
layout. Font weights: 400 regular, 500 medium, 650 strong. Inter is optionally
self-hosted through the fonts entry point. Reduced motion disables transitions.

Typed per-mode `TechosoulProvider.colorOverrides` customizes semantic colors in both
CSS variables and Ant Design tokens. See [complete theme examples](customization.md).
Primitive foundation values describe sizes, spacing and raw palette colors;
semantic roles describe intended use. Techosoul does not expose a numbered brand
color scale. Preserve foreground/background pairs and test all interaction states.

## Pre-release namespace migration

The public CSS namespace is `--techosoul-*` under `.techosoul-root`; wrapper
classes use `techosoul-*`. All semantic suffixes and values are unchanged.
Replace former `--fx-*` references in consumer CSS, inline styles, generated
examples and overrides. No legacy aliases are emitted: the package has not had
an owner-authorized public release. Prefer typed `colorOverrides` for palette
customization. See the [complete migration table](techosoul-rebrand.md).
