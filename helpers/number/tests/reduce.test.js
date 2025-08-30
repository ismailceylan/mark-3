import { describe, it, expect } from "vitest";
import { reduce } from "..";

describe("reduce helper", () =>
{
	it("reduces a number correctly with default base 1000", () =>
	{
		expect(reduce(1234567)).toEqual([1.234567, 3]);
		expect(reduce(1000)).toEqual([1, 2]);
		expect(reduce(999)).toEqual([999, 1]);
	});

	it("reduces a number correctly with custom base", () =>
	{
		expect(reduce(1024, 2)).toEqual([1, 11]);
		expect(reduce(16, 2)).toEqual([1, 5]);
		expect(reduce(81, 3)).toEqual([1, 5]);
	});

	it("returns zero correctly", () =>
	{
		expect(reduce(0)).toEqual([0, 0]);
	});

	it("throws an error for negative numbers", () =>
	{
		expect(() => reduce(-5))
			.toThrow("Reducing negative numbers is not supported.");
	});
});
