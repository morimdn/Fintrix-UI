import { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  RangeController,
  Select,
  Switch,
} from "@techosoul/ui";

export default function Preferences() {
  const [range, setRange] = useState<[number, number]>([20, 80]);
  const [saved, setSaved] = useState(false);
  return (
    <Form
      layout="vertical"
      onFinish={() => setSaved(true)}
      initialValues={{ alerts: false, markets: ["EU"], cadence: "daily" }}
    >
      <Form.Item
        name="reference"
        label="Account reference"
        rules={[{ required: true, message: "Enter an account reference" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="notes" label="Review notes">
        <Input.TextArea rows={3} maxLength={500} showCount />
      </Form.Item>
      <Form.Item name="markets" label="Markets">
        <Select
          mode="multiple"
          options={[
            { value: "EU", label: "Europe" },
            { value: "US", label: "United States" },
          ]}
        />
      </Form.Item>
      <Form.Item name="cadence" label="Report cadence">
        <Radio.Group
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
          ]}
        />
      </Form.Item>
      <Form.Item name="alerts" label="Email alerts" valuePropName="checked">
        <Switch aria-label="Email alerts" />
      </Form.Item>
      <Form.Item name="includeInactive" valuePropName="checked">
        <Checkbox>Include inactive accounts</Checkbox>
      </Form.Item>
      <RangeController
        label="Illustrative score"
        value={range}
        onChange={setRange}
        max={100}
      />
      <Button htmlType="submit" type="primary">
        Save preferences
      </Button>
      {saved && <p role="status">Preferences saved in this example</p>}
    </Form>
  );
}
