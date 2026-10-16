import { useState } from "react";
import {
  Button,
  Drawer,
  Input,
  Modal,
  Popover,
  Tooltip,
} from "fintrix-ui-preview";

export default function Overlays() {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Button onClick={() => setModal(true)}>Review restriction</Button>
      <Modal
        title="Restrict demo account?"
        open={modal}
        onCancel={() => setModal(false)}
        onOk={() => setModal(false)}
        okText="Confirm restriction"
        okButtonProps={{ danger: true }}
      >
        <p>
          This example closes the dialog; it does not change account access.
        </p>
      </Modal>
      <Button onClick={() => setDrawer(true)}>View client details</Button>
      <Drawer
        title="Demo client details"
        open={drawer}
        onClose={() => setDrawer(false)}
        size={420}
      >
        <label>
          Client note
          <Input.TextArea />
        </label>
      </Drawer>
      <Tooltip title="Uses synthetic records">
        <Button>About this report</Button>
      </Tooltip>
      <Popover
        title="Risk review"
        trigger="click"
        content={<p>Medium risk requires analyst review.</p>}
      >
        <Button>Explain risk</Button>
      </Popover>
    </>
  );
}
