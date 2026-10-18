import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
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
        existsSync(resolve(root, "packages/techosoul-ui/dist", name)),
        name,
      );
  } finally {
    for (const path of moved) renameSync(`${path}.test-backup`, path);
  }
});

test("built public API and theme variables use the Techosoul namespace", async () => {
  const root = resolve(import.meta.dirname, "..");
  const library = await import(
    pathToFileURL(resolve(root, "packages/techosoul-ui/dist/index.js"))
  );
  for (const name of [
    "TechosoulProvider",
    "TechosoulIcon",
    "useTechosoulTheme",
  ])
    assert.equal(typeof library[name], "function", name);
  assert.ok(Object.keys(library).every((name) => !/fintrix/i.test(name)));
  const css = readFileSync(
    resolve(root, "packages/techosoul-ui/dist/styles.css"),
    "utf8",
  );
  const usedVariables = [
    ...new Set(
      [...css.matchAll(/var\((--techosoul-[\w-]+)/g)].map((match) => match[1]),
    ),
  ];
  assert.ok(usedVariables.length > 0);
  assert.doesNotMatch(css, /--fx-|\.fx-/);
  for (const mode of ["light", "dark"])
    for (const density of ["comfortable", "compact"]) {
      const variables = library.cssVariables(mode, density);
      assert.ok(
        Object.keys(variables).every((name) => name.startsWith("--techosoul-")),
      );
      for (const name of usedVariables)
        assert.ok(name in variables, `Missing ${name} in ${mode}/${density}`);
    }
});
