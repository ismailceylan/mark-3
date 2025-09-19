import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { secondsRemaining } from "..";

describe( "secondsRemaining", () =>
{
	// use a fixed "now" by mocking Date.now
	const fixedNow = new Date( "2030-01-01T00:00:00Z" ).getTime(); // in ms

	beforeEach(() =>
	{
		vi.useFakeTimers();
		vi.setSystemTime( fixedNow );
	});

	afterEach(() =>
	{
		vi.useRealTimers();
	});

	it( "calculates remaining seconds with epoch timestamp", () =>
	{
		const target = fixedNow / 1000 + 60; // 60 seconds later
		expect( secondsRemaining( target )).toBe( 60 );
	});

	it( "calculates remaining seconds with Date object", () =>
	{
		const target = new Date( fixedNow + 120_000 ); // 120 seconds later
		expect( secondsRemaining( target )).toBe( 120 );
	});

	it( "calculates remaining seconds with parseable string", () =>
	{
		const target = "2030-01-01T00:05:00Z"; // 5 minutes later
		expect( secondsRemaining( target )).toBe( 300 );
	});

	it( "returns negative value if target is in the past", () =>
	{
		const target = fixedNow / 1000 - 30; // 30 seconds earlier
		expect( secondsRemaining( target )).toBe( -30 );
	});

	it( "uses floor to round down seconds", () =>
	{
		const target = fixedNow / 1000 + 59.9;
		expect( secondsRemaining( target )).toBe( 59 ); // floored to 59
	});
});
