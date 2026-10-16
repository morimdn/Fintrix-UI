import {
  Button,
  Card,
  Tag,
  Tooltip,
  Slider,
  InputNumber,
  Flex,
  type ButtonProps,
  type TableProps,
  Table,
  Modal,
  type ModalProps,
} from "antd";
import { useId, type ReactNode } from "react";
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
      <span aria-hidden="true">●</span> {label}
    </Tag>
  );
}
export function MetricCard({
  label,
  value,
  change,
  icon,
  detail,
}: {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  detail: string;
}) {
  return (
    <Card className="metric">
      <div className="metric-label">
        {label}
        <span className="metric-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <div className="metric-detail">
        <span>{change}</span> {detail}
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
export function DataTable<T extends object>(props: TableProps<T>) {
  return (
    <Table<T>
      rowKey="id"
      scroll={{ x: foundations.layout.tableMin }}
      {...props}
    />
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
