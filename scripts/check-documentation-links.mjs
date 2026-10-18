import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
// These are evidence from earlier commits, not current developer guidance.
const historical = new Set([
  "antd-evaluation.md",
  "validation.md",
  "refinement.md",
  "shell-refinement.md",
  "contrast-hotfix.md",
  "documentation-refinement.md",
  "phase-two-report.md",
  "phase-three-report.md",
  "phase-four-report.md",
  "techosoul-validation.md",
]);
const files = [
  "README.md",
  "CONTRIBUTING.md",
  "packages/techosoul-ui/README.md",
  ...readdirSync(resolve(root, "docs"))
    .filter((name) => name.endsWith(".md") && !historical.has(name))
    .map((name) => `docs/${name}`),
];
for (const file of files) {
  const content = readFileSync(resolve(root, file), "utf8");
  assert.doesNotMatch(
    content,
    /https:\/\/(?:github\.com\/morimdn|morimdn\.github\.io)\/Fintrix-UI/,
    `${file}: obsolete repository URL`,
  );
  for (const [, link] of content.matchAll(/\]\(([^\s)]+)\)/g)) {
    let target = link.split("#")[0];
    if (!target) continue;
    const repository = target.match(
      /^https:\/\/github\.com\/morimdn\/Techosoul-UI\/(?:blob|tree)\/main\/(.+)/,
    );
    if (repository) target = resolve(root, decodeURIComponent(repository[1]));
    else if (/^[a-z]+:|^\//i.test(target)) continue;
    else target = resolve(root, dirname(file), decodeURIComponent(target));
    assert.ok(existsSync(target), `${file}: missing link target ${link}`);
  }
}
console.log(
  `Checked local and repository file links in ${files.length} current Markdown documents; historical reports excluded.`,
);
