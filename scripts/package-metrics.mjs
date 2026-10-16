import { build } from "vite";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "packages/fintrix-ui/dist");
const js = readdirSync(dist)
  .filter((name) => name.endsWith(".js"))
  .map((name) => ({ name, bytes: statSync(resolve(dist, name)).size }));
const probes = {};
for (const [label, source] of Object.entries({
  tokens: 'export { getTokens } from "fintrix-ui-preview/tokens";',
  amount: 'export { CurrencyAmount } from "fintrix-ui-preview";',
})) {
  const probe = resolve(root, `.probe-${label}.js`);
  writeFileSync(probe, source);
  try {
    const result = await build({
      configFile: false,
      logLevel: "silent",
      build: {
        write: false,
        minify: true,
        lib: { entry: probe, formats: ["es"] },
        rolldownOptions: {
          external: (id) => /^(react|react-dom|antd)(\/|$)/.test(id),
        },
      },
    });
    const code = (Array.isArray(result) ? result[0] : result).output
      .filter((item) => item.type === "chunk")
      .map((item) => item.code)
      .join("\n");
    if (label === "amount" && /from\s*["']antd/.test(code))
      throw new Error("Amount-only import retained Ant Design");
    probes[label] = {
      bytes: Buffer.byteLength(code),
      gzipBytes: gzipSync(code).length,
      retainsAntDesign: /from\s*["']antd/.test(code),
    };
  } finally {
    const { unlinkSync } = await import("node:fs");
    unlinkSync(probe);
  }
}
const metrics = {
  javascriptBytes: js.reduce((n, item) => n + item.bytes, 0),
  modules: js,
  treeShakingProbes: probes,
  notes:
    "Probes bundle Fintrix only, externalizing peers. Not application bundle sizes. Fonts and generated JSON dominate archive size.",
};
writeFileSync(
  resolve(root, "docs/package-metrics.json"),
  JSON.stringify(metrics, null, 2) + "\n",
);
console.log(JSON.stringify(metrics, null, 2));
