import { isString } from "../types";

/**
 * Escapes special characters in a string to be used in a regular expression.
 *
 * @param {string} str - The input string containing characters to be escaped.
 * @returns {string} The modified string with special characters escaped.
 */
export default function escapeRegex( str )
{
	if( ! isString( str ))
	{
		return "";
	}

	return str.replace(
		/[.*+?^${}()|[\]\\]/g,
		"\\$&"
	);
}
