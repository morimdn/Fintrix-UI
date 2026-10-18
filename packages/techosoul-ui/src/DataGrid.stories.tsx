import { useState } from "react";
import { DataGrid } from "./DataGrid";
export default {
  title: "Data/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
};
const rows = Array.from({ length: 100 }, (_, id) => ({
  id,
  name: `Synthetic account ${id}`,
  currency: id % 2 ? "EUR" : "USD",
}));
export const Default = {
  render: function Example() {
    const [widths, setWidths] = useState<Record<string, number>>({});
    return (
      <DataGrid
        dataSource={rows}
        rowSelection={{}}
        columnWidths={widths}
        onColumnWidthChange={(key, width) =>
          setWidths((previous) => ({ ...previous, [String(key)]: width }))
        }
        columns={[
          {
            key: "name",
            title: "Account",
            dataIndex: "name",
            fixed: "left",
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            key: "currency",
            title: "Currency",
            dataIndex: "currency",
            filters: [{ text: "USD", value: "USD" }],
            onFilter: (value, row) => row.currency === value,
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
    );
  },
};
export const Dark = { ...Default, globals: { mode: "dark" } };
export const Compact = { ...Default, globals: { density: "compact" } };
export const Loading = {
  render: () => (
    <DataGrid
      loading
      columns={[{ key: "name", title: "Account", dataIndex: "name" }]}
      dataSource={[]}
    />
  ),
};
export const Empty = {
  render: () => (
    <DataGrid
      columns={[{ key: "name", title: "Account", dataIndex: "name" }]}
      dataSource={[]}
    />
  ),
};
