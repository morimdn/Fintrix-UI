import assert from "node:assert/strict";

// Deliberate release allowlist: a new output requires review, even under dist/.
export function assertDistributableFiles(files) {
  const expected = [
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
      "ColumnResizeHandle",
      "components",
      "DataGrid",
      "financial",
      "IconButton",
      "index",
      "TechosoulIcon",
      "ThemeProvider",
      "tokens",
    ].flatMap((name) => [`dist/${name}.js`, `dist/${name}.d.ts`]),
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
  assert.deepEqual(
    [...files].sort(),
    expected.sort(),
    "Unexpected or missing distributable files",
  );
}
