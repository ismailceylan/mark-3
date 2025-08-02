import { describe, it, expect } from "vitest";
import isSet from ".";

describe("isSet", () =>
{
	it("should return true for Set instances", () =>
	{
		expect(isSet(new Set())).toBe(true);
		const set = new Set();
		set.set("key", "value");
		expect(isSet(set)).toBe(true);
	});

	it("should return false for WeakSet", () =>
	{
		expect(isSet(new WeakSet())).toBe(false);
	});

	it("should return false for plain objects", () =>
	{
		expect(isSet({})).toBe(false);
		expect(isSet({ a: 1 })).toBe(false);
	});

	it("should return false for arrays", () =>
	{
		expect(isSet([])).toBe(false);
		expect(isSet([1, 2, 3])).toBe(false);
	});

	it("should return false for other types", () =>
	{
		expect(isSet(null)).toBe(false);
		expect(isSet(undefined)).toBe(false);
		expect(isSet(42)).toBe(false);
		expect(isSet("string")).toBe(false);
		expect(isSet(true)).toBe(false);
		expect(isSet(Symbol("sym"))).toBe(false);
		expect(isSet(function () {})).toBe(false);
	});
});
