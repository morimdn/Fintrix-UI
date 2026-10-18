import { runNpm } from "./run-npm.mjs";
// Read-only check. Do not interpret authentication/network failures as availability.
let result;
try {
  result = runNpm(
    [
      "view",
      "@techosoul/ui@0.3.0",
      "version",
      "--json",
      "--registry=https://registry.npmjs.org/",
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
} catch (error) {
  const payload = JSON.parse(error.stdout || "{}");
  if (payload.error?.code !== "E404") throw error;
  console.log(
    "Version metadata absent. This does not confirm ownership; npm enforces publish authorization.",
  );
  process.exit(0);
}
throw new Error(`Refusing duplicate publication: ${result.trim()}`);
