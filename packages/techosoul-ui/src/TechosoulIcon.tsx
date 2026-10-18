import type { LucideIcon } from "lucide-react";
export type IconTone =
  "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export interface TechosoulIconProps {
  icon: LucideIcon;
  tone?: IconTone;
  size?: number;
  strokeWidth?: number;
  /** Omit for decorative icons. Label the containing button for actions. */
  label?: string;
  className?: string;
}
export function TechosoulIcon({
  icon: Icon,
  tone = "neutral",
  size = 20,
  strokeWidth = 2,
  label,
  className,
}: TechosoulIconProps) {
  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      style={{ color: `var(--techosoul-${tone})` }}
      focusable="false"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
