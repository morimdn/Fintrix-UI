import { execFileSync } from "node:child_process";
import { existsSync, realpathSync } from "node:fs";
import { delimiter, dirname, resolve } from "node:path";

function npmCli() {
  // npm supplies the CLI path to lifecycle scripts, including workspace builds.
  if (process.env.npm_execpath) return process.env.npm_execpath;
  // Also support direct `node scripts/...` invocation and standard Node installs.
  const directories = [
    dirname(process.execPath),
    ...(process.env.PATH || "").split(delimiter),
  ];
  for (const directory of directories) {
    const bundled = resolve(directory, "node_modules/npm/bin/npm-cli.js");
    if (existsSync(bundled)) return bundled;
    const executable = resolve(directory, "npm");
    if (process.platform !== "win32" && existsSync(executable))
      return realpathSync(executable);
  }
  throw new Error(
    "Cannot locate npm CLI. Run this script with npm run or install npm alongside Node.js.",
  );
}

export function runNpm(args, options = {}) {
  // Do not invoke npm.cmd or a shell: paths and arguments must remain literal.
  return execFileSync(process.execPath, [npmCli(), ...args], {
    ...options,
    shell: false,
  });
}
