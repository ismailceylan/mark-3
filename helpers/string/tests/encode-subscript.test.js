import { describe, it, expect } from "vitest";
import { encodeSubscript } from "..";

describe("encodeSubscript", () =>
{
	it("converts full match to subscript", () =>
	{
		expect(encodeSubscript("h2o")).toBe("ₕ₂ₒ");
		expect(encodeSubscript("123")).toBe("₁₂₃");
	});

	it("returns original string if any character mismatches and rollbackWhenMismatch is true", () =>
	{
		expect(encodeSubscript("H2O")).toBe("H2O"); // 'H' and 'O' not in map
		expect(encodeSubscript("x+2")).toBe("x+2"); // 'x' not in map
	});

	it("fallbacks partially when rollbackWhenMismatch is false", () =>
	{
		expect(encodeSubscript("x+2", false)).toBe("x₊₂");
		expect(encodeSubscript("H2O", false)).toBe("H₂O");
	});

	it("returns non-string inputs as-is", () =>
	{
		expect(encodeSubscript(null)).toBe(null);
		expect(encodeSubscript(undefined)).toBe(undefined);
		expect(encodeSubscript(123)).toBe(123);
		expect(encodeSubscript({})).toEqual({});
	});

	it("handles empty string correctly", () =>
	{
		expect(encodeSubscript("")).toBe("");
	});

	it("works with symbols like + - ( )", () =>
	{
		expect(encodeSubscript("2+(3-1)", false)).toBe("₂₊₍₃₋₁₎");
	});
});
