export type ColorMode = "light" | "dark";
export type Density = "comfortable" | "compact";
export const foundations = {
  typography: {
    family:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'SFMono-Regular', Consolas, monospace",
    caption: 12,
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
    sidebar: 224,
    contentMax: 1600,
    modal: 760,
    tableMin: 1040,
    mobile: 760,
  },
  motion: { fast: 120, normal: 200, easing: "cubic-bezier(.2,0,0,1)" },
  density: {
    comfortable: { control: 38, cell: 16 },
    compact: { control: 30, cell: 9 },
  },
};
export const palettes = {
  light: {
    canvas: "#f5f7fa",
    surface: "#ffffff",
    subtle: "#f8fafc",
    text: "#17243b",
    muted: "#637188",
    border: "#e5eaf1",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primarySoft: "#edf3ff",
    success: "#087f5b",
    successSoft: "#e9f7f1",
    warning: "#946200",
    warningSoft: "#fff6de",
    danger: "#c33748",
    dangerSoft: "#fff0f1",
    info: "#4661a6",
    infoSoft: "#eef2ff",
    positive: "#087f5b",
    negative: "#c33748",
    neutral: "#637188",
    focus: "#80aaff",
    shadow: "0 4px 20px #17243b08",
  },
  dark: {
    canvas: "#0c1423",
    surface: "#131f32",
    subtle: "#18263b",
    text: "#e7edf8",
    muted: "#a0aec3",
    border: "#2b3b53",
    primary: "#74a3ff",
    primaryHover: "#9dbdff",
    primarySoft: "#20365b",
    success: "#5cd6aa",
    successSoft: "#163b34",
    warning: "#f4ca70",
    warningSoft: "#3b321f",
    danger: "#ff8d9b",
    dangerSoft: "#422634",
    info: "#b2beff",
    infoSoft: "#2b3153",
    positive: "#5cd6aa",
    negative: "#ff8d9b",
    neutral: "#a0aec3",
    focus: "#a1c0ff",
    shadow: "0 4px 20px #00000025",
  },
};
export function getTokens(mode: ColorMode, density: Density) {
  return {
    ...foundations,
    color: palettes[mode],
    sizing: foundations.density[density],
  };
}
export function cssVariables(
  mode: ColorMode,
  density: Density,
): Record<string, string | number> {
  const t = getTokens(mode, density);
  const vars: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(t.color))
    vars[`--fx-${key}`] = value;
  for (const group of ["space", "radius", "layout"] as const)
    for (const [key, value] of Object.entries(t[group]))
      vars[`--fx-${group}-${key}`] = `${value}px`;
  for (const [key, value] of Object.entries(t.typography))
    vars[`--fx-typography-${key}`] =
      typeof value === "number" &&
      ["caption", "body", "title", "display"].includes(key)
        ? `${value}px`
        : value;
  vars["--fx-motion-fast"] = `${t.motion.fast}ms`;
  Object.assign(vars, {
    "--fx-font": t.typography.family,
    "--fx-mono": t.typography.mono,
    "--fx-control": `${t.sizing.control}px`,
    "--fx-cell": `${t.sizing.cell}px`,
    "--fx-motion": `${t.motion.normal}ms`,
    "--fx-easing": t.motion.easing,
  });
  return vars;
}
