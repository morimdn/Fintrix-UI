import {
  createContext,
  useContext,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { App, ConfigProvider, theme } from "antd";
import {
  cssVariables,
  getTokens,
  type ColorMode,
  type Density,
} from "./tokens";
const Context = createContext<{
  mode: ColorMode;
  density: Density;
  setMode: (m: ColorMode) => void;
  setDensity: (d: Density) => void;
} | null>(null);
export function FintrixProvider({
  children,
  initialMode = "light",
  initialDensity = "comfortable",
}: {
  children: ReactNode;
  initialMode?: ColorMode;
  initialDensity?: Density;
}) {
  const [mode, setMode] = useState<ColorMode>(initialMode),
    [density, setDensity] = useState<Density>(initialDensity);
  const t = getTokens(mode, density);
  return (
    <Context.Provider value={{ mode, density, setMode, setDensity }}>
      <ConfigProvider
        getPopupContainer={(trigger) =>
          (trigger?.closest(".fintrix-root") as HTMLElement) ??
          document.querySelector<HTMLElement>(".fintrix-root") ??
          document.body
        }
        theme={{
          algorithm: [
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
            ...(density === "compact" ? [theme.compactAlgorithm] : []),
          ],
          token: {
            colorPrimary: t.color.primary,
            colorPrimaryHover: t.color.primaryHover,
            colorLink: t.color.primary,
            colorInfo: t.color.info,
            lineHeight: t.typography.lineHeight,
            motionDurationMid: `${t.motion.normal / 1000}s`,
            colorBgContainer: t.color.surface,
            colorBgElevated: t.color.surface,
            colorBgLayout: t.color.canvas,
            colorText: t.color.text,
            colorTextSecondary: t.color.muted,
            colorBorder: t.color.border,
            colorSuccess: t.color.success,
            colorWarning: t.color.warning,
            colorError: t.color.danger,
            fontFamily: t.typography.family,
            fontSize: t.typography.body,
            borderRadius: t.radius.control,
            controlHeight: t.sizing.control,
          },
          components: {
            Table: {
              cellPaddingBlock: t.sizing.cell,
              headerBg: t.color.subtle,
            },
            Button: { primaryShadow: "none" },
            Modal: { borderRadiusLG: t.radius.card },
          },
        }}
      >
        <div
          className="fintrix-root"
          data-theme={mode}
          data-density={density}
          style={cssVariables(mode, density) as CSSProperties}
        >
          <App>{children}</App>
        </div>
      </ConfigProvider>
    </Context.Provider>
  );
}
export function useFintrixTheme() {
  const context = useContext(Context);
  if (!context) throw new Error("Use within FintrixProvider");
  return context;
}
