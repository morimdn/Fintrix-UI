import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { test } from "node:test";

const helper = new URL("./run-npm.mjs", import.meta.url).href;

test("npm CLI paths and arguments remain literal, including spaces and shell metacharacters", () => {
  const directory = mkdtempSync(resolve(tmpdir(), "techosoul npm & test-"));
  try {
    const cli = resolve(directory, "npm cli.cjs");
    writeFileSync(
      cli,
      "console.log(JSON.stringify({ args: process.argv.slice(2), cwd: process.cwd() }));",
    );
    const args = [
      "pack",
      "a path & echo unsafe",
      "$(echo unsafe)",
      "%PATH%",
      'a"quote',
      "--ignore-scripts",
    ];
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
      import { runNpm } from ${JSON.stringify(helper)};
      process.stdout.write(runNpm(${JSON.stringify(args)}, { cwd: ${JSON.stringify(directory)}, encoding: 'utf8' }));
    `,
      ],
      { env: { ...process.env, npm_execpath: cli }, encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);
    const actual = JSON.parse(result.stdout);
    assert.deepEqual(actual.args, args);
    assert.equal(realpathSync(actual.cwd), realpathSync(directory));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("npm failures retain their exit status and captured diagnostics", () => {
  const directory = mkdtempSync(resolve(tmpdir(), "techosoul npm failure-"));
  try {
    const cli = resolve(directory, "npm-cli.cjs");
    writeFileSync(
      cli,
      "console.log('stdout'); console.error('stderr'); process.exit(23);",
    );
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
      import assert from 'node:assert/strict';
      import { runNpm } from ${JSON.stringify(helper)};
      assert.throws(() => runNpm(['view'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }),
        error => error.status === 23 && error.stdout.trim() === 'stdout' && error.stderr.trim() === 'stderr');
    `,
      ],
      { env: { ...process.env, npm_execpath: cli }, encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("direct Node invocation locates npm without lifecycle environment", () => {
  const env = { ...process.env };
  delete env.npm_execpath;
  const result = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
    import { runNpm } from ${JSON.stringify(helper)};
    process.stdout.write(runNpm(['--version'], { encoding: 'utf8' }));
  `,
    ],
    { env, encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout.trim(), /^\d+\.\d+\.\d+/);
});
