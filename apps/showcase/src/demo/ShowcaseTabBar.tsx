import type { TabsProps } from "antd";

type TabBarProps = Parameters<NonNullable<TabsProps["renderTabBar"]>>[0];
const sections = [
  ["foundations", "Foundations"],
  ["components", "Core components"],
  ["financial", "Financial UI"],
  ["documentation", "Documentation"],
] as const;

/** Keep Ant panels/state; give the fixed showcase sections a native scrollable tablist. */
export function ShowcaseTabBar({ id, activeKey, onTabClick }: TabBarProps) {
  return (
    <div
      className="showcase-tabbar"
      role="tablist"
      aria-label="Design system sections"
      aria-orientation="horizontal"
    >
      {sections.map(([key, label], index) => (
        <button
          key={key}
          type="button"
          role="tab"
          id={`${id}-tab-${key}`}
          aria-controls={`${id}-panel-${key}`}
          aria-selected={activeKey === key}
          tabIndex={activeKey === key ? 0 : -1}
          onClick={(event) => onTabClick(key, event)}
          onKeyDown={(event) => {
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? sections.length - 1
                  : event.key === "ArrowRight"
                    ? (index + 1) % sections.length
                    : event.key === "ArrowLeft"
                      ? (index + sections.length - 1) % sections.length
                      : undefined;
            if (next === undefined) return;
            event.preventDefault();
            const nextKey = sections[next][0];
            onTabClick(nextKey, event);
            document.getElementById(`${id}-tab-${nextKey}`)?.focus();
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
