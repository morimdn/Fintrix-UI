import { Button, Tooltip, type ButtonProps } from "antd";
import type { ReactNode } from "react";
export function IconButton({
  label,
  icon,
  ...props
}: Omit<ButtonProps, "children"> & { label: string; icon: ReactNode }) {
  return (
    <Tooltip title={label}>
      <Button aria-label={label} icon={icon} {...props} />
    </Tooltip>
  );
}
