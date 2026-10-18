import assert from "node:assert/strict";
import { runNpm } from "./run-npm.mjs";

// Owner-side read-only check using an authenticated npm session. npm's OIDC
// stage-publish credentials cannot list stages; do not add tokens to CI for this.
const stages = JSON.parse(
  runNpm(
    [
      "stage",
      "list",
      "@techosoul/ui",
      "--json",
      "--registry=https://registry.npmjs.org/",
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  ),
);
assert.ok(
  Array.isArray(stages),
  "Invalid staging queue response; stop release review",
);
assert.equal(
  stages.length,
  0,
  "Pending stages exist; owner must inspect and resolve them before dispatch",
);
console.log("no pending stages for @techosoul/ui");
