import { describe, it, expect } from "vitest";
import clamp from ".";

describe("clamp()", () =>
{
	it("returns the same value if it is within the min and max range", () =>
	{
		expect(clamp(5, 0, 10)).toBe(5);
		expect(clamp(0, -10, 10)).toBe(0);
		expect(clamp(9.5, 0, 10)).toBe(9.5);
	});

	it("clamps the value to the min if it is less than min", () =>
	{
		expect(clamp(-5, 0, 10)).toBe(0);
		expect(clamp(-100, -10, 10)).toBe(-10);
	});

	it("clamps the value to the max if it is greater than max", () =>
	{
		expect(clamp(15, 0, 10)).toBe(10);
		expect(clamp(99, -10, 10)).toBe(10);
	});

	it("returns the only possible value if min and max are equal", () =>
	{
		expect(clamp(5, 7, 7)).toBe(7);
		expect(clamp(10, 10, 10)).toBe(10);
		expect(clamp(-5, -3, -3)).toBe(-3);
	});

	it("swaps min and max if needed", () =>
	{
		expect(clamp(5, 10, 0)).toBe(5);
		expect(clamp(-5, 3, -3)).toBe(-3);
	});
});
