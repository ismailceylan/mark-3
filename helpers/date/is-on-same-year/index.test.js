import { describe, it, expect } from "vitest";
import isOnSameYear from "./index";

describe( "isOnSameYear", () =>
{
	it( "returns true if both dates are in the same year", () =>
	{
		const date1 = new Date( "2023-01-01" );
		const date2 = new Date( "2023-12-31" );
		
		expect( isOnSameYear( date1, date2 )).toBe( true );
	});

	it( "returns false if years differ", () =>
	{
		const date1 = new Date( "2022-12-31" );
		const date2 = new Date( "2023-01-01" );
		
		expect( isOnSameYear( date1, date2 )).toBe( false );
	});
});
