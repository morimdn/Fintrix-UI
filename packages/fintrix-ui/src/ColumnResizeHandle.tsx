import { useRef } from "react";
export interface ColumnResizeHandleProps {
  label: string;
  value: number;
  onChange: (width: number) => void;
  min?: number;
  max?: number;
}
/** Pointer capture keeps dragging local; key events never reach the sortable header. */
export function ColumnResizeHandle({
  label,
  value,
  onChange,
  min = 120,
  max = 380,
}: ColumnResizeHandleProps) {
  const drag = useRef<{ x: number; width: number } | null>(null);
  const clamp = (width: number) =>
    Math.round(Math.max(min, Math.min(max, width)));
  return (
    <span
      className="column-resize-handle"
      role="slider"
      tabIndex={0}
      aria-label={`Resize ${label} column`}
      aria-orientation="horizontal"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} pixels`}
      title="Drag column edge or use left and right arrow keys"
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        drag.current = { x: e.clientX, width: value };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        e.stopPropagation();
        onChange(clamp(drag.current.width + e.clientX - drag.current.x));
      }}
      onPointerUp={(e) => {
        if (!drag.current) return;
        e.stopPropagation();
        drag.current = null;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
      onLostPointerCapture={() => {
        drag.current = null;
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
        const delta = e.shiftKey ? 20 : 10;
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
          e.preventDefault();
          onChange(
            clamp(
              e.key === "Home"
                ? min
                : e.key === "End"
                  ? max
                  : value + (e.key === "ArrowRight" ? delta : -delta),
            ),
          );
        }
      }}
    />
  );
}

export function ResizableHeaderCell({
  children,
  resize,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  resize?: ColumnResizeHandleProps;
}) {
  return (
    <th {...props}>
      {children}
      {resize && <ColumnResizeHandle {...resize} />}
    </th>
  );
}
