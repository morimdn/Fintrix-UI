import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { assertDistributableFiles } from "./package-content-guard.mjs";

// Build outputs are separately inspected in CI. Derive the unit fixture from
// public source modules, not the guard's allowlist.
const modules = readdirSync(
  resolve(import.meta.dirname, "../packages/techosoul-ui/src"),
)
  .filter(
    (name) => /\.(ts|tsx)$/.test(name) && !/\.(test|stories)\./.test(name),
  )
  .flatMap((name) =>
    [`.js`, `.d.ts`].map((ext) => `dist/${name.replace(/\.(ts|tsx)$/, ext)}`),
  );
const files = [
  ...modules,
  "package.json",
  "README.md",
  "LICENSE",
  "THIRD_PARTY_NOTICES.md",
  "dist/INTER-LICENSE.txt",
  "dist/LUCIDE-LICENSE.txt",
  "dist/styles.css",
  "dist/styles.css.d.ts",
  "dist/fonts.css",
  "dist/fonts.css.d.ts",
  "dist/tokens.json",
  ...[
    "cyrillic-ext",
    "cyrillic",
    "greek-ext",
    "greek",
    "latin-ext",
    "latin",
    "vietnamese",
  ].map((subset) => `dist/files/inter-${subset}-wght-normal.woff2`),
];
test("distributable files: complete intended package", () =>
  assert.doesNotThrow(() => assertDistributableFiles(files)));
for (const extra of [
  "dist/.env",
  "dist/debug.json",
  "dist/test.js",
  "dist/index.js.map",
  "src/index.ts",
  ".npmrc",
  "dist/files/secret.txt",
])
  test(`distributable files: reject ${extra}`, () =>
    assert.throws(() => assertDistributableFiles([...files, extra])));
for (const missing of [
  "LICENSE",
  "dist/INTER-LICENSE.txt",
  "dist/index.d.ts",
  "dist/styles.css",
  "dist/tokens.json",
  "dist/files/inter-latin-wght-normal.woff2",
])
  test(`distributable files: require ${missing}`, () =>
    assert.throws(() =>
      assertDistributableFiles(files.filter((file) => file !== missing)),
    ));
