import { runNpm } from "./run-npm.mjs";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const cwd = resolve(root, "packages/fintrix-ui");
const temp = mkdtempSync(resolve(tmpdir(), "fintrix-inspect-"));
try {
  const [dry] = JSON.parse(
    runNpm(["pack", "--dry-run", "--json"], {
      cwd,
      encoding: "utf8",
    }),
  );
  const [packed] = JSON.parse(
    runNpm(["pack", "--json", "--pack-destination", temp], {
      cwd,
      encoding: "utf8",
    }),
  );
  assert.deepEqual(packed.files, dry.files);
  execFileSync("tar", ["-xzf", resolve(temp, packed.filename), "-C", temp]);
  const dir = resolve(temp, "package");
  const manifest = JSON.parse(readFileSync(resolve(dir, "package.json")));
  assert.equal(manifest.name, "fintrix-ui");
  assert.equal(manifest.version, "0.3.0");
  assert.equal(manifest.license, "MIT");
  assert.equal(manifest.type, "module");
  assert.ok(manifest.dependencies["lucide-react"]);
  assert.deepEqual(manifest.sideEffects, ["**/*.css"]);
  for (const peer of ["react", "react-dom", "antd"])
    assert.ok(manifest.peerDependencies[peer]);
  function checkExports(value) {
    if (typeof value === "string")
      assert.ok(existsSync(resolve(dir, value)), `Missing export: ${value}`);
    else Object.values(value).forEach(checkExports);
  }
  checkExports(manifest.exports);
  for (const name of [
    "README.md",
    "LICENSE",
    "THIRD_PARTY_NOTICES.md",
    "dist/INTER-LICENSE.txt",
    "dist/LUCIDE-LICENSE.txt",
  ])
    assert.ok(existsSync(resolve(dir, name)), name);
  for (const { path } of packed.files) {
    assert.match(
      path,
      /^(dist\/|package\.json$|README\.md$|LICENSE$|THIRD_PARTY_NOTICES\.md$)/,
    );
    assert.doesNotMatch(path, /(^|\/)(node_modules|src|tests|\.env)(\/|$)/);
    if (/\.(js|ts)$/.test(path))
      assert.doesNotMatch(
        readFileSync(resolve(dir, path), "utf8"),
        /fintrix-ui-preview|workspace:|\/workspace\//,
      );
  }
  const css = readFileSync(resolve(dir, "dist/fonts.css"), "utf8");
  for (const match of css.matchAll(/\.\/files\/([^)'"\s]+)/g))
    assert.ok(existsSync(resolve(dir, "dist/files", match[1])));
  const tokens = JSON.parse(readFileSync(resolve(dir, "dist/tokens.json")));
  for (const mode of ["light", "dark"])
    for (const density of ["comfortable", "compact"])
      assert.ok(tokens[mode][density]);
  runNpm(
    [
      "publish",
      resolve(temp, packed.filename),
      "--dry-run",
      "--ignore-scripts",
      "--access",
      "public",
    ],
    { cwd: temp, stdio: "inherit" },
  );
  console.log(
    JSON.stringify(
      {
        name: packed.name,
        version: packed.version,
        files: packed.files.length,
        bytes: packed.size,
        integrity: packed.integrity,
        private: manifest.private,
        checks: "passed",
      },
      null,
      2,
    ),
  );
} finally {
  rmSync(temp, { recursive: true, force: true });
}
