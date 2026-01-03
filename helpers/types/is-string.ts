/**
 * Checks if the given value is a string.
 *
 * @param value - The value to be checked.
 * @returns true if the value is a string, false otherwise.
 * @example
 * isString("123"); // true
 * isString(123); // false
 */
export default function isString( value: any ): value is string
{
	return typeof value === "string";
}
