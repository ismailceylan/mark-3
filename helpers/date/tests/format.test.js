import { describe, it, expect } from "vitest";
import { format } from "..";

describe( "format", () =>
{
	const date = new Date( "2025-12-21T22:10:05" );

	it( "formats full year (Y)", () =>
	{
		expect( format( date, "Y" )).toBe( "2025" );
	});
	
	it( "formats short year (y)", () =>
	{
		expect( format( date, "y" )).toBe( "25" );
	});
	
	it( "formats zero-padded month (m)", () =>
	{
		expect( format( date, "m" )).toBe( "12" );
	});
	
	it( "formats non-padded month (n)", () =>
	{
		expect( format( date, "n" )).toBe( "12" );
	});
	
	it( "formats short month name (M)", () =>
	{
		expect( format( date, "M" )).toBe( "Dec" );
	});
	
	it( "formats full month name (MM)", () =>
	{
		expect( format( date, "MM" )).toBe( "December" );
	});
	
	it( "formats day padded (d)", () =>
	{
		expect( format( date, "d" )).toBe( "21" );
	});
	
	it( "formats day non-padded (j)", () =>
	{
		expect( format( date, "j" )).toBe( "21" );
	});
	
	it( "formats zero-padded hour (H)", () =>
	{
		expect( format( date, "H" )).toBe( "22" );
	});
	
	it( "formats non-padded hour (G)", () =>
	{
		expect( format( date, "G" )).toBe( "22" );
	});
	
	it( "formats minutes (i)", () =>
	{
		expect( format( date, "i" )).toBe( "10" );
	});
	
	it( "formats seconds (s)", () =>
	{
		expect( format( date, "s" )).toBe( "05" );
	});
	
	it( "formats a custom pattern", () =>
	{
		expect( format( date, "d.m.Y H:i" )).toBe( "21.12.2025 22:10" );
	});
	
	it( "supports localized short month (M) in TR", () =>
	{
		expect( format( date, "M", "tr" )).toBe( "Ara" ); // Aralık
	});
	
	it( "supports localized long month (MM) in TR", () =>
	{
		expect( format( date, "MM", "tr" )).toBe( "Aralık" );
	});
	
	it( "returns empty string for empty pattern", () =>
	{
		expect( format( date, "" )).toBe( "" );
	});
	
	it( "leaves unknown tokens as-is", () =>
	{
		expect( format( date, "[foo] Y" )).toBe( "[foo] 2025" );
	});
	
	it( "mixes plain text and tokens", () =>
	{
		expect( format( date, "d MM Y, H:i" )).toBe( "21 December 2025, 22:10" );
	});
});
