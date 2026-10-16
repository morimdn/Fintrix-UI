import { execFileSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "node:fs";
import { gzipSync } from "node:zlib";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const target = mkdtempSync(resolve(tmpdir(), "fintrix-consumer-"));
cpSync(resolve(root, "examples/consumer-app"), target, {
  recursive: true,
  filter: (path) => !path.includes("node_modules") && !path.includes("/dist"),
});
// The exact source displayed by the public docs is compiled against the tarball.
cpSync(
  resolve(root, "examples/documentation"),
  resolve(target, "src/documentation"),
  { recursive: true },
);
execFileSync("npm", ["pack", "--pack-destination", target], {
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
execFileSync(
  "npm",
  ["install", "--ignore-scripts", "--no-audit", "--no-fund"],
  { cwd: target, stdio: "inherit" },
);
execFileSync("npm", ["run", "build"], { cwd: target, stdio: "inherit" });
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
