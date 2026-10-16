# Default-button contrast hotfix

Base: main `37431b6c75b6882067eab3c2824a1d9b380fd77b`.
Failing main run: https://github.com/morimdn/Fintrix-UI/actions/runs/38897666460 .

## Root cause

The copy-React-example control is a standard Ant Design default/outlined button.
Fintrix sets the global primary action/hover tokens to filled-button backgrounds,
which support white text. Ant derives default-button hover/pressed foregrounds
from those same primary tokens unless explicitly overridden.

In dark mode the settled hover foreground was `#285ac5` on `#19263a`: **2.43:1**,
below the unchanged 4.5:1 requirement. The normal foreground `#edf2fb` on that
surface is **13.55:1**. This is a real interaction-state defect, not a theme palette
failure or merely a premature axe scan.

During the shell test, scrolling can move the full-width copy control under the
pointer last positioned by a tab click. Its 200ms hover transition determines when
axe observes the failing color. Four-worker execution reproduced **8 failures in
12 runs**, with axe reporting that exact foreground/background pair. Other runs
sampled the initial high-contrast state or did not hover the control.

## Fix and coverage

FintrixProvider explicitly maps default-button hover text/border to the existing
`primaryHover` foreground token, and pressed text/border to `primary`. Dark hover
is now `#bdd2ff` on `#19263a` (**10.02:1**) and pressed is `#91b5ff` (**7.43:1**).
Light hover/pressed ratios are **8.49:1 / 6.06:1**. No new palette colors are added;
filled primary actions retain their existing colors.

The new browser regression deliberately tests idle, hover, pressed and focus
states in both modes/densities, asserts settled CSS colors, runs full-page axe,
and verifies clipboard copying. CSS-color polling observes the requested state;
there are no fixed sleeps or disabled animations/rules. Existing shell axe output
now includes failure summaries and color data. Token contrast tests cover both
foreground roles. No axe rules, thresholds or existing tests were weakened.

## Local validation

- CI-like reproduction: `CI=true npx playwright test tests/shell.spec.ts --grep
'app shell desktop dark' --repeat-each=12 --workers=4`: **12/12 pass after fix**.
- Repeated shell plus new interaction checks: three repetitions / four workers,
  **15/15 pass**.
- Full suite: **57 unit checks, 29 showcase browser checks and one packed-consumer
  browser check pass**. Full showcase browser run uses `CI=true` and four workers.
- TypeScript, native library, showcase, Storybook, independent packed-consumer and
  Pages production builds pass. Existing application chunk-size warnings remain.

PR/main CI and deployment status are reported separately in the hotfix PR and
final delivery report. Pages remains manual-only and must use the main ref.
