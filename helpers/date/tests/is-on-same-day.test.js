import { describe, it, expect } from "vitest";
import { isOnSameDay } from "..";

describe( "isOnSameDay", () =>
{
	it( "returns true for same year, month and day", () =>
	{
		const d1 = new Date( "2023-07-27T10:00:00" );
		const d2 = new Date( "2023-07-27T23:59:59" );

		expect( isOnSameDay( d1, d2 )).toBe( true );
	});

	it( "returns false for same month and day but different year", () =>
	{
		const d1 = new Date( "2022-07-27" );
		const d2 = new Date( "2023-07-27" );
		
		expect( isOnSameDay( d1, d2 )).toBe( false );
	});

	it( "returns false for same year and day but different month", () =>
	{
		const d1 = new Date( "2023-06-27" );
		const d2 = new Date( "2023-07-27" );

		expect( isOnSameDay( d1, d2 )).toBe( false );
	});

	it( "returns false for same year and month but different day", () =>
	{
		const d1 = new Date( "2023-07-26" );
		const d2 = new Date( "2023-07-27" );

		expect( isOnSameDay( d1, d2 )).toBe( false );
	});

	it( "returns true for exact same date object", () =>
	{
		const d1 = new Date( "2023-07-27T12:34:56" );
		expect( isOnSameDay( d1, d1 )).toBe( true );
	});

	it( "works correctly across timezones if both dates are created equally", () =>
	{
		const d1 = new Date( Date.UTC( 2023, 6, 27, 0, 0, 0 )); // UTC
		const d2 = new Date( Date.UTC( 2023, 6, 27, 23, 59, 59 ));
	
		expect( isOnSameDay( d1, d2 )).toBe( true );
	});

	it( "returns false for completely different dates", () =>
	{
		const d1 = new Date( "1999-01-01" );
		const d2 = new Date( "2025-12-31" );

		expect( isOnSameDay( d1, d2 )).toBe( false );
	});
});
