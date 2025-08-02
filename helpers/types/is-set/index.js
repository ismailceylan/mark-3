import { getTypeName } from "..";

/**
 * Checks if a given value is a Set.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} true if the value is a Set, false otherwise.
 */
export default function isSet( value )
{
	return getTypeName( value ) === "Set";
}
