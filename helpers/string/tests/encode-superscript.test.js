import { describe, it, expect } from "vitest";
import { encodeSuperscript } from "..";

describe("encodeSuperscript", () =>
{
	it("converts full match to superscript", () =>
	{
		expect(encodeSuperscript("h2o")).toBe("ʰ²ᵒ");
		expect(encodeSuperscript("123")).toBe("¹²³");
		expect(encodeSuperscript("abc")).toBe("ᵃᵇᶜ");
	});

	it("returns original string if any character mismatches and rollbackWhenMismatch is true", () =>
	{
		expect(encodeSuperscript("H2O")).toBe("H2O"); // 'H' and 'O' not in map
		expect(encodeSuperscript("x+2")).toBe("x+2"); // '+' not in map
	});

	it("fallbacks partially when rollbackWhenMismatch is false", () =>
	{
		expect(encodeSuperscript("x+2", false)).toBe("ˣ+²");
		expect(encodeSuperscript("H2O", false)).toBe("H²O");
	});

	it("returns non-string inputs as-is", () =>
	{
		expect(encodeSuperscript(null)).toBe(null);
		expect(encodeSuperscript(undefined)).toBe(undefined);
		expect(encodeSuperscript(123)).toBe(123);
		expect(encodeSuperscript({})).toEqual({});
	});

	it("handles empty string correctly", () =>
	{
		expect(encodeSuperscript("")).toBe("");
	});

	it("works with a full string of superscriptable characters", () =>
	{
		expect(encodeSuperscript("abcdefghijklmnopqrstuvwxyz", false)).toBe("ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ");
	});
});
