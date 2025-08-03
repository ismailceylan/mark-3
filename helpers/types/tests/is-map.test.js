import { describe, it, expect } from "vitest";
import { isMap } from "..";

describe("isMap", () =>
{
	it("should return true for Map instances", () =>
	{
		expect(isMap(new Map())).toBe(true);
		const map = new Map();
		map.set("key", "value");
		expect(isMap(map)).toBe(true);
	});

	it("should return false for WeakMap", () =>
	{
		expect(isMap(new WeakMap())).toBe(false);
	});

	it("should return false for plain objects", () =>
	{
		expect(isMap({})).toBe(false);
		expect(isMap({ a: 1 })).toBe(false);
	});

	it("should return false for arrays", () =>
	{
		expect(isMap([])).toBe(false);
		expect(isMap([1, 2, 3])).toBe(false);
	});

	it("should return false for other types", () =>
	{
		expect(isMap(null)).toBe(false);
		expect(isMap(undefined)).toBe(false);
		expect(isMap(42)).toBe(false);
		expect(isMap("string")).toBe(false);
		expect(isMap(true)).toBe(false);
		expect(isMap(Symbol("sym"))).toBe(false);
		expect(isMap(function () {})).toBe(false);
	});
});
