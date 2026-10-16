import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const target = mkdtempSync(resolve(tmpdir(), "fintrix-consumer-"));
cpSync(resolve(root, "examples/consumer-app"), target, {
  recursive: true,
  filter: (path) => !path.includes("node_modules") && !path.includes("/dist"),
});
execFileSync("npm", ["pack", "--pack-destination", target], {
  cwd: resolve(root, "packages/fintrix-ui"),
  stdio: "inherit",
});
execFileSync(
  "npm",
  ["install", "--ignore-scripts", "--no-audit", "--no-fund"],
  { cwd: target, stdio: "inherit" },
);
execFileSync("npm", ["run", "build"], { cwd: target, stdio: "inherit" });
writeFileSync(resolve(root, ".consumer-path"), target);
console.log(`Packed consumer validated outside the workspace: ${target}`);
