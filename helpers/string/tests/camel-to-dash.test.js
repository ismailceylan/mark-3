import { describe, it, expect } from "vitest";
import { camelToDash } from "..";

describe( "camelToDash", () =>
{
	it( "converts camelCase to dash-case", () =>
	{
		expect( camelToDash( "helloWorld" )).toBe( "hello-world" );
		expect( camelToDash( "mySuperVariable" )).toBe( "my-super-variable" );
		expect( camelToDash( "alreadyDashCase" )).toBe( "already-dash-case" );
	});

	it( "handles strings with multiple uppercase letters in a row", () =>
	{
		expect( camelToDash( "PDFLoader" )).toBe( "p-d-f-loader" );
		expect( camelToDash( "loadXMLDocument" )).toBe( "load-x-m-l-document" );
	});

	it( "trims dashes from the beginning and end", () =>
	{
		expect( camelToDash( "CamelCase" )).toBe( "camel-case" );
		expect( camelToDash( "AB" )).toBe( "a-b" );
		expect( camelToDash( "A" )).toBe( "a" );
	});

	it( "returns empty string when input is empty", () =>
	{
		expect( camelToDash( "" )).toBe( "" );
	});

	it( "returns non-string inputs unchanged", () =>
	{
		expect( camelToDash( null )).toBe( null );
		expect( camelToDash( undefined )).toBe( undefined );
		expect( camelToDash( 123 )).toBe( 123 );
		expect( camelToDash({})).toEqual({});
		expect( camelToDash([ "camelCase" ])).toEqual([ "camelCase" ]);
	});
});
