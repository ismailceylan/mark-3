import { random } from "../number";
import { isArray } from "../types";

/**
 * Picks a random element from the given array.
 * 
 * @template T
 * @param {T[]} arr - The array to pick a random element from.
 * @returns {T|undefined} - The random element from the array, or undefined if the array is empty.
 */
export default function pickRandom( arr )
{
	if( ! isArray( arr ))
	{
		return undefined;
	}

	if( arr.length === 0 )
	{
		return undefined;
	}

	return arr[ random( 0, arr.length - 1 )];
}
