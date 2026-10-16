# Token contract

`packages/fintrix-ui/src/tokens.ts` is the single typed source. `foundations`
defines typography, space, radius, layout, motion and density. `palettes` defines
matching light/dark semantic roles. `getTokens(mode, density)` resolves both axes;
`cssVariables` maps them to scoped `--fx-*` variables. FintrixProvider uses the
same resolved tokens to configure Ant Design. Nested providers scope variables
and popup ancestry, avoiding a global theme mutation.

Color roles include primary/action, surface/canvas/elevated, text/muted,
controlBorder/border, focus, rowHover/rowSelected, success/warning/danger/info,
and separate financial positive/negative/neutral roles. Secondary controls use
surface/controlBorder; there is no duplicate secondary palette.

Examples: `--fx-primary`, `--fx-positive`, `--fx-space-xl`, `--fx-radius-card`,
`--fx-typography-body`, `--fx-control`, `--fx-cell`, `--fx-motion`.

The build derives `/tokens.json` from the same TypeScript for all four combinations.
DTCG-style `$type`/`$value` groups encode sRGB color objects, px dimensions and ms
durations. Shadow CSS strings, font stacks and easing remain string tokens rather
than claiming full structured DTCG coverage. Generated JSON is a build artifact;
edit the TypeScript source, never a separately maintained JSON palette.

Comfortable: 40px controls / 16px cell padding. Compact: 32px / 10px. Typography
remains legible; touch target adaptations belong to each application's responsive
layout. Font weights: 400 regular, 500 medium, 650 strong. Inter is optionally
self-hosted through the fonts entry point. Reduced motion disables transitions.
