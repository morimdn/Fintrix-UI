import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
for (const [document, marker, source] of [
  ["docs/getting-started.md", "onboarding", "App"],
  ["docs/customization.md", "theme", "App"],
  ["docs/customization.md", "icons", "Icons"],
]) {
  const path = resolve(root, document);
  const current = readFileSync(path, "utf8");
  const example = readFileSync(
    resolve(root, `examples/documentation/${source}.tsx`),
    "utf8",
  ).trim();
  const pattern = new RegExp(
    `<!-- ${marker}:start -->[\\s\\S]*?<!-- ${marker}:end -->`,
  );
  if (!pattern.test(current))
    throw new Error(`Missing ${marker} markers in ${document}`);
  const next = current.replace(
    pattern,
    `<!-- ${marker}:start -->\n\n\`\`\`tsx\n${example}\n\`\`\`\n\n<!-- ${marker}:end -->`,
  );
  if (process.argv.includes("--check")) {
    if (current !== next)
      throw new Error(`${document} is stale. Run npm run docs:sync.`);
  } else writeFileSync(path, next);
}
