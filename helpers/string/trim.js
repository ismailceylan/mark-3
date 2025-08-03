import { escapeRegex } from ".";
import { isEmpty, isArray, isString } from "../types";

/**
 * Trims the specified characters from the beginning and end of a string.
 *
 * @param {string} input - The string to trim.
 * @param {string|string[]} [chars=" "] - The character(s) to trim. Can be a single
 * character or array of characters.
 * @returns {string} The trimmed string.
 */
export default function trim( input, chars = " " )
{
	if( ! isString( input ) || ( chars !== " " && isEmpty( chars )))
	{
		return input;
	}

	const patternStr = isArray( chars )
		? makePattern( chars.map( escapeRegex ).join( "" ), "b" )
		: makePattern( escapeRegex( chars ));

	const pattern = new RegExp( patternStr, "g" );

	function makePattern( escaped, type )
	{
		return type == "b"
			? `^[${escaped}]+|[${escaped}]+$`
			: `^${escaped}+|${escaped}+$`;
	}

	return input.replace( pattern, "" );
}
