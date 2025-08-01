import { describe, it, expect } from "vitest";
import formatDate from "./index";

describe( "formatDate", () =>
{
	const date = new Date( "2025-12-21T22:10:05" );

	it( "formats full year (Y)", () =>
	{
		expect( formatDate( date, "Y" )).toBe( "2025" );
	});
	
	it( "formats short year (y)", () =>
	{
		expect( formatDate( date, "y" )).toBe( "25" );
	});
	
	it( "formats zero-padded month (m)", () =>
	{
		expect( formatDate( date, "m" )).toBe( "12" );
	});
	
	it( "formats non-padded month (n)", () =>
	{
		expect( formatDate( date, "n" )).toBe( "12" );
	});
	
	it( "formats short month name (M)", () =>
	{
		expect( formatDate( date, "M" )).toBe( "Dec" );
	});
	
	it( "formats full month name (MM)", () =>
	{
		expect( formatDate( date, "MM" )).toBe( "December" );
	});
	
	it( "formats day padded (d)", () =>
	{
		expect( formatDate( date, "d" )).toBe( "21" );
	});
	
	it( "formats day non-padded (j)", () =>
	{
		expect( formatDate( date, "j" )).toBe( "21" );
	});
	
	it( "formats zero-padded hour (H)", () =>
	{
		expect( formatDate( date, "H" )).toBe( "22" );
	});
	
	it( "formats non-padded hour (G)", () =>
	{
		expect( formatDate( date, "G" )).toBe( "22" );
	});
	
	it( "formats minutes (i)", () =>
	{
		expect( formatDate( date, "i" )).toBe( "10" );
	});
	
	it( "formats seconds (s)", () =>
	{
		expect( formatDate( date, "s" )).toBe( "05" );
	});
	
	it( "formats a custom pattern", () =>
	{
		expect( formatDate( date, "d.m.Y H:i" )).toBe( "21.12.2025 22:10" );
	});
	
	it( "supports localized short month (M) in TR", () =>
	{
		expect( formatDate( date, "M", "tr" )).toBe( "Ara" ); // Aralık
	});
	
	it( "supports localized long month (MM) in TR", () =>
	{
		expect( formatDate( date, "MM", "tr" )).toBe( "Aralık" );
	});
	
	it( "returns empty string for empty pattern", () =>
	{
		expect( formatDate( date, "" )).toBe( "" );
	});
	
	it( "leaves unknown tokens as-is", () =>
	{
		expect( formatDate( date, "[foo] Y" )).toBe( "[foo] 2025" );
	});
	
	it( "mixes plain text and tokens", () =>
	{
		expect( formatDate( date, "d MM Y, H:i" )).toBe( "21 December 2025, 22:10" );
	});
});
