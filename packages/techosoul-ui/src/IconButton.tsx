import { Button, Tooltip, type ButtonProps } from "antd";
import { useState, type ReactNode } from "react";
import type { IconTone } from "./TechosoulIcon";
export function IconButton({
  label,
  icon,
  iconTone,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: Omit<ButtonProps, "children"> & {
  label: string;
  icon: ReactNode;
  iconTone?: IconTone;
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  return (
    <Tooltip
      title={label}
      trigger={["hover", "focus"]}
      open={!dismissed && (open || focused)}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) setDismissed(false);
      }}
    >
      <Button
        aria-label={label}
        icon={
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              color: iconTone ? `var(--techosoul-${iconTone})` : undefined,
            }}
          >
            {icon}
          </span>
        }
        {...props}
        onFocus={(event) => {
          setFocused(true);
          setDismissed(false);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          setOpen(event.currentTarget.matches(":hover"));
          onBlur?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setDismissed(true);
            setOpen(false);
          }
          onKeyDown?.(event);
        }}
      />
    </Tooltip>
  );
}
