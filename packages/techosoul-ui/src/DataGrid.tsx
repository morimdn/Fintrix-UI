import type { Key } from "react";
import type { TableProps, TableColumnType } from "antd";
import { DataTable } from "./components";
import { ResizableHeaderCell } from "./ColumnResizeHandle";
export interface DataGridProps<T extends object> extends Omit<
  TableProps<T>,
  "columns"
> {
  columns: (TableColumnType<T> & { key: Key })[];
  /** Controlled visibility; fixed columns are always retained. */
  hiddenColumnKeys?: Key[];
  columnWidths?: Record<string, number>;
  onColumnWidthChange?: (key: Key, width: number) => void;
  minColumnWidth?: number;
  maxColumnWidth?: number;
}
/** Ant Table owns sorting, filtering, selection, pagination and optional virtualization. */
export function DataGrid<T extends object>({
  columns,
  hiddenColumnKeys = [],
  columnWidths = {},
  onColumnWidthChange,
  minColumnWidth = 120,
  maxColumnWidth = 480,
  components,
  ...props
}: DataGridProps<T>) {
  const visible = columns
    .filter((column) => column.fixed || !hiddenColumnKeys.includes(column.key))
    .map((column) => {
      const width = Math.max(
        minColumnWidth,
        Math.min(
          maxColumnWidth,
          columnWidths[String(column.key)] ??
            (typeof column.width === "number" ? column.width : 180),
        ),
      );
      return {
        ...column,
        width,
        onHeaderCell: (
          col: Parameters<NonNullable<TableColumnType<T>["onHeaderCell"]>>[0],
        ) => ({
          ...column.onHeaderCell?.(col),
          ...(onColumnWidthChange && {
            resize: {
              label:
                typeof column.title === "string"
                  ? column.title
                  : String(column.key),
              value: width,
              min: minColumnWidth,
              max: maxColumnWidth,
              onChange: (next: number) => onColumnWidthChange(column.key, next),
            },
          }),
        }),
      };
    });
  return (
    <DataTable<T>
      {...props}
      columns={visible}
      components={{
        ...components,
        header: { ...components?.header, cell: ResizableHeaderCell },
      }}
    />
  );
}
