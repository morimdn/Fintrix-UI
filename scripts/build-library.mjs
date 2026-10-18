import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  rmSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  copyFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, "..");
const pkg = resolve(root, "packages/techosoul-ui");
const typescriptManifest = require.resolve("typescript/package.json");
const tsc = resolve(
  dirname(typescriptManifest),
  require(typescriptManifest).bin.tsc,
);
rmSync(`${pkg}/dist`, { recursive: true, force: true });
execFileSync(process.execPath, [tsc, "-p", `${pkg}/tsconfig.build.json`], {
  stdio: "inherit",
});
// Native ESM requires explicit extensions; preserve modules for tree shaking.
for (const name of readdirSync(`${pkg}/dist`)) {
  if (!/\.(js|ts)$/.test(name)) continue;
  const path = `${pkg}/dist/${name}`;
  writeFileSync(
    path,
    readFileSync(path, "utf8").replace(
      /(from\s+["'])(\.\.?\/[^"']+)(["'])/g,
      (_, a, b, c) => `${a}${b.endsWith(".js") ? b : b + ".js"}${c}`,
    ),
  );
}
copyFileSync(`${pkg}/src/styles.css`, `${pkg}/dist/styles.css`);
for (const name of ["styles", "fonts"])
  writeFileSync(`${pkg}/dist/${name}.css.d.ts`, "export {};\n");
const font = resolve(root, "node_modules/@fontsource-variable/inter");
mkdirSync(`${pkg}/dist/files`, { recursive: true });
const fontCss = readFileSync(`${font}/wght.css`, "utf8");
writeFileSync(`${pkg}/dist/fonts.css`, fontCss);
for (const match of fontCss.matchAll(/\.\/files\/([^)'"\s]+)/g))
  copyFileSync(`${font}/files/${match[1]}`, `${pkg}/dist/files/${match[1]}`);
copyFileSync(`${font}/LICENSE`, `${pkg}/dist/INTER-LICENSE.txt`);
const tokensUrl = pathToFileURL(resolve(pkg, "dist/tokens.js"));
tokensUrl.searchParams.set("build", Date.now());
const { getTokens } = await import(tokensUrl.href);
function dtcg(value, path = []) {
  if (typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        dtcg(item, [...path, key]),
      ]),
    );
  const key = path.at(-1);
  if (typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value))
    return {
      $type: "color",
      $value: {
        colorSpace: "srgb",
        components: [1, 3, 5].map(
          (i) => parseInt(value.slice(i, i + 2), 16) / 255,
        ),
        alpha: 1,
      },
    };
  const group = path[0];
  if (
    typeof value === "number" &&
    (["space", "radius", "layout", "sizing"].includes(group) ||
      (group === "typography" &&
        [
          "caption",
          "table",
          "label",
          "section",
          "body",
          "title",
          "display",
        ].includes(key)))
  )
    return { $type: "dimension", $value: { value, unit: "px" } };
  if (typeof value === "number" && group === "motion")
    return { $type: "duration", $value: { value, unit: "ms" } };
  // Shadows, font stacks and easing remain descriptive strings for tool compatibility.
  return {
    $type: typeof value === "number" ? "number" : "string",
    $value: value,
  };
}
const tokens = Object.fromEntries(
  ["light", "dark"].map((mode) => [
    mode,
    Object.fromEntries(
      ["comfortable", "compact"].map((density) => [
        density,
        dtcg(getTokens(mode, density)),
      ]),
    ),
  ]),
);
writeFileSync(
  `${pkg}/dist/tokens.json`,
  JSON.stringify(tokens, null, 2) + "\n",
);

// Package readers do not have the repository docs beside the tarball README.
const readme = readFileSync(resolve(root, "README.md"), "utf8").replace(
  /(!?\[[^\]]*\])\((?!https?:|#)([^)]+)\)/g,
  (_, label, path) =>
    `${label}(${label.startsWith("!") ? "https://raw.githubusercontent.com/morimdn/Techosoul-UI/main/" : "https://github.com/morimdn/Techosoul-UI/blob/main/"}${path})`,
);
writeFileSync(`${pkg}/README.md`, readme);
copyFileSync(resolve(root, "LICENSE"), `${pkg}/LICENSE`);

copyFileSync(
  resolve(root, "node_modules/lucide-react/LICENSE"),
  `${pkg}/dist/LUCIDE-LICENSE.txt`,
);
