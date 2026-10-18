export type ColorMode = "light" | "dark";
export type Density = "comfortable" | "compact";
export const foundations = {
  typography: {
    family:
      "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'SFMono-Regular', Consolas, monospace",
    caption: 12,
    table: 13,
    label: 14,
    section: 20,
    body: 14,
    title: 28,
    display: 36,
    lineHeight: 1.55,
    weightRegular: 400,
    weightMedium: 500,
    weightStrong: 650,
  },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, section: 40 },
  radius: { small: 6, control: 8, card: 12, pill: 999 },
  layout: {
    sidebar: 248,
    contentMax: 1600,
    modal: 760,
    tableMin: 1040,
    mobile: 760,
  },
  motion: { fast: 120, normal: 200, easing: "cubic-bezier(.2,0,0,1)" },
  density: {
    comfortable: { control: 40, cell: 16 },
    compact: { control: 32, cell: 10 },
  },
};
export const palettes = {
  light: {
    canvas: "#f3f6fb",
    sidebar: "#ffffff",
    surface: "#ffffff",
    elevated: "#ffffff",
    subtle: "#f0f4f9",
    text: "#192941",
    muted: "#52647e",
    border: "#d7e0ed",
    controlBorder: "#78879d",
    primary: "#2159d6",
    primaryHover: "#1744ae",
    primarySoft: "#e8efff",
    action: "#2159d6",
    actionHover: "#1744ae",
    onAction: "#ffffff",
    success: "#087651",
    successSoft: "#e5f5ed",
    warning: "#875c00",
    warningSoft: "#fff3d5",
    danger: "#b92e44",
    dangerSoft: "#ffedf0",
    info: "#425bb0",
    infoSoft: "#edf0ff",
    positive: "#087651",
    negative: "#b92e44",
    neutral: "#52647e",
    focus: "#2159d6",
    rowHover: "#f2f6ff",
    rowSelected: "#e8efff",
    shadow: "0 3px 14px #1a335908",
    elevatedShadow: "0 12px 36px #1a33591f",
  },
  dark: {
    canvas: "#0e1623",
    sidebar: "#111c2d",
    surface: "#19263a",
    elevated: "#22334b",
    subtle: "#1f2f46",
    text: "#edf2fb",
    muted: "#adbad0",
    border: "#384c67",
    controlBorder: "#7388a6",
    primary: "#91b5ff",
    primaryHover: "#bdd2ff",
    primarySoft: "#243e65",
    action: "#3268dc",
    actionHover: "#285ac5",
    onAction: "#ffffff",
    success: "#70dfb2",
    successSoft: "#153e36",
    warning: "#f2cd7e",
    warningSoft: "#423720",
    danger: "#ff9baa",
    dangerSoft: "#472938",
    info: "#becaff",
    infoSoft: "#303c60",
    positive: "#70dfb2",
    negative: "#ff9baa",
    neutral: "#adbad0",
    focus: "#91b5ff",
    rowHover: "#243650",
    rowSelected: "#263f65",
    shadow: "0 4px 18px #050c161a",
    elevatedShadow: "0 16px 48px #050c1666",
  },
};
export type ColorOverrides = Partial<
  Record<keyof typeof palettes.light, string>
>;
export type ThemeOverrides = Partial<Record<ColorMode, ColorOverrides>>;
export function getTokens(
  mode: ColorMode,
  density: Density,
  overrides?: ThemeOverrides,
) {
  return {
    ...foundations,
    color: { ...palettes[mode], ...overrides?.[mode] },
    sizing: foundations.density[density],
  };
}
export function cssVariables(
  mode: ColorMode,
  density: Density,
  overrides?: ThemeOverrides,
): Record<string, string | number> {
  const t = getTokens(mode, density, overrides);
  const vars: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(t.color))
    vars[`--techosoul-${key}`] = value;
  for (const group of ["space", "radius", "layout"] as const)
    for (const [key, value] of Object.entries(t[group]))
      vars[`--techosoul-${group}-${key}`] = `${value}px`;
  for (const [key, value] of Object.entries(t.typography))
    vars[`--techosoul-typography-${key}`] =
      typeof value === "number" &&
      [
        "caption",
        "table",
        "label",
        "section",
        "body",
        "title",
        "display",
      ].includes(key)
        ? `${value}px`
        : value;
  vars["--techosoul-motion-fast"] = `${t.motion.fast}ms`;
  Object.assign(vars, {
    "--techosoul-font": t.typography.family,
    "--techosoul-mono": t.typography.mono,
    "--techosoul-control": `${t.sizing.control}px`,
    "--techosoul-cell": `${t.sizing.cell}px`,
    "--techosoul-motion": `${t.motion.normal}ms`,
    "--techosoul-easing": t.motion.easing,
  });
  return vars;
}
