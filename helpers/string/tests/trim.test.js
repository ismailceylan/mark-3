import { describe, it, expect } from "vitest";
import { trim } from "..";

describe( "trim", () =>
{
	it( "should trim spaces by default", () =>
	{
		expect( trim( "  hello  " )).toBe( "hello" );
	});

	it( "should trim custom character from both ends (single char)", () =>
	{
		expect( trim( "--hello--", "-" )).toBe( "hello" );
	});

	it( "should trim multiple characters (array)", () =>
	{
		expect( trim( "-_=hello=_-", [ "-", "_", "=" ])).toBe( "hello" );
	});

	it( "should not trim characters in the middle", () =>
	{
		expect( trim( "--he--llo--", "-" )).toBe( "he--llo" );
	});

	it( "should return input unchanged if it is not a string", () =>
	{
		expect( trim( 12345, "-" )).toBe( 12345 );
		expect( trim( null, "-" )).toBe( null );
		expect( trim( undefined, "-" )).toBe( undefined );
	});

	it( "should return the same string if chars is empty string", () =>
	{
		expect( trim( "abc", "" )).toBe( "abc" );
	});

	it( "should return the same string if chars is an empty array", () =>
	{
		expect( trim( "abc", [])).toBe( "abc" );
	});

	it( "should return empty string if input is empty", () =>
	{
		expect( trim( "" )).toBe( "" );
	});

	it( "should trim regex special characters properly", () =>
	{
		expect( trim( ".*hello.*", [ ".", "*" ])).toBe( "hello" );
	});

	it( "should trim only from start and end, not inside", () =>
	{
		expect( trim( "***abc***xyz***", "*" )).toBe( "abc***xyz" );
	});

	it( "should trim multiple different characters in mixed order", () =>
	{
		expect( trim( "-_-abc-_--", [ "-", "_" ])).toBe( "abc" );
	});
});
