import { describe, it, expect } from "vitest";
import getTypeName from "./type";

describe( "type", () =>
{
	it( 'should return "String" for a string', () =>
	{
		expect( getTypeName( "hello" )).toBe( "String" );
	});

	it( 'should return "Number" for a number', () =>
	{
		expect( getTypeName( 123 )).toBe( "Number" );
	});

	it( 'should return "Boolean" for a boolean', () =>
	{
		expect( getTypeName( true )).toBe( "Boolean" );
		expect( getTypeName( false )).toBe("Boolean" );
	});

	it( 'should return "Object" for an object', () =>
	{
		expect( getTypeName({})).toBe( "Object" );
	});

	it( 'should return "Array" for an array', () =>
	{
		expect( getTypeName([])).toBe( "Array" );
	});

	it( 'should return "Null" for null', () =>
	{
		expect( getTypeName( null )).toBe( "Null" );
	});

	it( 'should return "Undefined" for undefined', () =>
	{
		expect( getTypeName( undefined )).toBe( "Undefined" );
	});
	
	it( 'should return "Function" for a function', () =>
	{
		expect( getTypeName(() => {})).toBe( "Function" );
	});

	it( 'should return "RegExp" for a regular expression', () =>
	{
		expect( getTypeName( /abc/ )).toBe( 'RegExp' );
	});

	it( 'should return "Date" for a Date object', () =>
	{
		expect( getTypeName( new Date())).toBe( "Date" );
	});

	it( 'should return "Error" for an Error object', () =>
	{
		expect( getTypeName( new Error( "Something went wrong" ))).toBe( 'Error' );
	});

	it( 'should return "Symbol" for a Symbol', () =>
	{
		expect( getTypeName( Symbol( "foo" ))).toBe( "Symbol" );
	});

	it( 'should return "BigInt" for a BigInt', () =>
	{
		expect( getTypeName( 123n )).toBe( "BigInt" );
	});
});
