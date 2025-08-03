import { describe, it, expect } from "vitest";
import { random } from "..";

describe("random", () =>
{
	it("should return a number between 0 and 1 by default", () =>
	{
		const result = random();
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThanOrEqual(1);
		expect(Number.isInteger(result)).toBe(true);
	});

	it("should return float if shouldFloat is true", () =>
	{
		const result = random(0, 1, true);
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThanOrEqual(1);
		expect(Number.isInteger(result)).toBe(false);
	});

	it("should respect min and max range with integers", () =>
	{
		const result = random(5, 10);
		expect(result).toBeGreaterThanOrEqual(5);
		expect(result).toBeLessThanOrEqual(10);
		expect(Number.isInteger(result)).toBe(true);
	});

	it("should respect min and max range with floats", () =>
	{
		const result = random(5, 10, true);
		expect(result).toBeGreaterThanOrEqual(5);
		expect(result).toBeLessThanOrEqual(10);
	});

	it("should always return at least the min value", () =>
	{
		for (let i = 0; i < 100; i++)
		{
			const result = random(10, 20);
			expect(result).toBeGreaterThanOrEqual(10);
		}
	});

	it("should return exactly min if min and max are both 0", () =>
	{
		const result = random(0, 0);
		expect(result).toBe(0);
	});
});
