import { trim } from "..";
import { isString } from "../../types";

/**
 * Converts a camelCase string to dash-case.
 *
 * @param {string} source - The camelCase string to convert.
 * @returns {string} The converted dash-case string. If the input is not a string, returns the input as is.
 */
export default function camelToDash( source )
{
	if( ! isString( source ))
	{
		return source;
	}

	source = source.replace(
		/([A-Z])/g,
		upper => "-" + upper.toLowerCase()
	);

	return trim( source, "-" );
}
