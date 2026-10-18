import onboarding from "../../../../../examples/documentation/App.tsx?raw";
import actions from "../../../../../examples/documentation/Actions.tsx?raw";
import forms from "../../../../../examples/documentation/Forms.tsx?raw";
import overlays from "../../../../../examples/documentation/Overlays.tsx?raw";
import grid from "../../../../../examples/documentation/Grid.tsx?raw";
import financial from "../../../../../examples/documentation/Financial.tsx?raw";
import icons from "../../../../../examples/documentation/Icons.tsx?raw";
import feedback from "../../../../../examples/documentation/Feedback.tsx?raw";
export const snippets = {
  onboarding,
  actions,
  forms,
  overlays,
  grid,
  financial,
  icons,
  feedback,
};
export const links = {
  repository: "https://github.com/morimdn/Fintrix-UI",
  docs: "https://github.com/morimdn/Fintrix-UI/tree/main/docs",
  installation:
    "https://github.com/morimdn/Fintrix-UI/blob/main/docs/getting-started.md",
  contributing:
    "https://github.com/morimdn/Fintrix-UI/blob/main/CONTRIBUTING.md",
  releases: "https://github.com/morimdn/Fintrix-UI/blob/main/docs/releases.md",
  live: "https://morimdn.github.io/Fintrix-UI/",
};
export const installCommands = `# In the cloned repository (Node 24 and npm)
git clone https://github.com/morimdn/Fintrix-UI.git
cd Fintrix-UI
# Before this rebrand merges: git switch feat/techosoul-rebrand
npm ci
npm run build:library
node -e "require('node:fs').mkdirSync('artifacts', { recursive: true })"
npm pack --workspace @techosoul/ui --pack-destination ./artifacts

# In your separate React/TypeScript application:
# Replace this path with the absolute path printed for your repository.
npm install /absolute/path/to/Fintrix-UI/artifacts/techosoul-ui-0.3.0.tgz antd@6.6.6 react@19.3.1 react-dom@19.3.1
# If you use React 18, pair react@18.3.1 with react-dom@18.3.1 and React 18 types.`;
export interface Topic {
  id: string;
  title: string;
  group: string;
  summary: string;
  paragraphs: string[];
  bullets?: string[];
  snippet?: keyof typeof snippets;
}
export const topics: Topic[] = [
  {
    id: "overview",
    title: "Introduction / Overview",
    group: "Start here",
    summary:
      "A React foundation for teams building brokerage CRMs, wallet interfaces and risk dashboards.",
    paragraphs: [
      "Techosoul adds financial display components, semantic tokens, density, icon conventions and grid extensions to Ant Design 6. Standard controls remain Ant Design components; this is not a replacement framework. The brokerage CRM is an example application using synthetic records, separate from the reusable library.",
      "Techosoul UI is the React design system under Techosoul. The @techosoul/ui@0.3.0 candidate remains private. The owner has registered techosoul.com, but npm organization control and publishing rights must be confirmed separately. Registry installation (npm install @techosoul/ui antd) is a future instruction, usable only after owner-approved publication.",
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    group: "Start here",
    summary:
      "Install the generated artifact in your own application. The npm registry package is not available.",
    paragraphs: [
      "Repository tooling requires Node 24, npm and Git. Browser consumers need React and React DOM 18.3 or 19, Ant Design 6, and a TypeScript/ESM-capable bundler. Validated combinations are React 18.3.1 / 19.3.1 with Ant 6.0.0 / 6.6.6; peer ranges do not certify every intermediate version. Node 24 is a build-tool requirement, not browser runtime code.",
      "Use feat/techosoul-rebrand before it merges, then updated main. The @techosoul/ui@0.3.0 package remains private until a separately reviewed owner authorization.",
    ],
    bullets: [
      "Check prerequisites: Node 24/npm/Git for the repository, matching React/React DOM peers for your application.",
      "Clone the repository and check out the reviewed Phase 4 branch to build the 0.3.0 candidate before it merges.",
      "Install the repository's locked dependencies with npm ci.",
      "Build the independent library with npm run build:library.",
      "Create artifacts and run npm pack to generate techosoul-ui-0.3.0.tgz.",
      "In a separate React/TypeScript app, install the tarball by its real absolute path with compatible peers. The installation guide also explains creating a fresh Vite app.",
      "Import styles.css once; fonts.css optionally serves Inter locally. Remove conflicting scaffold CSS such as Vite's centered-body index.css.",
      "Initialize TechosoulProvider around your application. Call useTechosoulTheme only inside the provider.",
      "Replace src/App.tsx with the complete wallet/button example below. Retain main.tsx mounting App into #root.",
      "Run the consumer app, switch Light/Dark and Comfortable/Compact using the labeled buttons, then verify its production build.",
    ],
    snippet: "onboarding",
  },
  {
    id: "principles",
    title: "Design Principles",
    group: "Foundations",
    summary:
      "Make financial context explicit and choose controls that match the decision.",
    paragraphs: [
      "Keep amounts, currencies, account identifiers and timestamps together. A gain is a direction, not proof that an operation succeeded. Label statuses with words as well as color. All examples here are synthetic; none executes trades, payments or accounting entries.",
      "Use one primary action per decision. A secondary button supports alternatives such as Cancel; a tertiary text button supports low-emphasis help. Prefer a labeled action such as Export statement when the meaning is unfamiliar; reserve icon-only buttons for familiar repeated actions with accessible names.",
    ],
  },
  {
    id: "tokens",
    title: "Color Palette & Tokens",
    group: "Foundations",
    summary:
      "Choose semantic roles instead of copying hex values from a screenshot.",
    paragraphs: [
      "Primitive values are raw foundations such as spacing, font sizes and palette hex values. Semantic roles describe intent: canvas, surface and elevated are backgrounds; text and muted are foregrounds. Techosoul exposes semantic light/dark palettes rather than a public numbered brand-color scale.",
      "positive / negative / neutral describe financial direction. success / warning / danger / info describe workflow feedback. primary is an accent foreground; action is a filled-button background paired with onAction. Never substitute a dark filled-action color for a readable outlined-button foreground.",
      "getTokens(mode, density, overrides?) and cssVariables(mode, density, overrides?) resolve the contract. TechosoulProvider.colorOverrides accepts separate typed light/dark partial maps and feeds both Ant ConfigProvider tokens and scoped --techosoul-* CSS variables. Missing entries retain defaults. The Getting Started example demonstrates primary overrides; update action/actionHover/onAction together if branding filled buttons.",
      'Use style={{ color: "var(--techosoul-primary)", background: "var(--techosoul-surface)" }} inside the provider for consumer-owned layouts. CSS variables follow the nearest provider; do not globally override Ant selectors. Verify customized text at 4.5:1 and meaningful graphics at 3:1 in every interaction state.',
    ],
  },
  {
    id: "typography",
    title: "Typography",
    group: "Foundations",
    summary:
      "Readable labels and aligned figures make dense dashboards easier to scan.",
    paragraphs: [
      "Inter Variable is optionally bundled and self-hosted under fonts.css. The system stack remains available if fonts are omitted. The implemented scale is display 36, title 28, section 20, body/label 14, table 13 and caption 12px, with a 1.55 base line height. Foundation weights are 400 regular, 500 medium and 650 strong.",
      'CurrencyAmount uses tabular figures, and amount columns should be right-aligned. For your own numeric elements use fontVariantNumeric: "tabular-nums". Keep currency visible, use locale-aware formatting and avoid reducing key amounts to caption size to fit more data. Compact density changes spacing, not the meaning or legibility of values.',
    ],
  },
  {
    id: "layout",
    title: "Spacing, Grid and Layout",
    group: "Foundations",
    summary:
      "A 4px rhythm and two density modes support both overview and investigation.",
    paragraphs: [
      "Spacing steps are 4, 8, 12, 16, 24, 32 and 40px. Comfortable density uses 40px controls and 16px table cell padding; Compact uses 32px and 10px. useTechosoulTheme exposes setDensity independently of setMode.",
      "The Showcase shell keeps its header and sidebar stationary while main content scrolls independently. Only overflowing sidebar navigation scrolls; its brand and profile stay anchored. At narrow widths, navigation moves to a Drawer. Consumer layouts are not required to reuse this shell.",
      "Stack cards and forms on small screens. Contain horizontal overflow within data grids and code blocks, retaining keyboard access. Compact desktop controls are not automatically appropriate for touch; preserve at least 24px targets or sufficient spacing under WCAG 2.2 target-size guidance, and prefer larger controls for frequent touch actions.",
      "Motion uses 120ms fast and 200ms normal durations with cubic-bezier(.2,0,0,1). Reduced-motion styles disable transitions and shorten animations. Hover indicates availability; focus identifies the keyboard target; active indicates a press. Disabled controls cannot be operated, so explain why nearby. Loading should describe finite ongoing work and expose progress or status.",
    ],
  },
  {
    id: "core",
    title: "Core Components",
    group: "Components",
    summary:
      "Use Ant Design actions with Techosoul grouping, accessible icon buttons and semantic styling.",
    paragraphs: [
      'Button is an Ant re-export: type="primary", default and type="text" express hierarchy; danger, loading, disabled and size remain native props. Use a real link for navigation and a button for an action. Loading does not replace a meaningful label. Techosoul ButtonGroup adds role="group" and a group label; it is not an exclusive selection control.',
      "Techosoul IconButton requires label, wraps Ant Button with a Tooltip, and hides its decorative icon from assistive technology. Optional iconTone colors only the icon. Neutral/inherited foregrounds remain preferred; retain the inherited foreground on filled buttons unless contrast is checked. Each control follows the provider’s Light/Dark and density tokens.",
    ],
    snippet: "actions",
  },
  {
    id: "forms",
    title: "Forms and Controls",
    group: "Components",
    summary:
      "Choose an input by the type of decision, and keep labels and error recovery visible.",
    paragraphs: [
      "Input and Input.TextArea are Ant controls for single-line values and longer notes. Use persistent Form.Item labels, name and validation rules; placeholders are hints, not names. Use TextArea for review notes rather than expanding single-line inputs. Ant Form manages validation and field association.",
      'Select handles longer choice lists; mode="multiple" enables multi-select. Radio.Group exposes a short exclusive set such as Daily/Weekly. Checkbox represents independent selections or agreement; Switch represents an immediately understood on/off setting. Do not use a switch for a destructive operation or a long-running workflow.',
      "Slider supports approximate numeric selection. Techosoul RangeController adds a controlled [minimum, maximum] tuple and two numeric inputs for precision and alternatives to dragging. Its max defaults to 100000; set a domain-appropriate maximum. Use a numeric input rather than a slider where every unit has financial significance. Keyboard behavior and focus treatment are provided by Ant plus Techosoul scoped styles.",
    ],
    snippet: "forms",
  },
  {
    id: "navigation",
    title: "Navigation and Feedback",
    group: "Components",
    summary:
      "Match the amount of context and consequence to the surface you open.",
    paragraphs: [
      "Modal and Drawer are Ant re-exports; Techosoul FormModal sets inline mounting, a 760px default width and destroyOnHidden, while retaining Modal props. Always supply a title and controlled open/onCancel or onClose state. Verify Escape, focus containment and return to the trigger. Do not nest complex modal workflows.",
      "Tooltip supplies short nonessential hints and must also work on focus. Popover holds richer explanations or simple contextual content; choose an explicit click trigger when needed and verify keyboard dismissal. Neither should hold essential instructions that are otherwise undiscoverable.",
      "Tabs switches related views and inherits Ant keyboard behavior. Chip is Ant Tag, useful for categories or removable filters; StatusIndicator is a Techosoul text-and-dot status wrapper. Neither is an action button or a replacement for an error message.",
      "Alert is persistent in-page feedback. Use Ant App.useApp().notification/message within TechosoulProvider for contextual transient messages; retain persistent confirmation for critical outcomes. Skeleton suggests loading shape, Empty explains absence. Add a named status region for loading and a useful next step for empty results; never show a skeleton indefinitely.",
    ],
    snippet: "overlays",
  },
  {
    id: "grid",
    title: "Data Grid",
    group: "FinTech",
    summary:
      "Compare records with Ant Table behavior and Techosoul visibility/resizing extensions.",
    paragraphs: [
      "Use stable rowKey values and typed columns. Techosoul controls hiddenColumnKeys and columnWidths through your state; onColumnWidthChange updates widths. Fixed columns always remain visible. minColumnWidth/maxColumnWidth default to 120/480px. Sorting, filtering, pagination and row selection come from Ant Table props, not a separate Techosoul data engine.",
      "Resize handles support Left/Right in 10px steps, Shift in 20px steps, and Home/End to reach bounds. Their slider labels identify the column. Retain readable headers, semantic cell renderers and focus indicators; keyboard resizing must not accidentally sort the column.",
      "The synthetic 10,000-record demo below renders 25 rows per page. It is not a 10,000-DOM-row or virtualization benchmark. For remote or costly datasets use controlled pagination, onChange and server-side sort/filter queries with loading and error handling. Consider Ant virtualization only after measuring actual scrolling/rendering problems; it does not replace data fetching or pagination.",
      "Compact density reduces row padding; scroll.x contains wide layouts on narrow screens. Keep currencies and identifiers persistently visible in transactional/reconciliation workflows. Hiding the currency column below is only a generic visibility demonstration; amounts now retain their currency symbol. Some symbols are ambiguous across currencies, so real workflows should also preserve an explicit currency code. The runnable example hides a noncritical note column instead.",
    ],
    snippet: "grid",
  },
  {
    id: "financial",
    title: "FinTech Components",
    group: "FinTech",
    summary:
      "Display precise, supplied values while separating direction, workflow status and risk.",
    paragraphs: [
      "CurrencyAmount and formatCurrency accept value as decimal text, number or bigint, a three-letter currency, optional locale and maximumFractionDigits. Prefer decimal strings: numbers may already have lost precision before formatting. Intl rounds for display; these components do not perform settlement, ledger or trading arithmetic. Modern ECMA-402 decimal-string formatting is required.",
      "PnLIndicator adds a label and a signed financial direction. Positive/negative values use financial tokens; zero is neutral. WalletBalanceCard adds title, detail and optional icon/iconTone. AccountSummary adds name, reference, balance props and optional status. FinancialKPICard accepts label, arbitrary value and detail; it does not calculate metrics or imply a trend.",
      "KYCStatus: unverified, pending, verified, rejected. ClientStatus: active, inactive, restricted. TransactionStatus: pending, processing, completed, failed. These statuses describe workflows and include text. Verified/active/completed use success, pending uses warning, rejected/restricted/failed use danger, processing uses info, and unverified/inactive use neutral. RiskLevelIndicator accepts low, medium, high or unknown; risk is an assessment, not a P&L direction or transaction result. Low uses success, medium warning, high danger and unknown neutral. These components present the supplied status; they do not decide compliance outcomes.",
      "SymbolPriceDisplay takes supplied symbol/price text and optional positive/negative/neutral direction. BidAskDisplay takes supplied symbol, bid, ask and optional spread strings. It does not calculate a spread. All values below are synthetic, with no live market feed, broker integration or payment execution.",
    ],
    snippet: "financial",
  },
  {
    id: "dashboards",
    title: "Dashboard Examples",
    group: "FinTech",
    summary: "Compose summaries and drill into comparable records.",
    paragraphs: [
      "Use FinancialKPICard for a count or externally calculated metric, WalletBalanceCard for a currency balance, and AccountSummary for one account’s identity and balance. Use DataGrid when users need to compare, sort or select many accounts. Legacy MetricCard keeps its decorative synthetic sparkline for CRM continuity; prefer FinancialKPICard for new production metrics.",
      "The Clients view demonstrates search, filters, row selection, resizing and record editing. Its data and actions are illustrative and separate from the reusable package. Never describe a demo balance as current buying power or a real trading position.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    group: "Accessibility",
    summary:
      "Accessible defaults still require review in your application and with your content.",
    paragraphs: [
      "Keep a logical heading order, explicit field labels, descriptive buttons, visible focus and keyboard-accessible scroll regions. Icon-only controls need an accessible action name; decorative icons should be hidden. Put important status text beside semantic color and do not encode gains/losses by color alone.",
      "Test Tab/Shift+Tab, Arrow keys in tabs and resize handles, Escape and focus restoration in dialogs/drawers, form errors and reduced motion. Check Light/Dark hover, active and selected states after overriding tokens. Text targets 4.5:1; meaningful graphical controls target 3:1. Compact density does not waive target-size requirements.",
      "Automated axe and browser regressions cover selected workflows, not full WCAG certification. Screen-reader and other manual assistive-technology testing remain release-review work. Headless Firefox native scrollbar appearance needs manual verification; actual keyboard scrolling is tested in all three engines.",
    ],
  },
  {
    id: "developers",
    title: "Developer Documentation",
    group: "Contribution & release",
    summary:
      "Stable exports, tested examples and an explicit publication boundary.",
    paragraphs: [
      "The package preserves ESM modules and declarations. React/React DOM and Ant Design are peers; Lucide is a declared dependency. Import components from @techosoul/ui, token helpers from /tokens, and CSS/fonts through their exported paths. The full Lucide catalog is not bundled into the library; the curated gallery is a lazy Showcase chunk.",
      "Examples shown here are real TypeScript files installed and typechecked against the packed artifact in React 18/19 consumers. The installation guide provides a complete App, while other exported example components are intended to render inside TechosoulProvider. No example needs source aliases.",
      "Contribute through a focused GitHub pull request targeting main. Explain the problem, include relevant checks and real screenshots for visual changes, and update usage guidance when changing public APIs. Preserve semantic tokens, synthetic demo data and MIT attribution.",
      "The @techosoul/ui@0.3.0 candidate remains private; the linked live Showcase may retain the earlier brand until a separately approved deployment. The private safeguard remains; owner-approved naming, account setup and release checks are required. npm publication, GitHub Release and an editable Figma UI Kit remain future deliverables. ESM-only support does not imply CommonJS or SSR hydration validation.",
    ],
  },
];
export const decisions = [
  [
    "Modal",
    "Short confirmation, destructive approval or focused transaction review",
    "Use a full page for multi-step KYC or long audit histories.",
  ],
  [
    "Drawer",
    "Client details, quick record editing or advanced filters while retaining context",
    "Avoid complex onboarding and extensive product configuration.",
  ],
  [
    "Full page",
    "Multi-step KYC, onboarding, audit/history or complex configuration",
    "Avoid interrupting navigation for a small confirmation.",
  ],
  [
    "Select / Radio",
    "Select for long lists; Radio for a short visible exclusive set",
    "A dropdown menu of commands is not a selection field.",
  ],
  [
    "Tooltip / Popover",
    "Tooltip for a brief hint; Popover for richer contextual explanation",
    "Keep essential help and critical errors visible outside either overlay.",
  ],
  [
    "Chip / Status",
    "Chip for segments or filters; StatusIndicator for an explicit state",
    "Do not imply a category is a workflow outcome.",
  ],
  [
    "Card / DataGrid",
    "Card for one summary; DataGrid for comparing and selecting records",
    "Do not replace a detailed reconciliation grid with unrelated summary cards.",
  ],
];
