import { assertDistributableFiles } from "./package-content-guard.mjs";
import { runNpm } from "./run-npm.mjs";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  existsSync,
  copyFileSync,
  constants,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
if (process.argv.length > 3)
  throw new Error("Usage: node scripts/inspect-package.mjs [output.tgz]");
const output = process.argv[2] && resolve(process.argv[2]);
const root = resolve(import.meta.dirname, "..");
const cwd = resolve(root, "packages/techosoul-ui");
const temp = mkdtempSync(resolve(tmpdir(), "techosoul-inspect-"));
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
  assertDistributableFiles(packed.files.map(({ path }) => path));
  assert.equal(packed.filename, "techosoul-ui-0.3.0.tgz");
  assert.equal(
    JSON.parse(readFileSync(resolve(root, "package.json"))).private,
    true,
  );
  execFileSync("tar", ["-xzf", resolve(temp, packed.filename), "-C", temp]);
  const dir = resolve(temp, "package");
  const manifest = JSON.parse(readFileSync(resolve(dir, "package.json")));
  assert.equal(manifest.name, "@techosoul/ui");
  assert.equal(manifest.version, "0.3.0");
  assert.equal(manifest.license, "MIT");
  assert.equal(manifest.type, "module");
  assert.deepEqual(manifest.publishConfig, {
    access: "public",
    registry: "https://registry.npmjs.org/",
  });
  assert.deepEqual(manifest.repository, {
    type: "git",
    url: "git+https://github.com/morimdn/Techosoul-UI.git",
    directory: "packages/techosoul-ui",
  });
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
    if (/\.(js|ts|css)$/.test(path))
      assert.doesNotMatch(
        readFileSync(resolve(dir, path), "utf8"),
        /fintrix|Fintrix|--fx-|workspace:|\/workspace\//,
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
      "--registry=https://registry.npmjs.org/",
    ],
    { cwd: temp, stdio: "inherit" },
  );
  // Save only after every inspection and dry-run succeeds; never replace an archive.
  if (output)
    copyFileSync(
      resolve(temp, packed.filename),
      output,
      constants.COPYFILE_EXCL,
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
