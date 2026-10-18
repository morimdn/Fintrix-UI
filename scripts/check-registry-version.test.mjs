import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
for (const [label, payload, exitCode, accepted] of [
  ["absent version", { error: { code: "E404" } }, 1, true],
  ["existing version", "0.3.0", 0, false],
  ["authentication denied", { error: { code: "E403" } }, 1, false],
  ["registry outage", { error: { code: "E503" } }, 1, false],
  ["malformed response", null, 1, false],
]) {
  test(`registry gate: ${label}`, () => {
    const dir = mkdtempSync(resolve(tmpdir(), "techosoul-registry-test-"));
    try {
      writeFileSync(
        resolve(dir, "npm-cli.cjs"),
        `require("node:assert/strict").deepEqual(process.argv.slice(2), ["view", "@techosoul/ui@0.3.0", "version", "--json", "--registry=https://registry.npmjs.org/"]); console.log(${JSON.stringify(JSON.stringify(payload))}); process.exit(${exitCode});\n`,
        { mode: 0o755 },
      );
      const result = spawnSync(
        process.execPath,
        [resolve(import.meta.dirname, "check-registry-version.mjs")],
        {
          env: { ...process.env, npm_execpath: resolve(dir, "npm-cli.cjs") },
          encoding: "utf8",
        },
      );
      assert.equal(result.status === 0, accepted, result.stderr);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
