# Getting Started

The npm registry package is **not published**. Use the generated
`fintrix-ui-preview-0.2.0.tgz` artifact today. The provisional name is not a claim
to registry ownership; `npm install fintrix-ui` is not an installation option.

## 1. Prerequisites

Repository development uses **Node 24, npm and Git**. Browser applications need
React/React DOM **18.3 or 19** and **Ant Design 6** as peers, plus an ESM-capable
bundler. TypeScript consumers need matching React type packages. We validate
React 18.3.1/19.3.1 × Ant 6.0.0/6.6.6; every version in the peer range is not
individually tested. Node 24 is for repository tooling, not code shipped to the browser.

## 2. Obtain the source

```sh
git clone https://github.com/morimdn/Fintrix-UI.git
cd Fintrix-UI
```

`main` contains the merged and deployed Phase 2 foundation. Phase 3 is under
review in [PR #5](https://github.com/morimdn/Fintrix-UI/pull/5), not merged or
published. Until it merges, obtain the reviewed PR checkout or an owner-provided
tarball to use FintrixIcon, iconTone and colorOverrides. With GitHub CLI you can
inspect/check out the PR with `gh pr checkout 5` after cloning. Permanent docs
links target main; new Phase 3 files will appear there when merged.

## 3. Install repository dependencies

```sh
npm ci
```

Use the committed lockfile. Do not run these repository commands in your consumer app.

## 4. Build the independent library

```sh
npm run build:library
```

This emits ESM, declarations, CSS, optional fonts and token JSON under the package's
dist directory. A full Showcase build is not needed to produce the artifact.
Rebuild after changing library source.

## 5. Pack the artifact

```sh
mkdir -p artifacts
npm pack --workspace fintrix-ui-preview --pack-destination ./artifacts
```

The generated file is `artifacts/fintrix-ui-preview-0.2.0.tgz`. Record its absolute
path. `npm pack` creates a local archive; it does not publish to npm.

## 6. Install in a separate React application

If you already have a React/TypeScript app, use it. Otherwise, from a directory
outside the Fintrix repository, create a standard Vite consumer:

```sh
npm create vite@latest fintrix-consumer -- --template react-ts --no-interactive
cd fintrix-consumer
npm install
```

Install the real tarball path, replacing the clearly marked example path below:

```sh
npm install /absolute/path/to/Fintrix-UI/artifacts/fintrix-ui-preview-0.2.0.tgz antd@6.6.6 react@19.3.1 react-dom@19.3.1
```

For an existing React 18 application use `react@18.3.1 react-dom@18.3.1` instead
and keep `@types/react` / `@types/react-dom` on their 18.x lines. Do not mix React
and React DOM majors. Install only one React copy. Lucide is a declared package
dependency; consumers importing Lucide directly should declare it themselves:

```sh
npm install lucide-react@1.58.0
```

## 7. Import CSS and optional fonts

Import `fintrix-ui-preview/styles.css` once in your app. Optionally import
`fintrix-ui-preview/fonts.css` to self-host Inter Variable. These are exported
package paths; do not import library source files or depend on remote fonts.

## 8. Initialize FintrixProvider

Wrap your application with FintrixProvider. Its initialMode and initialDensity
set defaults; mode changes use useFintrixTheme inside that provider. Standard Ant
controls inherit the same semantic palette.

## 9. Render a wallet and labeled buttons

Replace the scaffold's **src/App.tsx** with this complete example. Retain its
**src/main.tsx** mounting App into the index.html element with id `root`. Remove
the scaffold's `import './index.css'` from main.tsx: its centered body layout and
button resets can conflict with any component library's styling. This example
imports Fintrix CSS and optional self-hosted Inter; neither requires a remote font service.

<!-- onboarding:start -->

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

<!-- onboarding:end -->

## 10. Switch modes and run the application

The two labeled buttons call `useFintrixTheme()` inside the provider to change
Light/Dark and Comfortable/Compact independently. `initialMode` and
`initialDensity` only initialize state. `colorOverrides` demonstrates typed
mode-specific accent foregrounds; filled-button backgrounds use separate
`action`/`actionHover`/`onAction` roles. Check contrast after customization.

```sh
npm run dev
npm run build
```

Open the local URL printed by Vite, operate both controls, and confirm the
synthetic EUR wallet renders. CSS is required for Fintrix wrappers; fonts are
optional. If a package export is missing, confirm the installed tarball was rebuilt
from the intended reviewed source, not an older dist directory.

## Continue

- [Component selection and APIs](components.md)
- [Iconography and theme customization](customization.md)
- [DataGrid runnable example](../examples/documentation/Grid.tsx)
- [Financial component example](../examples/documentation/Financial.tsx)
- [Release status and owner checklist](releases.md)

`npm run validate:consumer` in the repository installs a tarball into a fresh
temporary directory, copies these exact documentation examples and checks their
types/build. `npm run test:consumer` serves that production build for browser
checks. It does not use workspace aliases. See the refinement validation report
for the versions and commands actually exercised.
