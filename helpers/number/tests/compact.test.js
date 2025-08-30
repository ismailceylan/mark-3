import { describe, it, expect } from "vitest";
import { compact } from "..";

describe("compact helper", () =>
{
	it("formats numbers in short style correctly", () =>
	{
		expect(compact(1234)).toBe("1.23K");
		expect(compact(1234567)).toBe("1.23M");
		expect(compact(12)).toBe("12");
		expect(compact(123)).toBe("123");
	});

	it("formats numbers in long style correctly", () =>
	{
		expect(compact(1234, "long")).toBe("1.23 thousand");
		expect(compact(1234567, "long")).toBe("1.23 million");
		expect(compact(12, "long")).toBe("12");
	});

	it("handles different locales", () =>
	{
		expect(compact(1234, "short", "de-DE")).toBe("1234");
		expect(compact(1234567, "long", "fr-FR")).toBe("1,23 million");
	});

	it("returns \"-\" for null or undefined", () =>
	{
		expect(compact(null)).toBe("-");
		expect(compact(undefined)).toBe("-");
	});

	it("converts numeric strings correctly", () =>
	{
		expect(compact("1234")).toBe("1.23K");
		expect(compact("0")).toBe("0");
	});

	it("handles zero correctly", () =>
	{
		expect(compact(0)).toBe("0");
	});

});
