import { isString, isArray, isMap, isSet, isPlainObject } from ".";

/**
 * Checks if the given variable is empty.
 *
 * If the variable is an object, it is considered empty if it has no keys.
 * If the variable is an array, it is considered empty if it has no elements.
 * If the variable is a map or a set, it is considered empty if it has no size.
 * If the variable is a string, it is considered empty if it is trimmed to be an empty string.
 * If the variable is undefined or null, it is considered empty.
 *
 * Otherwise, it is not considered empty.
 *
 * @param {*} variable the variable to check
 * @return {Boolean} true if the variable is empty, false otherwise
 */
export default function isEmpty( variable )
{
	if( isPlainObject( variable ))
	{
		return Object.keys( variable ).length === 0;
	}

	if( isArray( variable ))
	{
		return variable.length === 0;
	}

	if( isMap( variable ) || isSet( variable ))
	{
		return variable.size === 0;
	}

	if( isString( variable ))
	{
		return variable.trim() === "";
	}

	if( variable === undefined || variable === null )
	{
		return true;
	}

	return false;
}
