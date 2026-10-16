import { useState } from "react";
import { Button } from "fintrix-ui";
export function CodeExample({
  title,
  code,
  expanded = false,
}: {
  title: string;
  code: string;
  expanded?: boolean;
}) {
  const [status, setStatus] = useState("");
  return (
    <details className="doc-code" open={expanded || undefined}>
      <summary>{title} — React / TypeScript</summary>
      <pre tabIndex={0} aria-label={`${title} source code`}>
        <code>{code}</code>
      </pre>
      <Button
        aria-label={`Copy ${title} example`}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setStatus("Copied");
          } catch {
            setStatus("Clipboard unavailable. Select and copy the code above.");
          }
        }}
      >
        {status === "Copied" ? "Copied" : "Copy React example"}
      </Button>
      <span className="doc-copy-status" role="status">
        {status}
      </span>
    </details>
  );
}
