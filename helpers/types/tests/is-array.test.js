import { describe, it, expect } from "vitest";
import { isArray } from "..";

describe( "isArray", () =>
{
	it( "should return true for an empty array", () =>
	{
    	expect( isArray([])).toBe( true );
	});

	it( "should return true for a non-empty array", () =>
	{
		expect( isArray([ 1, 2, 3 ])).toBe( true );
	});

	it( "should return false for a string", () =>
	{
		expect( isArray( "hello" )).toBe( false );
	});
	
	it( "should return false for a number", () =>
	{
		expect( isArray( 123 )).toBe( false );
	});

	it( "should return false for null", () =>
	{
		expect( isArray( null )).toBe( false );
	});

	it( "should return false for undefined", () =>
	{
		expect( isArray( undefined )).toBe( false );
	});

	it( "should return false for an object", () =>
	{
		expect( isArray({ a: 1 })).toBe( false );
	});
	
	it( "should return false for a function", () =>
	{
		expect( isArray(() => {})).toBe( false );
	});
	
	it( "should return false for a Set", () =>
	{
		expect( isArray( new Set([ 1, 2, 3 ]))).toBe( false );
	});
	
	it( "should return false for an Array-like object", () =>
	{
    	const arrayLike = { 0: "a", 1: "b", length: 2 };
		expect( isArray( arrayLike )).toBe( false );
	});
});
