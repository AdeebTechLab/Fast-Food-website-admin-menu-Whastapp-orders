import { describe, expect, it } from "vitest";
import { formatPrice } from "./price";

describe("formatPrice", () => {
  it("uses Pakistani Rupees formatting", () => {
    expect(formatPrice(2500)).toBe("Rs 2,500.00");
  });
});
