import { useState } from "react";
import { Button } from "@techosoul/ui";
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
      <pre
        tabIndex={0}
        aria-label={`${title} source code`}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey
          )
            return;
          if (event.key === "Home" || event.key === "End") {
            // Native boundary keys can scroll an ancestor when this nested
            // region is already at its boundary. Keep focus and scrolling here.
            event.preventDefault();
            event.currentTarget.scrollTop =
              event.key === "Home" ? 0 : event.currentTarget.scrollHeight;
          }
        }}
      >
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
