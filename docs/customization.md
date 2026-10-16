# Customization contract

Import styles once and place controls under `FintrixProvider`. The independent
`examples/consumer-app` installs the tarball outside the workspace.

## Themes and density

This complete App initializes the provider and switches both modes.

<!-- theme:start -->

```tsx
import {
  Button,
  FintrixProvider,
  WalletBalanceCard,
  useFintrixTheme,
} from "fintrix-ui-preview";
import "fintrix-ui-preview/styles.css";
import "fintrix-ui-preview/fonts.css"; // Optional self-hosted Inter Variable

function WalletPage() {
  const { mode, setMode, density, setDensity } = useFintrixTheme();
  return (
    <main style={{ padding: 24 }}>
      <h1>My wallet</h1>
      <Button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        Theme: {mode}
      </Button>
      <Button
        onClick={() =>
          setDensity(density === "comfortable" ? "compact" : "comfortable")
        }
      >
        Density: {density}
      </Button>
      <WalletBalanceCard
        value="12500.25"
        currency="EUR"
        detail="Synthetic balance"
      />
    </main>
  );
}

// Replace src/App.tsx in a React/TypeScript Vite app with this file.
export default function App() {
  return (
    <FintrixProvider
      initialMode="dark"
      initialDensity="comfortable"
      colorOverrides={{
        light: { primary: "#5941a9" },
        dark: { primary: "#c4b5fd" },
      }}
    >
      <WalletPage />
    </FintrixProvider>
  );
}
```

<!-- theme:end -->

`colorOverrides` is typed as `ThemeOverrides`: an optional partial map per mode
using existing color token names. Omitted values retain defaults. The resolved
palette feeds both Ant tokens and scoped `--fx-*` variables. `primary` is a
foreground; `action` is a filled background paired with `onAction`. Do not use a
dark filled-action color as an outlined button's hover foreground. Override
related roles together and check text at 4.5:1 and meaningful graphics at 3:1
across idle/hover/active/selected/focus states. Overrides cannot guarantee contrast.

`initialMode` and `initialDensity` initialize state. Use `useFintrixTheme()` with
`setMode`/`setDensity` for subsequent changes. Comfortable controls are 40px;
compact controls are 32px. Ant `size="small" | "middle" | "large"` is available
where supported. Preserve accessible target spacing in compact interfaces.

## Icons

Render this exported example inside FintrixProvider, as shown in Getting Started.

<!-- icons:start -->

```tsx
import { useState } from "react";
import { Settings, Wallet } from "lucide-react";
import { FintrixIcon, IconButton, WalletBalanceCard } from "fintrix-ui-preview";

export default function Icons() {
  const [status, setStatus] = useState("Ready");
  return (
    <>
      <FintrixIcon icon={Wallet} size={20} strokeWidth={2} />
      <FintrixIcon icon={Wallet} tone="primary" label="Wallet" />
      <IconButton
        label="Wallet settings"
        icon={<Settings size={20} />}
        iconTone="primary"
        onClick={() => setStatus("Settings selected")}
      />
      <WalletBalanceCard
        value="12500.25"
        currency="EUR"
        icon={<Wallet size={24} />}
        iconTone="success"
      />
      <p role="status">{status}</p>
    </>
  );
}
```

<!-- icons:end -->

Tones: neutral, primary, success, warning, danger, info. The standalone wrapper
defaults to neutral. Existing buttons and MetricCard retain their inherited
foreground unless `iconTone` is supplied. Financial cards support optional `icon`
and `iconTone`, defaulting to neutral. Icons are decorative alongside headings.
Explicit SVG colors override inherited wrapper tones; use `currentColor` for
component-level coloring. Filled buttons should generally retain their inherited
foreground rather than a semantic icon tone.

Use `label` only for meaningful standalone images. Interactive actions belong in
`IconButton` with a required label. Direct Lucide use remains supported:
`<Wallet size={20} strokeWidth={2} aria-hidden="true" />`. Never communicate
financial state by color alone. Named imports remain tree-shaking-friendly; no
catalog is shipped in the library. The lazy Showcase Iconography tab includes
36 curated icons, search, controls and copyable examples, plus the official catalog link.

## Component extensions

| Area | Supported customization |
| --- | --- |
| Buttons | Ant type, variant, color, danger, size, loading, disabled, className and style |
| Cards | Ant Card variant, size, styles and classNames; financial cards use scoped surface/border/radius tokens and detail content |
| Metrics | FinancialKPICard accepts arbitrary value/detail; MetricCard retains its legacy decorative sparkline |
| Money | Decimal text, currency, locale and maximumFractionDigits; formatting only, no financial arithmetic |
| DataGrid | Typed Ant columns, render, sorter, filters, onFilter, rowKey, controlled pagination/selection, scroll and fixed columns |
| Grid layout | hiddenColumnKeys, columnWidths, onColumnWidthChange and min/max widths; fixed columns stay visible |
| Modal/Drawer | Ant styles, classNames, Modal width, Drawer size/placement and controlled open state; retain labeled titles and focus management |
| Layout | Consumer-owned wrappers and scoped classes; semantic CSS variables rather than global Ant selector overrides |

See [component APIs](components.md) and the independent consumer example. Keep
semantic token names stable for future design-tool mappings. No editable Figma kit exists.
