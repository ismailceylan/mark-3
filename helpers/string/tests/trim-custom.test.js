import { describe, it, expect } from "vitest";
import { trimCustom } from "..";

describe("trimCustom helper tests", () =>
{
	// 1. Basic Functionality
	it("should trim specified characters from both ends by default", () =>
	{
		const input = "##hello world!!";
		const result = trimCustom(input, "#!");
		
		expect(result).toBe("hello world");
	});

	// 2. Directional Options
	it("should only trim from the start when end option is false", () =>
	{
		const input = "+++content+++";
		const result = trimCustom(input, "+", { end: false });
		
		expect(result).toBe("content+++");
	});

	it("should only trim from the end when start option is false", () =>
	{
		const input = "---content---";
		const result = trimCustom(input, "-", { start: false });
		
		expect(result).toBe("---content");
	});

	// 3. Regex Special Characters
	it("should handle regex special characters correctly", () =>
	{
		const input = "...[content]...";
		const result = trimCustom(input, ".[]");
		
		expect(result).toBe("content");
	});

	// 4. Edge Cases: Empty and Null inputs
	it("should return the original string if input is empty", () =>
	{
		expect(trimCustom("", "abc")).toBe("");
	});

	it("should return the original string if chars to trim is empty", () =>
	{
		expect(trimCustom("hello", "")).toBe("hello");
	});

	// 5. No Match Scenario
	it("should return the original string if no characters match", () =>
	{
		const input = "hello";
		expect(trimCustom(input, "xyz")).toBe("hello");
	});

	// 6. Greedy Trimming
	it("should greedily trim all occurrences of specified characters", () =>
	{
		const input = "?!??!question!??!?";
		const result = trimCustom(input, "?!");
		
		expect(result).toBe("question");
	});

	// 7. Middle Content Preservation
	it("should not remove specified characters from the middle of the string", () =>
	{
		const input = "##hello#world##";
		const result = trimCustom(input, "#");
		
		expect(result).toBe("hello#world");
	});

	// 8. Option Sensitivity
	it("should return original string if both start and end options are false", () =>
	{
		const input = "###test###";
		const result = trimCustom(input, "#", { start: false, end: false });
		
		expect(result).toBe("###test###");
	});
});
