import { describe, it, expect } from "vitest";
import { fromTimestamp } from "..";

describe( "fromTimestamp", () =>
{
	it( "should parse milliseconds timestamp correctly", () =>
	{
		const now = Date.now();
		const result = fromTimestamp( now );

		expect( result ).toBeInstanceOf( Date );
		expect( result?.getTime()).toBe( now );
	});

	it( "should parse seconds timestamp correctly", () =>
	{
		const now = Math.floor( Date.now() / 1000 );
		const result = fromTimestamp( now );

		expect( result ).toBeInstanceOf( Date );
		expect( Math.floor( result?.getTime() / 1000 )).toBe( now );
	});

	it( "should return defaultValue for non-number input", () =>
	{
		const result = fromTimestamp( "not-a-number", "default" );
		expect( result ).toBe( "default" );
	});

	it( "should return defaultValue for NaN date", () =>
	{
    	const result = fromTimestamp( NaN, "fallback" );
		expect( result ).toBe( "fallback" );
	});

	it( "should return undefined for invalid input without default", () =>
	{
		expect( fromTimestamp( NaN )).toBeUndefined();
	});

	it( "should support boolean as default value", () =>
	{
    	const result = fromTimestamp( NaN, false );
		expect( result ).toBe( false );
	});

	it( "should support object as default value", () =>
	{
    	const fallback = { error: true }
    	const result = fromTimestamp( NaN, fallback );
    
		expect( result ).toBe( fallback );
	});

	it( "should return defaultValue for Infinity", () =>
	{
		expect( fromTimestamp( Infinity, "fallback" )).toBe( "fallback" );
	});

	it( "should return undefined for Infinity without defaultValue", () =>
	{
		expect( fromTimestamp( Infinity )).toBe( undefined );
	});

	it( "should return default for null", () =>
	{
		expect( fromTimestamp( null, "fallback" )).toBe( "fallback" );
	});
});
