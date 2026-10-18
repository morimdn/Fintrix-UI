import {
  Button,
  TechosoulProvider,
  WalletBalanceCard,
  useTechosoulTheme,
} from "@techosoul/ui";
import "@techosoul/ui/styles.css";
import "@techosoul/ui/fonts.css"; // Optional self-hosted Inter Variable

function WalletPage() {
  const { mode, setMode, density, setDensity } = useTechosoulTheme();
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
    <TechosoulProvider
      initialMode="dark"
      initialDensity="comfortable"
      colorOverrides={{
        light: { primary: "#5941a9" },
        dark: { primary: "#c4b5fd" },
      }}
    >
      <WalletPage />
    </TechosoulProvider>
  );
}
