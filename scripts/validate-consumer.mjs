import { runNpm } from "./run-npm.mjs";
import { execFileSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  lstatSync,
} from "node:fs";
import { gzipSync } from "node:zlib";
import { tmpdir } from "node:os";
import { resolve, sep } from "node:path";
const root = resolve(import.meta.dirname, "..");
const target = mkdtempSync(resolve(tmpdir(), "fintrix-consumer-"));
cpSync(resolve(root, "examples/consumer-app"), target, {
  recursive: true,
  filter: (path) =>
    !path.split(sep).some((part) => ["node_modules", "dist"].includes(part)),
});
// The exact source displayed by the public docs is compiled against the tarball.
cpSync(
  resolve(root, "examples/documentation"),
  resolve(target, "src/documentation"),
  { recursive: true },
);
runNpm(["pack", "--pack-destination", target], {
  cwd: resolve(root, "packages/fintrix-ui"),
  stdio: "inherit",
});
const manifestPath = resolve(target, "package.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const react = process.env.CONSUMER_REACT || "19.3.1";
manifest.dependencies.react = react;
manifest.dependencies["react-dom"] = react;
manifest.dependencies.antd = process.env.CONSUMER_ANTD || "6.6.6";
manifest.devDependencies["@types/react"] = react.startsWith("18.")
  ? "^18.3.0"
  : "19.3.0";
manifest.devDependencies["@types/react-dom"] = react.startsWith("18.")
  ? "^18.3.0"
  : "19.3.0";
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
runNpm(["install", "--ignore-scripts", "--no-audit", "--no-fund"], {
  cwd: target,
  stdio: "inherit",
});
if (lstatSync(resolve(target, "node_modules/fintrix-ui")).isSymbolicLink())
  throw new Error("Consumer must install the tarball, not a workspace link");
execFileSync(
  process.execPath,
  [
    "--input-type=module",
    "-e",
    `
  import assert from 'node:assert/strict';
  import { getTokens } from 'fintrix-ui/tokens';
  import tokens from 'fintrix-ui/tokens.json' with { type: 'json' };
  for (const mode of ['light','dark']) for (const density of ['comfortable','compact']) {
    assert.ok(getTokens(mode,density)); assert.ok(tokens[mode][density]);
  }
`,
  ],
  { cwd: target, stdio: "inherit" },
);
runNpm(["run", "build"], { cwd: target, stdio: "inherit" });
execFileSync(process.execPath, [resolve(root, "scripts/package-metrics.mjs")], {
  cwd: target,
  env: { ...process.env, CONSUMER_PATH: target },
  stdio: "inherit",
});
writeFileSync(resolve(root, ".consumer-path"), target);
console.log(`Packed consumer validated outside the workspace: ${target}`);

const assets = readdirSync(resolve(target, "dist/assets"))
  .filter((name) => /\.(js|css)$/.test(name))
  .map((name) => {
    const data = readFileSync(resolve(target, "dist/assets", name));
    return { name, bytes: data.length, gzipBytes: gzipSync(data).length };
  });
const versions = Object.fromEntries(
  ["react", "react-dom", "antd", "lucide-react"].map((name) => [
    name,
    JSON.parse(
      readFileSync(
        resolve(target, "node_modules", name, "package.json"),
        "utf8",
      ),
    ).version,
  ]),
);
writeFileSync(
  resolve(root, `docs/consumer-${versions.react}-antd-${versions.antd}.json`),
  JSON.stringify(
    {
      versions,
      productionBuild: "passed",
      assets,
      notes:
        "Independent tarball install; application assets include peers. Browser checks run separately with test:consumer.",
    },
    null,
    2,
  ) + "\n",
);
