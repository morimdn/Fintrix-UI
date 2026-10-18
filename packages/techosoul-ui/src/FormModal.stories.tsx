import { useState } from "react";
import { Button, FormModal, Input } from "./components";
export default {
  title: "Feedback/FormModal",
  component: FormModal,
  tags: ["autodocs"],
};
export const Default = {
  render: function Example() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open focused decision</Button>
        <FormModal
          title="Review reference"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <Input aria-label="Reference" defaultValue="DEMO-001" />
        </FormModal>
      </>
    );
  },
};
export const Dark = { ...Default, globals: { mode: "dark" } };
export const Compact = { ...Default, globals: { density: "compact" } };
