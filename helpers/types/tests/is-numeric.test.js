import { describe, it, expect } from "vitest";
import { isNumeric } from "..";

describe("isNumeric function", () =>
{
	it("should return true for numeric numbers", () =>
	{
		expect(isNumeric(0)).toBe(true);
		expect(isNumeric(123)).toBe(true);
		expect(isNumeric(-456)).toBe(true);
		expect(isNumeric(1e4)).toBe(true);
		expect(isNumeric(3.14)).toBe(true);
	});

	it("should return false for NaN and Infinity numbers", () =>
	{
		expect(isNumeric(NaN)).toBe(false);
		expect(isNumeric(Infinity)).toBe(false);
		expect(isNumeric(-Infinity)).toBe(false);
	});

	it("should return true for numeric strings", () =>
	{
		expect(isNumeric("0")).toBe(true);
		expect(isNumeric("123")).toBe(true);
		expect(isNumeric("-456")).toBe(true);
		expect(isNumeric("1e4")).toBe(true);
		expect(isNumeric("3.14")).toBe(true);
		expect(isNumeric("  42  ")).toBe(true);
	});

	it("should return false for non-numeric strings", () =>
	{
		expect(isNumeric("")).toBe(false);
		expect(isNumeric(" ")).toBe(false);
		expect(isNumeric("abc")).toBe(false);
		expect(isNumeric("123abc")).toBe(false);
		expect(isNumeric("Infinity")).toBe(false);
	});

	it("should return false for other data types", () =>
	{
		expect(isNumeric(null)).toBe(false);
		expect(isNumeric(undefined)).toBe(false);
		expect(isNumeric(true)).toBe(false);
		expect(isNumeric(false)).toBe(false);
		expect(isNumeric({})).toBe(false);
		expect(isNumeric([])).toBe(false);
		expect(isNumeric(() => {})).toBe(false);
	});
});
