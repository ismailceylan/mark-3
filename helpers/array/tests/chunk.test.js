import { describe, it, expect } from "vitest";
import { chunk } from ".."; // adjust import path if needed

describe("chunk", () =>
{
	it("should return an empty array when input is empty", () =>
	{
		expect(chunk([], 2)).toEqual([]);
	});

	it("should split array into equal groups when divisible", () =>
	{
		expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
	});

	it("should put remaining elements in the last group when not divisible", () =>
	{
		expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
	});

	it("should handle a single element array", () =>
	{
		expect(chunk([42], 3)).toEqual([[42]]);
	});

	it("should create individual groups when size = 1", () =>
	{
		expect(chunk(["a", "b", "c"], 1)).toEqual([["a"], ["b"], ["c"]]);
	});

	it("should return the whole array as one group when size is larger than array length", () =>
	{
		expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
	});

	it("should throw an error when size is 0 or negative", () =>
	{
		expect(() => chunk([1, 2, 3], 0)).toThrowError("Size must be greater than 0");
		expect(() => chunk([1, 2, 3], -2)).toThrowError("Size must be greater than 0");
	});
});
