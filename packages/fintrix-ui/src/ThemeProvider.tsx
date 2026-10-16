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
          ],
          token: {
            colorPrimary: t.color.action,
            colorPrimaryHover: t.color.actionHover,
            colorLink: t.color.primary,
            colorInfo: t.color.info,
            lineHeight: t.typography.lineHeight,
            motionDurationMid: `${t.motion.normal / 1000}s`,
            colorBgContainer: t.color.surface,
            colorBgElevated: t.color.elevated,
            colorBgLayout: t.color.canvas,
            colorText: t.color.text,
            colorTextSecondary: t.color.muted,
            colorTextTertiary: t.color.muted,
            colorTextQuaternary: t.color.muted,
            colorBorder: t.color.controlBorder,
            colorBorderSecondary: t.color.border,
            colorTextPlaceholder: t.color.muted,
            colorTextLightSolid: t.color.onAction,
            colorBgTextHover: t.color.rowHover,
            colorFillAlter: t.color.subtle,
            controlOutline: t.color.focus,
            boxShadowSecondary: t.color.elevatedShadow,
            colorSuccess: t.color.success,
            colorWarning: t.color.warning,
            colorError: t.color.danger,
            fontFamily: t.typography.family,
            fontSize: t.typography.body,
            borderRadius: t.radius.control,
            controlHeight: t.sizing.control,
          },
          components: {
            Pagination: {
              colorPrimary: t.color.primary,
              colorPrimaryHover: t.color.primaryHover,
            },
            Avatar: {
              colorTextPlaceholder: t.color.primarySoft,
              colorTextLightSolid: t.color.primary,
            },
            Tabs: {
              itemSelectedColor: t.color.primary,
              itemHoverColor: t.color.primaryHover,
              itemActiveColor: t.color.primary,
              inkBarColor: t.color.primary,
            },
            Table: {
              fontSize: t.typography.table,
              cellFontSize: t.typography.table,
              cellFontSizeMD: t.typography.table,
              cellFontSizeSM: t.typography.table,
              cellPaddingBlock: t.sizing.cell,
              headerBg: t.color.subtle,
              headerColor: t.color.text,
              borderColor: t.color.border,
              rowHoverBg: t.color.rowHover,
              rowSelectedBg: t.color.rowSelected,
              rowSelectedHoverBg: t.color.rowSelected,
              headerSortActiveBg: t.color.subtle,
              headerSortHoverBg: t.color.rowHover,
            },
            Button: {
              primaryShadow: "none",
              fontWeight: 500,
              defaultBorderColor: t.color.controlBorder,
              primaryColor: t.color.onAction,
            },
            Card: {
              colorBorderSecondary: t.color.border,
              headerFontSize: t.typography.section,
              borderRadiusLG: t.radius.card,
            },
            Modal: {
              borderRadiusLG: t.radius.card,
              contentBg: t.color.elevated,
              headerBg: t.color.elevated,
            },
            Drawer: { colorBgElevated: t.color.sidebar },
            Popover: { colorBgElevated: t.color.elevated },
            Tooltip: {
              colorBgSpotlight: t.color.text,
              colorTextLightSolid: t.color.canvas,
            },
            Form: {
              labelFontSize: t.typography.label,
              labelColor: t.color.text,
            },
            Select: {
              optionSelectedBg: t.color.primarySoft,
              optionSelectedColor: t.color.primary,
              optionActiveBg: t.color.rowHover,
            },
            Segmented: {
              trackBg: t.color.subtle,
              itemSelectedBg: t.color.surface,
              itemSelectedColor: t.color.text,
            },
            Input: {
              activeBorderColor: t.color.primary,
              hoverBorderColor: t.color.primary,
            },
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
