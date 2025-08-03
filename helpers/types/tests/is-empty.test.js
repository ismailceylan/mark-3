import { describe, it, expect } from "vitest";
import { isEmpty } from "../index";

describe( "isEmpty", () =>
{
	// Null & undefined
	it( "should return true for null and undefined", () =>
	{
		expect( isEmpty( null )).toBe( true );
		expect( isEmpty( undefined )).toBe( true );
	});

	// Strings
	it( "should return true for empty and whitespace-only strings", () =>
	{
		expect( isEmpty( "" )).toBe( true );
		expect( isEmpty( "   " )).toBe( true );
	});

	it( "should return false for non-empty strings", () =>
	{
		expect( isEmpty( "hello" )).toBe( false );
		expect( isEmpty( "  test  " )).toBe( false );
	});

	// Arrays
	it( "should return true for empty arrays", () =>
	{
		expect( isEmpty([] )).toBe( true );
	});

	it( "should return false for non-empty arrays", () =>
	{
		expect( isEmpty([1] )).toBe( false );
	});

	// Plain objects
	it( "should return true for empty plain objects", () =>
	{
		expect( isEmpty({} )).toBe( true );
	});

	it( "should return false for non-empty plain objects", () =>
	{
		expect( isEmpty({ a: 1 } )).toBe( false );
	});

	// Map
	it( "should return true for empty Map", () =>
	{
		expect( isEmpty(new Map( ))).toBe( true );
	});

	it( "should return false for non-empty Map", () =>
	{
		const map = new Map();
		map.set( "key", "value");
		expect( isEmpty(map )).toBe( false );
	});

	// Set
	it( "should return true for empty Set", () =>
	{
		expect( isEmpty(new Set( ))).toBe( true );
	});
	
	it( "should return false for non-empty Set", () =>
	{
		const set = new Set();
		set.add(1);
		expect( isEmpty(set )).toBe( false );
	});

	// Other types
	it( "should return false for other types", () =>
	{
		expect( isEmpty(0 )).toBe( false );
		expect( isEmpty(false )).toBe( false );
		expect( isEmpty(NaN )).toBe( false );
		expect( isEmpty(Symbol( ))).toBe( false );
		expect( isEmpty(() => {} )).toBe( false );
		expect( isEmpty(new Date( ))).toBe( false );
	});
});
