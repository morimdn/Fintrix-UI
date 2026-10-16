import { useState, type Key } from "react";
import {
  Checkbox,
  CurrencyAmount,
  DataGrid,
  type DataGridProps,
} from "fintrix-ui-preview";

type Account = {
  id: string;
  name: string;
  currency: string;
  balance: string;
  note: string;
};
const rows: Account[] = [
  {
    id: "a",
    name: "Operating",
    currency: "USD",
    balance: "12500.25",
    note: "Synthetic",
  },
  {
    id: "b",
    name: "Reserve",
    currency: "EUR",
    balance: "8200.50",
    note: "Synthetic",
  },
];
const columns: DataGridProps<Account>["columns"] = [
  {
    key: "name",
    title: "Account",
    dataIndex: "name",
    fixed: "left",
    width: 220,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    key: "currency",
    title: "Currency",
    dataIndex: "currency",
    filters: [
      { text: "USD", value: "USD" },
      { text: "EUR", value: "EUR" },
    ],
    onFilter: (value, row) => row.currency === value,
  },
  {
    key: "balance",
    title: "Balance",
    align: "right",
    render: (_, row) => (
      <CurrencyAmount value={row.balance} currency={row.currency} />
    ),
  },
  { key: "note", title: "Note", dataIndex: "note" },
];
export default function AccountsGrid() {
  const [hidden, setHidden] = useState(false);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<Key[]>([]);
  const [page, setPage] = useState(1);
  return (
    <section aria-label="Synthetic accounts">
      <Checkbox
        checked={hidden}
        onChange={(event) => setHidden(event.target.checked)}
      >
        Hide note column
      </Checkbox>
      <DataGrid<Account>
        rowKey="id"
        columns={columns}
        dataSource={rows}
        hiddenColumnKeys={hidden ? ["note"] : []}
        columnWidths={widths}
        onColumnWidthChange={(key, width) =>
          setWidths((previous) => ({ ...previous, [String(key)]: width }))
        }
        rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
        pagination={{
          current: page,
          pageSize: 1,
          onChange: setPage,
          showSizeChanger: false,
        }}
        scroll={{ x: 850 }}
      />
    </section>
  );
}
