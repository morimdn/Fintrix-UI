import { build } from "vite";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const consumer = process.env.CONSUMER_PATH;
const dist = consumer
  ? resolve(consumer, "node_modules/fintrix-ui/dist")
  : resolve(root, "packages/fintrix-ui/dist");
const js = readdirSync(dist)
  .filter((name) => name.endsWith(".js"))
  .map((name) => ({ name, bytes: statSync(resolve(dist, name)).size }));
const probes = {};
for (const [label, source] of Object.entries({
  tokens: 'export { getTokens } from "fintrix-ui/tokens";',
  icon: 'export { FintrixIcon } from "fintrix-ui";',
  walletIcon:
    'import { FintrixIcon } from "fintrix-ui"; import { Wallet } from "lucide-react"; export const WalletIcon = () => FintrixIcon({ icon: Wallet });',
  amount: 'export { CurrencyAmount } from "fintrix-ui";',
})) {
  const probe = resolve(consumer || root, `.probe-${label}.js`);
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
    if (
      ["amount", "icon", "walletIcon"].includes(label) &&
      /from\s*["']antd/.test(code)
    )
      throw new Error(`${label} import retained Ant Design`);
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
