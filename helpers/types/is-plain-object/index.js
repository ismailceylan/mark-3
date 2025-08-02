import { getTypeName } from "../type";

/**
 * Checks if the given value is a plain object.
 *
 * @param {any} value - The value to be checked.
 * @return {boolean} true if the value is a plain object, false otherwise.
 */
export default function isPlainObject( value )
{
	return getTypeName( value ) === "Object";
}
