import { getTypeName } from "..";

/**
 * Checks if a given value is a Map.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} true if the value is a Map, false otherwise.
 */
export default function isMap( value )
{
	return getTypeName( value ) === "Map";
}
