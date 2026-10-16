import { lazy, Suspense, useState } from "react";
import { Avatar, Button, Drawer, Segmented, Skeleton } from "antd";
import {
  Activity,
  Users,
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  ChartNoAxesCombined,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useFintrixTheme } from "fintrix-ui-preview";
import { IconButton } from "fintrix-ui-preview";
const CRM = lazy(() => import("./demo/CRM").then((m) => ({ default: m.CRM })));
const Showcase = lazy(() =>
  import("./demo/Showcase").then((m) => ({ default: m.Showcase })),
);
export default function App() {
  const [view, setView] = useState(
    new URLSearchParams(window.location.search).get("view") === "crm"
      ? "crm"
      : "showcase",
  );
  const [navigationOpen, setNavigationOpen] = useState(false);
  const { mode, setMode, density, setDensity } = useFintrixTheme();
  function navigate(next: string) {
    setView(next);
    setNavigationOpen(false);
  }
  const navigation = (
    <div className="sidebar-content">
      <a className="brand" href="#main-content" onClick={() => navigate("crm")}>
        <span className="brand-mark">
          <Activity size={24} />
        </span>
        fintrix<span className="brand-ui">UI</span>
      </a>
      <div className="workspace">
        <span className="workspace-icon">F</span>
        <div>
          <strong>Fintrix UI</strong>
          <small>Open-source design system</small>
        </div>
      </div>
      <span className="nav-label">WORKSPACE</span>
      <nav aria-label="Workspace navigation">
        <button
          aria-current={view === "crm" ? "page" : undefined}
          className={view === "crm" ? "active" : ""}
          onClick={() => navigate("crm")}
        >
          <Users size={20} />
          Clients
        </button>
        <button
          aria-current={view === "showcase" ? "page" : undefined}
          className={view === "showcase" ? "active" : ""}
          onClick={() => navigate("showcase")}
        >
          <Layers size={20} />
          Design system
          <ArrowUpRight size={16} />
        </button>
      </nav>
      <div className="nav-preview">
        <span className="nav-label">EXAMPLE DOMAINS</span>
        {[
          [LayoutDashboard, "Overview"],
          [Wallet, "Transactions"],
          [ShieldCheck, "Compliance"],
          [ChartNoAxesCombined, "Reports"],
        ].map(([Icon, label]) => {
          const I = Icon as typeof Wallet;
          return (
            <div key={String(label)}>
              <I size={20} />
              {String(label)}
            </div>
          );
        })}
      </div>
      <div className="sidebar-bottom">
        <div className="poc-note">
          <span className="eyebrow">FINANCIAL CLARITY</span>
          <strong>Clarity at every scale.</strong>
          <p>A considered foundation for modern finance.</p>
          <Button onClick={() => navigate("showcase")}>
            Explore the system <ArrowUpRight size={16} />
          </Button>
        </div>
        <div className="sidebar-helper">
          <HelpCircle size={18} /> Open source · MIT
        </div>
        <div className="profile">
          <Avatar>EW</Avatar>
          <div>
            <strong>Emma Wilson</strong>
            <small>Workspace admin</small>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside className="sidebar">{navigation}</aside>
      <Drawer
        title="Workspace navigation"
        placement="left"
        size={300}
        open={navigationOpen}
        onClose={() => setNavigationOpen(false)}
        getContainer={false}
        rootClassName="mobile-navigation"
        styles={{ body: { padding: 0 } }}
      >
        {navigationOpen ? navigation : null}
      </Drawer>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <Button
              className="mobile-menu"
              aria-label="Open navigation"
              aria-expanded={navigationOpen}
              icon={<Menu size={20} />}
              onClick={() => setNavigationOpen(true)}
            />
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <strong>{view === "crm" ? "Clients" : "Design system"}</strong>
          </div>
          <div className="theme-controls">
            <Segmented
              aria-label="Interface density"
              value={density}
              options={[
                { label: "Comfortable", value: "comfortable" },
                { label: "Compact", value: "compact" },
              ]}
              onChange={(v) => setDensity(v as typeof density)}
            />
            <IconButton
              label={
                mode === "light"
                  ? "Switch to dark theme"
                  : "Switch to light theme"
              }
              icon={mode === "light" ? <Moon size={19} /> : <Sun size={19} />}
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            />
            <span className="top-divider" />
            <Avatar size={32}>EW</Avatar>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          <Suspense
            fallback={
              <div role="status" aria-label="Loading workspace">
                <Skeleton active paragraph={{ rows: 8 }} />
              </div>
            }
          >
            {view === "crm" ? (
              <CRM />
            ) : (
              <Showcase onOpenCRM={() => navigate("crm")} />
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
