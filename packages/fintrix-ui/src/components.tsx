import type { IconTone } from "./FintrixIcon";
import {
  Button,
  Card,
  Tag,
  Slider,
  InputNumber,
  Flex,
  type TableProps,
  Table,
  Modal,
  type ModalProps,
} from "antd";
import { useId, useRef, useLayoutEffect, type ReactNode } from "react";
import { foundations } from "./tokens";
export {
  Button,
  Input,
  Select,
  Tag as Chip,
  Tooltip,
  Popover,
  Space,
  Form,
  Modal,
} from "antd";
export { IconButton } from "./IconButton";
export function ButtonGroup({
  children,
  label = "Related actions",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="fx-button-group" role="group" aria-label={label}>
      {children}
    </div>
  );
}
export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";
export function StatusIndicator({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: StatusTone;
}) {
  return (
    <Tag variant="filled" className={`fx-status tone-${tone}`}>
      <i aria-hidden="true" /> {label}
    </Tag>
  );
}
export function MetricCard({
  label,
  value,
  change,
  icon,
  iconTone,
  detail,
  tone = "positive",
}: {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  iconTone?: IconTone;
  detail: string;
  tone?: "positive" | "negative" | "neutral";
}) {
  return (
    <Card className="metric">
      <div className="metric-label">
        {label}
        <span
          className="metric-icon"
          aria-hidden="true"
          style={{ color: iconTone ? `var(--fx-${iconTone})` : undefined }}
        >
          {icon}
        </span>
      </div>
      <strong>{value}</strong>
      <div className="metric-detail">
        <span className={`financial-${tone}`}>{change}</span> {detail}
      </div>
      <svg className="sparkline" viewBox="0 0 130 32" aria-hidden="true">
        <path d="M0 27 L12 22 L22 25 L34 12 L46 17 L58 10 L70 15 L82 6 L94 9 L106 2 L118 5 L130 0" />
      </svg>
    </Card>
  );
}
export function RangeController({
  label,
  value,
  onChange,
  max = 100000,
}: {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  max?: number;
}) {
  const labelId = useId();
  return (
    <div className="range-controller">
      <span id={labelId}>{label}</span>
      <Slider
        aria-labelledby={labelId}
        range
        ariaLabelForHandle={[`${label} minimum`, `${label} maximum`]}
        value={value}
        max={max}
        onChange={(v) => onChange(v as [number, number])}
      />
      <Flex gap={8}>
        <InputNumber
          aria-label={`${label} minimum`}
          min={0}
          max={value[1]}
          value={value[0]}
          onChange={(v) => onChange([v ?? 0, value[1]])}
        />
        <InputNumber
          aria-label={`${label} maximum`}
          min={value[0]}
          max={max}
          value={value[1]}
          onChange={(v) => onChange([value[0], v ?? max])}
        />
      </Flex>
    </div>
  );
}
function alignTableColumns<T extends object>(
  columns: TableProps<T>["columns"],
): TableProps<T>["columns"] {
  return columns?.map((column) => ({
    ...column,
    className: [column.className, column.align === "right" && "fx-cell-right"]
      .filter(Boolean)
      .join(" "),
    ...("children" in column && {
      children: alignTableColumns(column.children)!,
    }),
  }));
}
export function DataTable<T extends object>(props: TableProps<T>) {
  const host = useRef<HTMLDivElement>(null);
  // Ant Design 6 clones selection titles into an aria-hidden measurement row.
  // Inert prevents those cloned controls from entering the keyboard focus order.
  useLayoutEffect(() => {
    host.current
      ?.querySelectorAll<HTMLElement>(".ant-table-measure-row")
      .forEach((row) => {
        row.inert = true;
      });
  });
  return (
    <div className="fx-data-table" ref={host}>
      <Table<T>
        rowKey="id"
        scroll={{ x: foundations.layout.tableMin }}
        {...props}
        columns={alignTableColumns(props.columns)}
      />
    </div>
  );
}

/** Inline modal keeps portal content inside the scoped theme. */
export function FormModal(props: ModalProps) {
  return (
    <Modal
      getContainer={false}
      width={foundations.layout.modal}
      destroyOnHidden
      {...props}
    />
  );
}
export type {
  ButtonProps,
  TableProps,
  ModalProps,
  InputProps,
  SelectProps,
} from "antd";
export {
  Checkbox,
  Radio,
  Switch,
  Slider,
  InputNumber,
  DatePicker,
  TimePicker,
  Drawer,
  Tabs,
  Breadcrumb,
  Pagination,
  Progress,
  Alert,
  Skeleton,
  Empty,
  Menu,
  Dropdown,
  notification,
  message,
  Card,
} from "antd";
