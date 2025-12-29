import { describe, it, expect } from "vitest";
import { secondsToTimestamp } from "..";

describe("secondsToTimestamp", () =>
{
	it("should convert seconds correctly to HH:MM:SS format", () =>
	{
		expect(secondsToTimestamp(5684)).toBe("01:34:44");
		expect(secondsToTimestamp(59)).toBe("00:00:59");
		expect(secondsToTimestamp(3600)).toBe("01:00:00");
		expect(secondsToTimestamp(3661)).toBe("01:01:01");
	});

	it("should pad hours, minutes, and seconds with leading zeros", () =>
	{
		expect(secondsToTimestamp(5)).toBe("00:00:05");
		expect(secondsToTimestamp(65)).toBe("00:01:05");
		expect(secondsToTimestamp(36005)).toBe("10:00:05");
	});

	it("should return 00:00:00 for invalid or negative inputs", () =>
	{
		expect(secondsToTimestamp(-5)).toBe("00:00:00");
		expect(secondsToTimestamp(NaN)).toBe("00:00:00");
		expect(secondsToTimestamp(undefined)).toBe("00:00:00");
		expect(secondsToTimestamp(null)).toBe("00:00:00");
	});

	it("should handle large values gracefully", () =>
	{
		expect(secondsToTimestamp(86400)).toBe("24:00:00"); // 1 day
		expect(secondsToTimestamp(90061)).toBe("25:01:01"); // 25 hours, 1 min, 1 sec
	});

	it("should hide hours when showHours is false and hours are 0", () =>
	{
		expect(secondsToTimestamp(59, false)).toBe("00:59");
		expect(secondsToTimestamp(125, false)).toBe("02:05");
		expect(secondsToTimestamp(5684, false)).toBe("94:44"); // 1h 34m → 94m
	});
});
