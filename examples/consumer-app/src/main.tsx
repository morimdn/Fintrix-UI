import { useState } from "react";
import { Wallet } from "lucide-react";
import { createRoot } from "react-dom/client";
import {
  FintrixProvider,
  useFintrixTheme,
  Button,
  Form,
  Input,
  DataGrid,
  Modal,
  Drawer,
  WalletBalanceCard,
  PnLIndicator,
  KYCStatus,
} from "fintrix-ui-preview";
import "fintrix-ui-preview/styles.css";
import "fintrix-ui-preview/fonts.css";
function Consumer() {
  const [dialog, setDialog] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { mode, setMode, density, setDensity } = useFintrixTheme();
  return (
    <main style={{ padding: 24 }}>
      <h1>Independent consumer</h1>
      <Button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        Theme: {mode}
      </Button>
      <Button
        onClick={() =>
          setDensity(density === "comfortable" ? "compact" : "comfortable")
        }
      >
        Density: {density}
      </Button>
      <Form
        layout="vertical"
        onFinish={() => window.alert("Synthetic form submitted")}
      >
        <Form.Item
          name="reference"
          label="Account reference"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">Save reference</Button>
      </Form>
      <WalletBalanceCard
        icon={<Wallet />}
        iconTone="primary"
        value="9007199254740993.25"
        currency="USD"
        detail={<PnLIndicator value="-24.50" currency="USD" />}
      />
      <Button onClick={() => setDialog(true)}>Open dialog</Button>
      <Modal
        title="Consumer dialog"
        open={dialog}
        onCancel={() => setDialog(false)}
        onOk={() => setDialog(false)}
      >
        <Input aria-label="Dialog note" />
      </Modal>
      <Button onClick={() => setDrawer(true)}>Open drawer</Button>
      <Drawer
        title="Consumer drawer"
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <Input aria-label="Drawer note" />
      </Drawer>
      <DataGrid
        rowKey="id"
        columns={[
          {
            key: "account",
            title: "Account",
            dataIndex: "account",
            fixed: "left",
            sorter: (a, b) => a.account.localeCompare(b.account),
          },
          {
            key: "currency",
            title: "Currency",
            dataIndex: "currency",
            filters: [{ text: "USD", value: "USD" }],
            onFilter: (value, row) => row.currency === value,
          },
        ]}
        dataSource={[
          { id: "1", account: "Operating", currency: "USD" },
          { id: "2", account: "Reserve", currency: "EUR" },
        ]}
        scroll={{ x: 600 }}
        pagination={{ pageSize: 1 }}
      />
      <KYCStatus status="verified" />
    </main>
  );
}
createRoot(document.getElementById("root")!).render(
  <FintrixProvider
    colorOverrides={{
      light: { primary: "#5941a9" },
      dark: { primary: "#c4b5fd" },
    }}
  >
    <Consumer />
  </FintrixProvider>,
);
