import { describe, it, expect } from "vitest";
import isPlainObject from ".";

describe("isPlainObject", () =>
{
	it("returns true for plain object literals", () =>
	{
		expect(isPlainObject({})).toBe(true);
		expect(isPlainObject({ a: 1, b: 2 })).toBe(true);
	});

	it("returns true for Object created with constructor", () =>
	{
		expect(isPlainObject(new Object())).toBe(true);
	});

	it("returns true for Object.create(null)", () =>
	{
		expect(isPlainObject(Object.create(null))).toBe(true);
	});

	it("returns false for arrays", () =>
	{
		expect(isPlainObject([])).toBe(false);
		expect(isPlainObject([1, 2, 3])).toBe(false);
	});

	it("returns false for null", () =>
	{
		expect(isPlainObject(null)).toBe(false);
	});

	it("returns false for functions", () =>
	{
		expect(isPlainObject(function () {})).toBe(false);
		expect(isPlainObject(() => {})).toBe(false);
	});

	it("returns false for primitive values", () =>
	{
		expect(isPlainObject(123)).toBe(false);
		expect(isPlainObject("string")).toBe(false);
		expect(isPlainObject(true)).toBe(false);
		expect(isPlainObject(undefined)).toBe(false);
		expect(isPlainObject(Symbol("sym"))).toBe(false);
	});

	it("returns false for built-in objects like Date, RegExp, Map, Set", () =>
	{
		expect(isPlainObject(new Date())).toBe(false);
		expect(isPlainObject(/regex/)).toBe(false);
		expect(isPlainObject(new Map())).toBe(false);
		expect(isPlainObject(new Set())).toBe(false);
	});

	it("returns false for class instances", () =>
	{
		class MyClass {}
		expect(isPlainObject(new MyClass())).toBe(false);
	});
});
