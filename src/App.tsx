import { useState } from "react";
import { Avatar, Button, Segmented, Tooltip } from "antd";
import {
  Activity,
  Users,
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  ChartNoAxesCombined,
  Settings2,
  HelpCircle,
  ChevronDown,
  Sun,
  Moon,
  PanelLeftClose,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useFintrixTheme, IconButton } from "./system";
import { CRM } from "./demo/CRM";
import { Showcase } from "./demo/Showcase";
export default function App() {
  const [view, setView] = useState("crm");
  const { mode, setMode, density, setDensity } = useFintrixTheme();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setView("crm");
          }}
        >
          <span className="brand-mark">
            <Activity size={25} />
          </span>
          fintrix<span className="brand-ui">UI</span>
        </a>
        <div className="workspace">
          <span className="workspace-icon">F</span>
          <div>
            <strong>Fintrix Brokerage</strong>
            <small>Demo workspace</small>
          </div>
          <ChevronDown size={14} />
        </div>
        <span className="nav-label">WORKSPACE</span>
        <nav>
          <button
            className={view === "crm" ? "active" : ""}
            onClick={() => setView("crm")}
          >
            <Users size={19} />
            Clients<span className="nav-count">48</span>
          </button>
          <button
            className={view === "showcase" ? "active" : ""}
            onClick={() => setView("showcase")}
          >
            <Layers size={19} />
            Design system
            <ArrowUpRight size={14} />
          </button>
        </nav>
        <div className="nav-preview">
          <span className="nav-label">PHASE 2 PREVIEW</span>
          {[
            [LayoutDashboard, "Overview"],
            [Wallet, "Transactions"],
            [ShieldCheck, "Compliance"],
            [ChartNoAxesCombined, "Reports"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Wallet;
            return (
              <Tooltip key={String(label)} title="Planned for Phase 2">
                <div>
                  <I size={18} />
                  {String(label)}
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div className="sidebar-bottom">
          <div className="poc-note">
            <span className="eyebrow">THE FOUNDATION IS HERE</span>
            <strong>Clarity at every scale.</strong>
            <p>A design system made for modern finance.</p>
            <Button size="small" onClick={() => setView("showcase")}>
              Explore components <ArrowUpRight size={14} />
            </Button>
          </div>
          <div className="sidebar-helper">
            <HelpCircle size={17} /> Open source · MIT
          </div>
          <div className="profile">
            <Avatar>EW</Avatar>
            <div>
              <strong>Emma Wilson</strong>
              <small>Workspace admin</small>
            </div>
            <Settings2 size={16} />
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <PanelLeftClose size={18} />
            <span>Workspace</span>
            <span>/</span>
            <strong>{view === "crm" ? "Clients" : "Design system"}</strong>
          </div>
          <div className="theme-controls">
            <Segmented
              aria-label="Interface density"
              size="small"
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
              icon={mode === "light" ? <Moon size={17} /> : <Sun size={17} />}
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            />
            <span className="top-divider" />
            <Avatar size={30}>EW</Avatar>
          </div>
        </header>
        <main>{view === "crm" ? <CRM /> : <Showcase />}</main>
      </div>
    </div>
  );
}
