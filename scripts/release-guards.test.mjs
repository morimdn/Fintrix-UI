import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { test } from "node:test";

// Execute the real workflow gates with mocked GitHub responses; never dispatch
// a workflow or contact npm. This protects the scoped-name migration's gates.
const workflow = readFileSync(
  resolve(import.meta.dirname, "../.github/workflows/npm-release.yml"),
  "utf8",
);
const gate = workflow.match(/script: \|\n([\s\S]*?)(?=      - )/)[1];
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const authorize = new AsyncFunction("process", "github", "context", gate);
for (const [label, envPatch, branchSha, runs, accepted] of [
  [
    "approved exact commit",
    {},
    "current",
    [{ id: 1, status: "completed", conclusion: "success" }],
    true,
  ],
  ["release disabled", { RELEASE_ENABLED: "false" }, "current", [], false],
  [
    "scope ownership unconfirmed",
    { SCOPE_OWNER_CONFIRMED: "" },
    "current",
    [],
    false,
  ],
  [
    "old package authorization",
    { AUTHORIZATION: "stage fintrix-ui@0.3.0" },
    "current",
    [],
    false,
  ],
  ["stale main", {}, "newer", [], false],
  ["missing CI", {}, "current", [], false],
  [
    "latest CI failed",
    {},
    "current",
    [
      { id: 1, status: "completed", conclusion: "success" },
      { id: 2, status: "completed", conclusion: "failure" },
    ],
    false,
  ],
  [
    "CI incomplete",
    {},
    "current",
    [{ id: 1, status: "in_progress", conclusion: null }],
    false,
  ],
]) {
  test(`release authorization: ${label}`, async () => {
    const process = {
      env: {
        RELEASE_ENABLED: "true",
        SCOPE_OWNER_CONFIRMED: "techosoul",
        AUTHORIZATION: "stage @techosoul/ui@0.3.0",
        ...envPatch,
      },
    };
    const github = {
      rest: {
        repos: {
          getBranch: async () => ({ data: { commit: { sha: branchSha } } }),
        },
        actions: {
          listWorkflowRuns: async (args) => {
            assert.equal(args.head_sha, "current");
            assert.equal(args.event, "push");
            assert.equal(args.workflow_id, "ci.yml");
            return { data: { workflow_runs: runs } };
          },
        },
      },
    };
    const run = () => authorize(process, github, { repo: {}, sha: "current" });
    if (accepted) await assert.doesNotReject(run);
    else await assert.rejects(run);
  });
}

const manifestGate = workflow.match(/node --input-type=module -e "([^"]+)"/)[1];
for (const [label, rootPrivate, libraryPatch, accepted] of [
  ["private candidate blocked", true, { private: true }, false],
  ["public root blocked", false, {}, false],
  ["old package blocked", true, { name: "fintrix-ui" }, false],
  ["wrong version blocked", true, { version: "0.3.1" }, false],
  ["separately authorized manifest", true, {}, true],
]) {
  test(`release manifest: ${label}`, () => {
    const cwd = mkdtempSync(resolve(tmpdir(), "techosoul-release-guard-"));
    try {
      mkdirSync(resolve(cwd, "packages/techosoul-ui"), { recursive: true });
      writeFileSync(
        resolve(cwd, "package.json"),
        JSON.stringify({ private: rootPrivate }),
      );
      writeFileSync(
        resolve(cwd, "packages/techosoul-ui/package.json"),
        JSON.stringify({
          name: "@techosoul/ui",
          version: "0.3.0",
          private: false,
          ...libraryPatch,
        }),
      );
      const result = spawnSync(
        process.execPath,
        ["--input-type=module", "-e", manifestGate],
        { cwd, encoding: "utf8" },
      );
      assert.equal(result.status === 0, accepted, result.stderr);
    } finally {
      rmSync(cwd, { recursive: true, force: true });
    }
  });
}
