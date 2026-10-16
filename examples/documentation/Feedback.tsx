import { App } from "antd";
import {
  Alert,
  Button,
  Chip,
  Empty,
  Skeleton,
  StatusIndicator,
  Tabs,
} from "fintrix-ui-preview";

export default function Feedback() {
  // FintrixProvider includes Ant App, so contextual notifications inherit its theme.
  const { notification } = App.useApp();
  return (
    <>
      <Alert
        title="Synthetic data"
        description="These values are illustrative."
        type="info"
        showIcon
      />
      <StatusIndicator label="Review pending" tone="warning" />
      <Chip closable>Enterprise segment</Chip>
      <Button
        onClick={() =>
          notification.success({
            title: "Report ready",
            description: "Demo notification only.",
          })
        }
      >
        Show notification
      </Button>
      <Tabs
        items={[
          {
            key: "overview",
            label: "Overview",
            children: <p>Account summary</p>,
          },
          {
            key: "history",
            label: "History",
            children: <Empty description="No activity yet" />,
          },
        ]}
      />
      <div role="status" aria-label="Loading account summary">
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    </>
  );
}
