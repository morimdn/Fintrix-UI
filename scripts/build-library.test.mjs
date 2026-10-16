import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";

// A real build must work without npm's platform-specific executable shims.
// CI also runs this from a checkout path containing spaces on all three OSes.
test("library builds without the tsc executable shims", () => {
  const root = resolve(import.meta.dirname, "..");
  const moved = [];
  try {
    for (const name of ["tsc", "tsc.cmd", "tsc.ps1"]) {
      const path = resolve(root, "node_modules/.bin", name);
      if (!existsSync(path)) continue;
      renameSync(path, `${path}.test-backup`);
      moved.push(path);
    }
    execFileSync(
      process.execPath,
      [resolve(root, "scripts/build-library.mjs")],
      {
        cwd: root,
        stdio: "pipe",
      },
    );
    for (const name of [
      "index.js",
      "index.d.ts",
      "tokens.json",
      "styles.css",
      "fonts.css",
      "INTER-LICENSE.txt",
      "LUCIDE-LICENSE.txt",
    ])
      assert.ok(
        existsSync(resolve(root, "packages/fintrix-ui/dist", name)),
        name,
      );
  } finally {
    for (const path of moved) renameSync(`${path}.test-backup`, path);
  }
});
