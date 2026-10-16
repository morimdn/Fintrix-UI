import { Button, Tooltip, type ButtonProps } from "antd";
import type { ReactNode } from "react";
import type { IconTone } from "./FintrixIcon";
export function IconButton({
  label,
  icon,
  iconTone,
  ...props
}: Omit<ButtonProps, "children"> & {
  label: string;
  icon: ReactNode;
  iconTone?: IconTone;
}) {
  return (
    <Tooltip title={label}>
      <Button
        aria-label={label}
        icon={
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              color: iconTone ? `var(--fx-${iconTone})` : undefined,
            }}
          >
            {icon}
          </span>
        }
        {...props}
      />
    </Tooltip>
  );
}
