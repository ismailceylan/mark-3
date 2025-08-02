import { describe, it, expect } from "vitest";
import pickRandom from ".";

// örnek test verisi
const sampleArray = [10, 20, 30, 40, 50];

describe("pickRandom", () =>
{
	it("should return undefined if input is not an array", () =>
	{
		expect(pickRandom(null)).toBeUndefined();
		expect(pickRandom({})).toBeUndefined();
		expect(pickRandom("not array")).toBeUndefined();
		expect(pickRandom(123)).toBeUndefined();
	});

	it("should return undefined if array is empty", () =>
	{
		expect(pickRandom([])).toBeUndefined();
	});

	it("should return an element from the array", () =>
	{
		const value = pickRandom(sampleArray);
		expect(sampleArray).toContain(value);
	});

	it("should return different results across multiple calls", () =>
	{
		const results = new Set();
		for (let i = 0; i < 20; i++)
		{
			const val = pickRandom(sampleArray);
			results.add(val);
		}
		// Rastgelelik garantisi yok ama çeşitlilik kontrolü yapılabilir
		expect(results.size).toBeGreaterThan(1);
	});
});
