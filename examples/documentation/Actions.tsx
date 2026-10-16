import { useState } from "react";
import { Download } from "lucide-react";
import { Button, ButtonGroup, IconButton } from "fintrix-ui";

export default function Actions() {
  const [status, setStatus] = useState("No action selected");
  return (
    <section aria-label="Account actions">
      <ButtonGroup label="Report actions">
        <Button type="primary" onClick={() => setStatus("Report requested")}>
          Create report
        </Button>
        <Button onClick={() => setStatus("Changes discarded")}>Cancel</Button>
        <Button type="text" onClick={() => setStatus("Help selected")}>
          Help
        </Button>
        <IconButton
          label="Download report"
          icon={<Download size={20} />}
          iconTone="primary"
          onClick={() => setStatus("Demo download selected")}
        />
      </ButtonGroup>
      <p role="status">{status}</p>
    </section>
  );
}
