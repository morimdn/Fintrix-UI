import { useState } from "react";
import { Button, Card, Input, Select, Slider } from "antd";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Search,
  Plus,
  Copy,
  Pencil,
  Trash2,
  Wallet,
  CreditCard,
  Landmark,
  Receipt,
  ChartNoAxesCombined,
  ChartPie,
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  CandlestickChart,
  ArrowLeftRight,
  Users,
  User,
  UserPlus,
  Contact,
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  Bell,
  CircleCheck,
  CircleAlert,
  Info,
  Settings,
  SlidersHorizontal,
  Building2,
  Settings2,
} from "lucide-react";
import {
  FintrixIcon,
  IconButton,
  WalletBalanceCard,
  type IconTone,
} from "fintrix-ui-preview";
const categories = {
  Navigation: { ArrowLeft, ArrowRight, Home, Search },
  Actions: { Plus, Copy, Pencil, Trash2 },
  "Finance and Wallets": { Wallet, CreditCard, Landmark, Receipt },
  "Analytics and Reporting": {
    ChartNoAxesCombined,
    ChartPie,
    FileText,
    Download,
  },
  "Trading and Markets": {
    TrendingUp,
    TrendingDown,
    CandlestickChart,
    ArrowLeftRight,
  },
  "Users and Accounts": { Users, User, UserPlus, Contact },
  "Compliance and Security": { ShieldCheck, Lock, KeyRound, Fingerprint },
  "Notifications and Feedback": { Bell, CircleCheck, CircleAlert, Info },
  "Settings and Administration": {
    Settings,
    SlidersHorizontal,
    Building2,
    Settings2,
  },
};
const tones: IconTone[] = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
];
export default function Iconography() {
  const [search, setSearch] = useState("");
  const [tone, setTone] = useState<IconTone>("neutral");
  const [size, setSize] = useState(24);
  const [stroke, setStroke] = useState(2);
  const [status, setStatus] = useState("");
  const entries = Object.entries(categories)
    .map(([category, icons]) => ({
      category,
      icons: Object.entries(icons).filter(([name]) =>
        `${category} ${name}`.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter(({ icons }) => icons.length);
  return (
    <section className="iconography" aria-labelledby="iconography-title">
      <div className="iconography-intro">
        <span className="eyebrow">FOUNDATIONS / ICONOGRAPHY</span>
        <h2 id="iconography-title">A clear visual language.</h2>
        <p>
          36 curated Lucide icons for financial products. Search, tune the
          appearance, and copy a React example.
        </p>
        <a href="https://lucide.dev/icons/">
          Explore the complete official Lucide catalog ↗
        </a>
      </div>
      <Card>
        <div className="icon-controls">
          <label>
            Search icons
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Wallet, security, navigation…"
            />
          </label>
          <label>
            Tone
            <Select
              aria-label="Icon tone"
              value={tone}
              onChange={setTone}
              options={tones.map((value) => ({ value, label: value }))}
            />
          </label>
          <label>
            Size: {size}px
            <Slider
              ariaLabelForHandle="Icon size"
              min={16}
              max={48}
              step={4}
              value={size}
              onChange={setSize}
            />
          </label>
          <label>
            Stroke: {stroke}
            <Slider
              ariaLabelForHandle="Icon stroke width"
              min={1}
              max={3}
              step={0.5}
              value={stroke}
              onChange={setStroke}
            />
          </label>
        </div>
        <p>
          Use the header theme and density controls to preview Light, Dark,
          Comfortable and Compact.
        </p>
        <p role="status">
          {status ||
            `${entries.reduce((sum, group) => sum + group.icons.length, 0)} icons shown`}
        </p>
      </Card>
      {entries.length === 0 && (
        <p>No matching icons. Try another name or category.</p>
      )}
      {entries.map(({ category, icons }) => (
        <section key={category} aria-label={category}>
          <h3>{category}</h3>
          <div className="icon-gallery">
            {icons.map(([name, icon]) => {
              const code = `import { ${name} } from "lucide-react";\nimport { FintrixIcon } from "fintrix-ui-preview";\n\n<FintrixIcon icon={${name}} tone="${tone}" size={${size}} strokeWidth={${stroke}} />`;
              return (
                <Card key={name} size="small">
                  <div className="icon-preview">
                    <FintrixIcon
                      icon={icon}
                      tone={tone}
                      size={size}
                      strokeWidth={stroke}
                    />
                  </div>
                  <strong>{name}</strong>
                  <pre>
                    <code>{code}</code>
                  </pre>
                  <Button
                    aria-label={`Copy ${name} example`}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(code);
                        setStatus(`Copied ${name} example`);
                      } catch {
                        setStatus(
                          "Clipboard unavailable. Select and copy the visible example.",
                        );
                      }
                    }}
                  >
                    Copy React
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
      <Card title="Customize a component">
        <WalletBalanceCard
          title="Operating wallet"
          value="128450.00"
          currency="USD"
          icon={<Wallet size={size} strokeWidth={stroke} />}
          iconTone={tone}
        />
        <IconButton
          label="Wallet settings"
          icon={<Settings size={20} />}
          iconTone={tone}
          onClick={() => setStatus("Wallet settings demonstration activated")}
        />
        <p>
          This API fragment assumes Wallet and Settings imports and your
          application's openSettings handler. For a complete tested component,
          see <a href="#docs-core">Iconography usage</a>.
        </p>
        <pre>
          <code>{`<WalletBalanceCard value="128450.00" currency="USD"\n  icon={<Wallet size={24} />} iconTone="${tone}" />\n<IconButton label="Wallet settings" icon={<Settings size={20} />}\n  iconTone="${tone}" onClick={openSettings} />`}</code>
        </pre>
      </Card>
      <Card title="Accessible by design">
        <p>
          FintrixIcon is decorative by default. Use label="Verified account" for
          a meaningful standalone image. Put the accessible action name on
          IconButton; an SVG is not an interactive control. Keep status text
          alongside color.
        </p>
        <p>
          Lucide remains usable directly:{" "}
          <code>
            {'<Wallet size={20} strokeWidth={2} aria-hidden="true" />'}
          </code>
          . Icons inherit currentColor unless a tone is supplied by Fintrix. Use
          neutral by default and semantic tones on suitable surfaces; filled
          buttons should retain their inherited foreground.
        </p>
        <p>
          For brand customization, pass typed <code>colorOverrides</code> to
          FintrixProvider, with separate light and dark palettes. Recheck
          contrast for every customized interaction state.
        </p>
      </Card>
    </section>
  );
}
