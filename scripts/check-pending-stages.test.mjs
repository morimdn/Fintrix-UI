import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

for (const [label, stdout, exitCode, accepted] of [
  ["authenticated empty queue", "[]", 0, true],
  [
    "pending target version",
    '[{"name":"@techosoul/ui","version":"0.3.0"}]',
    0,
    false,
  ],
  [
    "pending other version",
    '[{"name":"@techosoul/ui","version":"0.2.0"}]',
    0,
    false,
  ],
  ["authentication failure", '{"error":{"code":"E401"}}', 1, false],
  ["permission failure", '{"error":{"code":"E403"}}', 1, false],
  ["404 is not an empty queue", '{"error":{"code":"E404"}}', 1, false],
  ["registry outage", '{"error":{"code":"E503"}}', 1, false],
  ["failed command with empty array", "[]", 1, false],
  ["unexpected response shape", '{"items":[]}', 0, false],
  ["invalid JSON", "not JSON", 0, false],
  ["empty output", "", 0, false],
]) {
  test(`pending-stage gate: ${label}`, () => {
    const dir = mkdtempSync(resolve(tmpdir(), "techosoul-stage-test-"));
    try {
      writeFileSync(
        resolve(dir, "npm-cli.cjs"),
        `
        require("node:assert/strict").deepEqual(process.argv.slice(2),
          ["stage", "list", "@techosoul/ui", "--json", "--registry=https://registry.npmjs.org/"]);
        process.stdout.write(${JSON.stringify(stdout)});
        process.exit(${exitCode});
      `,
      );
      const result = spawnSync(
        process.execPath,
        [resolve(import.meta.dirname, "check-pending-stages.mjs")],
        {
          env: { ...process.env, npm_execpath: resolve(dir, "npm-cli.cjs") },
          encoding: "utf8",
        },
      );
      assert.equal(result.status === 0, accepted, result.stderr);
      if (accepted)
        assert.match(
          result.stdout,
          /^no pending stages for @techosoul\/ui\s*$/,
        );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
