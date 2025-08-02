import { describe, it, expect } from "vitest";
import escapeRegex from ".";

describe( "escapeRegex", () =>
{
	it( "should escape all special regex characters", () =>
	{
		const input = ".*+?^${}()|[]\\";
		const expected = "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\";
	
		expect( escapeRegex( input )).toBe( expected );
	});
	
	it( "should return the same string if there are no special characters", () =>
	{
		expect( escapeRegex( "abc123" )).toBe( "abc123" );
	});

	it( "should handle mixed characters", () =>
	{
		expect( escapeRegex( "file(name).js" )).toBe( "file\\(name\\)\\.js" );
	});

	it( "should return an empty string when input is an empty string", () =>
	{
		expect( escapeRegex( "" )).toBe( "" );
	});

	it( "should return an empty string when input is null", () =>
	{
		expect( escapeRegex( null )).toBe( "" );
	});

	it( "should return an empty string when input is undefined", () =>
	{
		expect( escapeRegex( undefined )).toBe( "" );
	});

	it( "should return an empty string when input is a number", () =>
	{
		expect( escapeRegex( 12345 )).toBe( "" );
	});

	it( "should return an empty string when input is an object", () =>
	{
		expect( escapeRegex({})).toBe( "" );
	});

	it( "should return an empty string when input is an array", () =>
	{
		expect( escapeRegex([])).toBe( "" );
	});
	
	it( "should return an empty string when input is a function", () =>
	{
		expect( escapeRegex(() => {})).toBe( "" );
	});
});
