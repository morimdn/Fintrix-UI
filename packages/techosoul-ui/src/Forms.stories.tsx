import { useState } from "react";
import { Form, Input, Button, RangeController } from "./components";
export default { title: "Core/Forms", component: Input, tags: ["autodocs"] };
export const Default = {
  render: () => (
    <Form layout="vertical" onFinish={() => {}}>
      <Form.Item
        label="Account reference"
        name="reference"
        rules={[{ required: true, message: "Enter an account reference" }]}
      >
        <Input />
      </Form.Item>
      <Button htmlType="submit">Validate</Button>
    </Form>
  ),
};
export const Error = {
  render: () => (
    <Form layout="vertical">
      <Form.Item
        label="Email"
        validateStatus="error"
        help="Enter a valid email address"
      >
        <Input aria-invalid="true" defaultValue="alex@" />
      </Form.Item>
    </Form>
  ),
};
export const Disabled = {
  render: () => (
    <Input aria-label="Assigned reference" value="DEMO-001" disabled />
  ),
};
export const Range = {
  render: function Range() {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <RangeController
        label="Allocation"
        value={value}
        onChange={setValue}
        max={100}
      />
    );
  },
};
export const Dark = { ...Default, globals: { mode: "dark" } };
export const Compact = { ...Default, globals: { density: "compact" } };
