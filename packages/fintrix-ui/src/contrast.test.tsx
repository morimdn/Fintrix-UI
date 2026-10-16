import { describe, it, expect } from "vitest";
import { palettes } from "./tokens";
function luminance(hex: string) {
  const rgb = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
function ratio(a: string, b: string) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
for (const [mode, t] of Object.entries(palettes))
  describe(`${mode} contrast targets`, () => {
    for (const surface of [
      "canvas",
      "sidebar",
      "surface",
      "elevated",
      "subtle",
    ] as const) {
      for (const foreground of ["text", "muted"] as const)
        it(`${foreground} on ${surface} meets 4.5:1`, () =>
          expect(ratio(t[foreground], t[surface])).toBeGreaterThanOrEqual(4.5));
      it(`control border on ${surface} meets 3:1`, () =>
        expect(ratio(t.controlBorder, t[surface])).toBeGreaterThanOrEqual(3));
    }
    for (const status of ["success", "warning", "danger", "info"] as const)
      it(`${status} on soft status surface meets 4.5:1`, () =>
        expect(ratio(t[status], t[`${status}Soft`])).toBeGreaterThanOrEqual(
          4.5,
        ));
    for (const action of ["action", "actionHover"] as const)
      it(`action text on ${action} meets 4.5:1`, () =>
        expect(ratio(t.onAction, t[action])).toBeGreaterThanOrEqual(4.5));
    for (const foreground of ["primary", "primaryHover"] as const)
      it(`default button ${foreground} on surface meets 4.5:1`, () =>
        expect(ratio(t[foreground], t.surface)).toBeGreaterThanOrEqual(4.5));
    it("selected navigation meets 4.5:1", () =>
      expect(ratio(t.primary, t.primarySoft)).toBeGreaterThanOrEqual(4.5));
  });
