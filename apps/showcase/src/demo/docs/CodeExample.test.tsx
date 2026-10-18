import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CodeExample } from "./CodeExample";

describe("code example boundary keys", () => {
  function setup() {
    render(
      <CodeExample title="Example" code="const example = true;" expanded />,
    );
    const code = screen.getByLabelText("Example source code");
    Object.defineProperty(code, "scrollHeight", { value: 800 });
    code.scrollTop = 200;
    code.focus();
    return code;
  }
  it("owns Home/End defaults at both boundaries without moving focus", () => {
    const code = setup();
    for (const [key, top] of [
      ["Home", 0],
      ["Home", 0],
      ["End", 800],
      ["End", 800],
    ] as const) {
      const event = createEvent.keyDown(code, { key });
      fireEvent(code, event);
      expect(event.defaultPrevented).toBe(true);
      expect(code.scrollTop).toBe(top);
      expect(code).toHaveFocus();
    }
  });
  it.each(["altKey", "ctrlKey", "metaKey", "shiftKey"])(
    "preserves modified keys: %s",
    (modifier) => {
      const code = setup();
      for (const key of ["Home", "End"]) {
        const event = createEvent.keyDown(code, { key, [modifier]: true });
        fireEvent(code, event);
        expect(event.defaultPrevented).toBe(false);
        expect(code.scrollTop).toBe(200);
      }
    },
  );
  it("leaves arrows and descendant key events to their native behavior", () => {
    const code = setup();
    for (const key of ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]) {
      const event = createEvent.keyDown(code, { key });
      fireEvent(code, event);
      expect(event.defaultPrevented).toBe(false);
    }
    const event = createEvent.keyDown(code.querySelector("code")!, {
      key: "Home",
    });
    fireEvent(code.querySelector("code")!, event);
    expect(event.defaultPrevented).toBe(false);
    expect(code.scrollTop).toBe(200);
  });
});
